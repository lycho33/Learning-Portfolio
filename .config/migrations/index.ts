import { promises as fs } from "fs";
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from "kysely";
import * as path from "path";
import { Pool } from "pg";
import { fileURLToPath } from "url";
import type { Database } from "../../src/types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function migrateToLatest() {
  // Needs to be a separate instance of database.ts to avoid tearing down the DB connection when running queries
  const migrationPool = new Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    max: 10,
  });

  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: migrationPool,
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: __dirname,
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(
        `✅ Migration "${it.migrationName}" was executed successfully`,
      );
    } else if (it.status === "Error") {
      console.error(`❌ Failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("❌ Failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}
