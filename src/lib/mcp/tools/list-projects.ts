import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects, toSummary } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List case studies",
  description:
    "List Aman Mishra's product design case studies with title, company, role, category, summary, key metrics, and a link.",
  inputSchema: {
    featuredOnly: z
      .boolean()
      .optional()
      .describe("If true, return only projects marked as featured."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ featuredOnly }) => {
    const items = (featuredOnly ? projects.filter((p) => p.featured) : projects).map(
      toSummary,
    );
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { projects: items },
    };
  },
});
