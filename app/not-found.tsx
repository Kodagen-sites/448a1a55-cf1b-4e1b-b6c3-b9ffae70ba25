import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-4">
          404
        </div>
        <h1 className="font-display font-light text-5xl md:text-7xl text-contrast">
          We couldn't find that.
        </h1>
        <p className="mt-5 text-ink/80">
          The page you were looking for has moved, been renamed, or never
          existed. Try one of the doors below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-contrast text-bg font-display font-medium text-sm"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-contrast/25 text-contrast font-display font-medium text-sm"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
