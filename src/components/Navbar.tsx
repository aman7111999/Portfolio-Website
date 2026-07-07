import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSite } from "@/lib/cms";
import { ThemeToggle } from "@/components/design/ThemeToggle";
import { Button } from "@/components/design/Button";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const { data: site } = useSite();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-page pt-3 md:pt-4">
        <nav
          aria-label="Primary"
          className={
            "mx-auto flex items-center justify-between gap-3 rounded-full border border-hairline px-3 pl-5 transition-all duration-500 " +
            (scrolled
              ? "glass max-w-[980px] py-1.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
              : "max-w-[1120px] bg-transparent py-2.5")
          }
        >
          <NavLink to="/" className="flex items-center gap-2 font-display text-[15px]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>{site?.name ?? "Aman Mishra"}</span>
          </NavLink>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    "group/nav relative rounded-full px-3 py-1.5 text-[13px] transition-colors " +
                    (isActive
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)]")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-[var(--color-elevated)]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {l.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {site?.resume_url && (
              <a
                href={site.resume_url}
                target="_blank"
                rel="noreferrer"
                className="hidden text-[13px] text-[var(--color-muted)] hover:text-[var(--color-text)] md:inline"
              >
                Resume
              </a>
            )}
            <ThemeToggle className="hidden md:inline-flex" />
            <Button to="/contact" variant="accent" size="sm" className="hidden md:inline-flex">
              Let's Talk
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-[var(--color-text)] md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="container-page md:hidden"
          >
            <div className="mt-2 rounded-[var(--radius-lg)] card-surface p-4">
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        "block rounded-md px-3 py-2.5 font-display text-lg " +
                        (isActive ? "bg-[var(--color-elevated)]" : "text-[var(--color-muted)]")
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                <ThemeToggle />
                <Button to="/contact" variant="accent" size="sm">Let's Talk</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
