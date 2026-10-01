import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Reuse one connection pool across dev hot reloads instead of opening a new
// one every time this module is re-evaluated.
const globalForDb = globalThis as unknown as {
  pgClient?: ReturnType<typeof postgres>;
};

const client =
  globalForDb.pgClient ??
  postgres(connectionString, {
    // Required for Supabase's transaction pooler (port 6543), which doesn't
    // support prepared statements.
    prepare: false,
    // Keep each process's pool small. `next build` prerenders with several
    // workers and every serverless instance gets its own pool, so the
    // default of 10 per process quickly exceeds Supabase's pooler limit
    // (EMAXCONNSESSION). A page needs at most 3 queries at once.
    max: 3,
    // Release idle connections so finished workers/instances don't hold slots
    idle_timeout: 20,
  });

if (process.env.NODE_ENV !== "production") globalForDb.pgClient = client;

export const db = drizzle(client, { schema });
