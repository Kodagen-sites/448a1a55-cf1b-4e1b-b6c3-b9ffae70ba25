import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/content/site-config";
import assetManifest from "@/content/asset-manifest.json";
import {
  FadeUp,
  StaggerChildren,
  MagneticButton,
} from "@/components/motion";

const IMAGES = assetManifest.images as Record<string, string>;

export const metadata: Metadata = {
  title: "About",
  description:
    "Maven Market is the multi-vendor commerce layer for Africa's digital craft economy. Built in Lagos. Designed to travel.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Maven Market"
        title="Built in Lagos. Designed to travel."
        intro={siteConfig.footer.brandStatement}
        image={IMAGES["section-about-hero"]}
      />

      {/* AB2 — bold contrast headline */}
      <section
        className="relative section-pad px-6 md:px-12 border-t hairline"
        style={{ background: "#EAD3BF" }}
      >
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
              Why Maven exists
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.04] text-contrast">
              African digital craft is some of the most-traded,{" "}
              <span className="text-primary italic font-serif">
                least-credited
              </span>{" "}
              work on the internet.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-7 max-w-3xl text-lg text-ink/85 leading-relaxed">
              Templates resold without attribution. Illustrations stripped of
              their makers. Sound packs cleared of their origins. The work
              travels — the credit doesn't. Maven Market exists to fix that:
              a platform-of-record where every transaction routes value back
              to the maker, and every maker has a place to be found.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Mission cards */}
      <section
        className="relative section-pad px-6 md:px-10 border-t hairline"
        style={{ background: "#F4E4D7" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-4">
              Operating principles
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="font-display font-light text-3xl md:text-5xl text-contrast max-w-3xl">
              Three commitments we make to every vendor on the platform.
            </h2>
          </FadeUp>

          <StaggerChildren
            staggerDelay={0.1}
            className="mt-14 grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Take-rate first.",
                body: "9% on every transaction. No listing fees. No subscriptions. No surprises. We earn when our vendors earn.",
              },
              {
                title: "Cross-border by default.",
                body: "Price in NGN. Get paid in NGN, USD, GBP, EUR — your choice. We carry the FX risk so vendors don't.",
              },
              {
                title: "A press team for the work.",
                body: "When a Maven vendor breaks out, we put the breakout in front of the publications that matter.",
              },
            ].map((c, i) => (
              <article
                key={i}
                className="rounded-2xl border border-contrast/15 bg-white/60 backdrop-blur-sm p-7"
              >
                <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl text-contrast font-light leading-tight">
                  {c.title}
                </h3>
                <p className="mt-4 text-ink/80 leading-relaxed text-[15px]">
                  {c.body}
                </p>
              </article>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Founder line */}
      <section
        className="relative section-pad px-6 md:px-12 border-t hairline"
        style={{ background: "#7A3826", color: "#F4E4D7" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-bg/60 mb-5">
              A line from the founders
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-display font-light text-3xl md:text-5xl text-bg leading-[1.18]">
              "We've built marketplaces before — Paystack, Flutterwave. Maven
              is the one we wished existed for the makers we kept paying
              alongside the merchants."
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <div className="mt-8 font-mono text-[11px] tracking-[0.32em] uppercase text-primary">
              Founders, Maven Market — Lagos, 2024
            </div>
          </FadeUp>
          <FadeUp delay={0.34}>
            <div className="mt-12">
              <MagneticButton
                as="a"
                href="/contact?intent=press"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-bg text-contrast font-display font-medium text-sm hover:bg-primary hover:text-bg transition-colors"
              >
                Request investor brief →
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
