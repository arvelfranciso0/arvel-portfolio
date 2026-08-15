import { Project, Skill } from "@/types/type";
import { clsx, type ClassValue } from "clsx";
import { RefreshCw, Server, Sparkles } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const projects: Project[] = [
  {
    id: 1,
    title: "DevKit",
    description: "Developer utilities that run entirely in the browser.",
    initials: "DK",
    image: "/dev-logo.png",
    tags: ["Next.js", "Tailwind CSS", "Shadcn", "React Flow", "TypeScript"],
    preview_link: "https://devkit-tool.netlify.app/",
  },
  {
    id: 2,
    title: "Lumen",
    description: "A presentation tool for worship teams.",
    initials: "LM",
    tags: ["Next.js", "Electron", "SQLite"],
    preview_link: "https://lumen-worship.netlify.app/",
    image: "/lumen-logo-1.png",
  },
    {
    id: 3,
    title: "Spendr",
    description: "Simple expenses tracker web application.",
    initials: "SP",
    preview_link: "https://spendr-track.netlify.app/",
    image: "/spendr-logo.png",
  },
  {
    id: 4,
    title: "Hybrid CMS",
    description:
      "AI-driven CMS generating SEO strategies, personas, content, and banners via OpenAI and Perplexity.",
    initials: "HC",
    tags: [
      "FastAPI",
      "Python",
      "OpenAI",
      "CakePHP",
      "MySQL",
      "Perplexity AI",
      "JavaScript",
      "SEO",
    ],
    placeholderIcon: Sparkles,
    placeholderLabel: "Client Project",
  },
  {
    id: 5,
    title: "Suggested Keyword",
    description:
      "REST API for Japan-localized autocomplete and keyword classification with batch processing.",
    initials: "SK",
    tags: ["Node.js", "Express", "MySQL", "REST API", "SEO"],
    placeholderIcon: Server,
    placeholderLabel: "Client Project",
  },
  {
    id: 6,
    title: "GOAT",
    description:
      "Migrated a legacy VB.NET app to a Next.js frontend with a Laravel API.",
    initials: "GT",
    tags: ["Laravel", "Next.js"],
    placeholderIcon: RefreshCw,
    placeholderLabel: "Client Project",
  },
];

export const personalInfo = {
  fname: "Arvel",
  lastname: "Francisco",
  experience: "02",
  project_completed: `0${projects.length}`,
  web_dev_interest_year: "2020",
  position: "Full Stack Engineer",
  isAvailable: false,
  email: "franciscoarvel123@gmail.com",
  country: "Philippines",
  province: "Cebu City",
  city: "Toledo City",
  fll_location: "Toledo City, Philippines",
  github: "https://github.com/arvelfranciso0",
  linked: "https://www.linkedin.com/in/arvel-francisco/",
  x: "https://x.com/arvelfranc66681?s=21",
  fb: "",
  passion: ["Coding", "Clean Code"],
  status: "Building",
};

export const skills: Skill[] = [
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/f7df1e" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61dafb" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.simpleicons.org/tailwindcss/38bdf8",
  },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5fa04e" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169e1" },
  { name: "C#" },
  { name: "ASP.NET", icon: "https://cdn.simpleicons.org/dotnet/512bd4" },
  { name: "jQuery", icon: "https://cdn.simpleicons.org/jquery/0769ad" },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/ff2d20" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776ab" },
  { name: "CakePHP", icon: "https://cdn.simpleicons.org/cakephp/d33c43" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479a1" },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777bb4" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/ffca28" },
  { name: "SQLite", icon: "https://cdn.simpleicons.org/sqlite/003b57" },
  { name: "Shadcn", icon: "https://cdn.simpleicons.org/shadcnui/ffffff" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ed" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/f05032" },
  { name: "Dify", icon: "https://cdn.simpleicons.org/dify/0033ff" },
  {
    name: "Perplexity AI",
    icon: "https://cdn.simpleicons.org/perplexity/1fb8cd",
  },
  { name: "SEO", icon: "https://cdn.simpleicons.org/semrush/ffffff" },
];
