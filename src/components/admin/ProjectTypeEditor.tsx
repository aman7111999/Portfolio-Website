import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import type {
  ProjectComparisonStage,
  ProjectPresentation,
  ProjectType,
} from "@/lib/projectPresentation";

export function ProjectTypeEditor({
  slug,
  presentation,
  onChange,
}: {
  slug: string;
  presentation: ProjectPresentation;
  onChange: (presentation: ProjectPresentation) => void;
}) {
  const updateType = (type: ProjectType) => {
    const currentEyebrow = presentation.card.eyebrow.trim();
    const shouldUseTypeDefault =
      currentEyebrow === "" ||
      currentEyebrow === "Case study" ||
      currentEyebrow === "Revamp comparison";

    onChange({
      ...presentation,
      type,
      card: {
        ...presentation.card,
        eyebrow: shouldUseTypeDefault
          ? type === "revamp_comparison"
            ? "Revamp comparison"
            : "Case study"
          : presentation.card.eyebrow,
      },
    });
  };

  const updateStage = (index: number, value: ProjectComparisonStage) => {
    const stages = [...presentation.comparison.stages];
    stages[index] = value;
    onChange({
      ...presentation,
      comparison: { ...presentation.comparison, stages },
    });
  };

  const moveStage = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= presentation.comparison.stages.length) return;
    const stages = [...presentation.comparison.stages];
    [stages[index], stages[target]] = [stages[target], stages[index]];
    onChange({
      ...presentation,
      comparison: { ...presentation.comparison, stages },
    });
  };

  const addStage = () => {
    if (presentation.comparison.stages.length >= 3) return;
    const stage: ProjectComparisonStage = {
      id: `stage-${Date.now()}`,
      label: "Previous",
      title: "Previous revamp",
      timeframe: "Version 02",
      image_url: null,
      image_alt: "Previous product design revamp",
      description: "Explain what improved in this version and what still needed refinement.",
      highlights: ["What improved", "What remained unresolved"],
    };
    const stages = [...presentation.comparison.stages];
    stages.splice(Math.max(stages.length - 1, 1), 0, stage);
    onChange({
      ...presentation,
      comparison: { ...presentation.comparison, stages },
    });
  };

  const removeStage = (index: number) => {
    if (presentation.comparison.stages.length <= 2) return;
    onChange({
      ...presentation,
      comparison: {
        ...presentation.comparison,
        stages: presentation.comparison.stages.filter((_, stageIndex) => stageIndex !== index),
      },
    });
  };

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Project format</p>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-neutral-500">
            Both formats stay inside the same Projects collection. The selected format controls the
            public case-study layout.
          </p>
        </div>
        <Field label="Project type">
          <Select
            value={presentation.type}
            onValueChange={(value) => updateType(value as ProjectType)}
          >
            <SelectTrigger className="h-11 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="case_study">Standard case study</SelectItem>
              <SelectItem value="revamp_comparison">Revamp comparison</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      {presentation.type === "revamp_comparison" && (
        <div className="mt-6 border-t border-neutral-200 pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Comparison eyebrow">
              <Input
                value={presentation.comparison.eyebrow}
                onChange={(event) =>
                  onChange({
                    ...presentation,
                    comparison: {
                      ...presentation.comparison,
                      eyebrow: event.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Comparison heading">
              <Input
                value={presentation.comparison.title}
                onChange={(event) =>
                  onChange({
                    ...presentation,
                    comparison: {
                      ...presentation.comparison,
                      title: event.target.value,
                    },
                  })
                }
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Comparison introduction">
                <Textarea
                  rows={3}
                  value={presentation.comparison.description}
                  onChange={(event) =>
                    onChange({
                      ...presentation,
                      comparison: {
                        ...presentation.comparison,
                        description: event.target.value,
                      },
                    })
                  }
                />
              </Field>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-neutral-900">Design versions</p>
              <p className="mt-1 text-xs text-neutral-500">
                Keep two versions for before and after, or add a third previous revamp.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addStage}
              disabled={presentation.comparison.stages.length >= 3}
              className="w-full sm:w-auto"
            >
              <Plus size={14} /> Add third version
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {presentation.comparison.stages.map((stage, index) => (
              <article
                key={stage.id}
                className="grid min-w-0 gap-5 rounded-xl border border-neutral-200 bg-neutral-50 p-4 lg:grid-cols-[240px_minmax(0,1fr)]"
              >
                <SingleImageUpload
                  value={stage.image_url}
                  onChange={(image_url) => updateStage(index, { ...stage, image_url })}
                  bucket="project-images"
                  prefix={`comparisons/${slug || "draft"}/${stage.id}`}
                  aspect="portrait"
                />

                <div className="min-w-0 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Version {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        aria-label="Move version up"
                        disabled={index === 0}
                        onClick={() => moveStage(index, -1)}
                      >
                        <ChevronUp size={14} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        aria-label="Move version down"
                        disabled={index === presentation.comparison.stages.length - 1}
                        onClick={() => moveStage(index, 1)}
                      >
                        <ChevronDown size={14} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-red-600 hover:text-red-700"
                        aria-label="Delete version"
                        disabled={presentation.comparison.stages.length <= 2}
                        onClick={() => removeStage(index)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Stage label">
                      <Input
                        value={stage.label}
                        placeholder="Oldest, Previous, Latest"
                        onChange={(event) =>
                          updateStage(index, { ...stage, label: event.target.value })
                        }
                      />
                    </Field>
                    <Field label="Timeframe">
                      <Input
                        value={stage.timeframe}
                        placeholder="2023 or Version 01"
                        onChange={(event) =>
                          updateStage(index, { ...stage, timeframe: event.target.value })
                        }
                      />
                    </Field>
                    <Field label="Version title">
                      <Input
                        value={stage.title}
                        onChange={(event) =>
                          updateStage(index, { ...stage, title: event.target.value })
                        }
                      />
                    </Field>
                    <Field label="Image description" hint="Used by screen readers.">
                      <Input
                        value={stage.image_alt}
                        onChange={(event) =>
                          updateStage(index, { ...stage, image_alt: event.target.value })
                        }
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="What changed in this version">
                        <Textarea
                          rows={3}
                          value={stage.description}
                          onChange={(event) =>
                            updateStage(index, { ...stage, description: event.target.value })
                          }
                        />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Key points" hint="Add one point per line, up to six.">
                        <Textarea
                          rows={3}
                          value={stage.highlights.join("\n")}
                          onChange={(event) =>
                            updateStage(index, {
                              ...stage,
                              highlights: event.target.value
                                .split("\n")
                                .map((item) => item.trim())
                                .filter(Boolean)
                                .slice(0, 6),
                            })
                          }
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
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
      <Label className="text-xs font-medium text-neutral-700">{label}</Label>
      {children}
      {hint && <p className="text-[11px] leading-4 text-neutral-400">{hint}</p>}
    </div>
  );
}
