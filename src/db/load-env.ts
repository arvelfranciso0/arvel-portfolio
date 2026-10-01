import { config } from "dotenv";

// Mirror Next.js precedence for CLI scripts (seed, drizzle-kit): values in
// .env.local win over .env, so local Docker settings can live in .env.local.
// Import this before anything that reads process.env.
config({ path: [".env.local", ".env"], quiet: true });
