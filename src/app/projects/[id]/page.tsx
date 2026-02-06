"use client";

import React from "react";
import {
  Terminal,
  Database,
  Cpu,
  Workflow,
  Layers,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { cn, getRoleColor, projects } from "@/lib/utils";
import { Project, WorkBreakdown } from "@/types/type";
import { useParams, useRouter } from "next/navigation";
import ProjectNotFound from "../_components/projectNotFound";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorkDescriptionLayout() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const project = projects.find((item: Project) => item.id === id);
  return (
    <>
      {project ? (
        <div className="max-w-5xl mx-auto py-16 px-6  text-slate-900 dark:text-white transition-colors">
          <Button
            variant={"ghost"}
            onClick={() => router.back()}
            className="group inline-flex items-center cursor-pointer gap-2 mb-12 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Projects
          </Button>
          {/* Project Brand & Role Header */}
          <header className="mb-12 border-b border-slate-100 dark:border-white/10 pb-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <Badge className="bg-white text-black dark:bg-black dark:text-white border-none text-[10px] font-bold">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${getRoleColor(project.role)}`}
                  />
                  <span className="text-xs font-semibold">{project.role}</span>
                </div>
              </Badge>
              <span className="text-slate-300 dark:text-white/20">|</span>
              <div className="flex gap-2">
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    className="text-slate-500 dark:text-slate-400 font-mono text-[11px] uppercase tracking-wider bg-slate-50 dark:bg-white/5 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Project Brief */}
          <section className="mb-16">
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-4xl">
              {project.description}
            </p>
          </section>

          {/* Detailed Work Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Backend / AI Work */}
            {project.workBreakdown?.map((work: WorkBreakdown) => (
              <div className="space-y-6" key={work.category}>
                <div
                  className={cn(`flex items-center gap-3 `, work.themeColor)}
                >
                  <Cpu size={20} />
                  <h3 className="font-bold uppercase tracking-widest text-xs">
                    {work.category}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {work.description}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                    <ul className="space-y-3">
                      {work.tasks.map((task: string) => (
                        <li
                          className="flex items-start gap-3 text-xs"
                          key={task}
                        >
                          <CheckCircle2
                            size={14}
                            className={cn(` mt-0.5 shrink-0`, work.themeColor)}
                          />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Collaboration / Footer Note */}
          {project.collaborationNote && (
            <footer className="mt-16 pt-8 border-t border-slate-100 dark:border-white/10 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Workflow size={20} />
                <span className="text-sm font-bold tracking-tight">
                  Collaboration Note
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                {project.collaborationNote}
              </p>
            </footer>
          )}
        </div>
      ) : (
        <ProjectNotFound />
      )}
    </>
  );
}
