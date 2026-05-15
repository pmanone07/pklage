import { streamText } from "ai";
import { klageSchema, grunnlagLabels, type KlageInput } from "../../../lib/schema";
import { findReceiverEmail } from "../../../lib/receivers";

export const runtime = "nodejs";
export const maxDuration = 60;

const lawHints: Record<KlageInput["grunnlag"], string> = {
  utydelig_skilting:
    "Parkeringsforskriften § 36 første ledd krever tydelig og synlig skilting. Bruk dette som hovedgrunnlag.",
  feil_tidsbegrensning:
    "Avvik mellom skiltet tidsbegrensning og hva som ble håndhevet svekker grunnlaget for ileggelse. Bruk parkeringsforskriften § 36 om opplysningsplikt.",
  betalt_men_feil:
    "Hvis bilist har betalt korrekt via app/automat, foreligger ikke fakta som hjemler ileggelse — påberop § 36 og krav til faktisk grunnlag.",
  feil_regnr:
    "Hvis registreringsnummer på ileggelsen avviker fra kjøretøyet, foreligger åpenbar saksbehandlingsfeil — krev umiddelbar oppheving.",
  kort_kontrolltid:
    "Parkeringsforskriften § 37 krever rimelig tid mellom ankomst og kontroll. Påberop dette hvis kontrollen skjedde innen 5 minutter.",
  manglende_seddel:
    "Parkeringsforskriften § 31 krever at sanksjonen festes godt synlig på kjøretøyet. Manglende seddel kan i seg selv være grunnlag for klage.",
  annet:
    "Vurder hvilken paragraf som passer best basert på beskrivelsen. Vær konkret og henvis riktig.",
};

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  if (!json) return new Response("Bad request", { status: 400 });

  const parsed = klageSchema.safeParse(json.data);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = parsed.data;
  const hasSkiltImg: boolean = !!json.hasSkiltImg;
  const recipient = findReceiverEmail(data.selskap);
  const subject = `Klage på kontrollsanksjon — saksnr. ${data.saksnummer}`;

  const header = JSON.stringify({ to: recipient, subject });

  const systemPrompt = `Du er en norsk advokatfullmektig som spesialiserer seg på forbrukerrett og parkeringsklager. Du skriver formelle, kortfattede og presise klager til private parkeringsselskaper.

REGLER:
- Skriv på korrekt, formelt norsk bokmål
- Henvis ALLTID til konkrete paragrafer i parkeringsforskriften
- Krev skriftlig svar innen 14 dager (parkeringsforskriften § 44)
- Vær kort og direkte — maks 350 ord
- Avslutt med "Med vennlig hilsen,\\n[NAVN]\\n[ADRESSE]"
- IKKE bruk markdown — ren tekst
- IKKE inkluder "Til:" eller "Emne:" — bare brødtekst i klagen
- Bruk avsnitt med tom linje mellom
- Ton: bestemt, faktabasert, høflig`;

  const userPrompt = `Skriv en formell klage med følgende detaljer:

PARKERINGSSELSKAP: ${data.selskap}
SAKSNUMMER: ${data.saksnummer}
DATO FOR GEBYR: ${data.dato}
BELØP: kr ${data.belop},–
STED: ${data.sted}
REGISTRERINGSNUMMER: ${data.regnummer}

KLAGERS NAVN: ${data.navn}
KLAGERS ADRESSE: ${data.adresse}

GRUNNLAG: ${grunnlagLabels[data.grunnlag]}
JURIDISK HINT: ${lawHints[data.grunnlag]}

KLAGERS EGEN BESKRIVELSE:
"${data.detaljer}"

VEDLEGG:
- Bilde av gebyret (gebyr.jpg)
${hasSkiltImg ? "- Bilde av skiltingen på stedet (skilt.jpg)" : ""}

Skriv klagen nå. Start direkte med en innledning (uten hilsefraser som "Hei"), bestrid kravet, henvis til konkret paragraf, vis til vedlegg, krev oppheving, krev svar innen 14 dager, avslutt med klagers navn og adresse.`;

  const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(buildMockStream(header, data, hasSkiltImg), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  try {
    const model = process.env.AI_GATEWAY_API_KEY
      ? "anthropic/claude-sonnet-4-6"
      : "anthropic/claude-sonnet-4-6";

    const result = streamText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.4,
    });

    const textStream = result.textStream;

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const enc = new TextEncoder();
        controller.enqueue(enc.encode(header + "\n---\n"));
        try {
          for await (const chunk of textStream) {
            controller.enqueue(enc.encode(chunk));
          }
        } catch (err) {
          controller.enqueue(
            enc.encode(
              `\n\n[Feil under generering — vennligst prøv igjen. ${err instanceof Error ? err.message : ""}]`,
            ),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Generation failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

function buildMockStream(header: string, data: KlageInput, hasSkiltImg: boolean) {
  const grunnlagBeskrivelse = {
    utydelig_skilting: "skiltingen på stedet ikke oppfylte forskriftens krav til tydelighet og synlighet",
    feil_tidsbegrensning: "tidsbegrensningen på skiltet ikke samsvarte med håndhevingspraksis",
    betalt_men_feil: "parkeringsavgift var betalt korrekt på ileggelsestidspunktet",
    feil_regnr: "registreringsnummeret på kontrollsanksjonen avviker fra mitt kjøretøy",
    kort_kontrolltid: "det ikke ble gitt rimelig tid mellom min ankomst og kontrollen",
    manglende_seddel: "kontrollseddelen ikke var festet synlig på kjøretøyet",
    annet: "kontrollsanksjonen ikke har tilstrekkelig grunnlag",
  }[data.grunnlag];

  const paragraf = {
    utydelig_skilting: "parkeringsforskriften § 36 første ledd",
    feil_tidsbegrensning: "parkeringsforskriften § 36 om opplysningsplikt",
    betalt_men_feil: "parkeringsforskriften § 36 om faktisk grunnlag",
    feil_regnr: "alminnelige forvaltningsrettslige prinsipper og parkeringsforskriften § 38",
    kort_kontrolltid: "parkeringsforskriften § 37",
    manglende_seddel: "parkeringsforskriften § 31",
    annet: "parkeringsforskriften § 36",
  }[data.grunnlag];

  const body = `Jeg viser til ilagt kontrollsanksjon datert ${formatDate(data.dato)}, saksnummer ${data.saksnummer}, pålydende kr ${data.belop},–, og bestrider herved kravet i sin helhet.

Det fremgår av min beskrivelse av hendelsen at ${grunnlagBeskrivelse}. ${data.detaljer.replace(/\s+/g, " ").trim()}

Som vedlegg følger bilde av kontrollsanksjonen${hasSkiltImg ? " samt fotodokumentasjon av skiltingen på stedet" : ""}. Det fremgår av disse at vilkårene for ileggelse av kontrollsanksjon ikke var oppfylt, jf. ${paragraf}.

På denne bakgrunn krever jeg at kontrollsanksjonen oppheves og at saken avsluttes. Inntil klagen er endelig avgjort krever jeg at innkreving stilles i bero, jf. parkeringsforskriften § 44 fjerde ledd.

Jeg ber om skriftlig svar innen 14 dager fra dags dato. Dersom klagen ikke tas til følge, vil saken bli brakt inn for Parkeringsklagenemnda for videre behandling.

Med vennlig hilsen,
${data.navn}
${data.adresse}
`;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder();
      controller.enqueue(enc.encode(header + "\n---\n"));
      for (let i = 0; i < body.length; i += 28) {
        controller.enqueue(enc.encode(body.slice(i, i + 28)));
        await new Promise((r) => setTimeout(r, 22));
      }
      controller.close();
    },
  });
  return stream;
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
