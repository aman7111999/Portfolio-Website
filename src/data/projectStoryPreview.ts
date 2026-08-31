export type ProjectStoryOverride = {
  short_description?: string;
  overview?: string;
  problem_statement?: string;
  research?: string;
  design_process?: string;
  solution?: string;
  outcome?: string;
  learnings?: string;
  metrics?: { label: string; value: string; hint?: string }[];
};

export const PROJECT_STORY_PREVIEW: Record<string, ProjectStoryOverride> = {};

export function applyProjectStoryPreview<T extends { slug: string }>(project: T): T {
  return project;
}
