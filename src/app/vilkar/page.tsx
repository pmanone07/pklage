import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = {
  title: "Vilkår for bruk",
  description:
    "Vilkår for bruk av Pklage.no. Hva tjenesten dekker, pris, refusjon, ansvar og angrerett.",
};

const LAST_UPDATED = "18. mai 2026";

export default function VilkarPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="container-tight pt-14 sm:pt-20 pb-8">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Juridisk
          </div>
          <h1 className="text-4xl sm:text-5xl tracking-tight">
            Vilkår for bruk.
          </h1>
          <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Korte, leselige vilkår. Ved å bruke Pklage.no godtar du dette. Vi
            har gjort alt vi kan for å skrive dem på vanlig norsk.
          </p>
          <div className="mt-4 text-xs uppercase tracking-widest text-[color:var(--color-ink-mute)]">
            Sist oppdatert: {LAST_UPDATED}
          </div>
        </section>

        <section className="container-tight pb-20 sm:pb-28">
          <article className="paper p-6 sm:p-10">
            <Section title="1. Hva Pklage.no er">
              <p>
                Pklage.no er en digital tjeneste som hjelper privatpersoner å
                lage en formell klage på parkeringsgebyr (kontrollsanksjon). Vi
                genererer et klagebrev basert på opplysningene du oppgir og
                stiller det klart for utsendelse som e-post fra din egen
                e-postklient.
              </p>
              <p>
                <strong>Vi er ikke advokat eller juridisk rådgiver.</strong>{" "}
                Tjenesten erstatter ikke individuell juridisk vurdering, og
                garanterer ikke et bestemt utfall i klagebehandlingen.
              </p>
            </Section>

            <Section title="2. Hvem som kan bruke tjenesten">
              <p>
                Tjenesten er rettet mot privatpersoner bosatt i Norge som er
                fylt 18 år. Bruk for andres regning eller på vegne av et
                foretak forutsetter at du har fullmakt.
              </p>
            </Section>

            <Section title="3. Hvordan tjenesten fungerer">
              <ol>
                <li>Du svarer på spørsmål om gebyret og din situasjon.</li>
                <li>Du laster (valgfritt) opp bilder lokalt i nettleseren.</li>
                <li>Vi genererer en formell klage du kan lese gratis.</li>
                <li>
                  Hvis du ønsker å sende klagen, betaler du 149 kr og får
                  låst opp utsendelse via din e-postklient.
                </li>
              </ol>
            </Section>

            <Section title="4. Pris og betaling">
              <p>
                Pris for å låse opp og sende klagen er <strong>149 kr</strong>{" "}
                inkl. mva. — engangsbeløp uten abonnement. Betaling skjer via
                Stripe (kort). Tjenesten er gratis å bruke frem til du
                bestemmer deg for å sende klagen.
              </p>
            </Section>

            <Section title="5. Angrerett og refusjon">
              <p>
                Digitalt innhold som leveres umiddelbart etter samtykke er
                unntatt angrerett, jf. angrerettloven § 22 bokstav n. Ved
                betaling samtykker du til at klagen leveres med en gang, og
                fraskriver deg dermed angreretten for denne leveransen.
              </p>
              <p>
                <strong>Vår refusjonsgaranti:</strong> Vi refunderer 149 kr
                hvis klagen åpenbart er formelt feil utformet fra vår side
                (f.eks. feil paragrafhenvisning, feil mottaker, manglende
                vedleggreferanse som gjør klagen ubrukelig). Send krav til{" "}
                <a href="mailto:support@pklage.no">support@pklage.no</a> med
                saksnummer innen 14 dager etter kjøp.
              </p>
              <p>
                Vi refunderer <em>ikke</em> hvis klagen er korrekt utformet
                men parkeringsselskapet likevel avslår på materielt grunnlag.
                Tjenesten gir ingen garanti for utfall.
              </p>
            </Section>

            <Section title="6. Dine plikter">
              <ul>
                <li>
                  Opplysningene du oppgir må være sannferdige. Bevisst falsk
                  informasjon kan utgjøre forsøk på bedrageri.
                </li>
                <li>
                  Du er selv ansvarlig for å sende klagen i tide (3 ukers
                  klagefrist fra ileggelse) og til riktig mottaker.
                </li>
                <li>
                  Du må ikke bruke tjenesten for å sjikanere, overbelaste eller
                  reverse-engineere systemet.
                </li>
              </ul>
            </Section>

            <Section title="7. Ansvarsbegrensning">
              <p>
                Tjenesten leveres «som den er». Vi er ikke ansvarlig for
                indirekte tap, tapt fortjeneste eller konsekvenstap som følge
                av bruk av tjenesten. Vårt totale erstatningsansvar i én sak
                er begrenset til beløpet du har betalt for tjenesten (149 kr).
              </p>
              <p>
                Begrensningen gjelder ikke for skade voldt forsettlig eller
                ved grov uaktsomhet, eller for rettigheter du har som
                forbruker og som ikke kan fravikes ved avtale.
              </p>
            </Section>

            <Section title="8. Immaterielle rettigheter">
              <p>
                Pklage.no, designet og kildekoden er vår eiendom. Klagebrevet
                som genereres på bakgrunn av dine opplysninger kan du fritt
                bruke, endre og sende videre — det tilhører deg.
              </p>
            </Section>

            <Section title="9. Tilgjengelighet">
              <p>
                Vi etterstreber høy oppetid, men kan ikke garantere
                avbruddsfri drift. Planlagt vedlikehold varsles ved behov.
              </p>
            </Section>

            <Section title="10. Endring av vilkår">
              <p>
                Vi kan oppdatere disse vilkårene. Endringer publiseres på
                denne siden med ny «sist oppdatert»-dato. Vesentlige endringer
                som påvirker eksisterende kjøp varsles på e-post.
              </p>
            </Section>

            <Section title="11. Lovvalg og tvister">
              <p>
                Avtalen reguleres av norsk rett. Tvister søkes løst i minnelighet.
                Hvis enighet ikke nås, kan forbrukere bringe saken inn for
                Forbrukertilsynet eller verneting i klagers bostedskommune.
              </p>
            </Section>

            <Section title="12. Kontakt">
              <p>
                Generelle henvendelser:{" "}
                <a href="mailto:hei@pklage.no">hei@pklage.no</a>
                <br />
                Support og refusjon:{" "}
                <a href="mailto:support@pklage.no">support@pklage.no</a>
                <br />
                Personvern:{" "}
                <a href="mailto:personvern@pklage.no">personvern@pklage.no</a>
              </p>
            </Section>
          </article>

          <div className="mt-10 text-sm text-[color:var(--color-ink-soft)] flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/personvern" className="hover:text-[color:var(--color-ink)] underline-offset-4 hover:underline">
              Se også: Personvernerklæring →
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
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)] [&_a]:text-[color:var(--color-brand)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[color:var(--color-brand-dark)] [&_strong]:text-[color:var(--color-ink)] [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_em]:italic">
        {children}
      </div>
    </section>
  );
}
