import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]">
      <div className="container-wide py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="font-display text-lg tracking-tight">
            Pklage<span className="text-[color:var(--color-brand)]">.no</span>
          </div>
          <p className="mt-2 text-[color:var(--color-ink-soft)] leading-relaxed">
            En enklere måte å klage på urettmessige parkeringsgebyrer.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Produkt</div>
          <ul className="space-y-1.5 text-[color:var(--color-ink-soft)]">
            <li><Link href="/klage" className="hover:text-[color:var(--color-ink)]">Start en klage</Link></li>
            <li><Link href="/#hvordan" className="hover:text-[color:var(--color-ink)]">Slik fungerer det</Link></li>
            <li><Link href="/#priser" className="hover:text-[color:var(--color-ink)]">Pris</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Ressurser</div>
          <ul className="space-y-1.5 text-[color:var(--color-ink-soft)]">
            <li><Link href="/#faq" className="hover:text-[color:var(--color-ink)]">FAQ</Link></li>
            <li><Link href="/grunnlag" className="hover:text-[color:var(--color-ink)]">Grunnlag for klage</Link></li>
            <li><a href="https://www.parkeringsklagenemnda.no" target="_blank" rel="noopener" className="hover:text-[color:var(--color-ink)]">Parkeringsklagenemnda ↗</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Selskap</div>
          <ul className="space-y-1.5 text-[color:var(--color-ink-soft)]">
            <li><Link href="/personvern" className="hover:text-[color:var(--color-ink)]">Personvern</Link></li>
            <li><Link href="/vilkar" className="hover:text-[color:var(--color-ink)]">Vilkår</Link></li>
            <li><a href="mailto:hei@pklage.no" className="hover:text-[color:var(--color-ink)]">Kontakt</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--color-line)]">
        <div className="container-wide py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[color:var(--color-ink-mute)]">
          <span>© {new Date().getFullYear()} Pklage.no. Ikke juridisk rådgivning.</span>
          <span>Laget i Norge 🇳🇴</span>
        </div>
      </div>
    </footer>
  );
}
