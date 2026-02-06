import ProjectPreviewLink from "@/app/projects/_components/projectPreviewLink";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getRoleColor } from "@/lib/utils";
import { Project, ProjectCardProps } from "@/types/type";
import { Terminal, Github, Code, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      className="group cursor-pointer flex flex-col bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#262626] rounded-xl overflow-hidden hover:border-black dark:hover:border-white hover:shadow-lg transition-all duration-300"
    >
      <div className="h-48 overflow-hidden relative border-b border-slate-100 dark:border-[#262626] bg-slate-100 dark:bg-neutral-900">
        {project.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${project.image}')` }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0d0d0d] transition-colors duration-500 group-hover:bg-slate-100 dark:group-hover:bg-[#111111]">
            {/* Background grid layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                linear-gradient(to right, gray 1px, transparent 1px),
                linear-gradient(to bottom, gray 1px, transparent 1px)
                  `,
                backgroundSize: "20px 20px",
                maskImage:
                  "radial-gradient(ellipse at center, black, transparent)",
                opacity: 0.03,
              }}
            />

            {/* Icon */}
            <div className="relative">
              <Terminal size={18} />
            </div>

            {/* Label */}
            <span className="mt-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-600">
              No Preview Available
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-4 w-full bg-linear-to-t from-black/60 to-transparent">
          <Badge className="bg-white text-black dark:bg-black dark:text-white border-none text-[10px] font-bold">
            <div className="flex items-center gap-2">
              <div
                className={`h-1.5 w-1.5 rounded-full ${getRoleColor(project.role)}`}
              />
              <span className="text-xs font-semibold">{project.role}</span>
            </div>
          </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <ProjectPreviewLink project={project} />
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} className="px-2 py-1 rounded-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
