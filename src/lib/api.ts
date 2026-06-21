const API_BASE = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
      return 'https://rankflow-ai-production.up.railway.app';
    }
  }
  return 'http://localhost:3000';
})();

export class ApiError extends Error {
  statusCode?: number;
  errors?: { field: string; message: string }[];
  constructor(message?: string, statusCode?: number, errors?: { field: string; message: string }[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export class ApiClient {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errData: any = {};
      try {
        errData = await response.json();
      } catch (e) {
        // ignore JSON parsing error
      }
      const error: ApiError = new Error(errData.message || `HTTP error! status: ${response.status}`);
      error.statusCode = response.status;
      error.errors = errData.errors;
      throw error;
    }
    return response.json() as Promise<T>;
  }

  public static async getHealth(): Promise<{ status: string; geminiConfigured: boolean }> {
    const res = await fetch(`${API_BASE}/api/health`);
    return this.handleResponse(res);
  }

  public static async getRankSimulation(): Promise<{
    activeUsers: number;
    peakRankPredictedToday: number;
    timestamp: string;
  }> {
    const res = await fetch(`${API_BASE}/api/rank-simulation`);
    return this.handleResponse(res);
  }

  public static async getTutorResponse(payload: {
    message: string;
    history?: { sender: "user" | "ai"; text: string }[];
    examType?: string;
    subject?: string;
  }): Promise<any> {
    const res = await fetch(`${API_BASE}/api/ai/tutor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return this.handleResponse(res);
  }

  public static async evaluateWritten(payload: {
    submissionText: string;
    title?: string;
    subject?: string;
  }): Promise<any> {
    const res = await fetch(`${API_BASE}/api/ai/written-evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return this.handleResponse(res);
  }

  public static async getAdaptiveQuestion(payload: {
    subject?: string;
    topic?: string;
    difficulty?: "Easy" | "Medium" | "Hard";
    examType?: string;
  }): Promise<any> {
    const res = await fetch(`${API_BASE}/api/ai/adaptive-question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return this.handleResponse(res);
  }

  public static async getBatchQuestions(payload: {
    examType?: string;
    difficulty?: string;
    allocations: { subject: string; topic?: string; count: number }[];
    subtopics?: string[];
    questionType?: string;
    examMode?: string;
  }): Promise<any> {
    const res = await fetch(`${API_BASE}/api/ai/batch-questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return this.handleResponse(res);
  }
}
