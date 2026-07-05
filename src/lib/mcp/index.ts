import { defineMcp } from "@lovable.dev/mcp-js";
import listProjects from "./tools/list-projects";
import getProject from "./tools/get-project";
import getAbout from "./tools/get-about";
import getExperience from "./tools/get-experience";
import contactInquiry from "./tools/contact-inquiry";

export default defineMcp({
  name: "aman-mishra-portfolio",
  title: "Aman Mishra — Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for exploring Aman Mishra's product design portfolio. Use list_projects and get_project to reference case studies, get_about and get_experience for background, and contact_inquiry only when a visitor explicitly asks to contact him.",
  tools: [listProjects, getProject, getAbout, getExperience, contactInquiry],
});
