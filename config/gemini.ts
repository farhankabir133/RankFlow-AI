import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const HAS_GEMINI = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

export const ai = HAS_GEMINI
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

// Dual-layer state trackers for managing free tier API quota exhaustion dynamically
export let isQuotaExhausted = false;
let quotaExhaustResetTime = 0;

export function checkQuotaStatus() {
  if (isQuotaExhausted && Date.now() > quotaExhaustResetTime) {
    isQuotaExhausted = false;
    console.log("[RankFlow AI] Quota cooldown expired. Restoring active live query pipelines.");
  }
}

export function setQuotaExhausted(status: boolean) {
  isQuotaExhausted = status;
  if (status) {
    quotaExhaustResetTime = Date.now() + 3 * 60 * 1000; // 3 minute local backoff
  }
}

export async function callGeminiWithModelFallback<T>(apiCall: (modelName: string) => Promise<T>): Promise<T> {
  checkQuotaStatus();
  if (!ai || isQuotaExhausted) {
    throw new Error("GEMINI_OFFLINE");
  }

  // Model chain representing different tier levels to maximize chances of matching available quota pools
  const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let finalErr: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];
    try {
      console.log(`[RankFlow AI] Initiating call to generative model: ${model}`);
      return await apiCall(model);
    } catch (err: any) {
      finalErr = err;
      const errMsg = err.message || JSON.stringify(err) || "";
      const isRateLimit = errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED") || err.status === 429;

      if (isRateLimit) {
        console.warn(`[RankFlow AI] Model ${model} rate-limited or daily quota exhausted. Error detail: ${errMsg.slice(0, 160)}`);
        if (i < modelsToTry.length - 1) {
          console.log(`[RankFlow AI] Model failover in progress: cascading call to secondary model in sequence.`);
          continue;
        } else {
          // Flag quota exhaustion when ALL models are completely blocked
          setQuotaExhausted(true);
          console.error(`[RankFlow AI] Critical Limit Reached: All Gemini models in model chain are returning 429. Freezing live connections on 3-minute cooldown.`);
        }
      } else {
        throw err;
      }
    }
  }

  throw finalErr || new Error("All model calls within chain failed");
}
