import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { FullscreenImageViewer } from "@/components/case/FullscreenImageViewer";

type GalleryImage = { url: string; caption?: string };

export function CaseGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const selected = active === null ? null : images[active];

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {images.map((img, index) => (
          <motion.button
            key={img.url + index}
            type="button"
            onClick={() => setActive(index)}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative block overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-elevated)] text-left ${index === 0 ? "md:col-span-2" : ""}`}
            aria-label={img.caption ? `Expand: ${img.caption}` : `Expand screen ${index + 1}`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={img.url}
                alt={img.caption ?? `Project screen ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-contain object-top"
              />
              <span className="pointer-events-none absolute right-3 top-3 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-black/70 px-3 text-[11px] font-medium text-white backdrop-blur-sm">
                <Maximize2 size={13} /> View full
              </span>
            </div>
            {img.caption && (
              <span className="block px-5 py-3 text-[13px] leading-6 text-[var(--color-muted)]">
                {img.caption}
              </span>
            )}
          </motion.button>
        ))}
      </div>
      <FullscreenImageViewer
        image={
          selected
            ? {
                src: selected.url,
                alt: selected.caption ?? `Project screen ${(active ?? 0) + 1}`,
                label: selected.caption ?? `Screen ${(active ?? 0) + 1}`,
                caption: selected.caption,
              }
            : null
        }
        index={active ?? 0}
        total={images.length}
        onMove={(direction) =>
          setActive((index) =>
            index === null ? null : (index + direction + images.length) % images.length,
          )
        }
        onClose={() => setActive(null)}
      />
    </>
  );
}
