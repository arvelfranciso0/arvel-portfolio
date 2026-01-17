"use client";
import React, { useEffect, useMemo, useState } from "react";

import { Code, ExternalLink, Github, SearchX, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { filters, getRoleColor, projects } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectsArchive() {
  const [filter, setFilter] = useState<string[]>(["All Projects"]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const filteredProjects = useMemo(() => {
    if (filter.includes("All Projects") || filter.length === 0) {
      return projects;
    }
    return projects.filter((project) =>
      project.tags.some((tag) => filter.includes(tag)),
    );
  }, [filter, projects]);

  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleSelectFilter = (tag: string) => {
    setFilter((prev) => {
      if (tag === "All Projects") {
        return ["All Projects"];
      }

      // If other filter is clicked, remove the All Projects from the array
      let newFilters = prev.filter((item) => item != "All Projects");

      // If the filter is clicked again remove it from the array
      if (newFilters.includes(tag)) {
        newFilters = newFilters.filter((item) => item != tag);
      }
      // push it to the array
      else {
        newFilters.push(tag);
      }

      return newFilters;
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <section className="px-6 pb-12 pt-8 border-b border-slate-100 dark:border-[#262626]/50">
        <div className="max-w-350 mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Projects
              <span className="text-slate-300 dark:text-neutral-700">.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              A collection of projects showcasing my work in web development.
              From full-stack applications and internal tools to responsive
              interfaces and database-driven systems.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => handleSelectFilter(item)}
                className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all ${
                  filter.includes(item)
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-slate-200 dark:border-[#262626] text-slate-600 dark:text-slate-400 hover:border-black dark:hover:border-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-6 py-12 bg-gray-50 dark:bg-black min-h-screen">
        <div className="max-w-350 mx-auto">
          {filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project) => (
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
                              style={{
                                backgroundImage: `url('${project.image}')`,
                              }}
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
              {totalPages > 1 && (
                <div className="mt-16">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === i + 1}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(i + 1);
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
              <div className="p-4 rounded-full bg-slate-100 dark:bg-neutral-900 mb-4">
                <SearchX className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                We couldn't find any projects matching the selected tags. Try
                adjusting your filters.
              </p>
              <Button
                variant="default"
                onClick={() => setFilter(["All Projects"])}
                className="dark:bg-white dark:text-black cursor-pointer"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
