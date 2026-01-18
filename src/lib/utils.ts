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
  linked: "https://www.linkedin.com/in/arvel-francisco/",
  x: "https://x.com/arvelfranc66681?s=21",
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
    tags: ["Next.js", "Tailwind CSS", "Shadcn", "React Flow", "TypeScript"],
    image: "/devkit-ss.png",
    github_link: "https://github.com/arvelfranciso0/dev-kit",
    preview_link: "https://devkit-tool.netlify.app/",
    role: "Frontend Developer",
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
