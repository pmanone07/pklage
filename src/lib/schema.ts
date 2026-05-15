import { z } from "zod";

export const klageSchema = z.object({
  selskap: z.string().min(2, "Skriv inn navnet på parkeringsselskapet"),
  saksnummer: z.string().min(1, "Saksnummer eller kontrollnummer kreves"),
  dato: z.string().min(4, "Velg dato for gebyret"),
  belop: z.string().min(1, "Skriv inn beløpet"),
  sted: z.string().min(2, "Hvor sto bilen parkert?"),
  regnummer: z.string().min(2, "Registreringsnummer kreves"),
  grunnlag: z.enum([
    "utydelig_skilting",
    "feil_tidsbegrensning",
    "betalt_men_feil",
    "feil_regnr",
    "kort_kontrolltid",
    "manglende_seddel",
    "annet",
  ]),
  detaljer: z.string().min(20, "Skriv minst 20 tegn om hva som skjedde"),
  navn: z.string().min(2, "Navnet ditt kreves"),
  epost: z.string().email("Ugyldig e-postadresse"),
  adresse: z.string().min(4, "Postadressen din kreves"),
});

export type KlageInput = z.infer<typeof klageSchema>;

export const grunnlagLabels: Record<KlageInput["grunnlag"], string> = {
  utydelig_skilting: "Utydelig eller tildekket skilting",
  feil_tidsbegrensning: "Feil opplyst tidsbegrensning",
  betalt_men_feil: "Jeg hadde betalt, men teknisk feil",
  feil_regnr: "Feil registreringsnummer på gebyret",
  kort_kontrolltid: "For kort tid mellom ankomst og kontroll",
  manglende_seddel: "Manglende kontrollseddel på kjøretøyet",
  annet: "Annet — beskrives under",
};
