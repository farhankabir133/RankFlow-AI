import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { logger } from "../config/logging";

export const validateRequest = (schema: z.ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn(`Validation error: ${JSON.stringify(error.issues)}`);
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};

export const tutorSchema = z.object({
  body: z.object({
    message: z.string().min(1, "Message is required"),
    history: z
      .array(
        z.object({
          sender: z.enum(["user", "ai"]),
          text: z.string(),
        })
      )
      .optional(),
    examType: z.string().optional(),
    subject: z.string().optional(),
  }),
});

export const writtenEvaluateSchema = z.object({
  body: z.object({
    submissionText: z.string().min(1, "Submission text is required"),
    title: z.string().optional(),
    subject: z.string().optional(),
  }),
});

export const adaptiveQuestionSchema = z.object({
  body: z.object({
    subject: z.string().optional(),
    topic: z.string().optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).optional().default("Medium"),
    examType: z.string().optional(),
  }),
});

export const batchQuestionsSchema = z.object({
  body: z.object({
    examType: z.string().optional(),
    difficulty: z.string().optional().default("Medium"),
    allocations: z
      .array(
        z.object({
          subject: z.string().min(1, "Allocation subject is required"),
          topic: z.string().optional(),
          count: z.any().transform((val) => {
            const parsed = parseInt(val, 10);
            return isNaN(parsed) ? 0 : parsed;
          }),
        })
      )
      .min(1, "At least one question allocation is required"),
    subtopics: z.array(z.string()).optional(),
    questionType: z.string().optional(),
    examMode: z.string().optional(),
  }),
});
