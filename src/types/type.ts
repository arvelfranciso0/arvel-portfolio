import type { profile, projects, skills } from "@/db/schema";

// Row types are inferred from the Drizzle schema in src/db/schema.ts
export type Profile = typeof profile.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;

export const skillNames = [
  // Frontend
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Svelte",
  "Tailwind CSS",
  "Bootstrap",
  "jQuery",
  "HTML",
  "CSS",
  "SCSS",
  "Redux",
  "Zustand",

  // Backend
  "Node.js",
  "Express",
  "C#",
  "ASP.NET",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "PHP",
  "Laravel",
  "CakePHP",
  "Ruby on Rails",
  "Go",

  // Databases
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "SQLite",
  "Redis",
  "Oracle",
  "Firebase",

  // Dev tools / Others
  "Git",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "Jest",
  "Cypress",
  "Webpack",
  "Vite",
  "Figma",
  "Photoshop",
  "OpenAI API",
  "OpenAI",
  "Storybook",
  "Rust",
  "CLI",
  "Socket.io",
  "React Flow",
  "Perplexity AI",
  "SEO",
  "Shadcn",
  "Electron",
  "Dify",
] as const;

export type SkillName = (typeof skillNames)[number];
