"use client";
import React, { useEffect, useMemo, useState } from "react";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

import { filters, projects } from "@/lib/utils";

import ProjectCard from "../../components/shared/project-card";
import AppPagination from "@/components/shared/pagination";

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
      <section className="px-6 py-12 bg-gray-50 dark:bg-black min-h-screen">
        <div className="max-w-350 mx-auto">
          {filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project) => (
                  <ProjectCard project={project} key={project.id} />
                ))}
              </div>
              <AppPagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
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
