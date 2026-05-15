"use client";

import { useState } from "react";
import { ArrowLeft, Check, Copy, Download, Loader2, Lock, Mail, Paperclip, RotateCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { cn, formatNok } from "../lib/utils";
import type { KlageInput } from "../lib/schema";
import { buildKlagePdf } from "../lib/pdf";

const PRICE_NOK = 149;

type Photo = { name: string; dataUrl: string };
type Photos = { gebyr?: Photo; skilt?: Photo };

export function LetterPreview({
  letter,
  streaming,
  paid,
  klage,
  photos,
  onBack,
  onReset,
}: {
  letter: { to: string; subject: string; body: string };
  streaming: boolean;
  paid: boolean;
  klage: KlageInput;
  photos: Photos;
  onBack: () => void;
  onReset: () => void;
}) {
  const [paying, setPaying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const orderedPhotos: Photo[] = [photos.gebyr, photos.skilt].filter(
    (p): p is Photo => Boolean(p),
  );

  const onCheckout = async () => {
    setPaying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selskap: klage.selskap,
          saksnummer: klage.saksnummer,
          epost: klage.epost,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Kunne ikke starte betaling");
      if (json.url) {
        window.location.href = json.url;
      } else if (json.demo) {
        const u = new URL(window.location.href);
        u.searchParams.set("paid", "1");
        window.location.href = u.toString();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Noe gikk galt";
      toast.error(msg);
      setPaying(false);
    }
  };

  const fullText = `Til: ${letter.to}\nEmne: ${letter.subject}\n\n${letter.body}`;

  const copy = async () => {
    await navigator.clipboard.writeText(fullText);
    toast.success("Kopiert til utklippstavlen.");
  };

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const blob = await buildKlagePdf({
        to: letter.to,
        subject: letter.subject,
        body: letter.body,
        senderName: klage.navn,
        senderAddress: klage.adresse,
        saksnummer: klage.saksnummer,
        selskap: klage.selskap,
        photos: orderedPhotos,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const slug = klage.saksnummer.replace(/[^a-z0-9-_]/gi, "") || "klage";
      a.href = url;
      a.download = `klage-${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setPdfDownloaded(true);
      toast.success("PDF lastet ned — legg den ved i e-posten.");
    } catch (err) {
      toast.error("Kunne ikke lage PDF. Prøv igjen.");
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const openMailClient = () => {
    const slug = klage.saksnummer.replace(/[^a-z0-9-_]/gi, "") || "sak";
    const filename = `klage-${slug}.pdf`;
    const bodyText =
      `Hei,\n\n` +
      `Vedlagt følger min formelle klage på parkeringsgebyr` +
      (klage.saksnummer ? ` (saksnr. ${klage.saksnummer})` : "") +
      `.\n\n` +
      `Klagen ligger som vedlegg: ${filename}` +
      (orderedPhotos.length > 0
        ? ` (inneholder klagebrev og ${orderedPhotos.length} bilde${orderedPhotos.length > 1 ? "r" : ""}).`
        : ".") +
      `\n\n` +
      `Med vennlig hilsen,\n${klage.navn}`;

    const mailto = `mailto:${encodeURIComponent(letter.to)}?subject=${encodeURIComponent(letter.subject)}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailto;
  };

  return (
    <div className="container-wide py-10 sm:py-14">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} type="button">
          <ArrowLeft className="h-4 w-4" /> Endre svarene mine
        </Button>
        <Button variant="ghost" onClick={onReset} type="button">
          <RotateCcw className="h-4 w-4" /> Start på nytt
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
        <div className="paper-lift relative overflow-hidden">
          <div className="bg-[color:var(--color-bg)] border-b border-[color:var(--color-line)] p-5">
            <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)]">
              Til
            </div>
            <div className="font-mono text-sm">
              {letter.to || (
                <span className="inline-block w-48 h-3 bg-[color:var(--color-line)] rounded animate-pulse" />
              )}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)] mt-3">
              Emne
            </div>
            <div className="font-medium text-[15px]">
              {letter.subject || (
                <span className="inline-block w-80 h-4 bg-[color:var(--color-line)] rounded animate-pulse" />
              )}
            </div>
          </div>

          <div className="relative">
            <div
              className={cn(
                "p-6 sm:p-10 font-mono text-[14.5px] leading-[1.7] whitespace-pre-wrap text-[color:var(--color-ink)] min-h-[420px]",
                !paid && !streaming && letter.body.length > 240 && "blur-paywall",
              )}
            >
              {letter.body}
              {streaming && (
                <span className="inline-block w-2 h-4 bg-[color:var(--color-brand)] align-text-bottom ml-1 animate-pulse" />
              )}
            </div>

            {!paid && !streaming && letter.body.length > 240 && (
              <PayOverlay onCheckout={onCheckout} paying={paying} />
            )}
          </div>

          {streaming && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-2 text-xs bg-[color:var(--color-bg-elev)] border border-[color:var(--color-line)] rounded-full px-3 py-1">
              <Loader2 className="h-3 w-3 animate-spin text-[color:var(--color-brand)]" />
              Skriver klagen…
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="paper p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)] mb-2">
              {paid ? "Klar til sending" : "Klagen din er klar"}
            </div>
            <div className="font-display text-2xl tracking-tight">
              {paid ? "Send klagen" : `Lås opp for ${formatNok(PRICE_NOK)}`}
            </div>
            <p className="text-sm text-[color:var(--color-ink-soft)] mt-2 leading-relaxed">
              {paid
                ? "To steg: last ned PDF-en, og åpne e-posten — legg ved PDF-en der."
                : "Du har lest første del. Lås opp resten — engangsbeløp, ingen abonnement."}
            </p>

            {paid ? (
              <div className="mt-5 space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[color:var(--color-ink-mute)] mb-2">
                    <span className="h-5 w-5 rounded-full bg-[color:var(--color-ink)] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    Last ned PDF
                  </div>
                  <Button
                    variant={pdfDownloaded ? "outline" : "brand"}
                    className="w-full"
                    onClick={downloadPdf}
                    disabled={downloading}
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Lager PDF…
                      </>
                    ) : pdfDownloaded ? (
                      <>
                        <Check className="h-4 w-4" /> PDF lastet ned
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" /> Last ned klage-PDF
                      </>
                    )}
                  </Button>
                  <p className="text-[12px] text-[color:var(--color-ink-soft)] mt-1.5">
                    Inneholder klagen{orderedPhotos.length > 0 ? ` + ${orderedPhotos.length} bilde${orderedPhotos.length > 1 ? "r" : ""}` : ""} som ett vedlegg.
                  </p>
                </div>

                <div className={cn("transition", !pdfDownloaded && "opacity-50")}>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[color:var(--color-ink-mute)] mb-2">
                    <span className={cn(
                      "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                      pdfDownloaded ? "bg-[color:var(--color-ink)] text-white" : "bg-[color:var(--color-line)] text-[color:var(--color-ink-mute)]"
                    )}>2</span>
                    Åpne e-post og legg ved PDF-en
                  </div>
                  <Button
                    variant={pdfDownloaded ? "brand" : "outline"}
                    className="w-full"
                    onClick={openMailClient}
                  >
                    <Mail className="h-4 w-4" /> Åpne e-postklient
                  </Button>
                  <p className="text-[12px] text-[color:var(--color-ink-soft)] mt-1.5 flex items-start gap-1">
                    <Paperclip className="h-3 w-3 mt-0.5 shrink-0" />
                    Dra PDF-en fra Nedlastinger til e-posten før du sender.
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="w-full" onClick={copy}>
                  <Copy className="h-4 w-4" /> Kopier klagetekst
                </Button>
              </div>
            ) : (
              <Button
                variant="brand"
                className="w-full mt-5"
                onClick={onCheckout}
                disabled={paying || streaming}
              >
                {paying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sender deg videre…
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" /> Lås opp for {formatNok(PRICE_NOK)}
                  </>
                )}
              </Button>
            )}

            {!paid && (
              <ul className="mt-5 space-y-2 text-sm text-[color:var(--color-ink-soft)]">
                {[
                  "Betal kun hvis du faktisk sender",
                  "Sikker betaling via Stripe",
                  "Pengene tilbake hvis klagen er feil",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[color:var(--color-accent)] mt-0.5 shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {!paid && (
            <div className="paper p-5">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-5 w-5 text-[color:var(--color-accent)]" />
                <span className="font-semibold">Bildene er med</span>
              </div>
              <p className="text-sm text-[color:var(--color-ink-soft)] mt-2 leading-relaxed">
                Når du har låst opp, samler vi klagebrevet og bildene dine i én PDF du legger ved e-posten.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function PayOverlay({
  onCheckout,
  paying,
}: {
  onCheckout: () => void;
  paying: boolean;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-b from-transparent via-[color:var(--color-bg-elev)]/95 to-[color:var(--color-bg-elev)] flex flex-col items-center justify-end pb-8 px-6">
      <div className="paper p-6 max-w-md text-center fade-in">
        <div className="inline-flex h-10 w-10 rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] items-center justify-center">
          <Lock className="h-5 w-5" />
        </div>
        <div className="font-display text-xl mt-3">Klagen er ferdigskrevet</div>
        <p className="text-sm text-[color:var(--color-ink-soft)] mt-1">
          Lås opp og send — du betaler kun nå fordi du faktisk vil sende.
        </p>
        <Button
          variant="brand"
          size="lg"
          className="mt-4 w-full"
          onClick={onCheckout}
          disabled={paying}
        >
          {paying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sender deg videre…
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" /> Lås opp for {formatNok(PRICE_NOK)}
            </>
          )}
        </Button>
        <div className="text-[11px] text-[color:var(--color-ink-mute)] mt-3">
          Sikker betaling via Stripe · ingen abonnement
        </div>
      </div>
    </div>
  );
}
