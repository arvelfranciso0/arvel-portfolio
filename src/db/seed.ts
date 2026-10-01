import "./load-env";
import { db } from ".";
import { hashPassword } from "../lib/auth/password";
import {
  ensureProjectImagesBucket,
  getBucketName,
} from "../lib/storage";
import { adminUsers, profile, projects, skills } from "./schema";

type NewProfile = typeof profile.$inferInsert;
type NewProject = typeof projects.$inferInsert;
type NewSkill = typeof skills.$inferInsert;

const profileData: NewProfile = {
  fname: "Arvel",
  lastname: "Francisco",
  experience: "02",
  webDevInterestYear: "2020",
  position: "Full Stack Engineer",
  isAvailable: false,
  email: "franciscoarvel123@gmail.com",
  country: "Philippines",
  province: "Cebu City",
  city: "Toledo City",
  fullLocation: "Toledo City, Philippines",
  github: "https://github.com/arvelfranciso0",
  linkedin: "https://www.linkedin.com/in/arvel-francisco/",
  x: "https://x.com/arvelfranc66681?s=21",
  fb: "",
  passion: ["Coding", "Clean Code"],
  status: "Building",
};

const projectData: NewProject[] = [
  {
    title: "DevKit",
    description: "Developer utilities that run entirely in the browser.",
    initials: "DK",
    image: "/dev-logo.png",
    tags: ["Next.js", "Tailwind CSS", "Shadcn", "React Flow", "TypeScript"],
    previewLink: "https://devkit-tool.netlify.app/",
  },
  {
    title: "Lumen",
    description: "A presentation tool for worship teams.",
    initials: "LM",
    image: "/lumen-logo-1.png",
    tags: ["Next.js", "Electron", "SQLite"],
    previewLink: "https://lumen-worship.netlify.app/",
  },
  {
    title: "Spendr",
    description: "Simple expenses tracker web application.",
    initials: "SP",
    image: "/spendr-logo.png",
    previewLink: "https://spendr-track.netlify.app/",
  },
  {
    title: "Hybrid CMS",
    description:
      "AI-driven CMS generating SEO strategies, personas, content, and banners via OpenAI and Perplexity.",
    initials: "HC",
    tags: [
      "FastAPI",
      "Python",
      "OpenAI",
      "CakePHP",
      "MySQL",
      "Perplexity AI",
      "JavaScript",
      "SEO",
    ],
    placeholderIcon: "Sparkles",
    placeholderLabel: "Client Project",
  },
  {
    title: "Suggested Keyword",
    description:
      "REST API for Japan-localized autocomplete and keyword classification with batch processing.",
    initials: "SK",
    tags: ["Node.js", "Express", "MySQL", "REST API", "SEO"],
    placeholderIcon: "Server",
    placeholderLabel: "Client Project",
  },
  {
    title: "GOAT",
    description:
      "Migrated a legacy VB.NET app to a Next.js frontend with a Laravel API.",
    initials: "GT",
    tags: ["Laravel", "Next.js"],
    placeholderIcon: "RefreshCw",
    placeholderLabel: "Client Project",
  },
];

const skillData: NewSkill[] = [
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/f7df1e" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61dafb" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.simpleicons.org/tailwindcss/38bdf8",
  },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5fa04e" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169e1" },
  { name: "C#" },
  { name: "ASP.NET", icon: "https://cdn.simpleicons.org/dotnet/512bd4" },
  { name: "jQuery", icon: "https://cdn.simpleicons.org/jquery/0769ad" },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/ff2d20" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776ab" },
  { name: "CakePHP", icon: "https://cdn.simpleicons.org/cakephp/d33c43" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479a1" },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777bb4" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/ffca28" },
  { name: "SQLite", icon: "https://cdn.simpleicons.org/sqlite/003b57" },
  { name: "Shadcn", icon: "https://cdn.simpleicons.org/shadcnui/ffffff" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ed" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/f05032" },
  { name: "Dify", icon: "https://cdn.simpleicons.org/dify/0033ff" },
  {
    name: "Perplexity AI",
    icon: "https://cdn.simpleicons.org/perplexity/1fb8cd",
  },
  { name: "SEO", icon: "https://cdn.simpleicons.org/semrush/ffffff" },
];

// Creates the /my-profile login from ADMIN_EMAIL / ADMIN_PASSWORD, or updates
// its password if the account already exists. Other admin rows are untouched.
async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("Skipped admin: set ADMIN_EMAIL and ADMIN_PASSWORD to create it.");
    return;
  }
  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  }

  const passwordHash = await hashPassword(password);
  await db
    .insert(adminUsers)
    .values({ email, passwordHash })
    .onConflictDoUpdate({
      target: adminUsers.email,
      set: { passwordHash, updatedAt: new Date() },
    });
  console.log(`Seeded admin ${email}.`);
}

// Content seeding replaces all profile/project/skill rows, so it's safe to
// re-run after editing the data above, but it also removes projects added
// from /my-profile. `--admin-only` (npm run db:seed:admin) skips it.
async function seedContent() {
  await db.transaction(async (tx) => {
    await tx.delete(profile);
    await tx.delete(projects);
    await tx.delete(skills);

    await tx.insert(profile).values(profileData);
    await tx
      .insert(projects)
      .values(projectData.map((p, i) => ({ ...p, sortOrder: i })));
    await tx
      .insert(skills)
      .values(skillData.map((s, i) => ({ ...s, sortOrder: i })));
  });

  console.log(
    `Seeded 1 profile, ${projectData.length} projects, ${skillData.length} skills.`,
  );
}

// Creates the public thumbnail bucket in Supabase Storage (or re-applies its
// type/size limits if it already exists). Never deletes files.
async function seedStorage() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    console.log(
      "Skipped storage: set SUPABASE_URL and SUPABASE_SECRET_KEY to create the bucket.",
    );
    return;
  }
  await ensureProjectImagesBucket();
  console.log(`Storage bucket "${getBucketName()}" is ready.`);
}

async function main() {
  if (!process.argv.includes("--admin-only")) {
    await seedContent();
  }
  // Both are non-destructive, so they run in --admin-only mode too
  await seedStorage();
  await seedAdmin();
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.$client.end());
