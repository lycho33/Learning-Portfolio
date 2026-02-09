import type { Kysely } from "kysely";
import type { DB } from "kysely-codegen";

export async function seed(db: Kysely<DB>): Promise<void> {
  // note: this function is mandatory. you must implement this function.
  await db.insertInto("goals").values({ goal: "Read 2 blogs everyday" });
}
