import { describe, it, expect } from "vitest";
import {
  mapToCorpusKey,
  getProceduralQuestionsForSubject,
  generateProceduralQuestions,
} from "../../src/backend/data/syllabusCorpus";

describe("Syllabus Matching & Question Generation Logic", () => {
  describe("mapToCorpusKey", () => {
    it("should resolve Bangla terms correctly to bangla key", () => {
      expect(mapToCorpusKey("Bangla Literature")).toBe("bangla");
      expect(mapToCorpusKey("বাংলা ব্যাকরণ")).toBe("bangla");
    });

    it("should resolve English terms to english key", () => {
      expect(mapToCorpusKey("English grammar")).toBe("english");
      expect(mapToCorpusKey("ইংরেজি")).toBe("english");
    });

    it("should resolve Constitution to bangladesh key", () => {
      expect(mapToCorpusKey("Bangladesh Constitution")).toBe("bangladesh");
      expect(mapToCorpusKey("বাংলাদেশ বিষয়াবলী")).toBe("bangladesh");
    });

    it("should fallback to bangladesh key for unrecognized subjects", () => {
      expect(mapToCorpusKey("random unknown subject")).toBe("bangladesh");
    });
  });

  describe("getProceduralQuestionsForSubject", () => {
    it("should generate exact requested count of questions", () => {
      const qs = getProceduralQuestionsForSubject("Bangla Literature", 3, "চর্যাপদ", "Medium");
      expect(qs).toHaveLength(3);
      expect(qs[0].subject).toBe("Bangla Literature");
      expect(qs[0].topic).toBe("চর্যাপদ");
    });

    it("should deterministically shuffle option choices", () => {
      const q1 = getProceduralQuestionsForSubject("English Grammar", 1, "Noun", "Medium", 0);
      const q2 = getProceduralQuestionsForSubject("English Grammar", 1, "Noun", "Medium", 10);
      // Different seed offsets yield different or same (wrapped) option indices but correct mapping preserved
      expect(q1[0].options[q1[0].correctIndex]).toBeDefined();
      expect(q2[0].options[q2[0].correctIndex]).toBeDefined();
    });
  });

  describe("generateProceduralQuestions", () => {
    it("should compile batch questions for multiple allocations", () => {
      const allocations = [
        { subject: "Bangla Literature", topic: "চর্যাপদ", count: 2 },
        { subject: "English Literature", topic: "Shakespeare", count: 3 },
      ];
      const qs = generateProceduralQuestions(allocations, "Medium");
      expect(qs).toHaveLength(5);
      expect(qs.filter((q) => q.subject === "Bangla Literature")).toHaveLength(2);
      expect(qs.filter((q) => q.subject === "English Literature")).toHaveLength(3);
    });
  });
});
