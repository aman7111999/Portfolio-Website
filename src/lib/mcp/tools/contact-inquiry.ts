import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// Lazy client — env is read inside the handler, keeping the entry import-safe.
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Backend is not configured.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export default defineTool({
  name: "contact_inquiry",
  title: "Submit a contact inquiry",
  description:
    "Send a message to Aman Mishra on the visitor's behalf. Use only when the visitor has explicitly asked to contact him. Include the visitor's own name, email, and message — never invented values.",
  inputSchema: {
    name: z.string().trim().min(1).max(200).describe("Visitor's full name."),
    email: z.string().trim().email().max(320).describe("Visitor's email address."),
    message: z.string().trim().min(1).max(5000).describe("The message to send."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ name, email, message }) => {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from("contact_inquiries")
        .insert({ name, email, message, source: "mcp" });
      if (error) {
        return {
          content: [{ type: "text", text: `Could not send: ${error.message}` }],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text",
            text: `Thanks — your message was delivered to Aman. He'll reply to ${email}.`,
          },
        ],
        structuredContent: { delivered: true },
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      return { content: [{ type: "text", text: msg }], isError: true };
    }
  },
});
