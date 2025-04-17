import { Router } from "express";
import { SearchController } from "../controllers";

export const searchRouter = Router();

searchRouter.post("/execute", SearchController.search);
