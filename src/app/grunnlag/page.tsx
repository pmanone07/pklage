import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import {
  ArrowRight,
  Check,
  Clock,
  FileQuestion,
  MapPin,
  Receipt,
  ScanSearch,
  Signpost,
  TriangleAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Grunnlag for klage",
  description:
    "Disse grunnlagene gir best sjanse for å vinne frem mot et parkeringsgebyr. Konkrete paragrafer, eksempler og hva du bør dokumentere.",
};

const grounds = [
  {
    icon: Signpost,
    title: "Utydelig eller tildekket skilting",
    paragraph: "§ 36 første ledd",
    body: "Skiltingen skal være tydelig synlig fra parkeringsplassen og opplyse om vilkårene. Er skiltet tildekket av løvverk, snø, klistermerker eller plassert slik at det ikke vises fra plassen, er ileggelsen sårbar.",
    proof: "Bilde av skiltet fra plassens perspektiv, gjerne med dato og klokkeslett.",
    strength: "Sterk",
  },
  {
    icon: Clock,
    title: "Kort tid mellom ankomst og kontroll",
    paragraph: "§ 37",
    body: "Sjåføren skal ha rimelig tid til å sette seg inn i vilkårene og betale før kontroll. Bransjepraksis er minst 5 minutter på avgiftsbelagte plasser.",
    proof: "Tidspunkt på kvittering, app-historikk eller billett.",
    strength: "Sterk",
  },
  {
    icon: Receipt,
    title: "Betalt, men teknisk feil i app",
    paragraph: "Avtalerett + dokumentasjon",
    body: "Hvis du faktisk betalte men appen ikke registrerte sonen riktig, har du oppfylt din del. Skjermbilder fra EasyPark, AutoPay, YourWay m.fl. holder ofte som motbevis.",
    proof: "Skjermbilde av aktiv parkering, kvittering fra app, banktransaksjon.",
    strength: "Veldig sterk",
  },
  {
    icon: ScanSearch,
    title: "Feil registreringsnummer eller kjøretøy",
    paragraph: "Faktisk feil",
    body: "Står det feil regnr. på gebyret, eller er det åpenbart at kontrolløren har dokumentert feil kjøretøy, oppheves gebyret nesten alltid umiddelbart.",
    proof: "Bilde av gebyret + bilde av eget kjøretøys regnr.",
    strength: "Veldig sterk",
  },
  {
    icon: MapPin,
    title: "Feil opplyst sone eller tidsbegrensning",
    paragraph: "§ 36",
    body: "Avvik mellom skiltet sone og faktisk håndhevet sone, eller mellom oppgitt og faktisk tidsbegrensning, svekker grunnlaget for gebyr.",
    proof: "Bilde av alle skilt i området + kart/skjermbilde fra appen.",
    strength: "Middels",
  },
  {
    icon: FileQuestion,
    title: "Manglende kontrollseddel på kjøretøyet",
    paragraph: "§ 31",
    body: "Sanksjonen skal festes godt synlig på kjøretøyet. Hvis du ikke fikk noen seddel og bare oppdaget gebyret senere, er saksgangen brutt.",
    proof: "Bilde av kjøretøyet uten seddel (om mulig) og forklaring i klagen.",
    strength: "Middels",
  },
  {
    icon: TriangleAlert,
    title: "Force majeure — nødssituasjon",
    paragraph: "Skjønnsmessig",
    body: "Akutt sykdom, ulykke eller annen tvingende grunn som gjorde det umulig å flytte/betale. Krever dokumentasjon, men aksepteres ofte.",
    proof: "Legeerklæring, politirapport, sms-historikk eller lignende.",
    strength: "Avhenger av dokumentasjon",
  },
] as const;

export default function GrunnlagPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="container-tight pt-14 sm:pt-20 pb-10">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Når kan du klage?
          </div>
          <h1 className="text-4xl sm:text-5xl tracking-tight">
            Grunnlag for klage på parkeringsgebyr.
          </h1>
          <p className="mt-4 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
            38 % av klager vinner frem — men kun hvis grunnlaget er solid. Her
            er de sterkeste grunnlagene, med paragrafhenvisninger og hva du bør
            dokumentere.
          </p>
        </section>

        <section className="container-tight pb-8">
          <div className="paper p-6 sm:p-8 border-l-4 border-l-[color:var(--color-brand)]">
            <div className="font-display text-xl">Frister du må kjenne</div>
            <ul className="mt-3 space-y-2 text-[15px] text-[color:var(--color-ink-soft)]">
              <li className="flex gap-2 items-start">
                <Check className="h-5 w-5 text-[color:var(--color-accent)] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[color:var(--color-ink)]">3 uker</strong>{" "}
                  fra ileggelse til selskapet må ha klagen din.
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <Check className="h-5 w-5 text-[color:var(--color-accent)] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[color:var(--color-ink)]">14 dager</strong>{" "}
                  har selskapet på å svare. Inkasso er ikke tillatt mens en klage er til behandling.
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <Check className="h-5 w-5 text-[color:var(--color-accent)] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[color:var(--color-ink)]">1 år</strong>{" "}
                  har du på å bringe saken videre til Parkeringsklagenemnda etter avslag.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="container-tight pb-12">
          <h2 className="text-2xl sm:text-3xl tracking-tight mb-6">
            De sterkeste grunnlagene.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {grounds.map((g) => (
              <article key={g.title} className="paper p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-9 w-9 rounded-md bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] flex items-center justify-center shrink-0">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
                    {g.strength}
                  </span>
                </div>
                <div className="mt-4 font-display text-lg leading-tight">{g.title}</div>
                <div className="text-[12px] uppercase tracking-widest text-[color:var(--color-ink-mute)] mt-1">
                  Parkeringsforskriften {g.paragraph}
                </div>
                <p className="mt-3 text-[14.5px] text-[color:var(--color-ink-soft)] leading-relaxed">
                  {g.body}
                </p>
                <div className="mt-4 pt-4 border-t border-dashed border-[color:var(--color-line-strong)]">
                  <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
                    Dokumentasjon
                  </div>
                  <p className="mt-1 text-[13.5px] text-[color:var(--color-ink-soft)] leading-relaxed">
                    {g.proof}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container-tight pb-12">
          <div className="paper p-6 sm:p-8 bg-[color:var(--color-bg-elev)]">
            <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-2">
              Når har du ikke grunnlag?
            </div>
            <div className="font-display text-xl">Vær ærlig med deg selv.</div>
            <p className="mt-3 text-[15px] text-[color:var(--color-ink-soft)] leading-relaxed">
              Du parkerte ulovlig og glemte å betale? Du sto på fortauet «bare i to
              minutter»? Du vil teste systemet? Da kommer klagen sannsynligvis ikke
              frem. Selskapene er flinkere enn folk tror — og åpenbart svake klager
              brukes som argument for å avslå.
            </p>
            <p className="mt-3 text-[15px] text-[color:var(--color-ink-soft)] leading-relaxed">
              Vi lager klagen din uansett, men du betaler kun hvis du faktisk
              sender den. Les ferdig versjon før du bestemmer deg.
            </p>
          </div>
        </section>

        <section className="container-tight pb-20 sm:pb-28">
          <div className="paper-lift p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl tracking-tight max-w-xl mx-auto">
              Har du et solid grunnlag? Da bør klagen sendes.
            </h2>
            <Link
              href="/klage"
              className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-[10px] bg-[color:var(--color-brand)] text-white font-medium hover:bg-[color:var(--color-brand-dark)] transition"
            >
              Start klage — gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
