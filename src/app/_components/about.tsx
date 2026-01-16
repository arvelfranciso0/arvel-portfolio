"use client";

import { personalInfo } from "@/lib/utils";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative group flex justify-center md:justify-start">
            <div className="absolute inset-0 border-2 border-slate-200 dark:border-white/20 rounded-xl rotate-6 group-hover:rotate-3 transition-transform duration-300 w-80 h-80"></div>
            <div
              className="relative h-80 w-80 bg-slate-200 dark:bg-[#0a0a0a] rounded-xl overflow-hidden border border-slate-200 dark:border-[#262626]"
              style={{
                backgroundImage: "url('/arvel-dev.png')",
                backgroundSize: "cover",
              }}
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <span className="w-8 h-0.5 bg-black dark:bg-white block"></span>
              About Me
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Hello! I'm {personalInfo.fname}, a passionate developer based in{" "}
              {personalInfo.country}. I enjoy creating things that live on the
              internet. My interest in web development started back in{" "}
              {personalInfo.web_dev_interest_year} hacking together HTML & CSS.
            </p>
            <div className="pt-4 flex gap-12">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">
                  {personalInfo.experience}+
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  Years Experience
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">
                  {personalInfo.project_completed}+
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  Projects Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
