import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import assetManifest from "@/content/asset-manifest.json";
import framesManifest from "@/content/frames-manifest.json";
import {
  FadeUp,
  StaggerChildren,
  TextReveal,
  MagneticButton,
  CardTiltLayer,
  NumberCounter,
  ImageRevealMask,
  Marquee,
  ScrollHint,
} from "@/components/motion";
import HeroScrollAssemble from "@/components/HeroScrollAssemble";

const IMAGES = assetManifest.images as Record<string, string>;

export default function Home() {
  return (
    <div className="relative">
      <HeroScrollAssemble
        frameCount={(framesManifest as { frameCount?: number }).frameCount ?? 0}
        frameUrlTemplate={
          (framesManifest as { frameUrlTemplate?: string }).frameUrlTemplate ?? ""
        }
        padLength={(framesManifest as { padLength?: number }).padLength ?? 4}
        scrollDistance={4}
        fallbackImage={IMAGES["scene-1-end"] ?? ""}
        loadingLabel="Maven Market"
      />

      <ThesisSection />
      <PillarsSection />
      <StatsSection />
      <VendorsSection />
      <InvestorsSection />
      <PressMarquee />
      <CtaSection />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// THESIS — oversized type manifesto ($0 cost — pure text)
// ────────────────────────────────────────────────────────────
function ThesisSection() {
  return (
    <section
      className="relative section-pad px-6 md:px-12 overflow-hidden border-t hairline"
      style={{ background: "#EAD3BF" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="font-mono text-xs tracking-[0.4em] uppercase mb-6 text-primary">
            {siteConfig.thesis.eyebrow}
          </div>
        </FadeUp>
        <TextReveal
          as="h2"
          className="font-display font-light text-[64px] sm:text-[120px] md:text-[180px] lg:text-[240px] leading-[0.88] tracking-tight text-contrast"
          stagger={0.08}
        >
          {siteConfig.thesis.word}
        </TextReveal>
        <FadeUp delay={0.4}>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-ink/85 leading-relaxed">
            {siteConfig.thesis.body}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// PILLARS — CV8 sticker cards (the 4 marketplace primitives)
// ────────────────────────────────────────────────────────────
function PillarsSection() {
  return (
    <section
      id="pillars"
      className="relative section-pad px-6 md:px-10 border-t hairline"
      style={{ background: "#F4E4D7" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-4">
              The platform
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.04] text-contrast">
              Four primitives. One marketplace.
            </h2>
          </FadeUp>
        </div>

        <StaggerChildren
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {siteConfig.pillars.map((p) => (
            <CardTiltLayer key={p.slug}>
              <article className="relative h-full rounded-2xl border border-contrast/15 bg-white/55 backdrop-blur-sm overflow-hidden group hover:border-primary/40 transition-colors">
                <div className="aspect-[5/3] relative overflow-hidden bg-surface">
                  {IMAGES[`service-${p.slug}`] ? (
                    <img
                      src={IMAGES[`service-${p.slug}`]}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(160deg, #F4E4D7 0%, #E8B89A 60%, #C7765C 100%)",
                      }}
                    />
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-bg/85 backdrop-blur-md font-mono text-[10px] tracking-[0.28em] uppercase text-contrast">
                    {p.eyebrow}
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-display text-2xl md:text-3xl font-light text-contrast leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-ink/75 leading-relaxed text-[15px]">
                    {p.description}
                  </p>
                </div>
              </article>
            </CardTiltLayer>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// STATS — ST1 three-across counters
// ────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section
      className="relative section-pad px-6 md:px-10 border-t hairline"
      style={{ background: "#7A3826", color: "#F4E4D7" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-bg/60 mb-3">
            By the numbers
          </div>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-tight text-bg max-w-3xl">
            The marketplace we're building, in three figures.
          </h2>
        </FadeUp>

        <StaggerChildren
          staggerDelay={0.1}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {siteConfig.stats.map((s, i) => (
            <div key={i} className="border-t border-bg/15 pt-5">
              <div className="font-display font-light text-6xl md:text-7xl text-bg tabular-nums leading-none">
                <NumberCounter to={s.value} />
                <span className="text-primary">{s.suffix}</span>
              </div>
              <div className="mt-4 text-bg/70 text-sm leading-snug max-w-xs">
                {s.label}
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// VENDORS — image-left, copy-right
// ────────────────────────────────────────────────────────────
function VendorsSection() {
  return (
    <section
      id="vendors"
      className="relative section-pad px-6 md:px-10 border-t hairline"
      style={{ background: "#F4E4D7" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <ImageRevealMask
          src={IMAGES["section-about-hero"] ?? ""}
          alt="A vendor's marketplace card on a Lagos studio table"
          aspectClass="aspect-[4/5]"
          className="rounded-2xl border border-contrast/15 bg-surface"
        />
        <div>
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-4">
              {siteConfig.vendors.eyebrow}
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.04] text-contrast">
              {siteConfig.vendors.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p className="mt-6 text-ink/85 text-lg leading-relaxed">
              {siteConfig.vendors.body}
            </p>
          </FadeUp>
          <StaggerChildren
            staggerDelay={0.06}
            initialDelay={0.25}
            className="mt-8 space-y-3"
          >
            {siteConfig.vendors.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <div className="text-ink/85">{item}</div>
              </div>
            ))}
          </StaggerChildren>
          <FadeUp delay={0.45}>
            <div className="mt-9">
              <MagneticButton
                as="a"
                href={siteConfig.vendors.cta.href}
                className="inline-flex items-center px-6 py-3.5 rounded-full bg-contrast text-bg font-display font-medium text-sm hover:bg-primary transition-colors"
              >
                {siteConfig.vendors.cta.label} →
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// INVESTORS — copy-left, image-right (mirrored)
// ────────────────────────────────────────────────────────────
function InvestorsSection() {
  return (
    <section
      id="investors"
      className="relative section-pad px-6 md:px-10 border-t hairline"
      style={{ background: "#EAD3BF" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 md:order-1">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-4">
              {siteConfig.investors.eyebrow}
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.04] text-contrast">
              {siteConfig.investors.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p className="mt-6 text-ink/85 text-lg leading-relaxed">
              {siteConfig.investors.body}
            </p>
          </FadeUp>
          <StaggerChildren
            staggerDelay={0.06}
            initialDelay={0.25}
            className="mt-8 space-y-3"
          >
            {siteConfig.investors.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <div className="text-ink/85">{item}</div>
              </div>
            ))}
          </StaggerChildren>
          <FadeUp delay={0.45}>
            <div className="mt-9">
              <MagneticButton
                as="a"
                href={siteConfig.investors.cta.href}
                className="inline-flex items-center px-6 py-3.5 rounded-full bg-contrast text-bg font-display font-medium text-sm hover:bg-primary transition-colors"
              >
                {siteConfig.investors.cta.label} →
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
        <div className="order-1 md:order-2">
          <ImageRevealMask
            src={IMAGES["section-cta"] ?? ""}
            alt="A horizon of marketplace cards arranged on a wooden surface"
            aspectClass="aspect-[4/5]"
            className="rounded-2xl border border-contrast/15 bg-surface"
          />
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// PRESS — Marquee row of press quotes
// ────────────────────────────────────────────────────────────
function PressMarquee() {
  return (
    <section
      className="relative py-14 border-t hairline overflow-hidden"
      style={{ background: "#F4E4D7" }}
    >
      <Marquee speed={28}>
        {siteConfig.pressNotes.flatMap((p, i) => [
          <span
            key={`q-${i}`}
            className="font-display text-2xl md:text-3xl text-contrast/85 italic pr-8"
          >
            "{p.quote}"
          </span>,
          <span
            key={`o-${i}`}
            className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary pr-10 self-center"
          >
            — {p.outlet}
          </span>,
        ])}
      </Marquee>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// CTA — CTA1 centered oversized type on contact image
// ────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative section-pad px-6 md:px-12 border-t hairline overflow-hidden">
      {IMAGES["section-cta"] && (
        <img
          src={IMAGES["section-cta"]}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(244,228,215,0.85) 0%, rgba(244,228,215,0.55) 50%, rgba(244,228,215,0.9) 100%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <FadeUp>
          <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
            {siteConfig.ctaBlock.eyebrow}
          </div>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.98] text-contrast">
            {siteConfig.ctaBlock.heading}
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-7 text-lg text-ink/80 max-w-2xl mx-auto">
            {siteConfig.ctaBlock.description}
          </p>
        </FadeUp>
        <FadeUp delay={0.32}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton
              as="a"
              href={siteConfig.cta.primaryHref}
              className="min-h-[48px] px-7 py-3.5 rounded-full bg-contrast text-bg font-display font-medium text-sm hover:bg-primary transition-colors"
            >
              {siteConfig.cta.primary}
            </MagneticButton>
            <Link
              href={siteConfig.cta.secondaryHref}
              className="min-h-[48px] px-7 py-3.5 rounded-full border border-contrast/25 bg-bg/40 text-contrast font-display font-medium text-sm backdrop-blur-md hover:bg-bg/70 transition-colors inline-flex items-center justify-center"
            >
              {siteConfig.cta.secondary}
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.46}>
          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-ink/55 font-mono uppercase tracking-[0.22em]">
            {siteConfig.trustBar.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
