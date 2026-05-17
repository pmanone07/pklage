import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { ArrowRight, Mail, MessageCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kom i kontakt med Pklage.no. Spørsmål om klagen, refusjon eller personvern? Vi svarer innen én virkedag.",
};

export default function KontaktPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="container-tight pt-14 sm:pt-20 pb-10">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Kontakt
          </div>
          <h1 className="text-4xl sm:text-5xl tracking-tight">
            Snakk med oss.
          </h1>
          <p className="mt-4 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Vi er et lite team i Norge. Spørsmål om klagen din, refusjon eller
            personvern — skriv en e-post, så svarer vi innen én virkedag.
          </p>
        </section>

        <section className="container-tight pb-12">
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="mailto:hei@pklage.no"
              className="paper p-6 hover:-translate-y-0.5 transition group"
            >
              <div className="h-9 w-9 rounded-md bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-xl">Generell henvendelse</div>
              <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
                Spørsmål, tilbakemelding, presse.
              </p>
              <div className="mt-3 text-[color:var(--color-brand)] text-sm font-medium inline-flex items-center gap-1">
                hei@pklage.no
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </div>
            </a>
            <a
              href="mailto:support@pklage.no"
              className="paper p-6 hover:-translate-y-0.5 transition group"
            >
              <div className="h-9 w-9 rounded-md bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-xl">Hjelp med klagen</div>
              <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
                Refusjon, teknisk feil, oppfølging av sak.
              </p>
              <div className="mt-3 text-[color:var(--color-brand)] text-sm font-medium inline-flex items-center gap-1">
                support@pklage.no
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </div>
            </a>
          </div>
        </section>

        <section className="container-tight pb-12">
          <div className="paper p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[color:var(--color-accent)] mt-1 shrink-0" />
              <div>
                <div className="font-display text-xl">
                  Klag heller via Parkeringsklagenemnda
                </div>
                <p className="mt-2 text-[15px] text-[color:var(--color-ink-soft)] leading-relaxed">
                  Hvis parkeringsselskapet har avslått klagen din, kan du
                  bringe saken inn for{" "}
                  <a
                    href="https://www.parkeringsklagenemnda.no"
                    target="_blank"
                    rel="noopener"
                    className="underline decoration-[color:var(--color-brand)] underline-offset-2 hover:text-[color:var(--color-ink)]"
                  >
                    Parkeringsklagenemnda
                  </a>
                  . Det er gratis, og avgjørelsen er bindende for selskapet.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-tight pb-20 sm:pb-28">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Vanlige spørsmål
          </div>
          <h2 className="text-2xl sm:text-3xl tracking-tight mb-6">
            Sjekk her først.
          </h2>
          <div className="divide-y divide-[color:var(--color-line)] border-t border-b border-[color:var(--color-line)]">
            {faqs.map((it) => (
              <details key={it.q} className="group py-5">
                <summary className="cursor-pointer flex justify-between items-start gap-4 font-medium text-[16px] list-none">
                  {it.q}
                  <span className="text-[color:var(--color-ink-mute)] group-open:rotate-45 transition shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] text-[color:var(--color-ink-soft)] leading-relaxed">
                  {it.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 items-center">
            <Link
              href="/klage"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-[10px] bg-[color:var(--color-brand)] text-white font-medium hover:bg-[color:var(--color-brand-dark)] transition"
            >
              Start klage — gratis <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm text-[color:var(--color-ink-soft)]">
              Du betaler kun hvis du faktisk sender klagen.
            </span>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

const faqs = [
  {
    q: "Hvor lang tid tar det å få svar?",
    a: "Vi svarer på e-post innen én virkedag (man–fre). Refusjonskrav prioriteres.",
  },
  {
    q: "Kan jeg få refusjon hvis klagen ikke fører frem?",
    a: "Vi refunderer hvis klagen er formelt feil utformet. Hvis grunnlaget ditt var tynt vinner ikke alle klager frem — det er normalt og dekkes ikke av refusjon. Send oss en e-post med saksnummer, så ser vi på det.",
  },
  {
    q: "Har dere telefon eller chat?",
    a: "Ikke ennå. Vi holder oss til e-post for å kunne dokumentere alt skriftlig — det er ofte nyttig i en klagesak.",
  },
  {
    q: "Hvor er dere registrert?",
    a: "Pklage.no driftes fra Norge. Foretaksinformasjon vises på fakturaen din når du har betalt.",
  },
];
