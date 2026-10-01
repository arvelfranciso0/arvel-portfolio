import { Button } from "@/components/ui/button";
import { getProjects } from "@/db/queries";
import { requireAdmin } from "@/lib/auth/session";
import { LogOut, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { deleteProject, logout } from "./actions";
import DeleteProjectButton from "./delete-project-button";

export default async function MyProfilePage() {
  await requireAdmin();
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-sm text-primary mb-2">
            {"// my-profile"}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
        </div>
        <div className="flex gap-3">
          <Button
            asChild
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            <Link href="/my-profile/projects/new">
              <Plus size={16} /> New project
            </Link>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="outline" className="rounded-full">
              <LogOut size={16} /> Log out
            </Button>
          </form>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="bg-card rounded-lg px-5 py-4 flex items-center gap-4"
            >
              <div className="w-11 h-11 shrink-0 rounded-lg bg-primary/70 flex items-center justify-center font-mono text-sm font-bold text-background/85">
                {project.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold">{project.title}</div>
                <p className="text-sm text-muted-foreground truncate">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <p className="font-mono text-xs text-muted-foreground/70 mt-1 truncate">
                    {project.tags.join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link
                    href={`/my-profile/projects/${project.id}/edit`}
                    aria-label={`Edit ${project.title}`}
                  >
                    <Pencil size={18} />
                  </Link>
                </Button>
                <DeleteProjectButton
                  title={project.title}
                  action={deleteProject.bind(null, project.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
