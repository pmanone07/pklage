import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { SampleSection } from "../components/sample-modal";
import { ArrowRight, Camera, Check, FileText, Mail, ShieldCheck, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <SampleSection />
        <Grounds />
        <Pricing />
        <FAQ />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 grain pointer-events-none opacity-50" />
      <div className="container-wide pt-14 sm:pt-20 pb-16 sm:pb-24 relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] mb-6">
              <span className="pulse-dot" />
              Nytt i Norge — bygget av jurister & utviklere
            </div>
            <h1 className="text-[42px] sm:text-[58px] leading-[1.02] tracking-tight">
              Urettmessig parkerings&shy;gebyr?
              <span className="block text-[color:var(--color-brand)]">
                Klag det vekk på 60 sekunder.
              </span>
            </h1>
            <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              Svar på 5 spørsmål. Last opp bilde av gebyret og skiltet.
              Vi skriver en juridisk korrekt klage — klar til å sende.
              <strong className="font-medium text-[color:var(--color-ink)]">
                {" "}Du betaler kun hvis du faktisk sender den.
              </strong>
            </p>

            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <Link
                href="/klage"
                className="inline-flex items-center gap-2 h-14 px-7 rounded-[12px] bg-[color:var(--color-brand)] text-white font-medium hover:bg-[color:var(--color-brand-dark)] transition shadow-[0_1px_0_rgba(0,0,0,0.08),0_10px_30px_-8px_rgba(210,63,26,0.45)]"
              >
                Lag klagen min — gratis
                <ArrowRight className="h-5 w-5" />
              </Link>
              <span className="text-sm text-[color:var(--color-ink-soft)]">
                Tar 60 sekunder · Ingen registrering
              </span>
            </div>

            <ul className="mt-10 grid sm:grid-cols-3 gap-3 text-sm">
              {[
                "Skrevet av juridisk-trent AI",
                "Henvisning til riktige paragrafer",
                "Klar e-post til riktig mottaker",
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

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -top-3 -right-2 z-10 stamp bg-white">
        Klar til å sende
      </div>
      <div className="paper-lift p-7 sm:p-9 relative rotate-[0.4deg]">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
              Klage på kontrollsanksjon
            </div>
            <div className="font-display text-lg mt-1">
              Onepark AS — Saksnr. 2026-04-18-A
            </div>
          </div>
          <div className="text-right text-[12px] text-[color:var(--color-ink-soft)]">
            15. mai 2026<br />Ola Nordmann
          </div>
        </div>

        <p className="text-[14.5px] leading-relaxed text-[color:var(--color-ink)]">
          Jeg viser til ilagt kontrollsanksjon datert 12. mai 2026, og bestrider
          herved kravet med grunnlag i{" "}
          <span className="underline decoration-[color:var(--color-brand)] decoration-2 underline-offset-2">
            parkeringsforskriften § 36 første ledd
          </span>
          . Skiltingen på stedet var tildekket av løvverk og manglet tydelig
          markering av tidsbegrensning, jf. forskriftens krav til opplysning…
        </p>

        <div className="mt-5 pt-5 border-t border-dashed border-[color:var(--color-line-strong)]">
          <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)] mb-2">
            Vedlegg
          </div>
          <div className="flex gap-2 flex-wrap">
            {["gebyr.jpg", "skilt.jpg", "kart.png"].map((f) => (
              <span
                key={f}
                className="text-[12px] inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[color:var(--color-bg)] border border-[color:var(--color-line)] text-[color:var(--color-ink-soft)]"
              >
                <FileText className="h-3 w-3" /> {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 paper p-3 pl-4 pr-5 items-center gap-3 rotate-[-2deg] hidden sm:flex">
        <div className="h-9 w-9 rounded-full bg-[color:var(--color-accent-soft)] flex items-center justify-center text-[color:var(--color-accent)] font-semibold">
          AI
        </div>
        <div className="text-xs leading-tight">
          <div className="font-semibold">Klage generert</div>
          <div className="text-[color:var(--color-ink-soft)]">
            på 11 sekunder
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]">
      <div className="container-wide py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <Stat n="500 000+" label="Gebyrer ilagt i Norge / år" />
        <Stat n="38 %" label="Av klager vinner frem" accent />
        <Stat n="60 sek" label="Fra start til ferdig klage" />
        <Stat n="149 kr" label="Pris — kun hvis du sender" />
      </div>
    </section>
  );
}

function Stat({
  n,
  label,
  accent,
}: {
  n: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-display text-3xl sm:text-4xl tracking-tight ${
          accent ? "text-[color:var(--color-brand)]" : ""
        }`}
      >
        {n}
      </div>
      <div className="text-xs uppercase tracking-widest mt-1 text-[color:var(--color-ink-mute)]">
        {label}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Svar på 5 spørsmål",
      body: "Hvor, når, hvilken sum, hvorfor du mener gebyret er feil. Vi guider deg.",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Last opp 2 bilder",
      body: "Bilde av gebyret og av skiltingen på stedet. Det styrker saken.",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Vi skriver klagen",
      body: "AI generer en formell klage med riktige henvisninger og struktur. Gratis.",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Send — betal 149 kr",
      body: "Send som e-post til riktig mottaker. Betal kun hvis du faktisk sender.",
    },
  ];
  return (
    <section id="hvordan" className="container-wide py-20 sm:py-28">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
          Slik fungerer det
        </div>
        <h2 className="text-3xl sm:text-5xl tracking-tight">
          Fra forbannet til ferdig på under et minutt.
        </h2>
        <p className="mt-4 text-lg text-[color:var(--color-ink-soft)]">
          Ingen jus-grader påkrevd. Vi gjør det vanskelige.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="paper p-6 relative hover:-translate-y-0.5 transition"
          >
            <div className="absolute top-4 right-4 text-[11px] text-[color:var(--color-ink-mute)]">
              0{i + 1}
            </div>
            <div className="h-9 w-9 rounded-md bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] flex items-center justify-center">
              {s.icon}
            </div>
            <div className="mt-4 font-display text-xl">{s.title}</div>
            <p className="mt-2 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Grounds() {
  const grounds = [
    { t: "Utydelig eller tildekket skilting", b: "§ 36 — Skilting skal være tydelig og synlig fra parkeringsplassen." },
    { t: "Feil opplyst tidsbegrensning", b: "Avvik mellom skilt og faktisk håndhevelse svekker grunnlaget for gebyr." },
    { t: "Manglende kontrollseddel", b: "§ 31 — Sanksjon skal festes godt synlig på kjøretøyet." },
    { t: "Betalt, men teknisk feil i app", b: "Kvitteringer fra EasyPark/AutoPay holder som motbevis." },
    { t: "Feil registreringsnummer", b: "Åpenbart feil — krev umiddelbar oppheving." },
    { t: "Kort tid mellom ankomst og kontroll", b: "§ 37 — Sjåfør skal ha rimelig tid til å betale." },
  ];
  return (
    <section className="container-wide py-20 sm:py-28">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Når kan du klage?
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight">
            38 % av klager vinner frem.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
            Parkeringsselskaper håper du ikke gidder. Men hvis grunnlaget er
            tynt, gir de seg ofte etter første formelle klage. Disse er de
            sterkeste grunnlagene:
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {grounds.map((g) => (
            <div key={g.t} className="paper p-5">
              <div className="font-semibold text-[15px]">{g.t}</div>
              <p className="mt-1 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                {g.b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="priser" className="container-wide pb-20 sm:pb-28">
      <div className="paper-lift overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-10 sm:p-14 border-b lg:border-b-0 lg:border-r border-[color:var(--color-line)]">
            <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
              Pris
            </div>
            <h2 className="text-3xl sm:text-5xl tracking-tight">
              Helt åpen pris.
            </h2>
            <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
              Vi tjener bare hvis du tjener på det. Du leser ferdig klage før
              du bestemmer deg.
            </p>
            <div className="mt-8 flex items-baseline gap-2">
              <div className="font-display text-6xl tracking-tight">149</div>
              <div className="text-[color:var(--color-ink-soft)]">kr</div>
            </div>
            <div className="text-sm text-[color:var(--color-ink-soft)] mt-1">
              Engangsbeløp · ingen abonnement
            </div>
          </div>
          <div className="p-10 sm:p-14 bg-[color:var(--color-bg)]">
            <ul className="space-y-3">
              {[
                ["Gratis å lage klagen", "Du leser hele klagen før betaling."],
                ["Kun betal hvis du sender", "Vi tjener ikke hvis du angrer."],
                ["Pengene tilbake hvis vi tar feil", "Hvis klagen er feil utformet."],
                ["E-post klar til å sende", "Til riktig mottaker, riktig emne."],
              ].map(([t, b]) => (
                <li key={t} className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-[color:var(--color-accent)] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-sm text-[color:var(--color-ink-soft)]">{b}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/klage"
              className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-[10px] bg-[color:var(--color-ink)] text-white font-medium hover:bg-[color:var(--color-ink-soft)] transition"
            >
              Start klage — gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Hva hvis klagen min ikke vinner frem?",
      a: "Da har du tapt 149 kr, men forsøkt å spare flere hundre. Klagen din skal være formelt korrekt; hvis det er en åpenbar feil fra oss refunderer vi.",
    },
    {
      q: "Er dette juridisk rådgivning?",
      a: "Nei. Vi lager en formell klage basert på opplysningene du gir oss. Det erstatter ikke individuell juridisk vurdering ved kompliserte saker.",
    },
    {
      q: "Hvorfor er det gratis å lage klagen?",
      a: "Vi tror på det vi leverer. Du leser hele klagen først — vi tjener bare hvis du faktisk sender den.",
    },
    {
      q: "Hvilke parkeringsselskap kan jeg klage til?",
      a: "Alle: Onepark, Aimo Park, Q-Park, EasyPark, Apcoa, kommunale parkeringsetater. Klagen tilpasses mottakeren automatisk.",
    },
    {
      q: "Hva med personvern?",
      a: "Bildene dine lagres bare midlertidig for å generere klagen. Du kan slette dataene dine når som helst.",
    },
    {
      q: "Hva hvis jeg får purregebyr?",
      a: "Klag uansett — innen 3 uker. Når en klage er sendt har parkeringsselskapet plikt til å avvente inkasso til klagen er behandlet.",
    },
  ];
  return (
    <section id="faq" className="container-wide pb-20 sm:pb-28">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-3">
            Vanlige spørsmål
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight">
            Greit å vite først.
          </h2>
        </div>
        <div className="divide-y divide-[color:var(--color-line)] border-t border-b border-[color:var(--color-line)]">
          {items.map((it) => (
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
  );
}

function FinalCta() {
  return (
    <section className="container-wide pb-24">
      <div className="paper-lift p-10 sm:p-16 text-center relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 grain opacity-50" />
        <div className="relative">
          <h2 className="text-3xl sm:text-5xl tracking-tight max-w-2xl mx-auto">
            Du har 14 dager på å klage. Bruk 60 sekunder.
          </h2>
          <Link
            href="/klage"
            className="mt-8 inline-flex items-center gap-2 h-14 px-8 rounded-[12px] bg-[color:var(--color-brand)] text-white font-medium hover:bg-[color:var(--color-brand-dark)] transition shadow-[0_1px_0_rgba(0,0,0,0.08),0_10px_30px_-8px_rgba(210,63,26,0.45)]"
          >
            Lag klagen min — gratis <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
