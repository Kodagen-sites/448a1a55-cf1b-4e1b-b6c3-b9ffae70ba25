import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { Suspense } from "react";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/content/site-config";
import assetManifest from "@/content/asset-manifest.json";
import { FadeUp } from "@/components/motion";

const IMAGES = assetManifest.images as Record<string, string>;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request the Maven Market investor brief, apply to list as a vendor, or contact the press team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Press, investors, vendors — we read every line."
        intro="Tell us which one you are, and what you need. We answer within two business days."
        image={IMAGES["section-contact-hero"]}
      />

      {/* CT3 — type-only, no-map */}
      <section
        className="relative section-pad px-6 md:px-10 border-t hairline"
        style={{ background: "#F4E4D7" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <FadeUp>
              <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-4">
                Reach us directly
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="font-display font-light text-3xl md:text-5xl text-contrast leading-[1.06] mb-8">
                Three doors. One desk.
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <dl className="space-y-6 text-ink">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary mb-1">
                    Press & investors
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${siteConfig.company.email}`}
                      className="font-display text-xl text-contrast underline-offset-4 hover:underline"
                    >
                      {siteConfig.company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary mb-1">
                    Vendor desk
                  </dt>
                  <dd>
                    <a
                      href="mailto:vendors@mavenmarket.ng"
                      className="font-display text-xl text-contrast underline-offset-4 hover:underline"
                    >
                      vendors@mavenmarket.ng
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary mb-1">
                    Phone (Lagos)
                  </dt>
                  <dd className="font-display text-xl text-contrast">
                    {siteConfig.company.phone}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary mb-1">
                    Office
                  </dt>
                  <dd className="text-ink/85">{siteConfig.company.location}</dd>
                </div>
              </dl>
            </FadeUp>
          </div>

          <div className="md:col-span-7">
            <Suspense fallback={null}>
              <ContactClient />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
