export type CompanyTrait = {
  title: string;
  body: string;
};

export type Company = {
  slug: string;
  name: string;
  legalName: string;
  email: string;
  phone?: string;
  address?: string;
  klageAdresse?: string;
  klageUrl?: string;
  /** Bilist-rettet vinkel: hva folk særlig klager på her. */
  commonGrounds: string[];
  /** 2-3 særtrekk verdt å nevne i klagen. */
  traits: CompanyTrait[];
  /** Selskapets typiske svartid før klage anses fortapt. */
  responseDays: number;
  /** Kort intro brukt i hero og metadata description. */
  description: string;
  /** Vanlige byer / områder hvor selskapet håndhever. */
  cities: string[];
};

export const companies: Company[] = [
  {
    slug: "onepark",
    name: "Onepark",
    legalName: "Onepark AS",
    email: "kundeservice@onepark.no",
    klageUrl: "https://www.onepark.no/kundeservice/",
    address: "Karenslyst allé 8B, 0278 Oslo",
    responseDays: 14,
    description:
      "Onepark er ett av Norges største private parkeringsselskap med plasser i Oslo, Bergen og en rekke kjøpesenter. Klager må sendes innen 3 uker.",
    commonGrounds: [
      "Utydelig skilting på senter-parkeringer",
      "Kort tid mellom ankomst og kontroll",
      "Betalt via app, men appen registrerte ikke korrekt sone",
    ],
    traits: [
      {
        title: "Korte håndhevingsintervaller",
        body: "Onepark er kjent for hyppige kontrollrunder, særlig på avgiftsplasser med høy gjennomtrekk. Klager basert på § 37 (rimelig betalingstid) lykkes ofte.",
      },
      {
        title: "Skilting i kjøpesenter",
        body: "Senterplasser har historisk hatt utfordrende skilting — soner som endrer karakter mellom åpningstid og kveld, og skilt plassert ved innkjøring i stedet for ved plassen.",
      },
      {
        title: "Svarer relativt raskt",
        body: "Onepark svarer som regel innen 7–10 dager. Bruk 14-dagersfristen i klagen din uansett — den er lovpålagt.",
      },
    ],
    cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen"],
  },
  {
    slug: "aimo-park",
    name: "Aimo Park",
    legalName: "Aimo Park Norge AS",
    email: "klage@aimopark.no",
    klageUrl: "https://www.aimopark.no/kundeservice/klage/",
    address: "Sandstuveien 60, 1184 Oslo",
    responseDays: 14,
    description:
      "Aimo Park (tidligere Q-Park i deler av landet) drifter parkeringshus og gateparkering i hele Norge. Egen klage-e-post: klage@aimopark.no.",
    commonGrounds: [
      "Manglende eller utydelig skilting i parkeringshus",
      "Tekniske feil ved nummerskilt-gjenkjenning (ANPR)",
      "Feil registrering av betaling via Aimo Park-appen",
    ],
    traits: [
      {
        title: "Bruker automatisk nummerskilt-gjenkjenning",
        body: "Aimo Park bruker ANPR (kamera-basert) på mange anlegg. Feil-lesing av nummerskilt er en kjent klagegrunn. Bilde av eget regnr. styrker saken.",
      },
      {
        title: "Egen klage-mottaker",
        body: "Bruk klage@aimopark.no — ikke vanlig kundeservice. Dette gir sak-nummer i deres CRM og raskere behandling.",
      },
      {
        title: "Aksepterer ofte ettergivelse for førstegangsklage",
        body: "Hvis grunnlaget er rimelig og klagen er godt formulert, gir Aimo Park ofte ettergivelse uten omfattende vurdering — særlig hvis du dokumenterer godt.",
      },
    ],
    cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Kristiansand"],
  },
  {
    slug: "q-park",
    name: "Q-Park",
    legalName: "Q-Park Norge AS",
    email: "kundeservice@q-park.no",
    klageUrl: "https://www.q-park.no/no-no/kundeservice/",
    address: "Strandveien 50, 1366 Lysaker",
    responseDays: 14,
    description:
      "Q-Park driver parkeringshus og overflateplasser i sentrumsområder. Internasjonal aktør med nederlandsk eierskap, men norsk operasjonelt selskap.",
    commonGrounds: [
      "Forvirring rundt forhåndsbetaling vs. etterskuddsbetaling",
      "Skilting med liten skriftstørrelse",
      "App-feil i forbindelse med start/stopp-funksjonen",
    ],
    traits: [
      {
        title: "Strenge på frister",
        body: "Q-Park behandler vanligvis klager strengt etter 3-ukers fristen. Sørg for at klagen er postlagt eller sendt innen denne fristen — ta vare på sendingsbevis.",
      },
      {
        title: "Etterskuddsbetaling i parkeringshus",
        body: "Flere Q-Park-anlegg har gått over til etterskuddsbetaling med ANPR. Du blir fakturert via post hvis du ikke betaler ved utkjøring. Klag på faktureringsbeløp som virker uforholdsmessige.",
      },
    ],
    cities: ["Oslo", "Bergen", "Stavanger", "Trondheim"],
  },
  {
    slug: "easypark",
    name: "EasyPark",
    legalName: "EasyPark AS",
    email: "kundeservice@easypark.no",
    klageUrl: "https://www.easypark.com/no/kundeservice/",
    address: "Stortingsgata 22, 0161 Oslo",
    responseDays: 14,
    description:
      "EasyPark er en av Norges største parkeringsapper og drifter også egne parkeringsanlegg. Mange klager handler om app-tekniske feil.",
    commonGrounds: [
      "Appen registrerte feil sone eller bil",
      "Betalingen ble ikke kreditert riktig",
      "Brukeren hadde aktiv parkering men ble likevel ilagt gebyr",
    ],
    traits: [
      {
        title: "Lang historikk i app som motbevis",
        body: "EasyPark-appen lagrer all transaksjonshistorikk. Et skjermbilde som viser aktiv parkering i riktig sone på riktig tidspunkt er ofte avgjørende.",
      },
      {
        title: "Refunderer ofte ved dokumentert app-feil",
        body: "Hvis du kan vise at appen feilet (f.eks. krasjet under start, registrerte feil regnr.), refunderer EasyPark som regel uten større diskusjon.",
      },
      {
        title: "Sjekk fakturanummer mot kontoutskrift",
        body: "Et velkjent problem: parkeringen ble dobbel-bokført, eller appen viser betalt mens kortet ikke ble belastet. Begge gir grunn til klage.",
      },
    ],
    cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Kristiansand", "Tromsø"],
  },
  {
    slug: "apcoa",
    name: "Apcoa",
    legalName: "Apcoa Parking Norway AS",
    email: "kundeservice@apcoa.no",
    klageUrl: "https://www.apcoa.no/kundeservice/",
    address: "Drammensveien 145, 0277 Oslo",
    responseDays: 14,
    description:
      "Apcoa er en internasjonal parkeringsaktør med store anlegg ved flyplasser, sykehus og kjøpesenter i Norge.",
    commonGrounds: [
      "Flyplass-parkering med forvirrende sone-system",
      "Sykehus-parkering der akuttsituasjon ikke ble hensyntatt",
      "Skilting blir endret midlertidig uten oppdatert info",
    ],
    traits: [
      {
        title: "Flyplass og sykehus krever spesiell vurdering",
        body: "Apcoa drifter mye av OSL Gardermoen, Bergen lufthavn, og flere sykehus. På sykehus aksepterer de ofte force majeure-argumenter (akutt sykdom/legebesøk) hvis dokumentert.",
      },
      {
        title: "Internasjonal aktør — alltid norsk klage",
        body: "Selv om morselskapet er internasjonalt, må klagen behandles av norsk avdeling etter norsk parkeringsforskrift. Skriv klagen på norsk.",
      },
    ],
    cities: ["Oslo", "Bergen", "Stavanger", "Trondheim", "Tromsø"],
  },
  {
    slug: "europark",
    name: "Europark",
    legalName: "Europark AS",
    email: "kundeservice@europark.no",
    klageUrl: "https://www.europark.no/kundeservice/",
    address: "Vollsveien 13, 1366 Lysaker",
    responseDays: 14,
    description:
      "Europark drifter både gateparkering og parkeringshus i norske byer, ofte på vegne av kommuner og private grunneiere.",
    commonGrounds: [
      "Endringer i parkeringsregulering uten oppdatert skilting",
      "Ukvalifisert kontroll av elbil-ladeplasser",
      "Sone-overgang midt i parkeringsområdet",
    ],
    traits: [
      {
        title: "Drifter på vegne av andre",
        body: "Mange Europark-anlegg er på oppdrag fra grunneier. Det betyr at selve grunneieren også har et ansvar — i tvilstilfeller kan du henvende deg direkte til dem.",
      },
      {
        title: "Elbil-lading: vanlig misforståelse",
        body: "Elbil på vanlig plass (ikke ladeplass) er parkering som alle andre. Elbil på ladeplass uten å lade er klagbart dersom skiltingen er uklar om dette kravet.",
      },
    ],
    cities: ["Oslo", "Bergen", "Trondheim", "Stavanger"],
  },
  {
    slug: "time-park",
    name: "Time Park",
    legalName: "Time Park AS",
    email: "post@timepark.no",
    klageUrl: "https://www.timepark.no/kontakt/",
    address: "Storgata 10, 0155 Oslo",
    responseDays: 14,
    description:
      "Time Park er en mindre, men aktiv norsk parkeringsoperatør med plasser i flere norske byer.",
    commonGrounds: [
      "Manglende informasjon om gjeldende takster",
      "Skilting flyttes uten varsel",
      "Strenge tolkninger av tidsbegrensning",
    ],
    traits: [
      {
        title: "Mindre selskap — personlig saksbehandling",
        body: "Time Park har færre saker enn de største, og svarer ofte personlig på klager. Klagen din får faktisk en menneskelig vurdering.",
      },
      {
        title: "Dokumentasjon avgjør",
        body: "Bilde av skilt og betalingsbevis veier tungt hos Time Park. Gode bilder gir høyere sjanse for ettergivelse.",
      },
    ],
    cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen"],
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
