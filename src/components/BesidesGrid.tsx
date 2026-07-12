import { motion, useReducedMotion } from "framer-motion";
import hiphop from "@/assets/besides-hiphop.jpg";
import cats from "@/assets/besides-cats.jpg";
import cities from "@/assets/besides-cities.jpg";
import art from "@/assets/besides-art.jpg";

/**
 * Playful 4-tile collage grid. Each tile wiggles + lifts on hover.
 * Rotations give the zine/scrapbook feel — matches Salad aesthetic.
 */
const TILES = [
  { src: hiphop, alt: "Hip-hop culture collage", rotate: -3, span: "col-span-6 md:col-span-4 aspect-[3/4]" },
  { src: cats, alt: "Petting a street cat", rotate: 2, span: "col-span-6 md:col-span-3 aspect-square md:mt-10" },
  { src: cities, alt: "Exploring cities collage", rotate: -1.5, span: "col-span-6 md:col-span-5 aspect-[5/4]" },
  { src: art, alt: "Making art & illustrations", rotate: 3, span: "col-span-6 md:col-span-4 aspect-[3/4]" },
];

export function BesidesGrid() {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {TILES.map((t, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: 40, rotate: t.rotate * 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: t.rotate }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={reduce ? undefined : { rotate: 0, y: -8, scale: 1.02 }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={
            "relative overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--elevation-3)] " +
            t.span
          }
        >
          <img
            src={t.src}
            alt={t.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
