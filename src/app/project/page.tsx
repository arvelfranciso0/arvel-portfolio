"use client";
import React, { useState } from "react";

import { Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Project Data ---

const PROJECT_DATA = [
  {
    title: "Nexus Dashboard",
    desc: "Comprehensive analytics dashboard featuring real-time data visualization, user management, and widgets.",
    tags: ["React", "D3.js", "Tailwind"],
    img: "1",
  },
  {
    title: "TaskMaster AI",
    desc: "An intelligent productivity tool that uses AI to categorize tasks and suggest optimal scheduling.",
    tags: ["Next.js", "OpenAI"],
    img: "2",
  },
  {
    title: "CoinTrack Pro",
    desc: "Real-time cryptocurrency portfolio tracker allowing users to monitor assets across multiple exchanges.",
    tags: ["Vue.js", "Firebase"],
    img: "3",
  },
  {
    title: "Flux UI Kit",
    desc: "A lightweight, accessible component library for React applications focusing on developer experience.",
    tags: ["TypeScript", "Storybook"],
    img: "1",
  },
  {
    title: "DevFlow CLI",
    desc: "Command line interface tool for scaffolding projects and managing local development environments.",
    tags: ["Rust", "CLI"],
    img: "2",
  },
  {
    title: "Echo Chat",
    desc: "End-to-end encrypted messaging application with real-time delivery and offline support.",
    tags: ["Socket.io", "Node"],
    img: "3",
  },
  {
    title: "Metric API",
    desc: "High-performance time-series data ingestion service built for scale and reliability.",
    tags: ["Go", "PostgreSQL"],
    img: "1",
  },
  {
    title: "Vantage CMS",
    desc: "A headless content management system designed for flexibility and rapid frontend development.",
    tags: ["Python", "Django"],
    img: "2",
  },
];

// --- Main Archive Component ---

export default function ProjectsArchive() {
  const [filter, setFilter] = useState("All Projects");
  const filters = ["All Projects", "React", "TypeScript", "Design Systems"];

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
              A curated archive of things I've built. From complex web
              applications and open source libraries to experimental interfaces
              and design systems.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-slate-200 dark:border-[#262626] text-slate-600 dark:text-slate-400 hover:border-black dark:hover:border-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-6 py-12 bg-gray-50 dark:bg-black min-h-screen">
        <div className="max-w-350 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PROJECT_DATA.map((project, idx) => (
              <div
                key={idx}
                className="group flex flex-col bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#262626] rounded-xl overflow-hidden hover:border-black dark:hover:border-white hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative border-b border-slate-100 dark:border-[#262626] bg-slate-100 dark:bg-neutral-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('http://googleusercontent.com/profile/picture/${project.img}')`,
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="text-lg font-bold leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex gap-3 text-slate-400 dark:text-slate-500">
                      <a
                        href="#"
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        <Code size={18} />
                      </a>
                      <a
                        href="#"
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[11px] font-mono rounded border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-white dark:bg-[#0a0a0a]"
            >
              Load More Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
