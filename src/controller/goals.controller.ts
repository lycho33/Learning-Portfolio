import type { Request, Response } from "express";
import { GoalsRepository } from "../goals.repository.ts";

class GoalsController {
  async getAllGoals(req: Request, res: Response): Promise<void> {
    try {
      const goals = await GoalsRepository.getGoals();
      res.status(200).json(goals);
    } catch (e) {
      console.warn(e);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch goals" });
    }
  }
  async createGoal(req: Request, res: Response): Promise<void> {
    try {
      const newGoal = await GoalsRepository.createGoal({
        goal: req.body.goal,
      });
      res.status(201).json(newGoal);
    } catch (e) {
      console.warn(e);
      res
        .status(500)
        .json({ success: false, message: "Failed to create goal" });
    }
  }
}

export default new GoalsController();
