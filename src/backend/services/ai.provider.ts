import { env } from "../config/env";
import { geminiService } from "./gemini.service";
import { GroqService } from "./groq.service";
import { AIService } from "./ai.service";
import { logger } from "../config/logging";

const groq = new GroqService();

export function getAIService(): AIService {
  const provider = env.AI_PROVIDER;

  if (provider === "groq") {
    if (groq.isConfigured()) {
      logger.info("[RankFlow AI] Using Groq AI provider (deepseek-r1-distill-llama-8b)");
      return groq;
    }
    logger.warn("[RankFlow AI] Groq selected but not configured. Falling back to Gemini.");
    if (geminiService.isConfigured()) {
      return geminiService;
    }
  }

  if (geminiService.isConfigured()) {
    logger.info("[RankFlow AI] Using Gemini AI provider");
    return geminiService;
  }

  if (groq.isConfigured()) {
    logger.warn("[RankFlow AI] Gemini not configured. Falling back to Groq AI provider");
    return groq;
  }

  logger.error("[RankFlow AI] No AI provider configured (Gemini or Groq). Running in offline mode.");
  return {
    isConfigured: () => false,
  } as AIService;
}
