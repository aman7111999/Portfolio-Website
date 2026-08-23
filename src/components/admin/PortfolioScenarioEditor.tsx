import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, ImagePlus, Plus, Trash2 } from "lucide-react";
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
import type { ProjectStoryScenario, ProjectStoryScreen } from "@/lib/projectPresentation";

const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function PortfolioScenarioEditor({
  slug,
  scenarios,
  onChange,
}: {
  slug: string;
  scenarios: ProjectStoryScenario[];
  onChange: (scenarios: ProjectStoryScenario[]) => void;
}) {
  const updateScenario = (index: number, scenario: ProjectStoryScenario) => {
    const next = [...scenarios];
    next[index] = scenario;
    onChange(next);
  };

  const moveScenario = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= scenarios.length) return;
    const next = [...scenarios];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addScenario = () => {
    const scenarioNumber = scenarios.length + 1;
    onChange([
      ...scenarios,
      {
        id: createId("scenario"),
        tab_label: `Portfolio view ${scenarioNumber}`,
        eyebrow: "Portfolio view",
        title: "Add a clear title for this portfolio view.",
        description: "Explain what this group of screens demonstrates.",
        screens: [createScreen(1)],
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Portfolio views and screens</p>
          <p className="mt-1 max-w-[66ch] text-xs leading-5 text-neutral-500">
            Each view becomes a public tab. Its screens appear in the left-side selector in the same
            order shown here.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={scenarios.length >= 12}
          onClick={addScenario}
        >
          <Plus size={14} /> Add portfolio view
        </Button>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario, index) => (
          <ScenarioPanel
            key={scenario.id}
            slug={slug}
            scenario={scenario}
            index={index}
            total={scenarios.length}
            onChange={(value) => updateScenario(index, value)}
            onMove={(direction) => moveScenario(index, direction)}
            onDelete={() => onChange(scenarios.filter((_, itemIndex) => itemIndex !== index))}
          />
        ))}
      </div>
    </div>
  );
}

function ScenarioPanel({
  slug,
  scenario,
  index,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  slug: string;
  scenario: ProjectStoryScenario;
  index: number;
  total: number;
  onChange: (scenario: ProjectStoryScenario) => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(index === 0);

  const updateScreen = (screenIndex: number, screen: ProjectStoryScreen) => {
    const screens = [...scenario.screens];
    screens[screenIndex] = screen;
    onChange({ ...scenario, screens });
  };

  const moveScreen = (screenIndex: number, direction: -1 | 1) => {
    const target = screenIndex + direction;
    if (target < 0 || target >= scenario.screens.length) return;
    const screens = [...scenario.screens];
    [screens[screenIndex], screens[target]] = [screens[target], screens[screenIndex]];
    onChange({ ...scenario, screens });
  };

  const addScreen = () =>
    onChange({
      ...scenario,
      screens: [...scenario.screens, createScreen(scenario.screens.length + 1)],
    });

  return (
    <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center gap-2 bg-neutral-50 p-3 sm:px-4">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-neutral-200 bg-white text-neutral-500">
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-neutral-900">
              {scenario.tab_label || `Portfolio view ${index + 1}`}
            </span>
            <span className="mt-0.5 block text-[11px] text-neutral-500">
              Tab {String(index + 1).padStart(2, "0")} · {scenario.screens.length} screen
              {scenario.screens.length === 1 ? "" : "s"}
            </span>
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-1">
          <ActionButton label="Move view up" disabled={index === 0} onClick={() => onMove(-1)}>
            <ChevronUp size={14} />
          </ActionButton>
          <ActionButton
            label="Move view down"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ChevronDown size={14} />
          </ActionButton>
          <ActionButton
            label="Delete portfolio view"
            disabled={total <= 1}
            destructive
            onClick={onDelete}
          >
            <Trash2 size={14} />
          </ActionButton>
        </div>
      </div>

      {open && (
        <div className="space-y-6 border-t border-neutral-200 p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <EditorField label="Tab label" hint="Keep this short so all tabs remain readable.">
              <Input
                value={scenario.tab_label}
                onChange={(event) => onChange({ ...scenario, tab_label: event.target.value })}
              />
            </EditorField>
            <EditorField label="Eyebrow">
              <Input
                value={scenario.eyebrow}
                onChange={(event) => onChange({ ...scenario, eyebrow: event.target.value })}
              />
            </EditorField>
            <div className="md:col-span-2">
              <EditorField label="View title">
                <Input
                  value={scenario.title}
                  onChange={(event) => onChange({ ...scenario, title: event.target.value })}
                />
              </EditorField>
            </div>
            <div className="md:col-span-2">
              <EditorField label="View description">
                <Textarea
                  rows={3}
                  value={scenario.description}
                  onChange={(event) => onChange({ ...scenario, description: event.target.value })}
                />
              </EditorField>
            </div>
          </div>

          <div className="space-y-3 border-t border-neutral-200 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Screen selector</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Reorder these to control the public left-side screen list.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={scenario.screens.length >= 24}
                onClick={addScreen}
              >
                <ImagePlus size={14} /> Add screen
              </Button>
            </div>

            {scenario.screens.map((screen, screenIndex) => (
              <div
                key={screen.id}
                className="grid gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 lg:grid-cols-[180px_minmax(0,1fr)]"
              >
                <SingleImageUpload
                  value={screen.image_url}
                  onChange={(image_url) => updateScreen(screenIndex, { ...screen, image_url })}
                  bucket="project-images"
                  prefix={`journey/${slug || "draft"}/${scenario.id}`}
                  aspect="portrait"
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Screen {String(screenIndex + 1).padStart(2, "0")}
                    </p>
                    <div className="flex items-center gap-1">
                      <ActionButton
                        label="Move screen up"
                        disabled={screenIndex === 0}
                        onClick={() => moveScreen(screenIndex, -1)}
                      >
                        <ChevronUp size={14} />
                      </ActionButton>
                      <ActionButton
                        label="Move screen down"
                        disabled={screenIndex === scenario.screens.length - 1}
                        onClick={() => moveScreen(screenIndex, 1)}
                      >
                        <ChevronDown size={14} />
                      </ActionButton>
                      <ActionButton
                        label="Delete screen"
                        disabled={scenario.screens.length <= 1}
                        destructive
                        onClick={() =>
                          onChange({
                            ...scenario,
                            screens: scenario.screens.filter(
                              (_, itemIndex) => itemIndex !== screenIndex,
                            ),
                          })
                        }
                      >
                        <Trash2 size={14} />
                      </ActionButton>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_150px]">
                    <EditorField label="Screen title">
                      <Input
                        value={screen.title}
                        onChange={(event) =>
                          updateScreen(screenIndex, { ...screen, title: event.target.value })
                        }
                      />
                    </EditorField>
                    <EditorField label="Theme">
                      <Select
                        value={screen.theme}
                        onValueChange={(theme: ProjectStoryScreen["theme"]) =>
                          updateScreen(screenIndex, { ...screen, theme })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="mixed">Mixed / uploaded</SelectItem>
                        </SelectContent>
                      </Select>
                    </EditorField>
                  </div>

                  <EditorField label="Screen description">
                    <Textarea
                      rows={2}
                      value={screen.description}
                      onChange={(event) =>
                        updateScreen(screenIndex, { ...screen, description: event.target.value })
                      }
                    />
                  </EditorField>

                  <EditorField label="Image description" hint="Used by screen readers.">
                    <Input
                      value={screen.image_alt}
                      onChange={(event) =>
                        updateScreen(screenIndex, { ...screen, image_alt: event.target.value })
                      }
                    />
                  </EditorField>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function createScreen(index: number): ProjectStoryScreen {
  return {
    id: createId("screen"),
    title: `Screen ${index}`,
    description: "Explain what this state demonstrates.",
    image_url: null,
    image_alt: `Portfolio Analysis screen ${index}`,
    theme: "mixed",
  };
}

function ActionButton({
  label,
  disabled,
  destructive = false,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  destructive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={`h-8 w-8 ${destructive ? "text-red-600 hover:text-red-700" : ""}`}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function EditorField({
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
      {hint && <p className="text-[11px] leading-4 text-neutral-500">{hint}</p>}
    </div>
  );
}
