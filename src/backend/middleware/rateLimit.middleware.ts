import rateLimit from "express-rate-limit";
import { logger } from "../config/logging";

// General API rate limiter: max 150 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
  message: {
    status: "error",
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip} on route: ${req.path}`);
    res.status(429).json(options.message);
  },
});

// Strict rate limiter for AI generation routes: max 15 requests per 1 minute
export const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15,
  message: {
    status: "error",
    message: "Too many AI generation requests, please wait 1 minute before trying again",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    logger.warn(`AI Rate limit exceeded for IP: ${req.ip} on route: ${req.path}`);
    res.status(429).json(options.message);
  },
});
