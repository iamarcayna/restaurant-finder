import express, { json } from "express";
import dotenv from "dotenv";
import * as Routes from "./routes";
dotenv.config();

const app = express();
const port = process.env.NODE_PORT || 3001;

app.use(json());

// Register routes for search
app.use("/api", Routes.searchRouter);

// Catch all route
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
