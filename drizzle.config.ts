import "./src/db/load-env";
import { defineConfig } from "drizzle-kit";

// Migrations run DDL, so prefer Supabase's direct/session connection
// (DIRECT_URL, port 5432) and fall back to DATABASE_URL.
const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!url) {
  throw new Error("Set DIRECT_URL or DATABASE_URL to run drizzle-kit");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
});
