import { RefreshCw, Server, Sparkles, type LucideIcon } from "lucide-react";

/**
 * Icons a project can use as its thumbnail placeholder. The database stores
 * the key (e.g. "Sparkles"); add an entry here before using a new icon name.
 */
export const placeholderIcons = {
  Sparkles,
  Server,
  RefreshCw,
} satisfies Record<string, LucideIcon>;

export type PlaceholderIconName = keyof typeof placeholderIcons;
