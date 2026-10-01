import type { PlaceholderIconName } from "@/lib/placeholder-icons";
import type { SkillName } from "@/types/type";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// RLS is enabled with no policies so Supabase's public Data API (anon key)
// can't read or write these tables. The app connects as the table owner via
// DATABASE_URL, which bypasses RLS.

/** Single-row table holding the bio/contact info shown across the site */
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  fname: text("fname").notNull(),
  lastname: text("lastname").notNull(),
  experience: text("experience").notNull(),
  webDevInterestYear: text("web_dev_interest_year").notNull(),
  position: text("position").notNull(),
  isAvailable: boolean("is_available").notNull().default(false),
  email: text("email").notNull(),
  country: text("country").notNull(),
  province: text("province").notNull(),
  city: text("city").notNull(),
  fullLocation: text("full_location").notNull(),
  github: text("github").notNull(),
  linkedin: text("linkedin").notNull(),
  x: text("x").notNull(),
  fb: text("fb").notNull().default(""),
  passion: text("passion").array().notNull().default([]),
  status: text("status").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}).enableRLS();

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  /** Two-letter monogram shown on the thumbnail when no image or placeholder icon is set */
  initials: text("initials").notNull(),
  /** Thumbnail URL: a Supabase Storage public URL for uploads, or a /public path. When null, the thumbnail falls back to a placeholder */
  image: text("image"),
  /** Tech stack used in the project */
  tags: text("tags").array().$type<SkillName[]>().notNull().default([]),
  /** Live URL; when present, the card shows a "Live" link */
  previewLink: text("preview_link"),
  /** Key into `placeholderIcons`, shown when there's no screenshot (e.g. client work under NDA) */
  placeholderIcon: text("placeholder_icon").$type<PlaceholderIconName>(),
  placeholderLabel: text("placeholder_label"),
  /** Display order, ascending */
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
}).enableRLS();

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").$type<SkillName>().notNull().unique(),
  /** URL to the skill's icon; when null, render a text-fallback badge */
  icon: text("icon"),
  /** Display order, ascending */
  sortOrder: integer("sort_order").notNull().default(0),
}).enableRLS();

/**
 * Accounts allowed into /my-profile. Rows are created by `npm run db:seed`
 * (or `db:seed:admin`) from ADMIN_EMAIL / ADMIN_PASSWORD.
 */
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  /** Stored lowercase */
  email: text("email").notNull().unique(),
  /** scrypt, "<salt hex>:<hash hex>" — see src/lib/auth/password.ts */
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}).enableRLS();
