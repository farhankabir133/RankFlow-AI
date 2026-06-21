import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { logger } from "../config/logging";

export interface AppError extends Error {
  statusCode?: number;
  errors?: any;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`[${req.method}] ${req.path} - Error: ${message}`, {
    stack: err.stack,
    statusCode,
  });

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};
