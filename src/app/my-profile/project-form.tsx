"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { placeholderIcons } from "@/lib/placeholder-icons";
import { skillNames, type Project } from "@/types/type";
import Image from "next/image";
import { useActionState } from "react";
import { ALLOWED_IMAGE_TYPES } from "../schema/project";
import type { ProjectFormState, ProjectFormValues } from "./actions";

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const selectClassName =
  "h-9 w-full rounded-md border border-input bg-transparent dark:bg-input/30 px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

function toFormValues(project: Project): ProjectFormValues {
  return {
    title: project.title,
    description: project.description,
    initials: project.initials,
    previewLink: project.previewLink ?? "",
    placeholderIcon: project.placeholderIcon ?? "",
    placeholderLabel: project.placeholderLabel ?? "",
    tags: project.tags,
  };
}

/** Used by both the new and edit pages; `project` prefills the fields */
export default function ProjectForm({
  action,
  project,
  submitLabel,
}: {
  action: (
    prev: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  project?: Project;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  // React resets the form after each submit; these restore what was typed
  // when the server rejects it, falling back to the saved project.
  const values = state?.values ?? (project && toFormValues(project));

  return (
    <form action={formAction} className="bg-card rounded-lg p-8 flex flex-col gap-5">
      <Field id="title" label="Title">
        <Input id="title" name="title" defaultValue={values?.title} required />
      </Field>

      <Field id="description" label="Description">
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={values?.description}
          required
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-5">
        <Field id="initials" label="Initials">
          <Input
            id="initials"
            name="initials"
            maxLength={3}
            defaultValue={values?.initials}
            required
          />
        </Field>
        <Field id="previewLink" label="Live URL" hint="Optional">
          <Input
            id="previewLink"
            name="previewLink"
            type="url"
            placeholder="https://"
            defaultValue={values?.previewLink}
          />
        </Field>
      </div>

      <Field
        id="image"
        label="Thumbnail"
        hint={
          project?.image
            ? "Choose a file to replace the current thumbnail. PNG or JPEG up to 5 MB."
            : "Optional. PNG or JPEG up to 5 MB. Shown at 230×230."
        }
      >
        {project?.image && (
          <div className="flex items-center gap-4 mb-1">
            <div className="w-16 h-16 shrink-0 rounded-lg bg-primary/40 flex items-center justify-center overflow-hidden">
              <Image
                src={project.image}
                alt={`Current thumbnail for ${project.title}`}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground/85">
              <input
                type="checkbox"
                name="removeImage"
                className="accent-primary"
              />
              Remove thumbnail
            </label>
          </div>
        )}
        <Input
          id="image"
          name="image"
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(",")}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="placeholderIcon"
          label="Placeholder icon"
          hint="Used when there's no thumbnail"
        >
          <select
            id="placeholderIcon"
            name="placeholderIcon"
            defaultValue={values?.placeholderIcon ?? ""}
            className={selectClassName}
          >
            <option value="">None (show initials)</option>
            {Object.keys(placeholderIcons).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="placeholderLabel"
          label="Placeholder label"
          hint='e.g. "Client Project"'
        >
          <Input
            id="placeholderLabel"
            name="placeholderLabel"
            defaultValue={values?.placeholderLabel}
          />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium mb-2">Tech stack</legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
          {skillNames.map((skill) => (
            <label
              key={skill}
              className="flex items-center gap-2 text-sm text-foreground/85"
            >
              <input
                type="checkbox"
                name="tags"
                value={skill}
                defaultChecked={values?.tags.includes(skill)}
                className="accent-primary"
              />
              {skill}
            </label>
          ))}
        </div>
      </fieldset>

      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-5"
      >
        {isPending && <Spinner />}
        {submitLabel}
      </Button>
    </form>
  );
}
