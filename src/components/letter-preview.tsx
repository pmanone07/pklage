"use client";

import { useState } from "react";
import { ArrowLeft, Check, Copy, Loader2, Lock, Mail, RotateCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { cn, formatNok } from "../lib/utils";
import type { KlageInput } from "../lib/schema";

const PRICE_NOK = 149;

export function LetterPreview({
  letter,
  streaming,
  paid,
  klage,
  onBack,
  onReset,
}: {
  letter: { to: string; subject: string; body: string };
  streaming: boolean;
  paid: boolean;
  klage: KlageInput;
  onBack: () => void;
  onReset: () => void;
}) {
  const [paying, setPaying] = useState(false);

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

  const sendEmail = () => {
    const mailto = `mailto:${encodeURIComponent(letter.to)}?subject=${encodeURIComponent(letter.subject)}&body=${encodeURIComponent(letter.body)}`;
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
                ? "Send som e-post direkte. Klagen din er låst opp permanent."
                : "Du har lest første del. Lås opp resten — engangsbeløp, ingen abonnement."}
            </p>

            {paid ? (
              <div className="mt-5 space-y-2">
                <Button variant="brand" className="w-full" onClick={sendEmail}>
                  <Mail className="h-4 w-4" /> Send som e-post
                </Button>
                <Button variant="outline" className="w-full" onClick={copy}>
                  <Copy className="h-4 w-4" /> Kopier hele klagen
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
          </div>

          <div className="paper p-5">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-5 w-5 text-[color:var(--color-accent)]" />
              <span className="font-semibold">Husk vedlegg</span>
            </div>
            <p className="text-sm text-[color:var(--color-ink-soft)] mt-2 leading-relaxed">
              Legg ved bilder av gebyret og skiltingen når du sender e-posten — klagen viser til dem.
            </p>
          </div>
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
