import dotenv from "dotenv";
import express from "express";
import { migrateToLatest } from "../.config/migrations/index.ts";
import { getGoals } from "./GoalsRepository.ts";

dotenv.config();

const app = express();
const port = 3030;

app.get("/", (req, res) => {
  res.send("🫥 Hello, Docker!");
});

app.get("/goals", (req, res) => {
  const goals = getGoals();
  res.json({ success: true, data: goals });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

migrateToLatest();
