import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../src/backend/app";

describe("API Integration Tests", () => {
  describe("GET /api/health", () => {
    it("should return 200 OK and health status fields", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", "ok");
      expect(res.body).toHaveProperty("geminiConfigured");
      expect(res.body).toHaveProperty("timestamp");
    });
  });

  describe("GET /api/rank-simulation", () => {
    it("should return simulated rank details", async () => {
      const res = await request(app).get("/api/rank-simulation");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("activeUsers");
      expect(res.body).toHaveProperty("peakRankPredictedToday");
      expect(typeof res.body.activeUsers).toBe("number");
      expect(typeof res.body.peakRankPredictedToday).toBe("number");
    });
  });

  describe("POST /api/ai/tutor", () => {
    it("should return tutor response when message is valid", async () => {
      const payload = {
        message: "What is the capital of Bangladesh?",
        history: [],
        examType: "BCS",
        subject: "Bangladesh Affairs",
      };
      const res = await request(app)
        .post("/api/ai/tutor")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("sender", "ai");
      expect(res.body).toHaveProperty("text");
      expect(res.body).toHaveProperty("bilingual");
      expect(res.body.bilingual).toHaveProperty("bn");
      expect(res.body.bilingual).toHaveProperty("en");
      expect(Array.isArray(res.body.stepByStep)).toBe(true);
      expect(res.body).toHaveProperty("conceptDecomposition");
    });

    it("should return 400 Bad Request when message is missing", async () => {
      const payload = {
        history: [],
      };
      const res = await request(app)
        .post("/api/ai/tutor")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("status", "error");
      expect(res.body).toHaveProperty("message", "Validation failed");
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors[0].field).toBe("body.message");
    });
  });

  describe("POST /api/ai/written-evaluate", () => {
    it("should return evaluation scores and feedback when draft is provided", async () => {
      const payload = {
        submissionText: "বাংলাদেশ স্বাধীন হয় ১৯৭১ সালের ১৬ ডিসেম্বর। রক্তক্ষয়ী যুদ্ধের পর আমরা স্বাধীনতা অর্জন করি।",
        title: "স্বাধীনতা যুদ্ধ",
        subject: "Bangladesh Affairs",
      };
      const res = await request(app)
        .post("/api/ai/written-evaluate")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("title", "স্বাধীনতা যুদ্ধ");
      expect(res.body).toHaveProperty("scores");
      expect(res.body.scores).toHaveProperty("grammar");
      expect(res.body.scores).toHaveProperty("coherence");
      expect(res.body.scores).toHaveProperty("structure");
      expect(res.body.scores).toHaveProperty("banglaCustom");
      expect(res.body.scores).toHaveProperty("overall");
      expect(res.body).toHaveProperty("feedback");
      expect(res.body.feedback).toHaveProperty("strength");
      expect(res.body.feedback).toHaveProperty("gap");
      expect(Array.isArray(res.body.feedback.grammarFixes)).toBe(true);
      expect(res.body.feedback).toHaveProperty("modelComparisons");
      expect(res.body).toHaveProperty("predictedScore");
    });

    it("should return 400 Bad Request when submissionText is empty", async () => {
      const payload = {
        submissionText: "",
        title: "Test Essay",
      };
      const res = await request(app)
        .post("/api/ai/written-evaluate")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("error");
      expect(res.body.errors[0].field).toBe("body.submissionText");
    });
  });

  describe("POST /api/ai/adaptive-question", () => {
    it("should return a formatted single adaptive question", async () => {
      const payload = {
        subject: "Bangla Literature",
        topic: "চর্যাপদ",
        difficulty: "Medium",
        examType: "BCS",
      };
      const res = await request(app)
        .post("/api/ai/adaptive-question")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("text");
      expect(Array.isArray(res.body.options)).toBe(true);
      expect(res.body.options.length).toBe(4);
      expect(typeof res.body.correctIndex).toBe("number");
      expect(res.body).toHaveProperty("explanations");
      expect(res.body.explanations).toHaveProperty("bn");
      expect(res.body.explanations).toHaveProperty("en");
      expect(Array.isArray(res.body.explanations.wrongOptions)).toBe(true);
    });

    it("should return 400 Bad Request on invalid difficulty value", async () => {
      const payload = {
        difficulty: "SuperHard", // Invalid enum value
      };
      const res = await request(app)
        .post("/api/ai/adaptive-question")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("error");
      expect(res.body.errors[0].field).toBe("body.difficulty");
    });
  });

  describe("POST /api/ai/batch-questions", () => {
    it("should compile questions according to specified allocations", async () => {
      const payload = {
        examType: "BCS",
        difficulty: "Medium",
        allocations: [
          { subject: "Bangla Literature", topic: "চর্যাপদ", count: 2 },
          { subject: "English Grammar", topic: "Noun", count: 1 },
        ],
      };
      const res = await request(app)
        .post("/api/ai/batch-questions")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.questions)).toBe(true);
      expect(res.body.questions.length).toBe(3);
      expect(res.body.questions[0]).toHaveProperty("id");
      expect(res.body.questions[0]).toHaveProperty("text");
      expect(res.body.questions[0]).toHaveProperty("options");
      expect(res.body.questions[0]).toHaveProperty("correctIndex");
    });

    it("should return 400 Bad Request when allocations is empty", async () => {
      const payload = {
        examType: "BCS",
        allocations: [],
      };
      const res = await request(app)
        .post("/api/ai/batch-questions")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("error");
      expect(res.body.errors[0].field).toBe("body.allocations");
    });
  });
});
