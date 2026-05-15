"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Camera, Check, FileText, Loader2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Input, Textarea } from "./ui/input";
import { Label, Hint } from "./ui/label";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { grunnlagLabels, klageSchema, type KlageInput } from "../lib/schema";
import { LetterPreview } from "./letter-preview";

type Photos = {
  gebyr?: { name: string; dataUrl: string };
  skilt?: { name: string; dataUrl: string };
};

const STORAGE_KEY = "parkeringsklagen.draft.v1";

const initialState: Partial<KlageInput> = {
  selskap: "",
  saksnummer: "",
  dato: "",
  belop: "",
  sted: "",
  regnummer: "",
  grunnlag: undefined,
  detaljer: "",
  navn: "",
  epost: "",
  adresse: "",
};

const steps = [
  { id: "gebyr", title: "Gebyret", hint: "Detaljer om gebyret" },
  { id: "sted", title: "Stedet", hint: "Hvor og hvilken bil" },
  { id: "grunnlag", title: "Grunnlaget", hint: "Hvorfor mener du det er feil" },
  { id: "bilder", title: "Bilder", hint: "Last opp bevis" },
  { id: "deg", title: "Deg", hint: "Hvem er du" },
] as const;

type StepId = typeof steps[number]["id"];

export function KlageWizard() {
  const [data, setData] = useState<Partial<KlageInput>>(initialState);
  const [photos, setPhotos] = useState<Photos>({});
  const [stepIdx, setStepIdx] = useState(0);
  const [letter, setLetter] = useState<{ to: string; subject: string; body: string } | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.data) setData(parsed.data);
        if (parsed?.photos) setPhotos(parsed.photos);
        if (parsed?.stepIdx) setStepIdx(parsed.stepIdx);
      }
    } catch {}
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "1") {
      setPaid(true);
      toast.success("Betalt — klagen er låst opp.");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data, photos, stepIdx }),
      );
    } catch {}
  }, [data, photos, stepIdx]);

  const set = <K extends keyof KlageInput>(key: K, value: KlageInput[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const stepValid = useMemo(() => {
    const s = steps[stepIdx]?.id;
    if (s === "gebyr") {
      return !!(data.selskap && data.saksnummer && data.dato && data.belop);
    }
    if (s === "sted") {
      return !!(data.sted && data.regnummer);
    }
    if (s === "grunnlag") {
      return !!(data.grunnlag && data.detaljer && data.detaljer.length >= 20);
    }
    if (s === "bilder") {
      return !!photos.gebyr;
    }
    if (s === "deg") {
      return !!(data.navn && data.epost && data.adresse);
    }
    return false;
  }, [data, photos, stepIdx]);

  const generate = async () => {
    const result = klageSchema.safeParse(data);
    if (!result.success) {
      toast.error("Vennligst fyll inn alle felter.");
      return;
    }
    setStreaming(true);
    setLetter({ to: "", subject: "", body: "" });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: result.data, hasSkiltImg: !!photos.skilt }),
      });
      if (!res.ok || !res.body) throw new Error("Kunne ikke generere klage");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let header: { to?: string; subject?: string } = {};
      let parsedHeader = false;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        if (!parsedHeader) {
          const sep = buffer.indexOf("\n---\n");
          if (sep !== -1) {
            try {
              header = JSON.parse(buffer.slice(0, sep));
            } catch {}
            buffer = buffer.slice(sep + 5);
            parsedHeader = true;
            setLetter({
              to: header.to || "",
              subject: header.subject || "",
              body: buffer,
            });
          }
        } else {
          setLetter({
            to: header.to || "",
            subject: header.subject || "",
            body: buffer,
          });
        }
      }
    } catch (err) {
      toast.error("Noe gikk galt. Prøv igjen.");
      console.error(err);
    } finally {
      setStreaming(false);
    }
  };

  const reset = () => {
    if (!confirm("Slett klagen og start på nytt?")) return;
    setData(initialState);
    setPhotos({});
    setStepIdx(0);
    setLetter(null);
    setPaid(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  if (letter) {
    return (
      <LetterPreview
        letter={letter}
        streaming={streaming}
        paid={paid}
        klage={data as KlageInput}
        onBack={() => setLetter(null)}
        onReset={reset}
      />
    );
  }

  return (
    <div className="container-tight py-10 sm:py-14">
      <Progress idx={stepIdx} total={steps.length} />

      <div className="paper p-6 sm:p-10 mt-8 fade-in" key={stepIdx}>
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
          Steg {stepIdx + 1} av {steps.length}
        </div>
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight mt-1">
          {currentTitle(stepIdx)}
        </h2>
        <p className="mt-2 text-[color:var(--color-ink-soft)]">
          {steps[stepIdx].hint}
        </p>

        <div className="mt-8">
          <StepBody
            step={steps[stepIdx].id}
            data={data}
            set={set}
            photos={photos}
            setPhotos={setPhotos}
          />
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            disabled={stepIdx === 0}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" /> Tilbake
          </Button>

          {stepIdx < steps.length - 1 ? (
            <Button
              variant="brand"
              onClick={() => stepValid && setStepIdx((i) => i + 1)}
              disabled={!stepValid}
              type="button"
            >
              Neste <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="brand"
              onClick={generate}
              disabled={!stepValid || streaming}
              type="button"
            >
              {streaming ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Genererer…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generer klagen
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-[color:var(--color-ink-mute)] text-center mt-6">
        Klagen lagres lokalt i nettleseren din. Vi sender ikke data før du klikker «Generer».
      </p>
    </div>
  );
}

function currentTitle(idx: number) {
  return [
    "La oss begynne med gebyret.",
    "Hvor sto bilen parkert?",
    "Hva er grunnlaget for klagen?",
    "Last opp bilder som bevis.",
    "Til slutt — hvem skal underskrive?",
  ][idx];
}

function Progress({ idx, total }: { idx: number; total: number }) {
  return (
    <div>
      <div className="flex items-center gap-2 sm:gap-3 max-w-2xl mx-auto">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2 sm:gap-3">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 transition",
                i < idx && "bg-[color:var(--color-accent)] text-white",
                i === idx && "bg-[color:var(--color-brand)] text-white",
                i > idx && "bg-[color:var(--color-bg-elev)] border border-[color:var(--color-line-strong)] text-[color:var(--color-ink-mute)]",
              )}
            >
              {i < idx ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < total - 1 && (
              <div
                className={cn(
                  "flex-1 h-px transition",
                  i < idx ? "bg-[color:var(--color-accent)]" : "bg-[color:var(--color-line-strong)]",
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-4 text-sm text-[color:var(--color-ink-soft)]">
        {steps[idx].title}
      </div>
    </div>
  );
}

function StepBody({
  step,
  data,
  set,
  photos,
  setPhotos,
}: {
  step: StepId;
  data: Partial<KlageInput>;
  set: <K extends keyof KlageInput>(key: K, value: KlageInput[K]) => void;
  photos: Photos;
  setPhotos: React.Dispatch<React.SetStateAction<Photos>>;
}) {
  if (step === "gebyr") {
    return (
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Label>Hvem ga deg gebyret?</Label>
          <Input
            placeholder="f.eks. Onepark AS, Aimo Park, EasyPark"
            value={data.selskap || ""}
            onChange={(e) => set("selskap", e.target.value)}
            list="selskap-list"
          />
          <datalist id="selskap-list">
            {[
              "Onepark AS",
              "Aimo Park Norge AS",
              "Q-Park Norge AS",
              "EasyPark AS",
              "Apcoa Parking Norway AS",
              "Time Park AS",
              "Europark AS",
            ].map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
          <Hint>Står øverst på gebyret eller på skiltet.</Hint>
        </div>
        <div>
          <Label>Saksnummer / kontrollnummer</Label>
          <Input
            placeholder="f.eks. 2026-04-18-A"
            value={data.saksnummer || ""}
            onChange={(e) => set("saksnummer", e.target.value)}
          />
        </div>
        <div>
          <Label>Dato for gebyret</Label>
          <Input
            type="date"
            value={data.dato || ""}
            onChange={(e) => set("dato", e.target.value)}
          />
        </div>
        <div>
          <Label>Beløp (NOK)</Label>
          <Input
            inputMode="numeric"
            placeholder="600"
            value={data.belop || ""}
            onChange={(e) => set("belop", e.target.value.replace(/[^\d]/g, ""))}
          />
        </div>
      </div>
    );
  }

  if (step === "sted") {
    return (
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Label>Adresse / sted</Label>
          <Input
            placeholder="f.eks. Storgata 14, Oslo"
            value={data.sted || ""}
            onChange={(e) => set("sted", e.target.value)}
          />
          <Hint>Helst gateadresse — gjør klagen sterkere.</Hint>
        </div>
        <div>
          <Label>Registreringsnummer</Label>
          <Input
            placeholder="AB12345"
            value={data.regnummer || ""}
            onChange={(e) => set("regnummer", e.target.value.toUpperCase())}
            className="uppercase tracking-wider"
          />
        </div>
      </div>
    );
  }

  if (step === "grunnlag") {
    return (
      <div className="space-y-6">
        <div>
          <Label>Hvorfor mener du gebyret er feil?</Label>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {(Object.entries(grunnlagLabels) as [KlageInput["grunnlag"], string][]).map(([key, label]) => {
              const active = data.grunnlag === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("grunnlag", key)}
                  className={cn(
                    "text-left p-4 rounded-[10px] border transition",
                    active
                      ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand-soft)] ring-2 ring-[color:var(--color-brand)]/30"
                      : "border-[color:var(--color-line-strong)] bg-[color:var(--color-bg-elev)] hover:border-[color:var(--color-ink-soft)]",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                        active
                          ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)]"
                          : "border-[color:var(--color-line-strong)]",
                      )}
                    >
                      {active && <div className="h-2 w-2 bg-white rounded-full" />}
                    </div>
                    <div className="text-[14.5px] font-medium leading-snug">
                      {label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <Label>Beskriv hva som skjedde</Label>
          <Textarea
            placeholder="Beskriv hendelsen med dine egne ord — så detaljert du klarer. Vi formulerer det formelt for deg."
            value={data.detaljer || ""}
            onChange={(e) => set("detaljer", e.target.value)}
            rows={6}
          />
          <Hint>
            Minst 20 tegn — {data.detaljer?.length || 0} så langt. Tips: nevn klokkeslett, sikt, om det var folk rundt.
          </Hint>
        </div>
      </div>
    );
  }

  if (step === "bilder") {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <PhotoSlot
          label="Bilde av gebyret"
          required
          photo={photos.gebyr}
          onChange={(p) => setPhotos((x) => ({ ...x, gebyr: p }))}
        />
        <PhotoSlot
          label="Bilde av skiltingen"
          hint="Anbefalt — styrker klagen betydelig"
          photo={photos.skilt}
          onChange={(p) => setPhotos((x) => ({ ...x, skilt: p }))}
        />
        <div className="sm:col-span-2 text-sm text-[color:var(--color-ink-soft)]">
          Bilder behandles lokalt for forhåndsvisning. De refereres som vedlegg i den endelige e-posten,
          men sendes ikke til oss.
        </div>
      </div>
    );
  }

  if (step === "deg") {
    return (
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label>Fullt navn</Label>
          <Input
            placeholder="Ola Nordmann"
            value={data.navn || ""}
            onChange={(e) => set("navn", e.target.value)}
          />
        </div>
        <div>
          <Label>E-postadresse</Label>
          <Input
            type="email"
            placeholder="ola@example.no"
            value={data.epost || ""}
            onChange={(e) => set("epost", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Label>Postadresse</Label>
          <Input
            placeholder="Storgata 1, 0150 Oslo"
            value={data.adresse || ""}
            onChange={(e) => set("adresse", e.target.value)}
          />
          <Hint>Brukes som avsender i klagen — kreves formelt.</Hint>
        </div>
      </div>
    );
  }

  return null;
}

function PhotoSlot({
  label,
  hint,
  photo,
  required,
  onChange,
}: {
  label: string;
  hint?: string;
  photo?: Photos["gebyr"];
  required?: boolean;
  onChange: (p?: Photos["gebyr"]) => void;
}) {
  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > 6 * 1024 * 1024) {
      toast.error("Bildet er for stort (maks 6 MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ name: file.name, dataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Label>
        {label}
        {required && <span className="text-[color:var(--color-brand)] ml-1">*</span>}
      </Label>
      {photo ? (
        <div className="relative paper p-2">
          {}
          <img
            src={photo.dataUrl}
            alt={photo.name}
            className="w-full h-44 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white shadow border border-[color:var(--color-line-strong)] flex items-center justify-center hover:bg-[color:var(--color-bg)] transition"
            aria-label="Fjern bilde"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-xs text-[color:var(--color-ink-soft)] px-2 py-1 truncate flex items-center gap-1">
            <FileText className="h-3 w-3" /> {photo.name}
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-[color:var(--color-line-strong)] rounded-[10px] cursor-pointer hover:border-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-bg-elev)] transition">
          <Camera className="h-6 w-6 text-[color:var(--color-ink-soft)]" />
          <div className="text-sm mt-2 font-medium">Klikk eller dra hit</div>
          <div className="text-xs text-[color:var(--color-ink-soft)] mt-1">
            JPG, PNG · maks 6 MB
          </div>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
      )}
      {hint && (
        <p className="text-[12px] text-[color:var(--color-ink-soft)] mt-1.5">{hint}</p>
      )}
    </div>
  );
}
