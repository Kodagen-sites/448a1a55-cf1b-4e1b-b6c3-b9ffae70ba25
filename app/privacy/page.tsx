import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy policy for ${siteConfig.company.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        intro="What we collect, why, and how to ask us to forget you."
      />
      <article
        className="relative section-pad px-6 md:px-10 border-t hairline"
        style={{ background: "#F4E4D7" }}
      >
        <div className="max-w-3xl mx-auto prose-content">
          <PrivacyBody />
        </div>
      </article>
    </>
  );
}

function PrivacyBody() {
  return (
    <div className="space-y-8 text-ink/85 leading-relaxed text-[15px]">
      <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary">
        Last updated: 25 May 2026
      </p>

      <Section h="1. Who we are">
        Maven Market Ltd. ("Maven", "we", "our") operates the marketplace at
        mavenmarket.ng. We are registered in Nigeria with our principal place
        of business in Lagos.
      </Section>

      <Section h="2. What we collect">
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            Contact details you submit through forms on this site (name, email,
            organisation, the note you write us).
          </li>
          <li>
            Standard server logs — IP, user-agent, referrer, the pages you
            visited — retained for 30 days for security and analytics.
          </li>
          <li>
            For vendor applicants only: the work samples and payout details
            you choose to share with us.
          </li>
        </ul>
      </Section>

      <Section h="3. Why we collect it">
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>To answer your enquiry, brief, or application.</li>
          <li>To send the investor brief or vendor onboarding materials you requested.</li>
          <li>To improve the site and prevent abuse.</li>
        </ul>
        <p className="mt-3">
          We do not sell, rent, or share your contact details with third
          parties. We do not use your data to train AI models. Period.
        </p>
      </Section>

      <Section h="4. Cookies">
        We use one functional cookie to remember your form state and a single
        privacy-respecting analytics cookie to count unique visits. No tracking
        pixels. No ad networks.
      </Section>

      <Section h="5. Your rights">
        You may, at any time, request a copy of the data we hold on you, ask us
        to correct it, or ask us to delete it. Email{" "}
        <a href={`mailto:${siteConfig.company.email}`} className="text-contrast underline">
          {siteConfig.company.email}
        </a>{" "}
        with "data request" in the subject line. We respond within 7 business
        days.
      </Section>

      <Section h="6. Children">
        This site is not directed at anyone under 18 and we do not knowingly
        collect data from anyone under 18.
      </Section>

      <Section h="7. Changes">
        We update this policy occasionally. When we do, we change the "last
        updated" date at the top.
      </Section>
    </div>
  );
}

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-light text-2xl md:text-3xl text-contrast mb-3">
        {h}
      </h2>
      <div>{children}</div>
    </section>
  );
}
