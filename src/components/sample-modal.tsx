"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";

type Outcome = "won" | "reduced" | "pending";

type Example = {
  id: string;
  selskap: string;
  recipient: string;
  saksnummer: string;
  belop: string;
  grunnlag: string;
  paragraph: string;
  outcome: Outcome;
  outcomeNote: string;
  name: string;
  city: string;
  date: string;
  body: string;
};

const examples: Example[] = [
  {
    id: "utydelig-skilting",
    selskap: "Onepark AS",
    recipient: "kundeservice@onepark.no",
    saksnummer: "2026-04-18-A",
    belop: "600",
    grunnlag: "Utydelig skilting",
    paragraph: "§ 36 første ledd",
    outcome: "won",
    outcomeNote: "Gebyret ble opphevet etter 9 dager.",
    name: "Marie L.",
    city: "Bergen",
    date: "12. mai 2026",
    body: `Onepark AS,

Jeg viser til ilagt kontrollsanksjon datert 12. mai 2026, kr 600,–, og bestrider herved kravet i sin helhet.

Som det fremgår av vedlagte bilder var skiltingen på Storgata 14 ved ileggelsestidspunktet helt eller delvis tildekket av løvverk fra tilgrensende trær. Dette innebærer at forskriftens krav til <em>tydelig opplysning</em> om vilkår, jf. <strong>parkeringsforskriften § 36 første ledd</strong>, ikke var oppfylt.

Jeg krever derfor at gebyret oppheves. Jeg ber om skriftlig svar innen 14 dager fra dags dato, jf. forskriftens § 44.

Med vennlig hilsen,
Marie L.
Bergen`,
  },
  {
    id: "betalt-men-feil",
    selskap: "EasyPark Norge AS",
    recipient: "kundeservice@easypark.no",
    saksnummer: "EP-2026-883014",
    belop: "660",
    grunnlag: "Betalt korrekt — teknisk feil",
    paragraph: "§ 36 + dokumentasjon",
    outcome: "won",
    outcomeNote: "Refundert i sin helhet etter 4 dager.",
    name: "Anders K.",
    city: "Oslo",
    date: "3. april 2026",
    body: `EasyPark Norge AS,

Jeg viser til ilagt kontrollsanksjon datert 3. april 2026, kr 660,–, og bestrider herved kravet i sin helhet.

Som det fremgår av vedlagte dokumentasjon var parkering aktivt betalt via EasyPark-applikasjonen i sone 1142 i tidsrommet 14:02–16:30 den 3. april 2026, hvilket dekker tidspunktet for kontrollen kl. 15:47. Betalingen er bekreftet på min kontoutskrift og i appens transaksjonshistorikk.

På denne bakgrunn forelå det ikke faktisk grunnlag for ileggelse, jf. <strong>parkeringsforskriften § 36</strong>. Eventuell feilregistrering hos operatør faller på operatørens ansvar.

Jeg krever at kontrollsanksjonen oppheves og at saken avsluttes. Jeg ber om skriftlig svar innen 14 dager fra dags dato.

Med vennlig hilsen,
Anders K.
Oslo`,
  },
  {
    id: "kort-kontrolltid",
    selskap: "Aimo Park Norway AS",
    recipient: "klage@aimopark.no",
    saksnummer: "AP-26-44218",
    belop: "900",
    grunnlag: "For kort tid mellom ankomst og kontroll",
    paragraph: "§ 37",
    outcome: "reduced",
    outcomeNote: "Redusert til kr 0 etter klage og ettergivelse.",
    name: "Kari T.",
    city: "Trondheim",
    date: "27. mars 2026",
    body: `Aimo Park Norway AS,

Jeg viser til ilagt kontrollsanksjon datert 27. mars 2026, kr 900,–, og bestrider herved kravet i sin helhet.

Av vedlagte tidsstempler fremgår det at jeg ankom parkeringsplassen kl. 11:46. Kontrollsanksjonen ble ifølge ileggelsen registrert kl. 11:49 — altså kun tre minutter etter ankomst. Dette er ikke i tråd med <strong>parkeringsforskriften § 37</strong>, som krever at fører gis rimelig tid til å sette seg inn i vilkårene og foreta betaling før sanksjon ilegges.

Jeg krever at gebyret oppheves som ulovlig ilagt. Jeg ber om skriftlig svar innen 14 dager fra dags dato.

Med vennlig hilsen,
Kari T.
Trondheim`,
  },
];

const outcomeStyle: Record<Outcome, { label: string; bg: string; text: string }> = {
  won: { label: "Vunnet", bg: "bg-[color:var(--color-accent-soft)]", text: "text-[color:var(--color-accent)]" },
  reduced: { label: "Redusert", bg: "bg-[color:var(--color-brand-soft)]", text: "text-[color:var(--color-brand)]" },
  pending: { label: "Til behandling", bg: "bg-[color:var(--color-bg)]", text: "text-[color:var(--color-ink-soft)]" },
};

export function SampleSection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const current = examples[index];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % examples.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + examples.length) % examples.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <section className="bg-[color:var(--color-accent)] text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
        <div className="container-wide py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/60 mb-3">
              Eksempel
            </div>
            <h2 className="text-3xl sm:text-5xl tracking-tight">
              Slik ser klagen din ut.
            </h2>
            <p className="mt-4 text-white/75 text-lg leading-relaxed">
              Ingen Word-mal. Ingen rar formulering. Skrevet i tonen
              parkeringsselskaper faktisk responderer på — formell, kort, med
              konkrete henvisninger til parkeringsforskriften.
            </p>
            <ul className="mt-6 space-y-2 text-[15px] text-white/90">
              {[
                "Henviser til riktig paragraf (§ 31, § 36, § 37)",
                "Krever 14-dagers svarfrist (lovpålagt)",
                "Inkluderer bilder som vedlegg-referanser",
                "Klar e-post til riktig saksbehandler",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[color:var(--color-brand-soft)] mt-0.5 shrink-0" />
                  {x}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => {
                setIndex(0);
                setOpen(true);
              }}
              className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-[10px] bg-white text-[color:var(--color-accent)] font-medium hover:bg-white/90 transition"
            >
              Se {examples.length} ekte eksempler <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setOpen(true);
            }}
            className="paper p-8 text-[color:var(--color-ink)] relative text-left hover:-translate-y-0.5 transition cursor-pointer group"
            aria-label="Åpne eksempelklager"
          >
            <div className="absolute -top-3 -right-2 stamp bg-white">
              Klikk for å se mer
            </div>
            <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
              Til: kundeservice@onepark.no
            </div>
            <div className="text-[11px] text-[color:var(--color-ink-mute)] mb-4">
              Emne: Klage på kontrollsanksjon — saksnr. 2026-04-18-A
            </div>

            <p className="text-[14.5px] leading-relaxed">
              <strong>Onepark AS,</strong>
              <br />
              <br />
              Jeg viser til ilagt kontrollsanksjon datert 12. mai 2026, kr 600,–,
              og bestrider herved kravet i sin helhet.
              <br />
              <br />
              Som det fremgår av vedlagte bilder var skiltingen på Storgata 14
              ved ileggelsestidspunktet helt eller delvis tildekket av løvverk
              fra tilgrensende trær. Dette innebærer at forskriftens krav til{" "}
              <em>tydelig opplysning</em> om vilkår, jf.{" "}
              <strong>parkeringsforskriften § 36 første ledd</strong>, ikke var
              oppfylt.
              <br />
              <br />
              <span className="text-[color:var(--color-ink-mute)]">
                … resten av klagen + 2 andre eksempler
              </span>
            </p>
          </button>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 fade-in"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-modal-title"
        >
          <div
            className="bg-[color:var(--color-bg)] w-full sm:max-w-3xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`text-[11px] uppercase tracking-widest font-semibold px-2 py-1 rounded ${outcomeStyle[current.outcome].bg} ${outcomeStyle[current.outcome].text}`}
                >
                  {outcomeStyle[current.outcome].label}
                </span>
                <div className="text-sm text-[color:var(--color-ink-soft)] truncate">
                  <span id="sample-modal-title" className="font-semibold text-[color:var(--color-ink)]">
                    {current.grunnlag}
                  </span>
                  <span className="hidden sm:inline">
                    {" "}— {current.selskap}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-[color:var(--color-bg)] text-[color:var(--color-ink-soft)]"
                aria-label="Lukk"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 sm:px-7 py-6 flex-1">
              <div className="paper p-6 sm:p-8">
                <div className="flex justify-between items-start gap-3 mb-5">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
                      Til: {current.recipient}
                    </div>
                    <div className="text-[11px] text-[color:var(--color-ink-mute)] truncate">
                      Emne: Klage på kontrollsanksjon — saksnr. {current.saksnummer}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[color:var(--color-ink-mute)] shrink-0">
                    {current.date}
                    <br />kr {current.belop},–
                  </div>
                </div>

                <div
                  className="text-[14.5px] leading-relaxed text-[color:var(--color-ink)] whitespace-pre-line [&_strong]:font-semibold [&_em]:italic"
                  dangerouslySetInnerHTML={{ __html: current.body }}
                />

                <div className="mt-6 pt-5 border-t border-dashed border-[color:var(--color-line-strong)]">
                  <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)] mb-2">
                    Utfall
                  </div>
                  <div className="text-[14px] text-[color:var(--color-ink-soft)]">
                    <strong className="text-[color:var(--color-ink)]">{current.name}, {current.city}:</strong>{" "}
                    {current.outcomeNote}
                  </div>
                  <div className="mt-1 text-[12px] text-[color:var(--color-ink-mute)]">
                    Grunnlag: parkeringsforskriften {current.paragraph}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)] px-5 sm:px-7 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i - 1 + examples.length) % examples.length)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--color-line)] hover:bg-[color:var(--color-bg)] text-[color:var(--color-ink-soft)]"
                  aria-label="Forrige eksempel"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-1.5">
                  {examples.map((ex, i) => (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Eksempel ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index
                          ? "w-6 bg-[color:var(--color-ink)]"
                          : "w-1.5 bg-[color:var(--color-line-strong)] hover:bg-[color:var(--color-ink-mute)]"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % examples.length)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--color-line)] hover:bg-[color:var(--color-bg)] text-[color:var(--color-ink-soft)]"
                  aria-label="Neste eksempel"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <a
                href="/klage"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-[10px] bg-[color:var(--color-brand)] text-white text-sm font-medium hover:bg-[color:var(--color-brand-dark)] transition"
              >
                Lag min klage <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
