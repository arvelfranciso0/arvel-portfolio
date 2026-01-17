import { LucideIcon } from "lucide-react";

export type Role =
  | "Full Stack"
  | "Backend Developer"
  | "UI/UX"
  | "Frontend Developer";

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: SkillName[];
  image?: string;
  github_link?: string;
  preview_link?: string;
  role?: Role;
  company?: string;
};

export type Skill = {
  name: SkillName;
  icon: LucideIcon;
};

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
  | "Shadcn";
