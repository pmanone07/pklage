import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pklage.no"),
  title: {
    default: "Pklage.no — Klage på parkeringsgebyr på 60 sekunder",
    template: "%s · Pklage.no",
  },
  description:
    "Fikk du urettmessig parkeringsgebyr? Vi skriver klagen gratis. Du betaler 149 kr kun hvis du velger å sende den.",
  keywords: [
    "klage parkeringsgebyr",
    "klage parkeringsbot",
    "urettmessig parkeringsgebyr",
    "parkeringsklage",
    "klage på parkering",
    "parkeringsklagenemnda",
  ],
  openGraph: {
    title: "Pklage.no — Klage på parkeringsgebyr på 60 sekunder",
    description:
      "AI-generert, juridisk korrekt klage. Gratis å lage. Betal kun hvis du sender.",
    type: "website",
    locale: "nb_NO",
  },
  verification: {
    google: "zO4uR-xI34XkTQqdc6E7zgLYdoV-xvlupqw7D4JE4vI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nb"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              border: "1px solid var(--color-line)",
              background: "var(--color-bg-elev)",
              color: "var(--color-ink)",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
