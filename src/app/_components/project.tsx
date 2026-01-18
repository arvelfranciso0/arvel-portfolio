"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getRoleColor, projects } from "@/lib/utils";
import { ArrowRight, Github, Terminal } from "lucide-react";
import Link from "next/link";
import ProjectCard from "../../components/shared/project-card";

export default function ProjectSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          {/* Text Content */}
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Works
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              A focused look at the projects I&apos;ve led and developed
              recently.
            </p>
          </div>

          {/* Action Button */}
          <Button
            variant="ghost"
            asChild
            className="group w-fit -ml-4 md:ml-0 hover:bg-accent transition-all px-4"
          >
            <Link href="/project" className="flex items-center gap-2">
              <span className="font-semibold  tracking-wider text-xs md:text-sm">
                View All Projects
              </span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform text-primary"
              />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
