import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useContent } from "@/lib/cms";

type Data = {
  eyebrow: string;
  heading_line1: string;
  heading_accent: string;
  heading_line2: string;
  subline: string;
  items: { q: string; a: string }[];
};

const FALLBACK: Data = {
  eyebrow: "FAQ",
  heading_line1: "Commonly",
  heading_accent: "Asked",
  heading_line2: "Questions",
  subline: "Answers to what people ask before we start. Have another? Ping me.",
  items: [],
};

export function FaqSection() {
  const { data: c } = useContent<Data>("home_faq", FALLBACK);
  const d = c ?? FALLBACK;
  const [open, setOpen] = useState<number | null>(0);
  const faq = d.items ?? [];

  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">{d.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.4rem,4.2vw,3.7rem)] font-medium leading-[1.04] tracking-[-0.04em] text-[var(--color-text)]">
            {d.heading_line1}{" "}
            <span className="font-serif font-normal italic text-[var(--color-accent)]">
              {d.heading_accent}
            </span>{" "}
            {d.heading_line2}
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-[1.65] text-[var(--color-muted)]">
            {d.subline}
          </p>
        </Reveal>

        <div className="md:col-span-7">
          <ul className="border-b border-[var(--color-hairline-strong)]">
            {faq.map((item, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <li key={i} className="border-t border-[var(--color-hairline-strong)]">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-[72px] w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className="text-[16px] font-medium text-[var(--color-text)] md:text-[18px]">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-hairline-strong)] text-[var(--color-accent)] transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                    >
                      <Plus size={15} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="max-w-[62ch] pb-7 pr-12 text-[15px] leading-[1.7] text-[var(--color-muted)] md:text-[16px]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
