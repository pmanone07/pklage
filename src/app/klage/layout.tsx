import { SiteFooter } from "../../components/site-footer";
import Link from "next/link";

export default function KlageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[color:var(--color-line)] bg-[color:var(--color-bg)]/85 backdrop-blur-md">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--color-ink)] text-white font-bold text-sm"
            >
              P
            </span>
            <span className="font-display text-lg tracking-tight">
              Parkeringsklagen
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
          >
            Avbryt
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
