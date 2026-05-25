import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SocialLinks } from "./social-icons";

/**
 * Footer — FT5 (CTA Parting Shot)
 * Oversized parting CTA, single brand statement, minimal nav row.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t hairline" style={{ background: "#EAD3BF" }}>
      <div className="section-pad max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-4">
              Parting shot
            </div>
            <h2 className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1.0] text-contrast">
              {siteConfig.footer.ctaHeadline}
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={siteConfig.cta.primaryHref}
                className="px-6 py-3.5 rounded-full bg-contrast text-bg font-display font-medium text-sm hover:bg-primary transition-colors inline-flex items-center"
              >
                {siteConfig.cta.primary} →
              </Link>
              <Link
                href={siteConfig.cta.secondaryHref}
                className="px-6 py-3.5 rounded-full border border-contrast/30 text-contrast font-display font-medium text-sm hover:bg-contrast/5 transition-colors inline-flex items-center"
              >
                {siteConfig.cta.secondary}
              </Link>
            </div>
          </div>
          <div className="md:col-span-4">
            <p className="text-ink/80 text-sm leading-relaxed">
              {siteConfig.footer.brandStatement}
            </p>
            <div className="mt-5">
              <SocialLinks socials={siteConfig.socials} />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t hairline flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.18em] text-ink/60">
            <span className="text-contrast/80">© {year} {siteConfig.company.legalName}</span>
            {siteConfig.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-contrast transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="hover:text-contrast transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-ink/50">
            {siteConfig.company.location}
          </div>
        </div>
      </div>
    </footer>
  );
}
