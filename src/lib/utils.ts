import { Project, Role, Skill } from "@/types/type";
import { clsx, type ClassValue } from "clsx";
import {
  Cake,
  Code,
  Code2,
  Cpu,
  Database,
  FileCode,
  Globe,
  Hash,
  Layers,
  Palette,
  Server,
  Terminal,
  Zap,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const personalInfo = {
  fname: "Arvel",
  lastname: "Francisco",
  experience: "06",
  project_completed: "04",
  web_dev_interest_year: "2020",
  position: "Full Stack Engineer",
  isAvailable: false,
  email: "franciscoarvel123@gmail.com",
  country: "Philippines",
  province: "Cebu City",
  city: "Toledo City",
  fll_location: "Toledo City, Philippines",
  github: "https://github.com/arvelfranciso0",
  linked: "",
  x: "",
  fb: "",
  passion: ["Coding", "Clean Code"],
  status: "Building",
};

export const projects: Project[] = [
  {
    id: 1,
    title: "DevKit",
    description:
      "Professional-grade utilities for developers. All processing is done locally in your browser.",
    tags: ["Next.js", "Tailwind CSS", "Shadcn"],
    image: "/devkit-ss.png",
    github_link: "https://github.com/arvelfranciso0/dev-kit",
    preview_link: "https://devkit-tool.netlify.app/",
    role: "Frontend Developer",
  },
  {
    id: 2,
    title: "TaskMaster AI",
    description:
      "An intelligent productivity tool that uses AI to categorize tasks and suggest optimal scheduling.",
    tags: ["Next.js", "OpenAI API", "MongoDB"],
    role: "Backend Developer",
  },
  {
    id: 3,
    title: "CoinTrack Pro",
    description:
      "A real-time cryptocurrency portfolio tracker allowing users to monitor assets across exchanges.",
    tags: ["Vue.js", "Firebase", "Node.js"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxxseGj34wLwmRq_mPmrxep_f-9UGw8rMnyKgehPAiehUBPeAAzeWQvgSQp2vlHsm7OBa3CyhVAD4XypiXDNuAKUhkpo99sCeX7NHfTLpo2toaeIPqmeZ77neZO0VMuJ30W0u1E0gg4_d7PHKPFh9YLfApW9rQM9nZKW2WZsVwta3uVKHF3WfNnSniVKE7ZgVCunfdl_jN55T91PKw6lI3e3C-r8me2fGW6JW8anLEaPNucN2zphq6-cMqk6SnkxFNbLLlQttadZKV",
  },

  {
    id: 4,
    title: "TaskMaster AI",
    description:
      "An intelligent productivity tool that uses AI to categorize tasks and suggest optimal scheduling.",
    tags: ["Next.js", "OpenAI"],
    image: "2",
  },
  {
    id: 5,
    title: "CoinTrack Pro",
    description:
      "Real-time cryptocurrency portfolio tracker allowing users to monitor assets across multiple exchanges.",
    tags: ["Vue.js", "Firebase"],
    image: "3",
  },
  {
    id: 6,
    title: "Flux UI Kit",
    description:
      "A lightweight, accessible component library for React applications focusing on developer experience.",
    tags: ["TypeScript", "Storybook"],
    image: "1",
  },
  {
    id: 7,
    title: "DevFlow CLI",
    description:
      "Command line interface tool for scaffolding projects and managing local development environments.",
    tags: ["Rust", "CLI"],
    image: "2",
  },
  {
    id: 8,
    title: "Echo Chat",
    description:
      "End-to-end encrypted messaging application with real-time delivery and offline support.",
    tags: ["Socket.io", "Node.js"],
    image: "3",
  },
  {
    id: 9,
    title: "Metric API",
    description:
      "High-performance time-series data ingestion service built for scale and reliability.",
    tags: ["Go", "PostgreSQL"],
    image: "1",
  },
  {
    id: 10,
    title: "Vantage CMS",
    description:
      "A headless content management system designed for flexibility and rapid frontend development.",
    tags: ["Python", "Django"],
    image: "2",
  },
];

export const skills: Skill[] = [
  { name: "JavaScript", icon: Globe },
  { name: "TypeScript", icon: Code },
  { name: "React", icon: Cpu },
  { name: "Next.js", icon: Layers },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Node.js", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "C#", icon: Hash },
  { name: "ASP.NET", icon: Server },
  { name: "jQuery", icon: Zap },
  { name: "Laravel", icon: FileCode },
  { name: "Python", icon: Terminal },
  { name: "CakePHP", icon: Cake },
  { name: "MySQL", icon: Database },
  { name: "PHP", icon: Code2 },
];

export const filters = ["All Projects", ...skills.map((skill) => skill.name)];

export const getRoleColor = (role: Role) => {
  switch (role) {
    case "Full Stack":
      return "bg-blue-500";
    case "Backend Developer":
      return "bg-emerald-500";
    case "Frontend Developer":
      return "bg-amber-500";
    case "UI/UX":
      return "bg-purple-500";
    default:
      return "bg-slate-400";
  }
};
