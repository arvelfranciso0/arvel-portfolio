CREATE TABLE "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"fname" text NOT NULL,
	"lastname" text NOT NULL,
	"experience" text NOT NULL,
	"web_dev_interest_year" text NOT NULL,
	"position" text NOT NULL,
	"is_available" boolean DEFAULT false NOT NULL,
	"email" text NOT NULL,
	"country" text NOT NULL,
	"province" text NOT NULL,
	"city" text NOT NULL,
	"full_location" text NOT NULL,
	"github" text NOT NULL,
	"linkedin" text NOT NULL,
	"x" text NOT NULL,
	"fb" text DEFAULT '' NOT NULL,
	"passion" text[] DEFAULT '{}' NOT NULL,
	"status" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"initials" text NOT NULL,
	"image" text,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"preview_link" text,
	"placeholder_icon" text,
	"placeholder_label" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "skills_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "skills" ENABLE ROW LEVEL SECURITY;