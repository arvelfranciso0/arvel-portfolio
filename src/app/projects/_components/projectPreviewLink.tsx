import { Project, ProjectCardProps } from "@/types/type";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ProjectPreviewLink({ project }: ProjectCardProps) {
  return (
    <div className="flex justify-between items-start gap-3 mb-3">
      <div className="flex flex-col mb-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-neutral-500 font-bold mb-1">
          {project.company || "Independent Project"}
        </span>
        {project.preview_link ? (
          <Link
            href={`${project.preview_link}`}
            className="text-xl font-black tracking-tight group-hover:underline decoration-2 underline-offset-4"
            target="_blank"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {project.title}
          </Link>
        ) : (
          <span className="text-xl font-black tracking-tight decoration-2 ">
            {" "}
            {project.title}
          </span>
        )}
      </div>
      <div className="flex gap-3 text-slate-400 dark:text-slate-500">
        {project.preview_link && (
          <Link
            href={`${project.preview_link}`}
            className="hover:text-black dark:hover:text-white transition-colors"
            target="_blank"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ExternalLink size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}
