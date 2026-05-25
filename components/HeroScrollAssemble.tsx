"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { MagneticButton, ScrollHint } from "@/components/motion";

const ScrollCanvas = dynamic(() => import("@/components/ScrollCanvas"), {
  ssr: false,
});

type Props = {
  frameCount: number;
  frameUrlTemplate: string;
  padLength?: number;
  scrollDistance?: number;
  fallbackImage: string;
  loadingLabel?: string;
};

/**
 * Hero — Archetype G, scrub-assemble (M9 explode→reassemble).
 *
 * If frames are extracted and frameCount > 0, render a ScrollCanvas pinning
 * the page through the assemble sequence. Otherwise, render a T4 still
 * (scene-1-end keyframe) with parallax + HO5 big-stack typographic overlay.
 */
export default function HeroScrollAssemble({
  frameCount,
  frameUrlTemplate,
  padLength = 4,
  scrollDistance = 4,
  fallbackImage,
  loadingLabel = "Maven Market",
}: Props) {
  const hasFrames = frameCount > 0 && frameUrlTemplate.length > 0;

  if (hasFrames) {
    return (
      <ScrollCanvas
        frameCount={frameCount}
        pattern={frameUrlTemplate}
        padLength={padLength}
        scrollDistance={scrollDistance}
        loadingLabel={loadingLabel}
        loadingVariant="L2"
      >
        <HeroOverlay />
      </ScrollCanvas>
    );
  }

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden">
      {fallbackImage && (
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          src={fallbackImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(244,228,215,0.35) 0%, rgba(244,228,215,0.15) 40%, rgba(244,228,215,0.85) 100%)",
        }}
      />
      <HeroOverlay />
    </section>
  );
}

// HO5 big-stack overlay — eyebrow + 3-line stacked headline (left-aligned,
// bottom-anchored), CTA row, scroll hint.
function HeroOverlay() {
  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 px-6 md:px-12 pb-16 md:pb-20 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="font-mono text-[11px] tracking-[0.4em] uppercase text-primary mb-5"
          >
            {siteConfig.hero.eyebrow}
          </motion.div>

          <h1 className="font-display font-light leading-[0.96] tracking-tight text-contrast text-5xl sm:text-7xl md:text-8xl lg:text-[140px]">
            {siteConfig.hero.h1.map((line, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className={`block ${line.accent ? "italic font-serif" : ""}`}
                style={line.accent ? { color: "#C7765C" } : undefined}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-7 max-w-2xl text-base md:text-lg text-ink/85 leading-relaxed"
          >
            {siteConfig.hero.subhead}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
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
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 md:right-10">
        <ScrollHint />
      </div>
    </div>
  );
}
