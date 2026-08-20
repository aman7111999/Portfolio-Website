import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useContent, useSite } from "@/lib/cms";
import { ThemeToggle } from "@/components/design/ThemeToggle";
import { BrandMark } from "@/components/BrandMark";

type NavData = {
  links: { label: string; to: string }[];
  cta_label: string;
  cta_to: string;
  role_line: string;
};

const NAV_FALLBACK: NavData = {
  links: [
    { to: "/work", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/resume", label: "Résumé" },
  ],
  cta_label: "Contact",
  cta_to: "/contact",
  role_line: "Senior Product Designer",
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data: site } = useSite();
  const { data: nav } = useContent<NavData>("nav", NAV_FALLBACK);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const name = site?.name ?? "Aman Mishra";
  const rawLinks = nav?.links ?? NAV_FALLBACK.links;
  const links = rawLinks.some((link) => link.to === "/resume")
    ? rawLinks
    : [...rawLinks, { to: "/resume", label: "Résumé" }];

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-hairline)] bg-[var(--color-overlay)] backdrop-blur-xl"
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-[76px] items-center justify-between"
      >
        <NavLink to="/" className="group flex items-center gap-3" aria-label={`${name}, home`}>
          <BrandMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[-3deg] group-hover:scale-[1.04]" />
          <span className="leading-tight">
            <span className="block text-[14px] font-semibold text-[var(--color-text)] md:text-[15px]">
              {name}
            </span>
            <span className="hidden text-[11px] text-[var(--color-muted-fg)] sm:block">
              {nav?.role_line ?? NAV_FALLBACK.role_line}
            </span>
          </span>
        </NavLink>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label + link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  "relative py-2 text-[14px] font-medium transition-colors " +
                  (isActive
                    ? "text-[var(--color-text)] after:absolute after:inset-x-0 after:-bottom-[19px] after:h-px after:bg-[var(--color-accent)]"
                    : "text-[var(--color-muted-fg)] hover:text-[var(--color-text)]")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NavLink
            to={nav?.cta_to ?? NAV_FALLBACK.cta_to}
            className="hidden min-h-10 items-center gap-2 rounded-[8px] bg-[var(--color-text)] px-4 text-[13px] font-semibold text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] sm:inline-flex"
          >
            {nav?.cta_label ?? NAV_FALLBACK.cta_label}
            <ArrowUpRight size={14} />
          </NavLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-[8px] border border-[var(--color-hairline-strong)] text-[var(--color-text)] md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
            className="overflow-hidden border-t border-[var(--color-hairline)] bg-[var(--color-surface)] md:hidden"
          >
            <ul className="container-page py-4">
              {links.map((link) => (
                <li key={link.label + link.to} className="border-b border-[var(--color-hairline)]">
                  <NavLink
                    to={link.to}
                    className="flex items-center justify-between py-4 text-[17px] font-medium text-[var(--color-text)]"
                  >
                    {link.label} <ArrowUpRight size={15} className="text-[var(--color-muted-fg)]" />
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to={nav?.cta_to ?? NAV_FALLBACK.cta_to}
                  className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[var(--color-accent)] px-5 text-[14px] font-semibold text-[var(--color-accent-contrast)]"
                >
                  {nav?.cta_label ?? NAV_FALLBACK.cta_label} <ArrowUpRight size={15} />
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
