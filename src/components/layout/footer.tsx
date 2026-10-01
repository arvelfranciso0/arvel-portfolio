"use client";

import { Reveal } from "@/components/motion/reveal";
import type { Profile } from "@/types/type";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="px-6 sm:px-14 py-6 pb-10">
      <Reveal>
        <p className="font-mono text-[13px] text-muted-foreground/60">
          © 2026 {profile.fname} {profile.lastname}. Built with care
          in {profile.city}.
        </p>
      </Reveal>
    </footer>
  );
}
