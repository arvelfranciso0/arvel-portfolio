"use client";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { skills } from "@/lib/utils";

export default function SkillSection() {
  return (
    <section id="skills" className="px-6 sm:px-14 pb-20">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight mb-7">
          Technical Skills
        </h2>
      </Reveal>
      <Parallax
        offset={16}
        className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-5"
      >
        {skills.map((skill, index) => (
          <Reveal key={skill.name} delay={Math.min(index * 0.03, 0.3)}>
            <div className="bg-card border border-border rounded-lg px-4 py-7 flex flex-col items-center gap-4">
              {skill.icon ? (
                // eslint-disable-next-line @next/next/no-img-element -- external simple-icons SVGs; next/image can't optimize arbitrary remote SVGs without enabling dangerouslyAllowSVG
                <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center font-mono text-[13px] font-bold text-foreground/85">
                  {skill.name}
                </div>
              )}
              <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wide text-center">
                {skill.name}
              </span>
            </div>
          </Reveal>
        ))}
      </Parallax>
    </section>
  );
}
