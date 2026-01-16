"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { projects } from "@/lib/utils";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
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
          {projects.map((project, i) => (
            <Card
              key={i}
              className="group hover:border-black dark:hover:border-white"
            >
              <CardContent>
                <div className="h-48 w-full rounded-xl bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button
                      variant={"ghost"}
                      className="p-2 bg-white rounded-full text-slate-900 hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      <Code size={20} />
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="p-2 bg-white rounded-full text-slate-900 hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      <ExternalLink size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
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
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
