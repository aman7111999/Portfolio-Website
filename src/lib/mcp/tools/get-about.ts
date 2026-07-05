import { defineTool } from "@lovable.dev/mcp-js";
import { siteInfo, skills } from "../data";

export default defineTool({
  name: "get_about",
  title: "About Aman Mishra",
  description:
    "Return a concise profile: name, current role, location, tagline, availability, social links, and skill groups.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const about = { ...siteInfo, skills };
    return {
      content: [{ type: "text", text: JSON.stringify(about, null, 2) }],
      structuredContent: { about },
    };
  },
});
