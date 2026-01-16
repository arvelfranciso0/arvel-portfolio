"use client";

import { personalInfo } from "@/lib/utils";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-200 dark:border-[#262626]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-slate-500">
          © 2026 {personalInfo.fname} Dev. Built with Next.js & shadcn.
        </p>
        <div className="flex gap-6 text-slate-500">
          <Link
            href={`${personalInfo.github}`}
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            <Github size={20} />
          </Link>
          <Link
            href={`${personalInfo.linked}`}
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href={`${personalInfo.x}`}
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
