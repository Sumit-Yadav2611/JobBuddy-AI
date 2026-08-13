import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is missing. Check .env.local and restart Next.js.",
    );
  }

  return url;
}

const sql = neon(getDatabaseUrl());

export const db = drizzle({
  client: sql,
});
