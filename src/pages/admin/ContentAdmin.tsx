import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAllContent } from "@/lib/cms";
import { AdminPage } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Loader2, Save, Trash2, Plus, Search, Eye, EyeOff, RotateCw,
  ExternalLink, Check, GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import { iconKeys } from "@/lib/iconRegistry";
import { clsx } from "clsx";

type Blocks = Record<string, any>;

type KeyDef = { key: string; label: string; preview: string };
type Group = { title: string; items: KeyDef[] };

const GROUPS: Group[] = [
  {
    title: "Global",
    items: [
      { key: "nav", label: "Navigation", preview: "/" },
      { key: "footer", label: "Footer", preview: "/" },
    ],
  },
  {
    title: "Home",
    items: [
      { key: "hero", label: "Hero", preview: "/" },
      { key: "home_featured", label: "Featured Work", preview: "/" },
      { key: "home_experience", label: "Experience", preview: "/" },
      { key: "home_stats", label: "Stats & About band", preview: "/" },
      { key: "home_testimonials", label: "Testimonials", preview: "/" },
      { key: "home_faq", label: "FAQ", preview: "/" },
      { key: "home_cta", label: "Final CTA", preview: "/" },
    ],
  },
  {
    title: "About",
    items: [
      { key: "about_hero", label: "Hero", preview: "/about" },
      { key: "about_timeline", label: "Timeline heading", preview: "/about" },
      { key: "about_experience", label: "Experience heading", preview: "/about" },
      { key: "about_education", label: "Education heading", preview: "/about" },
      { key: "about_tools", label: "Tools heading", preview: "/about" },
      { key: "about_philosophy", label: "Philosophy", preview: "/about" },
      { key: "about_working_style", label: "Working style", preview: "/about" },
      { key: "about_books", label: "Books", preview: "/about" },
      { key: "about_values", label: "Values", preview: "/about" },
      { key: "about_fun_facts", label: "Fun facts", preview: "/about" },
    ],
  },
  {
    title: "Pages",
    items: [
      { key: "contact_page", label: "Contact page", preview: "/contact" },
      { key: "resume_page", label: "Résumé page", preview: "/resume" },
      { key: "project_access_content", label: "Project access screen", preview: "/work" },
    ],
  },
];

const ALL_KEYS = GROUPS.flatMap((g) => g.items);

export default function ContentAdmin() {
  const { data: initial, isLoading } = useAllContent();
  const qc = useQueryClient();

  const [blocks, setBlocks] = useState<Blocks>({});
  const [saved, setSaved] = useState<Blocks>({});
  const [activeKey, setActiveKey] = useState<string>("nav");
  const [search, setSearch] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [autosave, setAutosave] = useState(true);
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());
  const [savedFlash, setSavedFlash] = useState<Set<string>>(new Set());

  const previewRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (initial) {
      setBlocks(initial);
      setSaved(structuredClone(initial));
    }
  }, [initial]);

  const isDirty = (key: string) =>
    JSON.stringify(blocks[key] ?? null) !== JSON.stringify(saved[key] ?? null);

  const dirtyCount = useMemo(
    () => ALL_KEYS.filter((k) => isDirty(k.key)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blocks, saved],
  );

  const activeDef = ALL_KEYS.find((k) => k.key === activeKey) ?? ALL_KEYS[0];

  const saveKey = async (key: string, silent = false) => {
    setSavingKeys((s) => new Set(s).add(key));
    try {
      const { error } = await supabase
        .from("content_blocks" as any)
        .upsert({ key, data: blocks[key] ?? {} }, { onConflict: "key" });
      if (error) throw error;
      setSaved((s) => ({ ...s, [key]: structuredClone(blocks[key]) }));
      qc.invalidateQueries({ queryKey: ["content_block", key] });
      qc.invalidateQueries({ queryKey: ["content_blocks_all"] });
      setSavedFlash((s) => new Set(s).add(key));
      window.setTimeout(
        () => setSavedFlash((s) => { const n = new Set(s); n.delete(key); return n; }),
        1400,
      );
      // Refresh preview iframe so change is visible
      if (previewRef.current) {
        previewRef.current.src = previewRef.current.src;
      }
      if (!silent) toast.success("Saved");
    } catch (e: any) {
      toast.error(e.message ?? "Save failed");
    } finally {
      setSavingKeys((s) => { const n = new Set(s); n.delete(key); return n; });
    }
  };

  const saveAll = useMutation({
    mutationFn: async () => {
      const dirty = ALL_KEYS.filter((k) => isDirty(k.key));
      for (const d of dirty) await saveKey(d.key, true);
    },
    onSuccess: () => toast.success(`Saved ${dirtyCount} block${dirtyCount === 1 ? "" : "s"}`),
  });

  const revertKey = (key: string) => {
    setBlocks((b) => ({ ...b, [key]: structuredClone(saved[key] ?? {}) }));
    toast.info("Reverted to last saved");
  };

  const setField = (key: string, path: string[], value: any) => {
    setBlocks((prev) => {
      const next = structuredClone(prev);
      next[key] ??= {};
      let obj = next[key];
      for (let i = 0; i < path.length - 1; i++) {
        obj[path[i]] ??= {};
        obj = obj[path[i]];
      }
      obj[path[path.length - 1]] = value;
      return next;
    });
    if (autosave) {
      window.clearTimeout(debounceRef.current[key]);
      debounceRef.current[key] = window.setTimeout(() => saveKey(key, true), 900);
    }
  };

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return GROUPS;
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter(
        (i) =>
          i.label.toLowerCase().includes(q) ||
          i.key.toLowerCase().includes(q) ||
          JSON.stringify(blocks[i.key] ?? "").toLowerCase().includes(q),
      ),
    })).filter((g) => g.items.length);
  }, [search, blocks]);

  if (isLoading) {
    return (
      <div className="grid place-items-center py-20">
        <Loader2 className="animate-spin text-neutral-500" />
      </div>
    );
  }

  return (
    <AdminPage
      wide
      eyebrow="Global"
      title="Site content"
      description="Edit every string on the public site. Changes autosave and reload the live preview on the right."
      actions={
        <>
          <label className="inline-flex items-center gap-2 text-xs text-neutral-600">
            <input
              type="checkbox"
              checked={autosave}
              onChange={(e) => setAutosave(e.target.checked)}
            />
            Autosave
          </label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPreview((s) => !s)}
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPreview ? "Hide preview" : "Show preview"}
          </Button>
          <Button
            size="sm"
            disabled={dirtyCount === 0 || saveAll.isPending}
            onClick={() => saveAll.mutate()}
          >
            {saveAll.isPending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {dirtyCount > 0 ? `Save all (${dirtyCount})` : "All saved"}
          </Button>
        </>
      }
    >
      <div
        className={clsx(
          "grid gap-4",
          showPreview
            ? "lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,1fr)]"
            : "lg:grid-cols-[260px_minmax(0,1fr)]",
        )}
      >
        {/* Sidebar */}
        <aside className="rounded-xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 p-3">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sections…"
                className="h-9 pl-8 text-sm"
              />
            </div>
          </div>
          <nav className="max-h-[70vh] overflow-y-auto p-2">
            {filteredGroups.map((g) => (
              <div key={g.title} className="mb-3">
                <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                  {g.title}
                </p>
                <div className="space-y-0.5">
                  {g.items.map((it) => {
                    const active = activeKey === it.key;
                    const dirty = isDirty(it.key);
                    const flash = savedFlash.has(it.key);
                    return (
                      <button
                        key={it.key}
                        onClick={() => setActiveKey(it.key)}
                        className={clsx(
                          "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                          active
                            ? "bg-neutral-900 text-white"
                            : "text-neutral-700 hover:bg-neutral-100",
                        )}
                      >
                        <span className="min-w-0 truncate">{it.label}</span>
                        {flash ? (
                          <Check size={12} className="text-emerald-500" />
                        ) : dirty ? (
                          <span
                            className={clsx(
                              "inline-block h-1.5 w-1.5 rounded-full",
                              active ? "bg-white" : "bg-amber-500",
                            )}
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Editor pane */}
        <section className="rounded-xl border border-neutral-200 bg-white">
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 px-5 py-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900">{activeDef.label}</p>
              <p className="text-[11px] text-neutral-500">
                {activeDef.key} · {isDirty(activeKey) ? "Unsaved changes" : "Saved"}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {isDirty(activeKey) && (
                <Button variant="ghost" size="sm" onClick={() => revertKey(activeKey)}>
                  <RotateCw size={13} /> Revert
                </Button>
              )}
              <Button
                size="sm"
                disabled={!isDirty(activeKey) || savingKeys.has(activeKey)}
                onClick={() => saveKey(activeKey)}
              >
                {savingKeys.has(activeKey) ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Save size={13} />
                )}
                Save
              </Button>
            </div>
          </header>
          <div className="max-h-[76vh] overflow-y-auto p-5">
            <BlockEditor
              value={blocks[activeKey] ?? {}}
              onChange={(path, v) => setField(activeKey, path, v)}
            />
          </div>
        </section>

        {/* Preview pane */}
        {showPreview && (
          <section className="hidden overflow-hidden rounded-xl border border-neutral-200 bg-white lg:block">
            <header className="flex items-center justify-between gap-2 border-b border-neutral-200 px-4 py-2.5">
              <div className="flex items-center gap-2 text-[12px] text-neutral-600">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-neutral-300" />
                  <span className="h-2 w-2 rounded-full bg-neutral-300" />
                  <span className="h-2 w-2 rounded-full bg-neutral-300" />
                </span>
                <span className="truncate">{activeDef.preview}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    if (previewRef.current)
                      previewRef.current.src = previewRef.current.src;
                  }}
                  aria-label="Refresh preview"
                >
                  <RotateCw size={13} />
                </Button>
                <a
                  href={activeDef.preview}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-7 w-7 place-items-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Open in new tab"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </header>
            <iframe
              key={activeDef.preview}
              ref={previewRef}
              src={activeDef.preview}
              className="h-[76vh] w-full"
              title="Live preview"
            />
          </section>
        )}
      </div>
    </AdminPage>
  );
}

// ─────────────────────── Recursive JSON editor ───────────────────────
function BlockEditor({
  value,
  onChange,
  path = [],
}: {
  value: any;
  onChange: (path: string[], v: any) => void;
  path?: string[];
}) {
  if (value == null || typeof value !== "object") return null;

  if (Array.isArray(value)) {
    const move = (from: number, to: number) => {
      if (to < 0 || to >= value.length) return;
      const next = value.slice();
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      onChange(path, next);
    };
    const label = (item: any, i: number) => {
      if (typeof item === "string") return item.slice(0, 60) || `Item ${i + 1}`;
      if (item && typeof item === "object") {
        for (const k of ["label", "title", "q", "name", "heading", "value", "to"]) {
          if (typeof item[k] === "string" && item[k]) return item[k];
        }
      }
      return `Item ${i + 1}`;
    };

    return (
      <div className="space-y-2">
        {value.map((item: any, i: number) => (
          <details
            key={i}
            open={value.length <= 4}
            className="group rounded-lg border border-neutral-200 bg-neutral-50 open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5">
              <GripVertical size={13} className="text-neutral-400" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-800">
                {label(item, i)}
              </span>
              <span className="text-[10px] text-neutral-400">#{i + 1}</span>
              <div className="flex items-center gap-0.5" onClick={(e) => e.preventDefault()}>
                <button
                  type="button"
                  className="rounded p-1 text-neutral-500 hover:bg-neutral-100"
                  onClick={() => move(i, i - 1)}
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="rounded p-1 text-neutral-500 hover:bg-neutral-100"
                  onClick={() => move(i, i + 1)}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="rounded p-1 text-neutral-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => {
                    const next = value.slice();
                    next.splice(i, 1);
                    onChange(path, next);
                  }}
                  aria-label="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </summary>
            <div className="border-t border-neutral-100 p-3">
              {typeof item === "string" ? (
                <Textarea
                  rows={2}
                  value={item}
                  onChange={(e) => {
                    const next = value.slice();
                    next[i] = e.target.value;
                    onChange(path, next);
                  }}
                />
              ) : (
                <BlockEditor
                  value={item}
                  path={[...path, String(i)]}
                  onChange={(sub, v) => {
                    const next = value.slice();
                    const subPath = sub.slice(path.length + 1);
                    if (subPath.length === 0) {
                      next[i] = v;
                    } else {
                      const obj = structuredClone(next[i]);
                      let cur = obj;
                      for (let k = 0; k < subPath.length - 1; k++) {
                        cur[subPath[k]] ??= {};
                        cur = cur[subPath[k]];
                      }
                      cur[subPath[subPath.length - 1]] = v;
                      next[i] = obj;
                    }
                    onChange(path, next);
                  }}
                />
              )}
            </div>
          </details>
        ))}
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const template = value.length > 0
              ? (typeof value[0] === "string" ? "" : structuredClone(value[0]))
              : "";
            const next = value.slice();
            next.push(typeof template === "string" ? "" : blankify(template));
            onChange(path, next);
          }}
        >
          <Plus size={13} /> Add item
        </Button>
      </div>
    );
  }

  // object
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {Object.entries(value).map(([k, v]) => {
        const isLongString =
          typeof v === "string" &&
          (v.length > 80 ||
            ["subline", "body", "bio", "a", "quote", "description"].includes(k));
        const fieldPath = [...path, k];
        const spanFull = typeof v === "object" || isLongString;

        return (
          <div key={k} className={spanFull ? "md:col-span-2" : ""}>
            <Label className="text-xs capitalize text-neutral-600">
              {k.replace(/_/g, " ")}
            </Label>
            {typeof v === "string" ? (
              k === "icon" ? (
                <select
                  className="mt-1 h-9 w-full rounded-md border border-neutral-300 bg-white px-2 text-sm"
                  value={v}
                  onChange={(e) => onChange(fieldPath, e.target.value)}
                >
                  {iconKeys.map((ik) => (
                    <option key={ik} value={ik}>{ik}</option>
                  ))}
                </select>
              ) : k === "tint" ? (
                <select
                  className="mt-1 h-9 w-full rounded-md border border-neutral-300 bg-white px-2 text-sm"
                  value={v}
                  onChange={(e) => onChange(fieldPath, e.target.value)}
                >
                  <option value="accent">accent</option>
                  <option value="text">text</option>
                </select>
              ) : isLongString ? (
                <Textarea
                  rows={3}
                  value={v}
                  className="mt-1"
                  onChange={(e) => onChange(fieldPath, e.target.value)}
                />
              ) : (
                <Input
                  value={v}
                  className="mt-1"
                  onChange={(e) => onChange(fieldPath, e.target.value)}
                />
              )
            ) : typeof v === "number" ? (
              <Input
                type="number"
                value={v}
                className="mt-1"
                onChange={(e) => onChange(fieldPath, Number(e.target.value))}
              />
            ) : typeof v === "boolean" ? (
              <div className="mt-2">
                <input
                  type="checkbox"
                  checked={v}
                  onChange={(e) => onChange(fieldPath, e.target.checked)}
                />
              </div>
            ) : (
              <div className="mt-2 rounded-lg border border-neutral-200 p-3">
                <BlockEditor value={v} path={fieldPath} onChange={onChange} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function blankify(template: any): any {
  if (template == null) return "";
  if (Array.isArray(template)) return [];
  if (typeof template === "object") {
    const out: any = {};
    for (const k of Object.keys(template)) {
      const v = template[k];
      out[k] = typeof v === "string" ? "" : typeof v === "number" ? 0 : blankify(v);
    }
    return out;
  }
  if (typeof template === "string") return "";
  if (typeof template === "number") return 0;
  return template;
}
