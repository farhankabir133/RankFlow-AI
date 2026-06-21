import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .default("3000")
    .transform((val) => parseInt(val, 10)),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GEMINI_API_KEY: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "MY_GEMINI_API_KEY") {
        return undefined;
      }
      return val;
    }),
  AI_PROVIDER: z
    .enum(["gemini", "groq"])
    .default("groq"),
  GROQ_API_KEY: z.string().optional(),
  GROQ_MODEL: z.string().default("deepseek-r1-distill-llama-8b"),
  GROQ_API_URL: z.string().default("https://api.groq.com/openai/v1/chat/completions"),
});

import fs from "fs";
import path from "path";
import os from "os";

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

const hasAdcFile = (): boolean => {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  }
  const defaultAdcPath = path.join(
    os.homedir(),
    ".config",
    "gcloud",
    "application_default_credentials.json"
  );
  return fs.existsSync(defaultAdcPath);
};

export const getGcpProject = (): string | undefined => {
  if (process.env.GOOGLE_CLOUD_PROJECT) return process.env.GOOGLE_CLOUD_PROJECT;
  if (process.env.GOOGLE_PROJECT) return process.env.GOOGLE_PROJECT;
  
  const defaultAdcPath = path.join(
    os.homedir(),
    ".config",
    "gcloud",
    "application_default_credentials.json"
  );
  if (fs.existsSync(defaultAdcPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(defaultAdcPath, "utf8"));
      return data.quota_project_id || data.project_id;
    } catch (e) {
      // ignore
    }
  }
  return undefined;
};

export const getGcpLocation = (): string => {
  return process.env.GOOGLE_CLOUD_LOCATION || "us-central1";
};

export const HAS_GEMINI = !!env.GEMINI_API_KEY || hasAdcFile();
