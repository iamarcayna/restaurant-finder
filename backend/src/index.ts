import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.NODE_PORT || 3001;

app.use(json());

app.get("/", (_, response) => {
  response.status(200).json({
    message: "Initial backend setup",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
