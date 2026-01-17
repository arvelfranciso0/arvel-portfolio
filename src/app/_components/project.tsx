"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getRoleColor, projects } from "@/lib/utils";
import { ArrowRight, Code, ExternalLink, Github, Terminal } from "lucide-react";
import Link from "next/link";

export default function ProjectSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Selected Projects
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              A small selection of recent work.
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
            <Card
              key={project.id}
              className="group cursor-pointer flex flex-col bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#262626] rounded-xl overflow-hidden hover:border-black dark:hover:border-white hover:shadow-lg transition-all duration-300"
            >
              <CardContent>
                <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-neutral-900">
                  <div className="absolute inset-0 overflow-hidden">
                    {project.image ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        style={{ backgroundImage: `url('${project.image}')` }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0d0d0d] transition-colors duration-500 group-hover:bg-slate-100 dark:group-hover:bg-[#111111]">
                        <div
                          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[grid_size:20px_20px] mask-[radial-gradient(ellipse_at_center,black,transparent)]"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, gray 1px, transparent 1px), linear-gradient(to bottom, gray 1px, transparent 1px)",
                          }}
                        />

                        <div className="relative">
                          <Terminal size={18} />
                        </div>

                        <span className="mt-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-600">
                          No Preview Available
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Floating Status / Role */}
                  {project.role && (
                    <div className="absolute bottom-0 left-0 p-4 w-full bg-linear-to-t from-black/60 to-transparent">
                      <Badge className="bg-white text-black dark:bg-black dark:text-white border-none text-[10px] font-bold">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${getRoleColor(project.role)}`}
                          />
                          <span className="text-xs font-semibold">
                            {project.role}
                          </span>
                        </div>
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="flex flex-col mb-4">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-neutral-500 font-bold mb-1">
                        {project.company || "Independent Project"}
                      </span>
                      <Link
                        href={`${project.preview_link}`}
                        className="text-xl font-black tracking-tight group-hover:underline decoration-2 underline-offset-4"
                      >
                        {project.title}
                      </Link>
                    </div>
                    <div className="flex gap-3 text-slate-400 dark:text-slate-500">
                      <Link
                        href={`${project.github_link}`}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </Link>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} className="px-2 py-1 rounded-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
