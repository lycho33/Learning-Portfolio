import type { Insertable, Updateable } from "kysely";
import { db } from "./database.ts";
import type { Goals } from "./types.ts";

export async function getGoals() {
  return await db.selectFrom("goals").selectAll("goals").execute();
}

export async function getGoal(goal: string) {
  return await db
    .selectFrom("goals")
    .selectAll()
    .where("goal", "=", goal)
    .executeTakeFirst();
}

export async function createGoal(goal: Insertable<Goals>) {
  return await db
    .insertInto("goals")
    .values(goal)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function updateGoal(id: number, goal: Updateable<Goals>) {
  return await db
    .updateTable("goals")
    .set(goal)
    .where("id", "=", id)
    .returning(["goal", "id"])
    .executeTakeFirstOrThrow();
}

export async function deleteGoal(goal: string) {
  return await db
    .deleteFrom("goals")
    .where("goal", "=", goal)
    .executeTakeFirst();
}
