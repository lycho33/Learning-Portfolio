import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "kysely-codegen";
import { config } from "dotenv";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Pool } from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPaths = [join(process.cwd(), ".env"), join(__dirname, "..", ".env")];
for (const p of envPaths) {
  if (existsSync(p)) {
    config({ path: p });
    break;
  }
}

export const dbCredentials = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 10,
});

const dialect = new PostgresDialect({
  pool: dbCredentials,
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
