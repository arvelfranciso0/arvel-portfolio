"use client";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import type { Profile } from "@/types/type";

export default function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="px-6 sm:px-14 pb-20">
      <Parallax
        offset={24}
        className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6"
      >
        <Reveal>
          <div className="bg-card rounded-lg p-10 flex flex-col justify-center h-full">
            <div className="font-mono text-sm text-primary mb-3.5">{"// about"}</div>
            <p className="text-lg leading-relaxed text-foreground/85">
              I began my journey in web development in{" "}
              {profile.webDevInterestYear}, starting with HTML and CSS.
              Since then, I&apos;ve grown into building scalable backend systems,
              robust APIs, and modern frontend interfaces — and more recently,
              integrating AI-driven features into production applications.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bg-card rounded-lg p-8 flex flex-col justify-center h-full">
            <div className="font-mono text-sm leading-loose text-foreground/80">
              <div>
                <span className="text-primary">const</span> dev = {"{"}
              </div>
              <div className="pl-4">
                name: <span className="text-[oklch(82%_0.11_130)]">&apos;{profile.fname}&apos;</span>,
              </div>
              <div className="pl-4">
                role:{" "}
                <span className="text-[oklch(82%_0.11_130)]">&apos;{profile.position}&apos;</span>,
              </div>
              <div className="pl-4">
                status:{" "}
                <span className="text-[oklch(82%_0.11_130)]">&apos;{profile.status}...&apos;</span>
                <span className="animate-[blink_1s_step-start_infinite]">|</span>
              </div>
              <div>{"};"}</div>
            </div>
          </div>
        </Reveal>
      </Parallax>
    </section>
  );
}
