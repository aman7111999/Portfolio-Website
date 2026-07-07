import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
      className={
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-[var(--color-text)] transition-colors hover:bg-[var(--color-elevated)] " +
        (className ?? "")
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -30, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.85 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {isDark ? <Moon size={15} /> : <Sun size={15} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
