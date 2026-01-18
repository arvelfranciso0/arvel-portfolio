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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Featured Works
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              A focused look at the projects I've led and developed recently.
            </p>
          </div>
          <Button variant="ghost" asChild className="gap-2 group">
            <Link href={"/project"}>
              View All Projects{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
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
