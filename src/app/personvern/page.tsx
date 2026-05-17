import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description:
    "Hvordan Pklage.no behandler personopplysninger. GDPR-konform behandling, hvilke data vi samler, hvor lenge vi lagrer dem og dine rettigheter.",
};

const LAST_UPDATED = "18. mai 2026";

export default function PersonvernPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="container-tight pt-14 sm:pt-20 pb-8">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Juridisk
          </div>
          <h1 className="text-4xl sm:text-5xl tracking-tight">
            Personvernerklæring.
          </h1>
          <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Vi behandler så lite data som mulig, og kun det vi trenger for å
            lage og sende klagen din. Denne erklæringen forklarer akkurat hva,
            hvorfor og hvor lenge.
          </p>
          <div className="mt-4 text-xs uppercase tracking-widest text-[color:var(--color-ink-mute)]">
            Sist oppdatert: {LAST_UPDATED}
          </div>
        </section>

        <section className="container-tight pb-20 sm:pb-28">
          <article className="paper p-6 sm:p-10 prose-legal">
            <Section title="1. Behandlingsansvarlig">
              <p>
                Pklage.no er ansvarlig for behandling av personopplysninger som
                samles inn via tjenesten. Spørsmål om personvern rettes til{" "}
                <a href="mailto:personvern@pklage.no">personvern@pklage.no</a>.
              </p>
            </Section>

            <Section title="2. Hvilke opplysninger vi behandler">
              <p>For å generere klagen din behandler vi:</p>
              <ul>
                <li>
                  <strong>Personalia:</strong> navn og adresse, slik at klagen
                  kan signeres og adresseres korrekt.
                </li>
                <li>
                  <strong>E-postadresse:</strong> for kvittering og oppfølging
                  fra Stripe.
                </li>
                <li>
                  <strong>Saksdetaljer:</strong> parkeringsselskap, saksnummer,
                  dato, beløp, sted, registreringsnummer, valgt grunnlag og din
                  egen beskrivelse av hendelsen.
                </li>
                <li>
                  <strong>Tekniske data:</strong> IP-adresse, nettleser og
                  tilsvarende standard server-logger ved bruk av tjenesten.
                </li>
              </ul>
              <p>
                <strong>Bildene dine</strong> (gebyr, skilt og eventuelle
                tilleggsbilder) behandles utelukkende lokalt i nettleseren din.
                De sendes <em>ikke</em> til vår server og lastes <em>ikke</em>{" "}
                opp til oss. Når klagen er ferdig, ligger bildene som vedlegg i
                e-postutkastet i din egen e-postklient.
              </p>
            </Section>

            <Section title="3. Rettslig grunnlag">
              <ul>
                <li>
                  <strong>Avtale (GDPR art. 6 nr. 1 b):</strong> behandling som
                  er nødvendig for å levere klagen du har bestilt.
                </li>
                <li>
                  <strong>Berettiget interesse (art. 6 nr. 1 f):</strong>{" "}
                  drift, sikkerhet og anonym bruksstatistikk.
                </li>
                <li>
                  <strong>Rettslig forpliktelse (art. 6 nr. 1 c):</strong>{" "}
                  bokføring av kjøp i tråd med bokføringsloven.
                </li>
              </ul>
            </Section>

            <Section title="4. Hvor lenge vi lagrer">
              <ul>
                <li>
                  <strong>Klage-tekst og saksdetaljer:</strong> slettes når du
                  forlater siden eller lukker fanen. Vi har ingen
                  databasekonto for klager.
                </li>
                <li>
                  <strong>Betalingsdata:</strong> Stripe lagrer
                  transaksjonsinformasjon i 5 år som påkrevd av bokføringsloven.
                </li>
                <li>
                  <strong>Server-logger:</strong> 30 dager hos vår hostingleverandør.
                </li>
                <li>
                  <strong>E-postkommunikasjon med oss:</strong> inntil 12
                  måneder etter siste henvendelse.
                </li>
              </ul>
            </Section>

            <Section title="5. Databehandlere vi bruker">
              <p>
                Vi bruker disse underleverandørene. Alle er underlagt
                databehandleravtaler og GDPR-krav til overføring:
              </p>
              <ul>
                <li>
                  <strong>Vercel Inc.</strong> — hosting og analyse av
                  trafikk (anonymisert).
                </li>
                <li>
                  <strong>Stripe Inc.</strong> — betalingsbehandling. Vi ser
                  aldri kortinformasjonen din.
                </li>
                <li>
                  <strong>Anthropic PBC (via Vercel AI Gateway):</strong>{" "}
                  generering av klage-tekst. Saksdetaljer du oppgir sendes som
                  prompt. Anthropic har avtale om at innhold ikke brukes til
                  modelltrening.
                </li>
              </ul>
              <p>
                Behandling kan skje utenfor EØS (USA). Vi baserer slike
                overføringer på EUs standard kontraktsbestemmelser (SCC).
              </p>
            </Section>

            <Section title="6. Cookies og sporing">
              <p>
                Vi bruker kun strengt nødvendige cookies for at tjenesten skal
                fungere (f.eks. for å huske wizard-stegene mens du fyller ut).
                Vercel Analytics samler anonym, aggregert bruksstatistikk uten
                cookies eller fingerprinting.
              </p>
            </Section>

            <Section title="7. Dine rettigheter">
              <p>Du har rett til å:</p>
              <ul>
                <li>få innsyn i hvilke opplysninger vi har om deg,</li>
                <li>kreve at uriktige opplysninger rettes,</li>
                <li>kreve sletting når formålet er oppfylt,</li>
                <li>begrense eller protestere mot behandling,</li>
                <li>få dine opplysninger utlevert (dataportabilitet).</li>
              </ul>
              <p>
                Send forespørsel til{" "}
                <a href="mailto:personvern@pklage.no">personvern@pklage.no</a>.
                Du har også rett til å klage til Datatilsynet (
                <a
                  href="https://www.datatilsynet.no"
                  target="_blank"
                  rel="noopener"
                >
                  datatilsynet.no
                </a>
                ).
              </p>
            </Section>

            <Section title="8. Sikkerhet">
              <p>
                All trafikk går over kryptert HTTPS. Adgang til
                produksjonssystemer er begrenset til personer med tjenstlig
                behov og logges. Vi gjennomgår tilgangskontroll regelmessig.
              </p>
            </Section>

            <Section title="9. Endringer">
              <p>
                Vi kan oppdatere denne erklæringen. Vesentlige endringer
                varsles på forsiden og via e-post dersom du har en aktiv sak
                hos oss.
              </p>
            </Section>
          </article>

          <div className="mt-10 text-sm text-[color:var(--color-ink-soft)] flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/vilkar" className="hover:text-[color:var(--color-ink)] underline-offset-4 hover:underline">
              Se også: Vilkår for bruk →
            </Link>
            <Link href="/kontakt" className="hover:text-[color:var(--color-ink)] underline-offset-4 hover:underline">
              Spørsmål? Kontakt oss →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="font-display text-xl sm:text-2xl tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)] [&_a]:text-[color:var(--color-brand)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[color:var(--color-brand-dark)] [&_strong]:text-[color:var(--color-ink)] [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_em]:italic">
        {children}
      </div>
    </section>
  );
}
