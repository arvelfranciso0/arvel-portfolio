import React from "react";
import Link from "next/link";
import { FileSearch, ArrowLeft, Search } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="max-w-5xl mx-auto py-32 px-6 bg-white dark:bg-black text-slate-900 dark:text-white transition-colors">
      <div className="flex flex-col items-start max-w-2xl">
        {/* Main Text UI */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none uppercase">
          Project Not Found<span className="text-blue-500">.</span>
        </h1>

        {/* Simple Link UI */}
        <Link
          href="/projects"
          className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-all"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Go back to Project List
        </Link>

        {/* System Meta */}
        <div className="mt-20 pt-8 border-t border-slate-100 dark:border-white/5 w-full flex justify-between items-center text-[9px] font-mono text-slate-400 uppercase tracking-widest">
          <span>ALEX.DEV Registry</span>
          <span>Status: Null_Reference</span>
        </div>
      </div>
    </div>
  );
}
