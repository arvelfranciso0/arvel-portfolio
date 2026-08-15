import type { LucideIcon } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  /** Two-letter monogram shown on the card's favicon-style badge, and on the thumbnail when no image or placeholder icon is set */
  initials: string;
  /** Thumbnail image path; when absent, the thumbnail falls back to a placeholder */
  image?: string;
  /** Tech stack shown in the "Read More" detail dialog */
  tags?: SkillName[];
  /** Live URL; when present, the card shows a "Live" link */
  preview_link?: string;
  /** Icon + label shown on the thumbnail when there's no screenshot to show (e.g. client work under NDA) */
  placeholderIcon?: LucideIcon;
  placeholderLabel?: string;
}

export interface Skill {
  name: SkillName;
  /** URL to the skill's icon; when absent, render a text-fallback badge */
  icon?: string;
}

export type SkillName =
  // Frontend
  | "JavaScript"
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Vue.js"
  | "Angular"
  | "Svelte"
  | "Tailwind CSS"
  | "Bootstrap"
  | "jQuery"
  | "HTML"
  | "CSS"
  | "SCSS"
  | "Redux"
  | "Zustand"

  // Backend
  | "Node.js"
  | "Express"
  | "C#"
  | "ASP.NET"
  | "Python"
  | "Django"
  | "Flask"
  | "FastAPI"
  | "PHP"
  | "Laravel"
  | "CakePHP"
  | "Ruby on Rails"
  | "Go"

  // Databases
  | "PostgreSQL"
  | "MySQL"
  | "MongoDB"
  | "SQLite"
  | "Redis"
  | "Oracle"
  | "Firebase"

  // Dev tools / Others
  | "Git"
  | "Docker"
  | "Kubernetes"
  | "GraphQL"
  | "REST API"
  | "Jest"
  | "Cypress"
  | "Webpack"
  | "Vite"
  | "Tailwind CSS"
  | "Figma"
  | "Photoshop"
  | "OpenAI API"
  | "OpenAI"
  | "Storybook"
  | "Rust"
  | "CLI"
  | "Socket.io"
  | "React Flow"
  | "Perplexity AI"
  | "SEO"
  | "Shadcn"
  | "Electron"
  | "Dify";
