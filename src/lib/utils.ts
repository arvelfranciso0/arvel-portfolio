import { Project, Role, Skill } from "@/types/type";
import { clsx, type ClassValue } from "clsx";
import {
  Bot,
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
  experience: "01",
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
    preview_link: "https://devkit-tool.netlify.app/",
    role: "Frontend Developer",
    collaborationNote:
      "This project was fully designed and implemented independently, from system architecture and UI design to feature development and tool integration.",
    workBreakdown: [
      {
        category: "System Architecture",
        themeColor: "text-purple-500",
        description:
          "Designed a modular and scalable tool architecture that allows tools to be grouped by purpose while sharing common UI and state logic.",
        tasks: [
          "Defined menu group structure for scalable tool organization",
          "Implemented reusable layouts for tool pages",
          "Designed consistent routing patterns across tool categories",
          "Ensured easy extensibility for future tools",
        ],
      },
      {
        category: "Text & Data Utilities",
        themeColor: " text-green-500",
        description:
          "Implemented productivity-focused tools for text manipulation and structured data handling.",
        tasks: [
          "Built regex validation and testing utility",
          "Implemented case conversion and slug generation tools",
          "Created JSON formatter, diff viewer, and data explorer",
          "Developed JSON ↔ CSV conversion utilities",
        ],
      },
      {
        category: "Generators & Optimization",
        themeColor: "text-orange-500",
        description:
          "Developed generators and optimization tools focused on developer experience and frontend efficiency.",
        tasks: [
          "Implemented secure password generator with entropy-based logic",
          "Built README Architect for composable documentation",
          "Created CSS shadow and color palette generators",
          "Integrated SVG optimization and HTML sanitization tools",
        ],
      },
      {
        category: "Design & Accessibility Tools",
        themeColor: "text-red-500",
        description:
          "Focused on design accuracy, responsiveness, and accessibility compliance.",
        tasks: [
          "Built unit conversion tools (PX, REM, VW, VH)",
          "Implemented WCAG contrast checker",
          "Created responsive typography scale using CSS clamp()",
          "Developed aspect ratio calculator for responsive layouts",
        ],
      },
      {
        category: "Developer Experience & Security",
        themeColor: " text-blue-500",
        description:
          "Enhanced developer workflows with debugging, security, and playground utilities.",
        tasks: [
          "Built JWT debugger and Bcrypt hashing utilities",
          "Implemented Markdown preview with GitHub-style rendering",
          "Created interactive Git command reference",
          "Developed live HTML/CSS/JS playground with instant preview",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Hybrid CMS",
    description:
      "An AI-driven CMS that generates SEO strategies, personas, website content, and banners using OpenAI and Perplexity.",
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
    role: "Full-Stack",
    company: "Client Project",
    collaborationNote:
      "I collaborated closely with the core developer to ensure seamless API compatibility and data flow between the Python-based AI logic and the PHP-based rendering engine.",
    workBreakdown: [
      {
        category: "Backend & AI Integration",
        themeColor: "text-blue-500",
        description:
          "Developed AI-powered features using FastAPI, integrating OpenAI to generate SEO strategies and persona-based content from Perplexity.",
        tasks: [
          "Exposed REST endpoints returning structured JSON responses.",
          "Engineered data structures used to dynamically build websites.",
        ],
      },
      {
        category: "CMS Implementation",
        themeColor: "text-purple-500",
        description:
          "Built with CakePHP, designed and implemented the frontend interface and application logic to handle AI-driven data flows.",
        tasks: [
          "Consumed Hybrid CMS endpoints to map AI responses to site content.",
          "Triggered automated banner generation via Hybrid CMS banner API.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Suggested Keyword",
    description:
      "A REST API service that retrieves Japan-localized autocomplete keywords, classifies suggested keywords, and processes keyword data through batch jobs for ongoing SEO analysis.",
    tags: ["Node.js", "Express", "MySQL", "REST API", "SEO"],
    role: "Backend Developer",
    company: "",
    collaborationNote:
      "System architecture and overall design were provided by another developer. I was responsible for implementing the REST API, keyword processing logic, database integration, and batch processing workflows.",
    workBreakdown: [
      {
        category: "API Development",
        themeColor: "text-green-500",
        description:
          "Designed and implemented RESTful endpoints for keyword autocomplete retrieval and classification.",
        tasks: [
          "Built REST API endpoints using Express to fetch Japan-based autocomplete keywords",
          "Validated and normalized keyword input data",
          "Handled API response mapping and error handling",
        ],
      },
      {
        category: "Keyword Processing",
        themeColor: "text-rose-500",
        description:
          "Implemented logic to classify and store suggested and non-suggested keywords.",
        tasks: [
          "Mapped autocomplete results to determine suggested keyword status",
          "Associated processed keywords with their corresponding main keywords",
          "Ensured data consistency before persisting results to MySQL",
        ],
      },
      {
        category: "Batch Processing",
        themeColor: "text-sky-500",
        description:
          "Developed batch workflows to reprocess historical keywords and keep data up to date.",
        tasks: [
          "Fetched previously stored main keywords from the database",
          "Re-ran autocomplete keyword analysis in batch mode",
          "Compared new results with existing records and updated suggestion status",
        ],
      },
      {
        category: "Database Design",
        themeColor: "text-amber-500",
        description:
          "Designed relational database structures for keyword storage and efficient querying.",
        tasks: [
          "Created MySQL tables for main keywords and autocomplete results",
          "Optimized queries for batch read and write operations",
          "Maintained data integrity across repeated batch executions",
        ],
      },
    ],
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
  { name: "Perplexity AI", icon: Bot },
  { name: "SEO", icon: Globe },
];

export const filters = ["All Projects", ...skills.map((skill) => skill.name)];

export const getRoleColor = (role: Role) => {
  switch (role) {
    case "Full-Stack":
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
