import Link from "next/link";

export function SiteHeader() {
  return (
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
          <span className="hidden sm:inline text-[11px] uppercase tracking-widest text-[color:var(--color-ink-mute)] ml-2">
            .no
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4 text-sm">
          <Link
            href="/#hvordan"
            className="hidden sm:inline px-3 py-2 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
          >
            Slik fungerer det
          </Link>
          <Link
            href="/#faq"
            className="hidden sm:inline px-3 py-2 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
          >
            FAQ
          </Link>
          <Link
            href="/klage"
            className="inline-flex h-10 items-center rounded-[10px] bg-[color:var(--color-brand)] text-white px-4 text-sm font-medium hover:bg-[color:var(--color-brand-dark)] transition"
          >
            Start klage
          </Link>
        </nav>
      </div>
    </header>
  );
}
