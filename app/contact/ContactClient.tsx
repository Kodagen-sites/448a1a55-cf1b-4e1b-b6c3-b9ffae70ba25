"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

type Intent = "press" | "vendor" | "general";

const INTENT_LABEL: Record<Intent, string> = {
  press: "Investor / press brief",
  vendor: "Apply as a vendor",
  general: "Something else",
};

export default function ContactClient() {
  const params = useSearchParams();
  const initialIntent = useMemo<Intent>(() => {
    const raw = params.get("intent");
    if (raw === "press" || raw === "vendor" || raw === "general") return raw;
    return "press";
  }, [params]);

  const [intent, setIntent] = useState<Intent>(initialIntent);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-primary/30 bg-white/65 backdrop-blur-sm p-8 md:p-10"
      >
        <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-3">
          Received
        </div>
        <h3 className="font-display font-light text-2xl md:text-4xl text-contrast leading-tight">
          Thank you — we'll respond within two business days.
        </h3>
        <p className="mt-5 text-ink/75 leading-relaxed">
          A confirmation has been logged. If your enquiry is time-sensitive,
          email{" "}
          <a href="mailto:press@mavenmarket.ng" className="underline">
            press@mavenmarket.ng
          </a>{" "}
          directly.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-contrast/15 bg-white/65 backdrop-blur-sm p-7 md:p-9 space-y-5"
    >
      <div>
        <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary mb-3">
          What brings you here?
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(Object.keys(INTENT_LABEL) as Intent[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setIntent(k)}
              className={`text-left px-4 py-3 rounded-xl border text-sm font-display transition-colors ${
                intent === k
                  ? "bg-contrast text-bg border-contrast"
                  : "bg-bg/40 text-contrast border-contrast/15 hover:border-contrast/40"
              }`}
            >
              {INTENT_LABEL[k]}
            </button>
          ))}
        </div>
      </div>

      <Field label="Your name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      {intent === "vendor" && (
        <Field
          label="What you make"
          name="craft"
          placeholder="e.g. illustration, type design, sound packs, course material"
        />
      )}
      {intent === "press" && (
        <Field
          label="Publication or fund"
          name="outlet"
          placeholder="e.g. TechCrunch, a16z, Sequoia"
        />
      )}
      <TextArea
        label="A short note"
        name="note"
        placeholder="One paragraph is plenty."
        required
      />

      <button
        type="submit"
        className="w-full min-h-[48px] rounded-full bg-contrast text-bg font-display font-medium text-sm hover:bg-primary transition-colors"
      >
        Send →
      </button>
      <p className="text-[11px] text-ink/55">
        By submitting you agree to be contacted by Maven Market. We don't share
        contact details with third parties.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary block mb-2">
        {label}
        {required && <span className="text-contrast/60"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-bg/60 border border-contrast/15 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-contrast/40 focus:bg-bg/85 transition-colors"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary block mb-2">
        {label}
        {required && <span className="text-contrast/60"> *</span>}
      </span>
      <textarea
        name={name}
        rows={5}
        required={required}
        placeholder={placeholder}
        className="w-full bg-bg/60 border border-contrast/15 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-contrast/40 focus:bg-bg/85 transition-colors resize-none"
      />
    </label>
  );
}
