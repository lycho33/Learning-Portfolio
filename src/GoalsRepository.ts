import type { Insertable, Updateable } from "kysely";
import { db } from "./database.ts";
import type { Goals } from "./types.ts";

export const GoalsRepository = {
  getGoals: async () => {
    return await db.selectFrom("goals").selectAll("goals").execute();
  },
  getGoal: async (goal: string) => {
    return await db
      .selectFrom("goals")
      .selectAll()
      .where("goal", "=", goal)
      .executeTakeFirst();
  },
  createGoal: async (goal: Insertable<Goals>) => {
    return await db
      .insertInto("goals")
      .values(goal)
      .returningAll()
      .executeTakeFirstOrThrow();
  },
  updateGoal: async (id: number, goal: Updateable<Goals>) => {
    return await db
      .updateTable("goals")
      .set(goal)
      .where("id", "=", id)
      .returning(["goal", "id"])
      .executeTakeFirstOrThrow();
  },
  deleteGoal: async (goal: string) => {
    return await db
      .deleteFrom("goals")
      .where("goal", "=", goal)
      .executeTakeFirst();
  },
};
