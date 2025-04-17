import { NextFunction, Request, Response } from "express";
import { RestaurantFinderError } from "../errors";

export const globalErrorHandler = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Opps. Something went wrong.";

  let errorData;

  if (error instanceof RestaurantFinderError) {
    errorData = error.error;
  }

  response.status(status).json({
    error: message,
    details: errorData,
  });
};
