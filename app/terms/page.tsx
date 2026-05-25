import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${siteConfig.company.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        intro="What you agree to by using this site. Short, in plain English."
      />
      <article
        className="relative section-pad px-6 md:px-10 border-t hairline"
        style={{ background: "#F4E4D7" }}
      >
        <div className="max-w-3xl mx-auto space-y-8 text-ink/85 leading-relaxed text-[15px]">
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary">
            Last updated: 25 May 2026
          </p>
          <S h="1. Scope">
            These terms govern your use of mavenmarket.ng. The marketplace
            itself — once live — will publish its own commercial terms covering
            transactions; those will sit alongside, not replace, what's here.
          </S>
          <S h="2. The information on this site">
            This site is published for investors, press, and prospective
            vendors. It describes a platform under construction. Nothing here
            constitutes an offer of securities, a solicitation, or a binding
            commercial commitment.
          </S>
          <S h="3. Your conduct">
            Don't probe the site for vulnerabilities, don't scrape it for AI
            training, don't impersonate anyone when you contact us, and don't
            submit anyone else's personal data through our forms without their
            consent.
          </S>
          <S h="4. Intellectual property">
            All copy, imagery, video, and the marketplace concept itself are
            © {new Date().getFullYear()} {siteConfig.company.legalName}. You're
            welcome to quote short excerpts in press coverage — please credit
            and link back.
          </S>
          <S h="5. Liability">
            We provide this site as-is. We're not liable for indirect or
            consequential damages arising from your use of it.
          </S>
          <S h="6. Governing law">
            Nigerian law. Disputes resolved in the courts of Lagos State.
          </S>
          <S h="7. Contact">
            Questions about these terms:{" "}
            <a href={`mailto:${siteConfig.company.email}`} className="text-contrast underline">
              {siteConfig.company.email}
            </a>.
          </S>
        </div>
      </article>
    </>
  );
}

function S({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-light text-2xl md:text-3xl text-contrast mb-3">
        {h}
      </h2>
      <div>{children}</div>
    </section>
  );
}
