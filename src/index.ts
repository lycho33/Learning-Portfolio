import dotenv from "dotenv";
import express from "express";
import { migrateToLatest } from "./.config/migrations/index.ts";

dotenv.config();

const app = express();
const port = 3030;

app.get("/", (req, res) => {
  console.log("🫣 Hello Docker! 🌸");
  res.send("🫥 Hello, Docker!");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

// await GoalsRepository.createGoal({
//   id: 1,
//   goal: "Create a table and a row",
// });

migrateToLatest();
