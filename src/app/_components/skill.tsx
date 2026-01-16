"use client";

import { skills } from "@/lib/utils";

export default function SkillSection() {
  return (
    <section id="skills" className="py-24 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-12">
          Technical Skills
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#0a0a0a] hover:border-black dark:hover:border-white transition-all cursor-pointer"
              >
                <Icon size={18} />
                <span className="font-medium">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
