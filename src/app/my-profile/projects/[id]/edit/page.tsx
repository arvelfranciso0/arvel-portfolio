import type { Metadata } from "next";
import { getProjectById } from "@/db/queries";
import { requireAdmin } from "@/lib/auth/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateProject } from "../../../actions";
import ProjectForm from "../../../project-form";

export const metadata: Metadata = { title: "Edit Project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/my-profile"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground mb-5"
      >
        <ArrowLeft size={14} /> back
      </Link>
      <div className="font-mono text-sm text-primary mb-2">
        {"// edit-project"}
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-7">
        Edit {project.title}
      </h1>
      <ProjectForm
        action={updateProject.bind(null, project.id)}
        project={project}
        submitLabel="Save changes"
      />
    </div>
  );
}
