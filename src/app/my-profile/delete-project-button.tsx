"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      disabled={pending}
      aria-label={`Delete ${title}`}
      className="text-muted-foreground hover:text-destructive"
    >
      {pending ? <Spinner /> : <Trash2 size={18} />}
    </Button>
  );
}

export default function DeleteProjectButton({
  title,
  action,
}: {
  title: string;
  action: () => Promise<void>;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <SubmitButton title={title} />
    </form>
  );
}
