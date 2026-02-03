import { db } from "./database.ts";
import type { Goals } from "./types.ts";

export async function createGoal(goal: Goals) {
  return await db
    .insertInto("goals")
    .values(goal)
    .returningAll()
    .executeTakeFirstOrThrow();
}
