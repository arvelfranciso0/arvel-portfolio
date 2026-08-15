"use client";

import { Reveal } from "@/components/motion/reveal";
import { personalInfo } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="px-6 sm:px-14 py-6 pb-10">
      <Reveal>
        <p className="font-mono text-[13px] text-muted-foreground/60">
          © 2026 {personalInfo.fname} {personalInfo.lastname}. Built with care
          in {personalInfo.city}.
        </p>
      </Reveal>
    </footer>
  );
}
