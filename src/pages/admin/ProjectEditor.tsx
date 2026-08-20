import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";
import type { ProjectRow } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Save, Eye, X, Plus, CheckCircle2, Trash2 } from "lucide-react";
import { RichEditor } from "@/components/admin/RichEditor";
import { ImageGallery, type GalleryImage } from "@/components/admin/ImageUploader";
import { AdminPage } from "@/components/admin/AdminPage";
import { ProjectPresentationEditor } from "@/components/admin/ProjectPresentationEditor";
import { ProjectTypeEditor } from "@/components/admin/ProjectTypeEditor";
import { ProjectPreviewDialog } from "@/components/admin/ProjectPreviewDialog";
import { getProjectPresentation, type ProjectPresentation } from "@/lib/projectPresentation";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Draft = Partial<ProjectRow> & { title: string; slug: string };
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

const emptyDraft: Draft = {
  title: "",
  slug: "",
  short_description: "",
  overview: "",
  problem_statement: "",
  research: "",
  design_process: "",
  solution: "",
  outcome: "",
  learnings: "",
  role: "",
  duration: "",
  company: "",
  tools: [],
  tags: [],
  category: "",
  timeline: "",
  thumbnail_url: null,
  presentation: getProjectPresentation({ slug: "", title: "" }),
  gallery: [],
  links: [],
  metrics: [],
  featured: false,
  published: false,
  sort_order: 0,
};

export default function ProjectEditor() {
  const { id } = useParams();
  const isNew = !id;
  const nav = useNavigate();
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [dirty, setDirty] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ["project-edit", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        const loaded = data as unknown as Draft;
        setDraft({
          ...loaded,
          presentation: getProjectPresentation(loaded),
        });
        setDirty(false);
      }
      return data;
    },
  });

  useEffect(() => {
    if (isNew && !slugTouched && draft.title) {
      setDraft((d) => ({ ...d, slug: slugify(d.title) }));
    }
  }, [draft.title, slugTouched, isNew]);

  const save = useMutation({
    mutationFn: async (publish?: boolean) => {
      const payload: ProjectInsert = {
        title: draft.title,
        slug: draft.slug,
        short_description: draft.short_description,
        overview: draft.overview,
        problem_statement: draft.problem_statement,
        research: draft.research,
        design_process: draft.design_process,
        solution: draft.solution,
        outcome: draft.outcome,
        learnings: draft.learnings,
        role: draft.role,
        duration: draft.duration,
        company: draft.company,
        category: draft.category,
        timeline: draft.timeline,
        thumbnail_url: draft.thumbnail_url,
        featured: draft.featured ?? false,
        sort_order: draft.sort_order ?? 0,
        published: publish ?? draft.published ?? false,
        gallery: (draft.gallery ?? []) as Json,
        links: (draft.links ?? []) as Json,
        metrics: (draft.metrics ?? []) as Json,
        tools: draft.tools ?? [],
        tags: draft.tags ?? [],
        presentation: getProjectPresentation(draft) as unknown as Json,
      };
      if (isNew) {
        const { data, error } = await supabase
          .from("projects")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        return data.id as string;
      } else {
        const { error } = await supabase.from("projects").update(payload).eq("id", id!);
        if (error) throw error;
        return id!;
      }
    },
    onSuccess: (newId, publish) => {
      toast.success(publish ? "Published" : "Saved");
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project"] });
      setDirty(false);
      if (isNew) nav(`/admin/projects/${newId}`, { replace: true });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!isNew && isLoading)
    return (
      <div className="grid place-items-center py-20">
        <Loader2 className="animate-spin text-neutral-500" />
      </div>
    );

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setDirty(true);
  };

  const previewProject = {
    ...emptyDraft,
    ...draft,
    id: draft.id ?? "cms-preview",
    created_at: draft.created_at ?? new Date().toISOString(),
    updated_at: draft.updated_at ?? new Date().toISOString(),
    presentation: getProjectPresentation(draft),
  } as ProjectRow;

  return (
    <>
      <AdminPage
        wide
        crumbs={[
          { label: "Projects", to: "/admin/projects" },
          { label: draft.title || "New project" },
        ]}
        eyebrow={isNew ? "New project" : "Editing case study"}
        title={draft.title || "Untitled"}
        description={dirty ? "Unsaved changes" : "All changes saved"}
        actions={
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/projects">
                <ArrowLeft size={14} /> Back
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
              <Eye size={13} /> Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => save.mutate(false)}
              disabled={save.isPending}
            >
              {save.isPending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : dirty ? (
                <Save size={14} />
              ) : (
                <CheckCircle2 size={14} />
              )}{" "}
              Save draft
            </Button>
            <Button size="sm" onClick={() => save.mutate(true)} disabled={save.isPending}>
              {draft.published ? "Update" : "Publish"}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {/* Essentials */}
            <Section title="Essentials" description="Core identifiers shown across the site.">
              <div className="grid gap-4">
                <Field label="Title" required>
                  <Input
                    value={draft.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Project title"
                    className="h-11 text-lg"
                  />
                </Field>
                <Field label="Slug">
                  <div className="flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-3">
                    <span className="text-xs text-neutral-400">/projects/</span>
                    <Input
                      value={draft.slug}
                      onChange={(e) => {
                        set("slug", slugify(e.target.value));
                        setSlugTouched(true);
                      }}
                      className="h-9 border-0 bg-transparent px-0 focus-visible:ring-0"
                    />
                  </div>
                </Field>
                <Field label="Short description" hint="Shown on cards and index pages.">
                  <Textarea
                    rows={2}
                    value={draft.short_description ?? ""}
                    onChange={(e) => set("short_description", e.target.value)}
                  />
                </Field>
              </div>
            </Section>

            <ProjectTypeEditor
              slug={draft.slug}
              presentation={getProjectPresentation(draft)}
              onChange={(value) => set("presentation", value)}
            />

            <ProjectPresentationEditor
              slug={draft.slug}
              thumbnailUrl={draft.thumbnail_url ?? null}
              presentation={getProjectPresentation(draft)}
              onThumbnailChange={(value) => set("thumbnail_url", value)}
              onChange={(value: ProjectPresentation) => set("presentation", value)}
            />

            {/* Story */}
            <Section title="Case study" description="Long-form narrative sections.">
              <Tabs defaultValue="overview">
                <TabsList className="h-auto flex-wrap gap-1 bg-neutral-100">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="problem">Problem</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="design">Design process</TabsTrigger>
                  <TabsTrigger value="solution">Solution</TabsTrigger>
                  <TabsTrigger value="outcome">Outcome</TabsTrigger>
                  <TabsTrigger value="learnings">Learnings</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <TabsContent value="overview">
                    <RichEditor
                      value={draft.overview ?? ""}
                      onChange={(v) => set("overview", v)}
                      placeholder="Overview…"
                    />
                  </TabsContent>
                  <TabsContent value="problem">
                    <RichEditor
                      value={draft.problem_statement ?? ""}
                      onChange={(v) => set("problem_statement", v)}
                      placeholder="The problem…"
                    />
                  </TabsContent>
                  <TabsContent value="research">
                    <RichEditor
                      value={draft.research ?? ""}
                      onChange={(v) => set("research", v)}
                      placeholder="Research…"
                    />
                  </TabsContent>
                  <TabsContent value="design">
                    <RichEditor
                      value={draft.design_process ?? ""}
                      onChange={(v) => set("design_process", v)}
                      placeholder="Design process…"
                    />
                  </TabsContent>
                  <TabsContent value="solution">
                    <RichEditor
                      value={draft.solution ?? ""}
                      onChange={(v) => set("solution", v)}
                      placeholder="Solution…"
                    />
                  </TabsContent>
                  <TabsContent value="outcome">
                    <RichEditor
                      value={draft.outcome ?? ""}
                      onChange={(v) => set("outcome", v)}
                      placeholder="Outcome & impact…"
                    />
                  </TabsContent>
                  <TabsContent value="learnings">
                    <RichEditor
                      value={draft.learnings ?? ""}
                      onChange={(v) => set("learnings", v)}
                      placeholder="Reflections…"
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </Section>

            <Section title="Gallery" description="Drop images or drag to reorder.">
              <ImageGallery
                value={(draft.gallery as GalleryImage[]) ?? []}
                onChange={(v) => set("gallery", v)}
              />
            </Section>

            <Section title="Metrics" description="Impact numbers surfaced on the case study.">
              <MetricListEditor
                items={draft.metrics ?? []}
                onChange={(items) => set("metrics", items)}
              />
            </Section>

            <Section title="External links">
              <LinkListEditor items={draft.links ?? []} onChange={(items) => set("links", items)} />
            </Section>
          </div>

          <aside className="space-y-4">
            <Section title="Visibility">
              <div className="space-y-3">
                <Row>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Published</p>
                    <p className="text-xs text-neutral-500">Visible on the public site</p>
                  </div>
                  <Switch
                    checked={!!draft.published}
                    onCheckedChange={(v) => set("published", v)}
                  />
                </Row>
                <Row>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Featured</p>
                    <p className="text-xs text-neutral-500">Shown on the homepage</p>
                  </div>
                  <Switch checked={!!draft.featured} onCheckedChange={(v) => set("featured", v)} />
                </Row>
                <Field label="Sort order">
                  <Input
                    type="number"
                    value={draft.sort_order ?? 0}
                    onChange={(e) => set("sort_order", Number(e.target.value))}
                  />
                </Field>
              </div>
            </Section>

            <Section title="Details">
              <div className="space-y-3">
                <Field label="Role">
                  <Input value={draft.role ?? ""} onChange={(e) => set("role", e.target.value)} />
                </Field>
                <Field label="Company">
                  <Input
                    value={draft.company ?? ""}
                    onChange={(e) => set("company", e.target.value)}
                  />
                </Field>
                <Field label="Category">
                  <Input
                    value={draft.category ?? ""}
                    onChange={(e) => set("category", e.target.value)}
                  />
                </Field>
                <Field label="Duration">
                  <Input
                    value={draft.duration ?? ""}
                    onChange={(e) => set("duration", e.target.value)}
                    placeholder="6 months · 2024"
                  />
                </Field>
                <Field label="Timeline">
                  <Input
                    value={draft.timeline ?? ""}
                    onChange={(e) => set("timeline", e.target.value)}
                  />
                </Field>
              </div>
            </Section>

            <Section title="Tools">
              <ChipListEditor
                items={draft.tools ?? []}
                onChange={(v) => set("tools", v)}
                placeholder="Figma"
              />
            </Section>

            <Section title="Tags">
              <ChipListEditor
                items={draft.tags ?? []}
                onChange={(v) => set("tags", v)}
                placeholder="research"
              />
            </Section>
          </aside>
        </div>
      </AdminPage>
      <ProjectPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        project={previewProject}
      />
    </>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white">
      <header className="border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-neutral-500">{description}</p>}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2.5">
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1 text-xs">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-neutral-500">{hint}</p>}
    </div>
  );
}

function MetricListEditor({
  items,
  onChange,
}: {
  items: ProjectRow["metrics"];
  onChange: (items: ProjectRow["metrics"]) => void;
}) {
  const update = (index: number, value: ProjectRow["metrics"][number]) =>
    onChange(items.map((item, i) => (i === index ? value : item)));

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="grid gap-3 rounded-lg border border-neutral-200 p-4 md:grid-cols-[150px_1fr_1fr_auto]"
        >
          <Field label="Value">
            <Input
              value={item.value}
              placeholder="2M+"
              onChange={(event) => update(index, { ...item, value: event.target.value })}
            />
          </Field>
          <Field label="Label">
            <Input
              value={item.label}
              placeholder="Use cases"
              onChange={(event) => update(index, { ...item, label: event.target.value })}
            />
          </Field>
          <Field label="Supporting hint">
            <Input
              value={item.hint ?? ""}
              placeholder="Internal and external portfolios"
              onChange={(event) => update(index, { ...item, hint: event.target.value })}
            />
          </Field>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="self-end text-red-600"
            aria-label="Delete metric"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, { value: "", label: "", hint: "" }])}
      >
        <Plus size={14} /> Add metric
      </Button>
    </div>
  );
}

function LinkListEditor({
  items,
  onChange,
}: {
  items: ProjectRow["links"];
  onChange: (items: ProjectRow["links"]) => void;
}) {
  const update = (index: number, value: ProjectRow["links"][number]) =>
    onChange(items.map((item, i) => (i === index ? value : item)));

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="grid gap-3 rounded-lg border border-neutral-200 p-4 md:grid-cols-[180px_1fr_auto]"
        >
          <Field label="Label">
            <Input
              value={item.label}
              placeholder="Live product"
              onChange={(event) => update(index, { ...item, label: event.target.value })}
            />
          </Field>
          <Field label="URL">
            <Input
              value={item.url}
              placeholder="https://…"
              onChange={(event) => update(index, { ...item, url: event.target.value })}
            />
          </Field>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="self-end text-red-600"
            aria-label="Delete link"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, { label: "", url: "" }])}
      >
        <Plus size={14} /> Add link
      </Button>
    </div>
  );
}

function ChipListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [val, setVal] = useState("");
  const add = () => {
    const v = val.trim();
    if (!v) return;
    onChange([...items, v]);
    setVal("");
  };
  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={val}
          placeholder={placeholder}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button type="button" variant="outline" size="icon" onClick={add}>
          <Plus size={14} />
        </Button>
      </div>
      {items.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <Badge key={i} variant="secondary" className="gap-1">
              {item}
              <button
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className="hover:opacity-70"
                aria-label={`Remove ${item}`}
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
