import dotenv from "dotenv";
import express from "express";
import { migrateToLatest } from "../.config/migrations/index.ts";
import GoalsController from "./controller/goals.controller.ts";

dotenv.config();

const app = express();
app.use(express.json());
const port = Number(process.env.PORT) || 3030;

app.get("/", (req, res) => {
  res.send("🫥 Hello, Docker!");
});

app.get("/goals", GoalsController.getAllGoals);
app.post("/goal", GoalsController.createGoal);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

migrateToLatest().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
