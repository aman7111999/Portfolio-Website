import { defineMcp } from "@lovable.dev/mcp-js";
import listProjects from "./tools/list-projects";
import getAbout from "./tools/get-about";
import getExperience from "./tools/get-experience";
import contactInquiry from "./tools/contact-inquiry";

export default defineMcp({
  name: "aman-mishra-portfolio",
  title: "Aman Mishra — Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for exploring Aman Mishra's public portfolio profile. Case-study details are password-protected; list_projects returns public previews only. Use get_about and get_experience for background, and contact_inquiry only when a visitor explicitly asks to contact him.",
  tools: [listProjects, getAbout, getExperience, contactInquiry],
});
