import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import { apiLimiter, aiLimiter } from "./middleware/rateLimit.middleware";
import {
  validateRequest,
  tutorSchema,
  writtenEvaluateSchema,
  adaptiveQuestionSchema,
  batchQuestionsSchema,
} from "./middleware/validate.middleware";
import {
  handleTutor,
  handleWrittenEvaluate,
  handleAdaptiveQuestion,
  handleBatchQuestions,
  handleRankSimulation,
  handleHealthCheck,
} from "./controllers/ai.controller";

const app = express();

// === SECURITY MIDDLEWARES ===
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://apis.google.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://*.perplexity.ai"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://*.perplexity.ai"],
        connectSrc: [
          "'self'",
          "https://*.googleapis.com",
          "https://*.firebaseapp.com",
          "https://*.google.com",
          "https://*.perplexity.ai",
          "https://*.railway.app",
          "wss://localhost:*",
          "ws://localhost:*",
        ],
        imgSrc: ["'self'", "data:", "https://*.googleusercontent.com", "https://img.shields.io", "https://*.perplexity.ai"],
        frameSrc: ["'self'", "https://*.firebaseapp.com", "https://*.google.com", "https://*.perplexity.ai"],
        frameAncestors: ["'self'", "https://*.perplexity.ai", "https://*.google.com"],
      },
    },
    crossOriginOpenerPolicy: false,
    xFrameOptions: false,
  })
);

app.use(cors());
app.use(express.json());

// === API ROUTES ===

// Apply general API rate limiter to all API endpoints
app.use("/api/", apiLimiter);

// Root-level health check for Railway load balancer (no rate limit)
app.get("/health", handleHealthCheck);

// Legacy API health check (kept for compatibility)
app.get("/api/health", handleHealthCheck);

// Live real-time system stats update (Simulation)
app.get("/api/rank-simulation", handleRankSimulation);

// AI endpoints with strict rate limiting and schema validations
app.post("/api/ai/tutor", aiLimiter, validateRequest(tutorSchema), handleTutor);

app.post(
  "/api/ai/written-evaluate",
  aiLimiter,
  validateRequest(writtenEvaluateSchema),
  handleWrittenEvaluate
);

app.post(
  "/api/ai/adaptive-question",
  aiLimiter,
  validateRequest(adaptiveQuestionSchema),
  handleAdaptiveQuestion
);

app.post(
  "/api/ai/batch-questions",
  aiLimiter,
  validateRequest(batchQuestionsSchema),
  handleBatchQuestions
);

// === GLOBAL ERROR HANDLER ===
app.use(errorHandler);

export { app };
