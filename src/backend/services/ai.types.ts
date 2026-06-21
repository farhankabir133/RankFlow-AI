export interface TutorResponse {
  text: string;
  bilingual: { en: string; bn: string };
  steps: string[];
  concept: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  subject: string;
  topic: string;
  difficulty: string;
  explanations: {
    bn: string;
    en: string;
    wrongOptions: string[];
  };
}

export interface EvaluationResult {
  score: number;
  feedback: string[];
  corrections: string[];
}
