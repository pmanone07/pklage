type Receiver = { match: RegExp; email: string; name: string };

const receivers: Receiver[] = [
  { match: /onepark/i, email: "kundeservice@onepark.no", name: "Onepark AS" },
  { match: /aimo/i, email: "klage@aimopark.no", name: "Aimo Park Norge AS" },
  { match: /q-?park/i, email: "kundeservice@q-park.no", name: "Q-Park Norge AS" },
  { match: /easypark/i, email: "kundeservice@easypark.no", name: "EasyPark AS" },
  { match: /apcoa/i, email: "kundeservice@apcoa.no", name: "Apcoa Parking Norway AS" },
  { match: /europark/i, email: "kundeservice@europark.no", name: "Europark AS" },
  { match: /time ?park/i, email: "post@timepark.no", name: "Time Park AS" },
];

export function findReceiverEmail(selskap: string): string {
  const hit = receivers.find((r) => r.match.test(selskap));
  if (hit) return hit.email;
  const slug = selskap
    .toLowerCase()
    .replace(/\bas\b|\bnorge\b|\bnorway\b/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
  return slug ? `kundeservice@${slug}.no` : "kundeservice@parkeringsselskap.no";
}
