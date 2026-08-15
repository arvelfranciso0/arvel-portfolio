"use client";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/lib/utils";
import { Project } from "@/types/type";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

function ProjectThumbnail({
  project,
  className,
  imageSize = 230,
}: {
  project: Project;
  className?: string;
  imageSize?: number;
}) {
  const PlaceholderIcon = project.placeholderIcon;

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br from-primary/70 to-primary/40 flex items-center justify-center ${className ?? ""}`}
    >
      {project.image ? (
        // Rendered at its native 230x230 size (not stretched) since the
        // source file is too low-res to upscale without blurring.
        <Image
          src={project.image}
          alt={project.title}
          width={imageSize}
          height={imageSize}
          className="object-contain"
        />
      ) : PlaceholderIcon ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(oklch(14% 0.01 55 / 0.15) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-background/15 flex items-center justify-center">
              <PlaceholderIcon
                size={26}
                strokeWidth={1.75}
                className="text-background/90"
              />
            </div>
            {project.placeholderLabel && (
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-background/70">
                {project.placeholderLabel}
              </span>
            )}
          </div>
        </>
      ) : (
        <span className="font-mono text-3xl font-bold tracking-wide text-background/85">
          {project.initials}
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden h-full flex flex-col">
      <ProjectThumbnail project={project} className="h-70" />
      <div className="px-4.5 pt-4 pb-5 flex flex-col flex-1 min-h-36">
        <div className="text-base font-bold text-foreground mb-1">
          {project.title}
        </div>
        <p className="text-sm text-muted-foreground mb-3.5">
          {project.description}
        </p>

        {project.preview_link && (
          <a
            href={project.preview_link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs font-semibold text-muted-foreground hover:text-primary hover:underline inline-flex items-center gap-0.5 mt-auto w-fit"
          >
            Live <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectSection() {
  return (
    <section id="work" className="px-6 sm:px-14 pb-20">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight mb-7">My Works</h2>
      </Reveal>

      <Parallax
        offset={20}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            delay={Math.min(index * 0.08, 0.32)}
            className="h-full"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </Parallax>
    </section>
  );
}
