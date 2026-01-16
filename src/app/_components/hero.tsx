"use client";

import { Button } from "@/components/ui/button";
import { cn, personalInfo } from "@/lib/utils";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="flex flex-col justify-center min-h-[85vh] px-6 py-20 relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gray-200/20 dark:bg-white/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto w-full z-10">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Building Digital <br />
            <span className="text-slate-500 dark:text-slate-400">
              Experiences.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
            I'm {personalInfo.fname}, a{" "}
            <span className="text-black dark:text-white font-medium">
              {personalInfo.position}
            </span>{" "}
            focused on building accessible, pixel-perfect, and performant web
            applications.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href={"/#projects"}>View Work</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={"/#contact"}>Contact Me</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute right-0 bottom-20 opacity-40 select-none pointer-events-none">
        <pre className="font-mono text-xs text-black/40 dark:text-white/40 text-right pr-10">
          {`const developer = {
  name: '${personalInfo.fname}',
  role: '${personalInfo.position}',
  passion: '${personalInfo.passion[1]}',
  status: '${personalInfo.status}...'
};`}
        </pre>
      </div>
    </section>
  );
}
