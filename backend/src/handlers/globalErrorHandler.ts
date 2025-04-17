import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Opps. Something went wrong.";

  response.status(status).json({
    error: message,
  });
};
