import { defineTool } from "@lovable.dev/mcp-js";
import { experience } from "../data";

export default defineTool({
  name: "get_experience",
  title: "Work experience",
  description:
    "Return Aman Mishra's work experience — roles, companies, timelines, and highlights.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(experience, null, 2) }],
    structuredContent: { experience },
  }),
});
