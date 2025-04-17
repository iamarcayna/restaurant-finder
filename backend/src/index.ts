import express, { json } from "express";
import dotenv from "dotenv";
import * as Routes from "./routes";
import { globalErrorHandler } from "./handlers";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.NODE_PORT || 3001;
const frontendPort = process.env.NUXT_PORT || 3000

app.use(json());

// Allow CORS for local frontend
app.use(cors({ origin: `http://localhost:${frontendPort}` }));

// Register routes for search
app.use("/api", Routes.searchRouter);

// Catch all route
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Add global error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
