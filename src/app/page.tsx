"use client";

import HeroSection from "./_components/hero";
import AboutSection from "./_components/about";
import ProjectSection from "./_components/project";
import SkillSection from "./_components/skill";
import ContactSection from "./_components/contact";

export default function Portfolio() {
  return (
    <>
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectSection />

      {/* Skills Section */}
      <SkillSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
