import z from "zod";
import {
  placeholderIcons,
  type PlaceholderIconName,
} from "@/lib/placeholder-icons";
import { skillNames } from "@/types/type";

const iconNames = Object.keys(placeholderIcons) as [
  PlaceholderIconName,
  ...PlaceholderIconName[],
];

/** Empty form fields come through as "" (or null when absent); store them as null */
const blankToNull = (value: unknown) =>
  typeof value === "string" && value.trim() !== "" ? value.trim() : null;

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  description: z.string().trim().min(1, "Description is required").max(300),
  initials: z
    .string()
    .trim()
    .min(1, "Initials are required")
    .max(3, "Initials must be 3 characters or fewer")
    .transform((v) => v.toUpperCase()),
  tags: z.array(z.enum(skillNames, "Unknown tag")).default([]),
  previewLink: z.preprocess(blankToNull, z.url("Invalid live URL").nullable()),
  placeholderIcon: z.preprocess(blankToNull, z.enum(iconNames).nullable()),
  placeholderLabel: z.preprocess(blankToNull, z.string().max(40).nullable()),
});

export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
