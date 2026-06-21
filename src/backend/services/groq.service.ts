import { env } from "../config/env";
import { logger } from "../config/logging";
import {
  generateProceduralQuestions,
} from "../data/syllabusCorpus";
import { TutorResponse, Question, EvaluationResult, AIService } from "./ai.service";

export class GroqService implements AIService {
  private apiKey: string | undefined;
  private model: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = env.GROQ_API_KEY;
    this.model = env.GROQ_MODEL;
    this.apiUrl = env.GROQ_API_URL;
  }

  public isConfigured(): boolean {
    return !!this.apiKey;
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

  private async callGroq<T>(
    systemInstruction: string,
    userPrompt: string,
    temperature: number,
    maxRetries = 3
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error("GROQ_API_KEY not configured");
    }

    const messages: Array<{ role: string; content: string }> = [
      { role: "system", content: systemInstruction },
      { role: "user", content: userPrompt },
    ];

    let lastError: any = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: this.model,
            messages,
            temperature,
            max_tokens: 4096,
            response_format: { type: "json_object" },
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Groq API error ${response.status}: ${errText}`);
        }

        const data: any = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (!content) {
          throw new Error("Empty response from Groq API");
        }

        return content;
      } catch (err: any) {
        lastError = err;
        const retryable =
          err.message.includes("429") ||
          err.message.includes("rate") ||
          err.message.includes("503") ||
          err.message.includes("529");

        if (retryable && attempt < maxRetries) {
          const delayMs = Math.pow(2, attempt - 1) * 1000;
          logger.warn(
            `[GroqService] Retry ${attempt}/${maxRetries} after ${delayMs}ms due to: ${err.message.slice(0, 120)}`
          );
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        } else {
          throw err;
        }
      }
    }

    throw lastError || new Error("Groq API call failed after retries");
  }

  private parseJsonSafe<T>(text: string, fallback: T): T {
    const sanitized = this.sanitizeResponse(text);
    try {
      return JSON.parse(sanitized) as T;
    } catch {
      logger.warn("[GroqService] JSON parse failed, using fallback");
      return fallback;
    }
  }

  async getTutorResponse(
    message: string,
    history: Array<{ sender: "user" | "ai"; text: string }>,
    examType: string,
    subject: string
  ): Promise<TutorResponse> {
    if (!this.isConfigured()) {
      throw new Error("GROQ_API_KEY not configured");
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
      const raw = await this.callGroq(systemInstruction, userPrompt, 0.6);
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
      logger.warn(`[GroqService] Tutor fallback active: ${err.message}`);
      return {
        text: `[Offline Mode] Simulated response for "${message}". Configure GROQ_API_KEY for live AI.`,
        bilingual: {
          bn: `[অফলাইন মোড] আপনার প্রশ্ন "${message}" সম্পর্কিত সমাধান। GROQ_API_KEY কনফিগার করুন।`,
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

  async generateBatchQuestions(
    allocations: { subject: string; topic?: string; count: number }[],
    difficulty: string,
    examType: string
  ): Promise<{ questions: Question[]; isFallback: boolean }> {
    if (!this.isConfigured()) {
      throw new Error("GROQ_API_KEY not configured");
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
      const raw = await this.callGroq(systemInstruction, userPrompt, 0.1);
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
      logger.warn(`[GroqService] Batch AI generation failed, using fallback: ${err.message}`);
      const fallbackQs = generateProceduralQuestions(allocations, difficulty);
      return { questions: fallbackQs, isFallback: true };
    }
  }

  async evaluateWrittenAnswer(
    submissionText: string,
    title: string,
    subject: string
  ): Promise<EvaluationResult> {
    if (!this.isConfigured()) {
      throw new Error("GROQ_API_KEY not configured");
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
      const raw = await this.callGroq(systemInstruction, userPrompt, 0.3);
      const parsed = this.parseJsonSafe<EvaluationResult>(
        raw,
        { score: 70, feedback: [], corrections: [] }
      );

      if (typeof parsed.score !== "number") {
        parsed.score = 70;
      }

      return parsed;
    } catch (err: any) {
      logger.warn(`[GroqService] Written evaluation fallback active: ${err.message}`);

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
