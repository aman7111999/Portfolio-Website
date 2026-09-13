import { useEffect, useId, useRef, useState } from "react";
import { ArrowUp, ChevronDown } from "lucide-react";

type Chapter = { id: string; label: string; number: string };

export function CaseStudyNavigation({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);
  const selectId = useId();
  const chapterIds = chapters.map((chapter) => chapter.id).join("|");

  useEffect(() => {
    const ids = chapterIds.split("|");
    const root = navRef.current?.closest("article");
    const sections = ids
      .map((id) => root?.querySelector<HTMLElement>(`[id="${id}"]`))
      .filter((section): section is HTMLElement => !!section);
    if (!sections.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = (navRef.current?.getBoundingClientRect().bottom ?? 140) + 32;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > offset) break;
        current = section.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    if (root) resize.observe(root);
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, [chapterIds]);

  const jump = (id: string) => {
    const section = navRef.current?.closest("article")?.querySelector<HTMLElement>(`[id="${id}"]`);
    if (!section) return;
    setActive(id === "hero" ? (chapters[0]?.id ?? "") : id);
    section.scrollIntoView({ block: "start", behavior: "instant" });
    section.focus({ preventScroll: true });
    if (!navRef.current?.closest("[data-project-preview]")) {
      window.history.replaceState(window.history.state, "", `#${id}`);
    }
  };

  return (
    <nav ref={navRef} aria-label="Case study outline" className="case-study-navigation">
      <div className="container-page">
        <div className="case-navigation-inner">
          <p className="case-navigation-label">On this page</p>
          <ol className="case-navigation-links">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={active === chapter.id ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    jump(chapter.id);
                  }}
                >
                  <span aria-hidden>{chapter.number}</span>
                  {chapter.label}
                </a>
              </li>
            ))}
          </ol>
          <div className="case-navigation-select">
            <label htmlFor={selectId} className="sr-only">
              Jump to a chapter
            </label>
            <select id={selectId} value={active} onChange={(event) => jump(event.target.value)}>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.number} · {chapter.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} aria-hidden />
          </div>
          <button type="button" aria-label="Back to project overview" onClick={() => jump("hero")}>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
