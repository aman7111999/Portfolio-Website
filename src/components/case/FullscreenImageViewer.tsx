import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type FullscreenImage = {
  src: string;
  alt: string;
  label: string;
  meta?: string;
  caption?: string;
};

export function FullscreenImageViewer({
  image,
  onClose,
}: {
  image: FullscreenImage | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!image) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [image, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={`${image.label} at full size`}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] touch-pan-y overflow-y-auto overscroll-contain bg-black/92 backdrop-blur-md [-webkit-overflow-scrolling:touch]"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-4 border-b border-white/15 bg-black/75 px-4 text-white backdrop-blur-md sm:px-6"
          >
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold uppercase tracking-[0.1em]">
                {image.label}
              </p>
              {image.meta && (
                <p className="mt-0.5 truncate text-[11px] text-white/60">{image.meta}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close full-screen image"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="mx-auto w-full max-w-[760px] px-3 pb-8 pt-4 sm:px-6 sm:pb-12 sm:pt-6"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="block h-auto w-full rounded-[var(--radius-md)] bg-white shadow-2xl"
            />
            <figcaption className="px-1 pt-4 text-[13px] leading-6 text-white/70">
              {image.caption ??
                `Scroll to explore the complete ${image.label.toLowerCase()} screen. Press Esc or use the close button to return.`}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
