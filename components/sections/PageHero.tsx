import { FadeUp } from "@/components/motion";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
};

export default function PageHero({ eyebrow, title, intro, image }: Props) {
  return (
    <section className="relative w-full min-h-[70vh] flex items-end overflow-hidden">
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
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
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(244,228,215,0.6) 0%, rgba(244,228,215,0.2) 35%, rgba(244,228,215,0.85) 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-14 w-full">
        {eyebrow && (
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-5">
              {eyebrow}
            </div>
          </FadeUp>
        )}
        <FadeUp delay={0.08}>
          <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.96] text-contrast max-w-4xl">
            {title}
          </h1>
        </FadeUp>
        {intro && (
          <FadeUp delay={0.18}>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink/80 leading-relaxed">
              {intro}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
