import { clsx, type ClassValue } from "clsx";
import {
  Cloud,
  Code,
  Cpu,
  Database,
  Globe,
  Layers,
  Palette,
  Terminal,
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

export const projects = [
  {
    title: "Nexus Dashboard",
    description:
      "A comprehensive analytics dashboard featuring real-time data visualization and user management.",
    tags: ["React", "Tailwind", "D3.js"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCziC55FhsBhejW5iK_HBpE8KpZhk8vxtUVtAevko7rWoEYSEuqMhsjI2xZXgu2SzpuHlV1UxJWpEL3iZ71Vd0UO45OqA9qzEkKt5AmzmZ61s48FTq9BmzQdyXqS9xV298eCCJTaDcpcvCmmRYRgoIeRWmb3hzedkowssFsQbpn-WMCMH3h67ljdJBD-6SEwGxDQBoG5nykZPSqDRJIXUlIhDdcjyYaciie7keOpOk-hr5CXKy1zeeyvdhSOIlEPVP9V-2fwdRgRSFj",
  },
  {
    title: "TaskMaster AI",
    description:
      "An intelligent productivity tool that uses AI to categorize tasks and suggest optimal scheduling.",
    tags: ["Next.js", "OpenAI API", "MongoDB"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7XTuTVt9K1Ltjd1-gfHyUSyoADhtFZWIYgnfMXIQtQ7BhMmcU5reGuErnkZ5b_skMjkUehuiy6Sh5gLzoU0cKl5KGwbI7k2VapXdboQRHAUqEsSXjlfdGXIYhDhTwGqcrlQJWoveFxVw3GlQJ6VG1kuXmGmqllzwYLuPeh2veHyg34EpoYG0YPpjh_m_cdNXa60gZQuU2VYnfxFjhrEnd3tszIjCuEV3ekgM4awW8RViGTPMJXy3XjvGRCxP8ejChsWVV4L8GuaYP",
  },
  {
    title: "CoinTrack Pro",
    description:
      "A real-time cryptocurrency portfolio tracker allowing users to monitor assets across exchanges.",
    tags: ["Vue.js", "Firebase", "Node.js"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxxseGj34wLwmRq_mPmrxep_f-9UGw8rMnyKgehPAiehUBPeAAzeWQvgSQp2vlHsm7OBa3CyhVAD4XypiXDNuAKUhkpo99sCeX7NHfTLpo2toaeIPqmeZ77neZO0VMuJ30W0u1E0gg4_d7PHKPFh9YLfApW9rQM9nZKW2WZsVwta3uVKHF3WfNnSniVKE7ZgVCunfdl_jN55T91PKw6lI3e3C-r8me2fGW6JW8anLEaPNucN2zphq6-cMqk6SnkxFNbLLlQttadZKV",
  },
];

export const skills = [
  { name: "JavaScript", icon: Globe },
  { name: "TypeScript", icon: Code },
  { name: "React", icon: Cpu },
  { name: "Next.js", icon: Layers },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Node.js", icon: Terminal },
  { name: "AWS", icon: Cloud },
  { name: "PostgreSQL", icon: Database },
];
