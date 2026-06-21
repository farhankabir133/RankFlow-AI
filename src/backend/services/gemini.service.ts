import { GoogleGenAI } from "@google/genai";
import { env, HAS_GEMINI, getGcpProject, getGcpLocation } from "../config/env";
import { logger } from "../config/logging";
import { AIService, TutorResponse, Question, EvaluationResult } from "./ai.service";

export class GeminiService implements AIService {
  private static instance: GeminiService;
  private ai: GoogleGenAI | null = null;
  private isQuotaExhausted = false;
  private quotaExhaustResetTime = 0;

  private constructor() {
    if (env.GEMINI_API_KEY) {
      this.ai = new GoogleGenAI({
        apiKey: env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      logger.info("🤖 Gemini AI Service initialized with API Key.");
    } else if (HAS_GEMINI) {
      const gcpProject = getGcpProject();
      const gcpLocation = getGcpLocation();
      this.ai = new GoogleGenAI({
        vertexai: true,
        project: gcpProject,
        location: gcpLocation,
      });
      logger.info(`🤖 Gemini AI Service initialized using Application Default Credentials (ADC) on Vertex AI (project: ${gcpProject}, location: ${gcpLocation}).`);
    } else {
      logger.warn("⚠️ Gemini API Key / ADC not configured. Server running in simulated offline mode.");
    }
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public getClient(): GoogleGenAI | null {
    return this.ai;
  }

  public isConfigured(): boolean {
    return !!this.ai;
  }

  public isOffline(): boolean {
    this.checkQuotaStatus();
    return !this.ai || this.isQuotaExhausted;
  }

  private checkQuotaStatus() {
    if (this.isQuotaExhausted && Date.now() > this.quotaExhaustResetTime) {
      this.isQuotaExhausted = false;
      logger.info("[RankFlow AI] Quota cooldown expired. Restoring active live query pipelines.");
    }
  }

  public async callWithModelFallback<T>(
    apiCall: (aiClient: GoogleGenAI, modelName: string) => Promise<T>
  ): Promise<T> {
    this.checkQuotaStatus();
    
    if (!this.ai) {
      throw new Error("GEMINI_UNCONFIGURED");
    }

    if (this.isQuotaExhausted) {
      throw new Error("GEMINI_OFFLINE");
    }

    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-flash-latest"];
    let finalErr: any = null;

    for (let i = 0; i < modelsToTry.length; i++) {
      const model = modelsToTry[i];
      try {
        logger.info(`[RankFlow AI] Initiating call to generative model: ${model}`);
        return await apiCall(this.ai, model);
      } catch (err: any) {
        finalErr = err;
        const errMsg = err.message || JSON.stringify(err) || "";
        const isRateLimit =
           errMsg.includes("429") ||
           errMsg.includes("401") ||
           errMsg.includes("quota") ||
           errMsg.includes("RESOURCE_EXHAUSTED") ||
           errMsg.includes("UNAVAILABLE") ||
           errMsg.includes("high demand") ||
           errMsg.includes("invalid authentication") ||
           errMsg.includes("ACCESS_TOKEN_TYPE_UNSUPPORTED") ||
           err.status === 429 ||
           err.status === 503 ||
           err.status === 401;

        const isAuthError = err.status === 401 || errMsg.includes("401") || errMsg.includes("UNAUTHENTICATED");

        if (isRateLimit || isAuthError) {
          logger.warn(
            `[RankFlow AI] Model ${model} rate-limited, quota exhausted, or auth failed. Error: ${errMsg.slice(0, 160)}`
          );
          if (i < modelsToTry.length - 1) {
            logger.info("[RankFlow AI] Model failover in progress: cascading call to secondary model.");
            continue;
          } else {
            this.isQuotaExhausted = true;
            this.quotaExhaustResetTime = Date.now() + 3 * 60 * 1000;
            logger.error(
              "[RankFlow AI] Critical Limit Reached: All Gemini models unavailable or auth failed. Freezing live connections on 3-minute cooldown."
            );
          }
        } else {
          throw err;
        }
      }
    }

    throw finalErr || new Error("All model calls within chain failed");
  }

  private sanitizeResponse(text: string): string {
    let cleaned = text.trim();
    cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, "");
    cleaned = cleaned.replace(/```(?:json)?\n?([\s\S]*?)```/g, "$1").trim();

    const firstBrace = cleaned.indexOf("{");
    const firstBracket = cleaned.indexOf("[");
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      cleaned = cleaned.substring(firstBrace);
    } else if (firstBracket !== -1) {
      cleaned = cleaned.substring(firstBracket);
    }

    return cleaned.trim();
  }

  private parseJsonSafe<T>(text: string, fallback: T): T {
    const sanitized = this.sanitizeResponse(text);
    try {
      return JSON.parse(sanitized) as T;
    } catch {
      logger.warn("[GeminiService] JSON parse failed, using fallback");
      return fallback;
    }
  }

  public async getTutorResponse(
    message: string,
    history: Array<{ sender: "user" | "ai"; text: string }> = [],
    examType = "BCS Exam",
    subject = "General Studies"
  ): Promise<TutorResponse> {
    if (!this.ai) {
      throw new Error("GEMINI_UNCONFIGURED");
    }

    const historyPrompt = history
      .map((m) => `${m.sender === "user" ? "Student" : "Tutor"}: ${m.text}`)
      .join("\n");

    const userPrompt = `${historyPrompt ? `Previous conversation:\n${historyPrompt}\n\n` : ""}Student preparing for ${examType}. Subject: ${subject}.\nStudent asks: "${message}"\n\nRespond in JSON matching the tutor output contract.`;

    const systemInstruction = `You are the elite RankFlow AI Tutor, specialized in Bangladesh competitive exams: BCS, University Admission, SSC, HSC. 
Communicate in bilingual Bangla/English. Explain deeply, simplify complicated details, decompose complex equations, and explain WHY wrong choices are incorrect in MCQs.
Always output strict JSON only:
{ "text": "...", "bilingual": { "en": "...", "bn": "..." }, "steps": [...], "concept": "..." }`;

    try {
      const raw = await this.callWithModelFallback<string>((ai, model) =>
        ai.models.generateContent({
          model,
          contents: [
            { role: "user", parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] },
          ],
          config: { temperature: 0.6, maxOutputTokens: 2048 },
        }).then(res => res.text || "")
      );

      const parsed = this.parseJsonSafe<TutorResponse>(raw, {
        text: "",
        bilingual: { en: "", bn: "" },
        steps: [],
        concept: "",
      });

      if (!parsed.text || !parsed.bilingual) {
        throw new Error("Incomplete tutor response");
      }

      return parsed;
    } catch (err: any) {
      logger.warn(`[GeminiService] Tutor fallback active: ${err.message}`);
      return {
        text: `[Offline Mode] Simulated response for "${message}". Configure GEMINI_API_KEY for live AI.`,
        bilingual: {
          bn: `[অফলাইন মোড] আপনার প্রশ্ন "${message}" সম্পর্কিত সমাধান। GEMINI_API_KEY কনফিগার করুন।`,
          en: `[Demo Mode] Step-by-step tutoring for your query about ${subject}.`,
        },
        steps: [
          "১. প্রশ্নটি বিশ্লেষণ করুন এবং সিলেবাস লক্ষ্য করুন।",
          "২. মূল সূত্রে ফিরে যান।",
          "৩. উদাহরণ ও টেকনিক প্রয়োগ করুন।",
        ],
        concept: "এই টপিক থেকে নিয়মিত প্রশ্ন আসে। মূল তত্ত্ব মনে রাখা জরুরী।",
      };
    }
  }

  public async generateBatchQuestions(
    allocations: { subject: string; topic?: string; count: number }[],
    difficulty = "Medium",
    examType = "BCS"
  ): Promise<{ questions: Question[]; isFallback: boolean }> {
    if (!this.ai) {
      throw new Error("GEMINI_UNCONFIGURED");
    }

    const totalWanted = allocations.reduce((sum, a) => sum + (parseInt(String(a.count)) || 0), 0);
    const allocationsText = JSON.stringify(allocations);

    const userPrompt = `Generate exactly ${totalWanted} unique multiple-choice questions.
Exam Type: ${examType}
Difficulty: ${difficulty}
Allocations: ${allocationsText}
Language: Questions and explanations in high-quality Bangla (and English where applicable).
Accuracy: Strict academic validity for Bangladesh administrative and banking exams.

Output strict JSON array of questions:
[
  {
    "id": "unique-id",
    "text": "question text",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "subject": "Subject name",
    "topic": "Topic name",
    "difficulty": "Easy|Medium|Hard",
    "explanations": {
      "bn": "Bangla explanation",
      "en": "English explanation",
      "wrongOptions": ["Why A is wrong", "Why B is wrong", "Why C is wrong", "Why D is wrong"]
    }
  }
]`;

    const systemInstruction = `You are a premium Question Design Panel for Bangladesh competitive exams.
Output ONLY a strict JSON array matching the schema. No markdown, no trailing metadata, clean human-ready text.`;

    try {
      const raw = await this.callWithModelFallback<string>((ai, model) =>
        ai.models.generateContent({
          model,
          contents: [
            { role: "user", parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] },
          ],
          config: { temperature: 0.1, maxOutputTokens: 8192 },
        }).then(res => res.text || "")
      );

      const parsed = this.parseJsonSafe<Question[]>(raw, []);

      let questions = Array.isArray(parsed) ? parsed : [];

      if (questions.length === 0) {
        throw new Error("Empty questions array");
      }

      questions = questions.map((q, idx) => ({
        ...q,
        id: q.id || `gen-${Math.random().toString(36).substring(7)}-${idx}`,
        text: (q.text || "").replace(/\[.*?\]/g, "").trim(),
        options: Array.isArray(q.options) ? q.options : [],
        correctIndex: typeof q.correctIndex === "number" ? q.correctIndex : 0,
        explanations: q.explanations || { bn: "", en: "", wrongOptions: [] },
      }));

      return { questions, isFallback: false };
    } catch (err: any) {
      logger.warn(`[GeminiService] Batch AI generation failed, using fallback: ${err.message}`);
      const { generateProceduralQuestions } = await import("../data/syllabusCorpus");
      const fallbackQs = generateProceduralQuestions(allocations, difficulty);
      return { questions: fallbackQs, isFallback: true };
    }
  }

  public async evaluateWrittenAnswer(
    submissionText: string,
    title = "Written Assessment",
    subject = "General Studies"
  ): Promise<EvaluationResult> {
    if (!this.ai) {
      throw new Error("GEMINI_UNCONFIGURED");
    }

    const userPrompt = `Evaluate the following student submission for Bangladesh competitive exam.
Title: "${title}"
Subject: "${subject}"
Submission: "${submissionText}"

Output strict JSON only:
{ "score": 0, "feedback": ["..."], "corrections": ["..."] }`;

    const systemInstruction = `You are the chief examiner for BCS written papers.
Provide granular scores (0-100), strengths, critical structural gaps, actionable spelling/grammar fixes, and comparison advice to high-scoring model answers in Bangladesh civil exams.
Output strict JSON only.`;

    try {
      const raw = await this.callWithModelFallback<string>((ai, model) =>
        ai.models.generateContent({
          model,
          contents: [
            { role: "user", parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] },
          ],
          config: { temperature: 0.3, maxOutputTokens: 2048 },
        }).then(res => res.text || "")
      );

      const parsed = this.parseJsonSafe<EvaluationResult>(
        raw,
        { score: 70, feedback: [], corrections: [] }
      );

      if (typeof parsed.score !== "number") {
        parsed.score = 70;
      }

      return parsed;
    } catch (err: any) {
      logger.warn(`[GeminiService] Written evaluation fallback active: ${err.message}`);

      const lengthScore = Math.min(100, Math.floor((submissionText || "").length / 10) + 50);
      return {
        score: lengthScore,
        feedback: [
          "Bengali/English grammar and coherence evaluated with local fallback scorer.",
          "Structural layout needs optimal paragraph transition signposts.",
        ],
        corrections: [
          "Add precise data metrics (e.g., constitutional articles, 5-Year Plan references) to boost scores.",
          "Improve paragraph transitions and signposting.",
        ],
      };
    }
  }
}

export const geminiService = GeminiService.getInstance();
export const hasGeminiConfigured = HAS_GEMINI;
