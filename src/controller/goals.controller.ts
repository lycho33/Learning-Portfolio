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
  async getGoal(req: Request, res: Response): Promise<void> {
    console.log("req: ", req.body);
    try {
      const goal = await GoalsRepository.getGoal(req.body.goal);
      res.status(200).json(goal);
    } catch (e) {
      console.warn(e);
      res.status(500).json({
        success: false,
        message: `Failed to fetch goal`,
      });
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
  async updateGoal(req: Request, res: Response): Promise<void> {
    const { goal, newGoal } = req.body;
    try {
      const updatedGoal = await GoalsRepository.updateGoal({ goal }, newGoal);
      res.status(201).json(updatedGoal);
    } catch (e) {
      console.warn(e);
      res
        .status(500)
        .json({ success: false, message: "Failed to update goal" });
    }
  }
  async deleteGoal(req: Request, res: Response): Promise<void> {
    const goal = req.body.goal;
    try {
      await GoalsRepository.deleteGoal(goal);
      res.status(200);
    } catch (e) {
      console.warn(e);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete goal" });
    }
  }
}

export default new GoalsController();
