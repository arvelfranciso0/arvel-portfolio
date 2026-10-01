import HeroSection from "./_components/hero";
import AboutSection from "./_components/about";
import ProjectSection from "./_components/project";
import SkillSection from "./_components/skill";
import ContactSection from "./_components/contact";
import { getProfile, getProjects, getSkills } from "@/db/queries";

export default async function Portfolio() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
  ]);

  return (
    <>
      <HeroSection profile={profile} projectCount={projects.length} />

      {/* About Section */}
      <AboutSection profile={profile} />

      {/* Projects Section */}
      <ProjectSection projects={projects} />

      {/* Skills Section */}
      <SkillSection skills={skills} />

      {/* Contact Section */}
      <ContactSection profile={profile} />
    </>
  );
}
