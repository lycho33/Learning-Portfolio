import type { DeleteResult } from "kysely";
import { db } from "./database.ts";
import type { Goals, GoalUpdate, NewGoal } from "./types.ts";

export const GoalsRepository = {
  getGoals: async (): Promise<Goals[]> => {
    return await db.selectFrom("goals").selectAll("goals").execute();
  },
  getGoal: async (goal: string): Promise<Goals | undefined> => {
    return await db
      .selectFrom("goals")
      .selectAll()
      .where("goal", "=", goal)
      .executeTakeFirst();
  },
  createGoal: async (goal: NewGoal): Promise<Goals | undefined> => {
    return await db
      .insertInto("goals")
      .values(goal)
      .returningAll()
      .executeTakeFirstOrThrow();
  },
  updateGoal: async (
    id: number,
    goal: GoalUpdate,
  ): Promise<Goals | undefined> => {
    return await db
      .updateTable("goals")
      .set(goal)
      .where("id", "=", id)
      .returning(["goal", "id"])
      .executeTakeFirstOrThrow();
  },
  deleteGoal: async (goal: string): Promise<DeleteResult> => {
    return await db
      .deleteFrom("goals")
      .where("goal", "=", goal)
      .executeTakeFirst();
  },
};
