// ─────────────────────────────────────────────────────────────
// MAVEN MARKET — Generation fingerprint
// ─────────────────────────────────────────────────────────────
// archetype:        G (Mixed-Media Hybrid)
// g_render_mode:    scrub-assemble (Mode 3 — ScrollCanvas M9 explode→reassemble)
// style:            S3 (Soft Pastel Wellness — adapted Warm Clay)
// voice_family:     V3 (Modern Editorial — investor / press register)
// scene_variant:    V1
// motion_variant:   M9 (assemble — product cards explode then reassemble)
// card_variant:     CV8 (Sticker)
// hero_overlay:     HO5 (big-stack)
// hero_text:        H3 (gradient/centered)
// hero_entrance:    E2 (word-split rise)
// header_variant:   pill-floating
// footer_variant:   FT5 (CTA parting shot)
// about_variant:    AB2 (industry hero + bold contrast)
// contact_variant:  CT3 (type-only)
// cta_variant:      CTA1 (centered oversized type)
// stats_variant:    ST1 (three-across counters)
// color_variant:    warm-clay (LOCKED)
// rolled_at:        2026-05-25
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  manifestId: "gen-2026-05-25-maven-market",
  headerVariant: "pill-floating" as const,

  brand: {
    bg: "#F4E4D7",
    surface: "#E8B89A",
    primary: "#C7765C",
    accent: "#C7765C",
    contrast: "#7A3826",
    ink: "#5A2A1C",
  },

  company: {
    name: "Maven Market",
    legalName: "Maven Market Ltd.",
    tagline: "The marketplace for African digital craft",
    description:
      "Maven Market is the multi-vendor commerce layer underneath Africa's next generation of digital product makers. Built for vendors who ship work that travels — and for the buyers who finance it.",
    email: "press@mavenmarket.ng",
    phone: "+234 (0) 818 200 7400",
    location: "Lagos, Nigeria",
    foundedYear: 2024,
  },

  seo: {
    siteUrl: "https://mavenmarket.ng",
    title: "Maven Market — Africa's multi-vendor marketplace for digital craft",
    description:
      "Maven Market is the multi-vendor commerce layer for Africa's digital product economy. A press and investor view of the platform, the marketplace thesis, and the vendors building on it.",
    ogImage: "/og.jpg",
    locale: "en_NG",
    twitter: "@mavenmarket",
  },

  socials: {
    instagram: "https://instagram.com/mavenmarket",
    linkedin: "https://linkedin.com/company/mavenmarket",
    x: "https://x.com/mavenmarket",
    youtube: "",
    facebook: "",
    tiktok: "",
  },

  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],

  hero: {
    eyebrow: "Investor & Press · v2026.1",
    h1: [
      { text: "One marketplace.", accent: false },
      { text: "Thousands of makers.", accent: true },
      { text: "Sold across borders.", accent: false },
    ],
    subhead: "Maven Market is Africa's multi-vendor commerce layer for digital craft.",
    body:
      "We unify discovery, fulfillment and settlement for thousands of independent vendors — turning fragmented digital craft into a single, investable surface.",
  },

  scrollHero: {
    archetype: "G",
    styleId: "S3",
    motionVariant: "M9",
    renderMode: "scrub-assemble" as const,
    assetMode: "live-generate" as const,
    imageUrl: "",
    frameCount: 0,
    scrollDistance: 4,
    loadingLabel: "Maven Market",
    loadingVariant: "L2" as const,
  },

  pillars: [
    {
      slug: "discovery",
      eyebrow: "Discovery",
      name: "One front door for thousands of vendors",
      description:
        "A unified storefront where every Maven vendor is browsable, indexable and shoppable — no separate logins, no scattered checkouts.",
    },
    {
      slug: "fulfillment",
      eyebrow: "Fulfillment",
      name: "Digital delivery, end to end",
      description:
        "Licensing, delivery, license-key issuance and refunds — handled by Maven so vendors stay focused on the work.",
    },
    {
      slug: "settlement",
      eyebrow: "Settlement",
      name: "Naira-in, multi-currency-out",
      description:
        "Vendors price in their currency; buyers pay in theirs. We settle the difference, on a predictable cadence.",
    },
    {
      slug: "trust",
      eyebrow: "Trust",
      name: "Curation, not crowdsourcing",
      description:
        "Every vendor is reviewed, every catalogue is fingerprinted, and every listing carries a verifiable license trail.",
    },
  ],

  stats: [
    { label: "Vendors onboarded (target Q4)", value: 850, suffix: "+" },
    { label: "Countries served at launch", value: 14, suffix: "" },
    { label: "Take rate on each transaction", value: 9, suffix: "%" },
  ],

  thesis: {
    eyebrow: "The thesis",
    word: "Together",
    body:
      "Africa's digital craft is some of the most-traded, least-credited work on the internet. Maven gives it a home, a price floor, and a path to scale.",
  },

  vendors: {
    eyebrow: "For Vendors",
    title: "If you make it, we'll move it.",
    body:
      "Maven onboards vetted digital makers — designers, illustrators, sound artists, template authors, course producers — and gives them a single distribution surface across borders.",
    items: [
      "Free to list. We earn when you earn.",
      "Settlement in NGN, USD, GBP, EUR — your choice.",
      "VAT, license keys and refunds handled.",
      "A press team for vendors who break out.",
    ],
    cta: { label: "Apply as a vendor", href: "/contact?intent=vendor" },
  },

  investors: {
    eyebrow: "For Investors & Press",
    title: "An asset class hiding in plain sight.",
    body:
      "African digital craft is a $4.1B latent export market with no platform-of-record. Maven is building that platform — and the data layer to make it investable.",
    items: [
      "Series A close: Q3 2026.",
      "Run-rate GMV target: ₦3.2B by Q4.",
      "Net take rate: 9% — sustainable from day one.",
      "Backed by founder operators from Paystack and Flutterwave.",
    ],
    cta: { label: "Request investor brief", href: "/contact?intent=press" },
  },

  cta: {
    primary: "Request investor brief",
    primaryHref: "/contact?intent=press",
    secondary: "Apply as a vendor",
    secondaryHref: "/contact?intent=vendor",
  },

  ctaBlock: {
    eyebrow: "Coming soon",
    heading: "The next chapter of African commerce is being written by makers.",
    description:
      "We're building Maven Market with the vendors, investors and press shaping that chapter. If that's you — get in touch.",
  },

  footer: {
    variant: "FT5" as const,
    ctaHeadline: "Sell across borders. Get found at home.",
    brandStatement:
      "Maven Market is the multi-vendor commerce layer for Africa's digital craft economy. Built in Lagos. Designed to travel.",
  },

  trustBar: [
    "Lagos, Nigeria",
    "Backed by founders",
    "Cross-border by default",
    "Vendor-first economics",
  ],

  pressNotes: [
    {
      outlet: "TechCabal",
      quote: "A platform-of-record for African digital craft has been a long time coming.",
    },
    {
      outlet: "BusinessDay",
      quote: "Maven's take-rate-first economics is the discipline this market has needed.",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
