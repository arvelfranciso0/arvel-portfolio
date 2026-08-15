"use client";

import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { personalInfo, projects } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="px-6 sm:px-14 pt-24 pb-25 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 items-center"
    >
      <div className="order-2 md:order-1">
        <Reveal>
          <h1 className="font-sans text-5xl sm:text-6xl lg:text-[64px] font-extrabold leading-[1.04] tracking-tight mb-6">
            Building Digital{" "}
            <span className="text-primary">Experiences.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[17px] text-muted-foreground max-w-lg leading-relaxed mb-7">
            {personalInfo.position} focused on building accessible,
            pixel-perfect, and performant web applications — based in{" "}
            {personalInfo.fll_location}.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-3.5 mb-9">
            <Button
              asChild
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-6 text-sm font-semibold gap-1.5"
            >
              <Link href="/#work">
                View Work <ArrowRight size={16} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border px-7 py-6 text-sm font-semibold hover:bg-accent"
            >
              <Link href="/#contact">Contact Me</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex gap-8 font-mono">
            <div>
              <div className="text-3xl font-semibold text-foreground">
                {parseInt(personalInfo.experience, 10)}+
              </div>
              <div className="text-xs text-muted-foreground">Yrs Exp.</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-foreground">
                {personalInfo.project_completed}
              </div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
          </div>
        </Reveal>
      </div>

      <Parallax offset={28} className="order-1 md:order-2 flex justify-center">
        <Reveal delay={0.15}>
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-100 md:h-100 rounded-full overflow-hidden bg-primary flex items-start justify-center">
            <Image
              src="/arvel-dev.png"
              alt={`${personalInfo.fname} ${personalInfo.lastname}`}
              width={1650}
              height={2100}
              className="w-[78%] h-auto mt-[12%]"
              priority
            />
          </div>
        </Reveal>
      </Parallax>
    </section>
  );
}
