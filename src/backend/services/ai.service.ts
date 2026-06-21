import type { TutorResponse, Question, EvaluationResult } from "./ai.types";

export interface AIService {
  getTutorResponse(
    message: string,
    history: Array<{ sender: "user" | "ai"; text: string }>,
    examType: string,
    subject: string
  ): Promise<TutorResponse>;

  generateBatchQuestions(
    allocations: { subject: string; topic?: string; count: number }[],
    difficulty: string,
    examType: string
  ): Promise<{ questions: Question[]; isFallback: boolean }>;

  evaluateWrittenAnswer(
    submissionText: string,
    title: string,
    subject: string
  ): Promise<EvaluationResult>;

  isConfigured(): boolean;
}

export type { TutorResponse, Question, EvaluationResult } from "./ai.types";
