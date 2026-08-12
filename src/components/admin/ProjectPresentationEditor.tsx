import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type {
  ProjectJourneyItem,
  ProjectPresentation,
  ProjectSectionKey,
  ProjectVisualStyle,
} from "@/lib/projectPresentation";
import { PROJECT_SECTION_KEYS } from "@/lib/projectPresentation";
import { SingleImageUpload } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export function ProjectPresentationEditor({
  slug,
  thumbnailUrl,
  presentation,
  onThumbnailChange,
  onChange,
}: {
  slug: string;
  thumbnailUrl: string | null;
  presentation: ProjectPresentation;
  onThumbnailChange: (url: string | null) => void;
  onChange: (presentation: ProjectPresentation) => void;
}) {
  const update = <K extends keyof ProjectPresentation>(key: K, value: ProjectPresentation[K]) =>
    onChange({ ...presentation, [key]: value });

  const updateJourney = (index: number, item: ProjectJourneyItem) => {
    const journey = [...presentation.story.journey];
    journey[index] = item;
    update("story", { ...presentation.story, journey });
  };

  const moveJourney = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= presentation.story.journey.length) return;
    const journey = [...presentation.story.journey];
    [journey[index], journey[target]] = [journey[target], journey[index]];
    update("story", { ...presentation.story, journey });
  };

  const updateSection = (
    key: ProjectSectionKey,
    value: ProjectPresentation["sections"][ProjectSectionKey],
  ) => update("sections", { ...presentation.sections, [key]: value });

  return (
    <div className="space-y-5">
      <EditorPanel
        title="Card image"
        description="Controls the image shown on the homepage and Work project cards."
      >
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_240px]">
          <SingleImageUpload
            value={thumbnailUrl}
            onChange={onThumbnailChange}
            bucket="thumbnails"
            prefix={`projects/${slug || "draft"}`}
          />
          <div className="space-y-4">
            <VisualStyleField
              label="Card rendering"
              value={presentation.card.style}
              onChange={(style) => update("card", { ...presentation.card, style })}
              allowSignature={slug === "portfolio-analysis"}
            />
            <Field label="Image description" hint="Used by screen readers.">
              <Input
                value={presentation.card.image_alt}
                onChange={(event) =>
                  update("card", { ...presentation.card, image_alt: event.target.value })
                }
              />
            </Field>
            <Field label="Card eyebrow">
              <Input
                value={presentation.card.eyebrow}
                onChange={(event) =>
                  update("card", { ...presentation.card, eyebrow: event.target.value })
                }
              />
            </Field>
          </div>
        </div>
      </EditorPanel>

      <EditorPanel
        title="Case-study hero"
        description="Use a separate wide hero image, reuse the card image, or keep the generated visual."
      >
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_240px]">
          <SingleImageUpload
            value={presentation.hero.image_url}
            onChange={(image_url) => update("hero", { ...presentation.hero, image_url })}
            bucket="project-images"
            prefix={`heroes/${slug || "draft"}`}
          />
          <div className="space-y-4">
            <VisualStyleField
              label="Hero rendering"
              value={presentation.hero.style}
              onChange={(style) => update("hero", { ...presentation.hero, style })}
              allowSignature={slug === "portfolio-analysis"}
            />
            <Field label="Image description" hint="Used by screen readers and sharing previews.">
              <Input
                value={presentation.hero.image_alt}
                onChange={(event) =>
                  update("hero", { ...presentation.hero, image_alt: event.target.value })
                }
              />
            </Field>
          </div>
        </div>
      </EditorPanel>

      <EditorPanel
        title="Experience story"
        description="A CMS-controlled architecture and screen journey. It can be enabled for any project."
      >
        <div className="flex items-center justify-between gap-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <div>
            <p className="text-sm font-medium text-neutral-900">Show experience story</p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Displays the architecture model and replaceable screen journey.
            </p>
          </div>
          <Switch
            checked={presentation.story.enabled}
            onCheckedChange={(enabled) => update("story", { ...presentation.story, enabled })}
          />
        </div>

        {presentation.story.enabled && (
          <div className="mt-5 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Architecture eyebrow">
                <Input
                  value={presentation.story.eyebrow}
                  onChange={(event) =>
                    update("story", { ...presentation.story, eyebrow: event.target.value })
                  }
                />
              </Field>
              <Field label="Architecture title">
                <Input
                  value={presentation.story.title}
                  onChange={(event) =>
                    update("story", { ...presentation.story, title: event.target.value })
                  }
                />
              </Field>
              <div className="md:col-span-2">
                <Field label="Architecture description">
                  <Textarea
                    rows={3}
                    value={presentation.story.description}
                    onChange={(event) =>
                      update("story", {
                        ...presentation.story,
                        description: event.target.value,
                      })
                    }
                  />
                </Field>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Architecture nodes
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {presentation.story.architecture_nodes.slice(0, 4).map((node, index) => (
                  <div key={node.id} className="space-y-3 rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs font-semibold text-neutral-500">Stage {index + 1}</p>
                    <Input
                      value={node.eyebrow}
                      placeholder="Eyebrow"
                      onChange={(event) => {
                        const architecture_nodes = [...presentation.story.architecture_nodes];
                        architecture_nodes[index] = { ...node, eyebrow: event.target.value };
                        update("story", { ...presentation.story, architecture_nodes });
                      }}
                    />
                    <Input
                      value={node.title}
                      placeholder="Title"
                      onChange={(event) => {
                        const architecture_nodes = [...presentation.story.architecture_nodes];
                        architecture_nodes[index] = { ...node, title: event.target.value };
                        update("story", { ...presentation.story, architecture_nodes });
                      }}
                    />
                    <Input
                      value={node.description}
                      placeholder="Description"
                      onChange={(event) => {
                        const architecture_nodes = [...presentation.story.architecture_nodes];
                        architecture_nodes[index] = { ...node, description: event.target.value };
                        update("story", { ...presentation.story, architecture_nodes });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Journey eyebrow">
                <Input
                  value={presentation.story.journey_eyebrow}
                  onChange={(event) =>
                    update("story", {
                      ...presentation.story,
                      journey_eyebrow: event.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Journey title">
                <Input
                  value={presentation.story.journey_title}
                  onChange={(event) =>
                    update("story", {
                      ...presentation.story,
                      journey_title: event.target.value,
                    })
                  }
                />
              </Field>
              <div className="md:col-span-2">
                <Field label="Journey description">
                  <Textarea
                    rows={2}
                    value={presentation.story.journey_description}
                    onChange={(event) =>
                      update("story", {
                        ...presentation.story,
                        journey_description: event.target.value,
                      })
                    }
                  />
                </Field>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Journey screens</p>
                  <p className="text-xs text-neutral-500">
                    Upload any screen to replace its generated fallback.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    update("story", {
                      ...presentation.story,
                      journey: [
                        ...presentation.story.journey,
                        {
                          id: `step-${Date.now()}`,
                          title: "New journey step",
                          description: "",
                          image_url: null,
                        },
                      ],
                    })
                  }
                >
                  <Plus size={14} /> Add screen
                </Button>
              </div>

              {presentation.story.journey.map((item, index) => (
                <div
                  key={item.id}
                  className="grid gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 md:grid-cols-[220px_minmax(0,1fr)]"
                >
                  <SingleImageUpload
                    value={item.image_url}
                    onChange={(image_url) => updateJourney(index, { ...item, image_url })}
                    bucket="project-images"
                    prefix={`journey/${slug || "draft"}`}
                    aspect="portrait"
                  />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Step {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="Move up"
                          disabled={index === 0}
                          onClick={() => moveJourney(index, -1)}
                        >
                          <ChevronUp size={14} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="Move down"
                          disabled={index === presentation.story.journey.length - 1}
                          onClick={() => moveJourney(index, 1)}
                        >
                          <ChevronDown size={14} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          aria-label="Delete screen"
                          onClick={() =>
                            update("story", {
                              ...presentation.story,
                              journey: presentation.story.journey.filter((_, i) => i !== index),
                            })
                          }
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <Field label="Title">
                      <Input
                        value={item.title}
                        onChange={(event) =>
                          updateJourney(index, { ...item, title: event.target.value })
                        }
                      />
                    </Field>
                    <Field label="Description">
                      <Textarea
                        rows={3}
                        value={item.description}
                        onChange={(event) =>
                          updateJourney(index, { ...item, description: event.target.value })
                        }
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </EditorPanel>

      <EditorPanel
        title="Section controls"
        description="Rename, relabel, or hide every case-study chapter without deleting its content."
      >
        <div className="space-y-3">
          {PROJECT_SECTION_KEYS.map((key) => {
            const section = presentation.sections[key];
            return (
              <div key={key} className="rounded-lg border border-neutral-200 p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold capitalize text-neutral-900">{key}</p>
                    <p className="text-xs text-neutral-500">Public case-study section</p>
                  </div>
                  <Switch
                    checked={section.visible}
                    onCheckedChange={(visible) => updateSection(key, { ...section, visible })}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <Field label="Case map label">
                    <Input
                      value={section.label}
                      onChange={(event) =>
                        updateSection(key, { ...section, label: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="Eyebrow">
                    <Input
                      value={section.eyebrow}
                      onChange={(event) =>
                        updateSection(key, { ...section, eyebrow: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="Heading">
                    <Input
                      value={section.title}
                      onChange={(event) =>
                        updateSection(key, { ...section, title: event.target.value })
                      }
                    />
                  </Field>
                </div>
              </div>
            );
          })}
        </div>
      </EditorPanel>

      <EditorPanel
        title="Gallery presentation"
        description="Controls the public gallery heading and introduction."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              value={presentation.gallery.eyebrow}
              onChange={(event) =>
                update("gallery", { ...presentation.gallery, eyebrow: event.target.value })
              }
            />
          </Field>
          <Field label="Heading">
            <Input
              value={presentation.gallery.title}
              onChange={(event) =>
                update("gallery", { ...presentation.gallery, title: event.target.value })
              }
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description">
              <Textarea
                rows={2}
                value={presentation.gallery.description}
                onChange={(event) =>
                  update("gallery", {
                    ...presentation.gallery,
                    description: event.target.value,
                  })
                }
              />
            </Field>
          </div>
        </div>
      </EditorPanel>

      <EditorPanel
        title="Prototype presentation"
        description="Controls the heading and explanation shown when a Figma or prototype link is added."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              value={presentation.prototype.eyebrow}
              onChange={(event) =>
                update("prototype", {
                  ...presentation.prototype,
                  eyebrow: event.target.value,
                })
              }
            />
          </Field>
          <Field label="Heading">
            <Input
              value={presentation.prototype.title}
              onChange={(event) =>
                update("prototype", {
                  ...presentation.prototype,
                  title: event.target.value,
                })
              }
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description">
              <Textarea
                rows={3}
                value={presentation.prototype.description}
                onChange={(event) =>
                  update("prototype", {
                    ...presentation.prototype,
                    description: event.target.value,
                  })
                }
              />
            </Field>
          </div>
        </div>
      </EditorPanel>

      <EditorPanel
        title="Page labels"
        description="Controls navigation, metadata, technology, tag, and link labels on this case study."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["back_to_work", "Back link"],
              ["company", "Company label"],
              ["timeline", "Timeline label"],
              ["role", "Role label"],
              ["duration", "Duration label"],
              ["category", "Category label"],
              ["case_map", "Case map heading"],
              ["technology", "Technology heading"],
              ["tags", "Tags heading"],
              ["external_links", "External links heading"],
              ["previous_project", "Previous project label"],
              ["next_project", "Next project label"],
            ] as [keyof ProjectPresentation["labels"], string][]
          ).map(([key, label]) => (
            <Field key={key} label={label}>
              <Input
                value={presentation.labels[key]}
                onChange={(event) =>
                  update("labels", { ...presentation.labels, [key]: event.target.value })
                }
              />
            </Field>
          ))}
        </div>
      </EditorPanel>

      <EditorPanel
        title="SEO & sharing"
        description="Overrides the project title and description used by search and social previews."
      >
        <div className="grid gap-4">
          <Field label="SEO title">
            <Input
              value={presentation.seo.title}
              onChange={(event) =>
                update("seo", { ...presentation.seo, title: event.target.value })
              }
            />
          </Field>
          <Field label="SEO description">
            <Textarea
              rows={3}
              value={presentation.seo.description}
              onChange={(event) =>
                update("seo", { ...presentation.seo, description: event.target.value })
              }
            />
          </Field>
          <p className="text-xs text-neutral-500">
            The hero image is used for the social preview when one is uploaded; otherwise the card
            image is used.
          </p>
        </div>
      </EditorPanel>

      <EditorPanel
        title="Bottom call to action"
        description="Controls the closing message and destination on this project page."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              value={presentation.cta.eyebrow}
              onChange={(event) =>
                update("cta", { ...presentation.cta, eyebrow: event.target.value })
              }
            />
          </Field>
          <Field label="Heading">
            <Input
              value={presentation.cta.title}
              onChange={(event) =>
                update("cta", { ...presentation.cta, title: event.target.value })
              }
            />
          </Field>
          <Field label="Button label">
            <Input
              value={presentation.cta.label}
              onChange={(event) =>
                update("cta", { ...presentation.cta, label: event.target.value })
              }
            />
          </Field>
          <Field label="Button URL">
            <Input
              value={presentation.cta.url}
              onChange={(event) => update("cta", { ...presentation.cta, url: event.target.value })}
            />
          </Field>
        </div>
      </EditorPanel>
    </div>
  );
}

function VisualStyleField({
  label,
  value,
  onChange,
  allowSignature,
}: {
  label: string;
  value: ProjectVisualStyle;
  onChange: (value: ProjectVisualStyle) => void;
  allowSignature: boolean;
}) {
  return (
    <Field label={label} hint="Automatic uses an uploaded image first, then the project fallback.">
      <Select value={value} onValueChange={(next) => onChange(next as ProjectVisualStyle)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Automatic</SelectItem>
          <SelectItem value="image">Uploaded image</SelectItem>
          {allowSignature && <SelectItem value="signature">Signature visual</SelectItem>}
          <SelectItem value="generated">Generated fallback</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  );
}

function EditorPanel({
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
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-neutral-500">{description}</p>}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
      {hint && <p className="text-[11px] text-neutral-500">{hint}</p>}
    </div>
  );
}
