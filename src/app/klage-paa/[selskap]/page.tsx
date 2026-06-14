import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/site-header";
import { SiteFooter } from "../../../components/site-footer";
import { companies, getCompanyBySlug } from "../../../lib/companies";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Params = { selskap: string };

export function generateStaticParams(): Params[] {
  return companies.map((c) => ({ selskap: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { selskap } = await params;
  const company = getCompanyBySlug(selskap);
  if (!company) return { title: "Selskap ikke funnet" };

  const title = `Klage på ${company.name} parkeringsgebyr og parkeringsbot`;
  const description = `Klage på parkeringsgebyr eller parkeringsbot fra ${company.legalName}. Send en juridisk korrekt klage på 60 sekunder — gratis å lage, 149 kr kun hvis du sender.`;

  return {
    title,
    description,
    keywords: [
      `klage ${company.name}`,
      `klage på ${company.name}`,
      `${company.name} parkeringsbot`,
      `${company.name} parkerings bot`,
      `${company.name} parkeringbot`,
      `${company.name} parkering bot`,
      `${company.name} parkeringsgebyr`,
      "parkeringsbot",
      "parkerings bot",
      "parkeringbot",
      "parkering bot",
    ],
    alternates: {
      canonical: `/klage-paa/${company.slug}`,
    },
    openGraph: {
      title: `${title} · Pklage.no`,
      description,
      type: "article",
      locale: "nb_NO",
    },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { selskap } = await params;
  const company = getCompanyBySlug(selskap);
  if (!company) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Hvor sender jeg klagen til ${company.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Klagen sendes til ${company.email}. Bruk emne "Klage på kontrollsanksjon — saksnr. [ditt saksnummer]".`,
        },
      },
      {
        "@type": "Question",
        name: `Hvor lang tid har ${company.name} på å svare?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${company.name} har ${company.responseDays} dager på å gi skriftlig svar etter parkeringsforskriften § 44.`,
        },
      },
      {
        "@type": "Question",
        name: `Hva er klagefristen for ${company.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Klagen må være sendt innen 3 uker fra ileggelsesdato. Etter dette regnes saken normalt som godkjent.",
        },
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 grain pointer-events-none opacity-50" />
          <div className="container-wide pt-14 sm:pt-20 pb-14 sm:pb-20 relative">
            <nav className="mb-6 text-xs text-[color:var(--color-ink-mute)]">
              <Link href="/" className="hover:text-[color:var(--color-ink)]">
                Hjem
              </Link>
              <span className="mx-2">/</span>
              <span>Klage på {company.name}</span>
            </nav>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] mb-5">
                  <span className="pulse-dot" />
                  Klage på {company.legalName}
                </div>
                <h1 className="text-[40px] sm:text-[54px] leading-[1.04] tracking-tight">
                  Klage på{" "}
                  <span className="text-[color:var(--color-brand)]">{company.name}</span>{" "}
                  parkerings&shy;gebyr.
                </h1>
                <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                  {company.description}{" "}
                  <strong className="text-[color:var(--color-ink)] font-medium">
                    Vi skriver klagen på parkeringsboten gratis.
                  </strong>{" "}
                  Du betaler 149 kr kun hvis du faktisk sender den.
                </p>

                <div className="mt-7 flex flex-wrap gap-3 items-center">
                  <Link
                    href={`/klage?selskap=${encodeURIComponent(company.legalName)}`}
                    className="inline-flex items-center gap-2 h-13 px-7 py-3.5 rounded-[12px] bg-[color:var(--color-brand)] text-white font-medium hover:bg-[color:var(--color-brand-dark)] transition shadow-[0_1px_0_rgba(0,0,0,0.08),0_10px_30px_-8px_rgba(210,63,26,0.45)]"
                  >
                    Klag på {company.name} nå
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <span className="text-sm text-[color:var(--color-ink-soft)]">
                    Tar 60 sekunder · Ingen registrering
                  </span>
                </div>

                <ul className="mt-9 grid sm:grid-cols-2 gap-2.5 text-sm">
                  {[
                    `Sendes direkte til ${company.email}`,
                    `${company.responseDays} dagers svarfrist`,
                    "Henvisning til riktige paragrafer",
                    "Klar PDF + e-postutkast",
                  ].map((x) => (
                    <li
                      key={x}
                      className="flex items-start gap-2 text-[color:var(--color-ink-soft)]"
                    >
                      <Check className="h-4 w-4 text-[color:var(--color-accent)] mt-0.5 shrink-0" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selskaps-infokort */}
              <aside className="paper-lift p-6 sm:p-7">
                <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
                  Selskapsinformasjon
                </div>
                <div className="font-display text-2xl mt-1">{company.legalName}</div>

                <dl className="mt-5 space-y-3.5 text-sm">
                  <InfoRow icon={Mail} label="Klage-e-post">
                    <a
                      href={`mailto:${company.email}`}
                      className="text-[color:var(--color-brand)] hover:underline break-all"
                    >
                      {company.email}
                    </a>
                  </InfoRow>
                  {company.address && (
                    <InfoRow icon={Building2} label="Adresse">
                      {company.address}
                    </InfoRow>
                  )}
                  <InfoRow icon={Clock} label="Svarfrist">
                    {company.responseDays} dager (lovpålagt)
                  </InfoRow>
                  {company.klageUrl && (
                    <InfoRow icon={FileText} label="Klagebehandling">
                      <a
                        href={company.klageUrl}
                        target="_blank"
                        rel="noopener nofollow"
                        className="text-[color:var(--color-brand)] hover:underline break-all"
                      >
                        Selskapets klageside ↗
                      </a>
                    </InfoRow>
                  )}
                  {company.phone && (
                    <InfoRow icon={Phone} label="Telefon">
                      {company.phone}
                    </InfoRow>
                  )}
                  <InfoRow icon={MapPin} label="Aktiv i">
                    {company.cities.join(" · ")}
                  </InfoRow>
                </dl>

                <div className="mt-6 pt-5 border-t border-dashed border-[color:var(--color-line-strong)] text-[12px] text-[color:var(--color-ink-soft)]">
                  Pklage.no er ikke tilknyttet {company.name}. Vi skriver en formell
                  klage til selskapet på dine vegne basert på opplysninger du oppgir.
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Common grounds */}
        <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]">
          <div className="container-wide py-14 sm:py-20">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
                  Mest vanlige klagegrunner
                </div>
                <h2 className="text-3xl sm:text-4xl tracking-tight">
                  Hvorfor folk klager på {company.name}.
                </h2>
                <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
                  Basert på offentlige klagesaker mot {company.legalName} hos
                  Parkeringsklagenemnda og bransjedata. Hvis din situasjon matcher en
                  av disse, har klagen din god sjanse.
                </p>
              </div>
              <ul className="space-y-3">
                {company.commonGrounds.map((g, i) => (
                  <li
                    key={g}
                    className="paper p-5 flex gap-4 items-start"
                  >
                    <span className="font-display text-2xl text-[color:var(--color-brand)] leading-none mt-1">
                      0{i + 1}
                    </span>
                    <div className="text-[15px] text-[color:var(--color-ink)] leading-relaxed">
                      {g}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Traits */}
        <section className="container-wide py-14 sm:py-20">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Særtrekk
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight max-w-2xl">
            Det er viktig å vite om {company.name}.
          </h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.traits.map((t) => (
              <article key={t.title} className="paper p-6">
                <div className="h-9 w-9 rounded-md bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-lg leading-snug">
                  {t.title}
                </div>
                <p className="mt-2 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                  {t.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Local example */}
        <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]">
          <div className="container-wide py-14 sm:py-20 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
                Eksempel-sak
              </div>
              <h2 className="text-3xl sm:text-4xl tracking-tight">
                Slik ser en typisk klage mot {company.name} ut.
              </h2>
              <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
                Et konkret eksempel basert på det vi ser oftest. Din situasjon er sannsynligvis
                en variant av dette.
              </p>
            </div>

            <article className="paper-lift p-7 sm:p-9">
              <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
                Reell sakstype
              </div>
              <h3 className="font-display text-xl sm:text-2xl mt-1.5 leading-snug">
                {company.localExample.title}
              </h3>
              <p className="mt-4 text-[15px] text-[color:var(--color-ink)] leading-relaxed">
                {company.localExample.body}
              </p>

              <div className="mt-7 pt-5 border-t border-dashed border-[color:var(--color-line-strong)] flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[color:var(--color-accent)] mt-0.5 shrink-0" />
                <div className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                  <strong className="text-[color:var(--color-ink)] font-medium">
                    Vinnersjanse hos {company.name}:
                  </strong>{" "}
                  {company.winRateNote}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Known locations */}
        {company.knownLocations && company.knownLocations.length > 0 && (
          <section className="container-wide py-14 sm:py-20">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
                  Kjente kontroll-lokasjoner
                </div>
                <h2 className="text-3xl sm:text-4xl tracking-tight">
                  Hvor {company.name} oftest skriver ut gebyr.
                </h2>
                <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
                  Disse stedene har vi sett flest klagesaker fra. Hvis du fikk gebyret
                  ditt et av disse stedene, finnes det ofte nemnd-saker som ligner din.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {company.knownLocations.map((loc) => (
                  <li
                    key={loc}
                    className="paper p-4 flex items-start gap-3 text-[15px]"
                  >
                    <MapPin className="h-4 w-4 text-[color:var(--color-brand)] mt-1 shrink-0" />
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* How */}
        <section className="bg-[color:var(--color-accent)] text-white">
          <div className="container-wide py-14 sm:py-20 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/60 mb-3">
                Slik gjør du det
              </div>
              <h2 className="text-3xl sm:text-4xl tracking-tight">
                Klagen til {company.name} på 4 trinn.
              </h2>
              <p className="mt-4 text-white/75 leading-relaxed">
                Du trenger bare gebyret i hånda og 60 sekunder. Vi tar resten.
              </p>
            </div>

            <ol className="space-y-3">
              {[
                {
                  t: "Svar på 5 spørsmål",
                  b: `Saksnummer, dato, beløp, hvor og kort om hvorfor. Vi forhåndsutfyller mottaker som ${company.email}.`,
                },
                {
                  t: "Last opp bilder (valgfritt)",
                  b: "Bilde av gebyret og skiltingen styrker klagen. Bildene forlater aldri nettleseren din.",
                },
                {
                  t: "Vi skriver klagen",
                  b: `AI genererer en formell klage med riktige paragrafer for ${company.legalName}. Gratis å lese.`,
                },
                {
                  t: "Send som e-post + PDF",
                  b: `Klar e-post til ${company.email} med PDF-vedlegg. Betal 149 kr kun hvis du faktisk sender.`,
                },
              ].map((s, i) => (
                <li key={s.t} className="paper p-5 text-[color:var(--color-ink)]">
                  <div className="flex gap-4">
                    <div className="font-display text-2xl text-[color:var(--color-brand)] leading-none mt-1 shrink-0">
                      0{i + 1}
                    </div>
                    <div>
                      <div className="font-display text-lg leading-tight">{s.t}</div>
                      <p className="mt-1.5 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                        {s.b}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-wide py-14 sm:py-20">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
                Spørsmål om {company.name}
              </div>
              <h2 className="text-3xl sm:text-4xl tracking-tight">
                Greit å vite.
              </h2>
            </div>
            <div className="divide-y divide-[color:var(--color-line)] border-t border-b border-[color:var(--color-line)]">
              {[
                {
                  q: `Hvor sender jeg klagen til ${company.name}?`,
                  a: `Klagen sendes til ${company.email}. Bruk emne "Klage på kontrollsanksjon — saksnr. [ditt saksnummer]". Vi setter dette opp automatisk for deg.`,
                },
                {
                  q: "Hva er klagefristen?",
                  a: "Du har 3 uker fra ileggelsesdato på å klage. Sørg for at klagen er postlagt eller sendt elektronisk før fristen — det er klagefristen som regnes, ikke når selskapet svarer.",
                },
                {
                  q: `Hvor lang tid har ${company.name} på å svare?`,
                  a: `Selskapet har ${company.responseDays} dager på å gi skriftlig svar etter parkeringsforskriften § 44. Inkasso er ikke tillatt så lenge klagen er til behandling.`,
                },
                {
                  q: "Hva hvis klagen avslås?",
                  a: `Da kan du bringe saken inn for Parkeringsklagenemnda — det er gratis, og avgjørelsen er bindende for ${company.name}. Du har 1 år på å gjøre det.`,
                },
                {
                  q: "Må jeg betale gebyret mens klagen behandles?",
                  a: "Nei. Når klagen er sendt har selskapet plikt til å avvente innkreving og inkasso til klagen er behandlet, jf. parkeringsforskriften § 44 fjerde ledd.",
                },
              ].map((it) => (
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
          </div>
        </section>

        {/* Other companies */}
        <section className="container-wide pb-14">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Andre selskaper
          </div>
          <h2 className="text-2xl sm:text-3xl tracking-tight mb-6">
            Klagde du på feil selskap?
          </h2>
          <div className="flex flex-wrap gap-2">
            {companies
              .filter((c) => c.slug !== company.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/klage-paa/${c.slug}`}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-[10px] border border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)] text-sm hover:border-[color:var(--color-line-strong)] hover:-translate-y-0.5 transition"
                >
                  Klage på {c.name}
                  <ArrowRight className="h-4 w-4 text-[color:var(--color-ink-mute)]" />
                </Link>
              ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide pb-24">
          <div className="paper-lift p-10 sm:p-14 text-center relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 grain opacity-50" />
            <div className="relative">
              <ShieldCheck className="h-10 w-10 text-[color:var(--color-accent)] mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl tracking-tight max-w-2xl mx-auto">
                Klag på parkeringsboten fra {company.name} nå — fristen er 3 uker.
              </h2>
              <p className="mt-3 text-[color:var(--color-ink-soft)] max-w-xl mx-auto">
                Gratis å lage klagen. Du leser hele før du bestemmer deg. 149 kr kun
                hvis du faktisk sender.
              </p>
              <Link
                href={`/klage?selskap=${encodeURIComponent(company.legalName)}`}
                className="mt-7 inline-flex items-center gap-2 h-14 px-8 rounded-[12px] bg-[color:var(--color-brand)] text-white font-medium hover:bg-[color:var(--color-brand-dark)] transition shadow-[0_1px_0_rgba(0,0,0,0.08),0_10px_30px_-8px_rgba(210,63,26,0.45)]"
              >
                Klag på {company.name} — gratis <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 items-start">
      <Icon className="h-4 w-4 text-[color:var(--color-ink-mute)] mt-0.5 shrink-0" />
      <div className="min-w-0">
        <dt className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
          {label}
        </dt>
        <dd className="mt-0.5 text-[14px] text-[color:var(--color-ink)] break-words">
          {children}
        </dd>
      </div>
    </div>
  );
}
