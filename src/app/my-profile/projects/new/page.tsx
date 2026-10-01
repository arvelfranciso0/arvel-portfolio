import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProjectForm from "../../project-form";
import { createProject } from "../../actions";

export const metadata: Metadata = { title: "New Project" };

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/my-profile"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground mb-5"
      >
        <ArrowLeft size={14} /> back
      </Link>
      <div className="font-mono text-sm text-primary mb-2">
        {"// new-project"}
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-7">Add a project</h1>
      <ProjectForm action={createProject} submitLabel="Save project" />
    </div>
  );
}
