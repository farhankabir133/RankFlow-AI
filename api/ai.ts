import { Router } from "express";
import { GeminiService } from "../services/ai/gemini.service";
import { generateProceduralQuestions, getProceduralQuestionsForSubject } from "../utils/procedurals";
import { ai, callGeminiWithModelFallback, isQuotaExhausted } from "../config/gemini";
import { Type } from "@google/genai";

const router = Router();

// Endpoint: POST /api/ai/tutor
router.post("/tutor", async (req, res) => {
  const { message, history, examType, subject } = req.body;
  try {
    const result = await GeminiService.tutorSession(message, history, examType, subject);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to run tutor session", details: err.message });
  }
});

// Endpoint: POST /api/ai/written-evaluate
router.post("/written-evaluate", async (req, res) => {
  const { submissionText, title, subject } = req.body;
  try {
    const result = await GeminiService.writtenEvaluate(submissionText, title, subject);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to evaluate written text", details: err.message });
  }
});

// Endpoint: POST /api/ai/adaptive-question
router.post("/adaptive-question", async (req, res) => {
  const { subject, topic, difficulty, examType } = req.body;
  try {
    const result = await GeminiService.generateAdaptiveQuestion(
      subject,
      topic,
      difficulty,
      examType,
      generateProceduralQuestions
    );
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to generate single dynamic question", details: err.message });
  }
});

// Endpoint: POST /api/ai/batch-questions
router.post("/batch-questions", async (req, res) => {
  const { examType, difficulty, allocations } = req.body;

  console.log("[RankFlow AI] Processing Batch Questions request modularly:", { examType, difficulty, allocations });

  if (!allocations || !Array.isArray(allocations) || allocations.length === 0) {
    return res.status(400).json({ error: "No question allocations specified" });
  }

  const totalWanted = allocations.reduce((sum: number, alloc: any) => sum + (parseInt(alloc.count) || 0), 0);

  // If Gemini API is unconfigured, return realistic tailored procedural content
  if (!ai) {
    console.log("[RankFlow AI] Gemini unconfigured. Resorting to tailored procedural question generator.");
    const finalizedQs = generateProceduralQuestions(allocations, difficulty);
    return res.json({ questions: finalizedQs });
  }

  try {
    let hasUsedFallback = isQuotaExhausted;
    const { subtopics, questionType, examMode } = req.body;

    let maxQsPerJob = 15;
    if (totalWanted > 150) {
      maxQsPerJob = 35;
    } else if (totalWanted > 80) {
      maxQsPerJob = 25;
    } else if (totalWanted > 30) {
      maxQsPerJob = 20;
    }

    const jobs: Array<{ subject: string; topic: string; count: number }> = [];

    for (const alloc of allocations) {
      const subject = alloc.subject;
      const topic = alloc.topic || "General";
      let countRemaining = parseInt(alloc.count) || 0;

      while (countRemaining > 0) {
        const take = Math.min(countRemaining, maxQsPerJob);
        jobs.push({ subject, topic, count: take });
        countRemaining -= take;
      }
    }

    console.log(`[RankFlow AI] Chunking Dynamic Blueprint: ${totalWanted} questions split into ${jobs.length} small LLM jobs (max ${maxQsPerJob} Qs per call).`);

    const results: any[] = [];
    const concurrencyLimit = 2; // Spaced queue to stay clear of concurrency rate boundaries
    let jobIndex = 0;

    async function worker() {
      while (true) {
        const currentJobIdx = jobIndex++;
        if (currentJobIdx >= jobs.length) {
          break;
        }

        const job = jobs[currentJobIdx];
        
        // Progressive startup delay spacing to avoid immediate parallel API request storms
        await new Promise(resolve => setTimeout(resolve, currentJobIdx * 750));

        let response: any = null;
        let retryDelaySec = 3;
        const maxRetries = 3;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            const focusSubtopicsText = subtopics && Array.isArray(subtopics) && subtopics.length > 0
              ? `Filter and only select subtopics relevant to "${job.topic}" from: ${JSON.stringify(subtopics)}.`
              : "";
            
            const formulationTypeText = questionType && questionType !== 'All'
              ? `Adopt a strictly ${questionType} formulation style (e.g., conceptual/theory, problem-solving, grammar/corrections, or advanced analytical reasoning).`
              : "";

            const examModeExplanation = examMode 
              ? `This exam is for "${examMode}" mode.`
              : "";

            const randomSeed = Math.random().toString(36).substring(2, 8);

            const jobPrompt = `Compose exactly ${job.count} completely unique multiple choice questions.
Target Subject: "${job.subject}"
Target Topic: "${job.topic}"
${focusSubtopicsText}
${formulationTypeText}
${examModeExplanation}

Specific details:
- Standard: "${examType || 'BCS'} Preliminary Exam"
- Cognitive Level: "${difficulty || 'Medium'}"
- Unique Salt/Seed: "${randomSeed}"
- Language: Question, options, and explanations must be elegantly worded in high-quality Bengali (Bangla).
- Accuracy: Maintain strict academic level validity for Bangladesh administrative and banking exams.
- Ensure that the questions are completely distinct, covering unique dimensions of "${job.topic}".

Output EXACTLY ${job.count} items matching the structural JSON schema. Do not include any trailing metadata or suffix annotations in the question text.`;

            response = await callGeminiWithModelFallback((model) =>
              ai!.models.generateContent({
                model: model,
                contents: jobPrompt,
                config: {
                  systemInstruction: `You are a highly premium Question Design Panel for competitive administrative exams in Bangladesh. 
Your output must be structurally flawless JSON matching the schema, with ZERO repetition across batches. Never append system tracking tags, bracketed codes, or metadata prefixes inside the 'text' field. Keep question text 100% clean and human-ready.`,
                  responseMimeType: "application/json",
                  temperature: 0.85, 
                  responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                      questions: {
                        type: Type.ARRAY,
                        description: "List of generated questions",
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            text: { type: Type.STRING },
                            options: {
                              type: Type.ARRAY,
                              items: { type: Type.STRING }
                            },
                            correctIndex: { type: Type.INTEGER },
                            subject: { type: Type.STRING },
                            topic: { type: Type.STRING },
                            difficulty: { type: Type.STRING },
                            explanations: {
                              type: Type.OBJECT,
                              properties: {
                                bn: { type: Type.STRING },
                                en: { type: Type.STRING },
                                wrongOptions: {
                                  type: Type.ARRAY,
                                  items: { type: Type.STRING }
                                }
                              },
                              required: ["bn", "en", "wrongOptions"]
                            }
                          },
                          required: ["text", "options", "correctIndex", "subject", "topic", "difficulty", "explanations"]
                        }
                      }
                    },
                    required: ["questions"]
                  }
                }
              })
            );

            break; 
          } catch (err: any) {
            const errMsg = err.message || JSON.stringify(err) || "";
            const isRateLimit = errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED") || err.status === 429;
            
            if (isRateLimit && attempt < maxRetries) {
              console.warn(`[RankFlow AI] Rate limit (429) hit on attempt ${attempt}/${maxRetries} for Job ${currentJobIdx}. Retrying in ${retryDelaySec}s...`);
              await new Promise(resolve => setTimeout(resolve, retryDelaySec * 1000));
              retryDelaySec *= 2.5; 
            } else {
              console.error(`[RankFlow AI] Failed to generate job chunk ${currentJobIdx} on attempt ${attempt} after all model failovers. Falling back gracefully. Error:`, errMsg);
              hasUsedFallback = true;
              break; 
            }
          }
        }

        if (response) {
          try {
            const parsed = JSON.parse(response.text || "{}");
            const questions = parsed.questions || [];
            
            for (const q of questions) {
              q.subject = job.subject;
              q.topic = job.topic;
              q.text = q.text.replace(/\[.*?\]/g, '').trim();
              results.push(q);
            }
          } catch (jsonErr: any) {
            console.error(`[RankFlow AI] JSON parse error in job chunk ${currentJobIdx}. Resorting to procedural backup:`, jsonErr);
            hasUsedFallback = true;
            const fallbackQs = getProceduralQuestionsForSubject(job.subject, job.count, job.topic, difficulty || "Medium", currentJobIdx * 13);
            results.push(...fallbackQs);
          }
        } else {
          console.log(`[RankFlow AI] Delivering instant procedural fallback questions (${job.count} Qs) for failed AI-generation slot of theme: "${job.subject} - ${job.topic}".`);
          hasUsedFallback = true;
          const fallbackQs = getProceduralQuestionsForSubject(job.subject, job.count, job.topic, difficulty || "Medium", currentJobIdx * 13);
          results.push(...fallbackQs);
        }
      }
    }

    const workers = Array(Math.min(concurrencyLimit, jobs.length)).fill(null).map(() => worker());
    await Promise.all(workers);

    let finalizedQs = results.map((q: any, idx: number) => ({
      ...q,
      id: "gen-batch-" + Math.random().toString(36).substring(7) + "-" + idx
    }));

    if (finalizedQs.length > totalWanted) {
      finalizedQs = finalizedQs.slice(0, totalWanted);
    } else if (finalizedQs.length < totalWanted) {
      hasUsedFallback = true;
      const needed = totalWanted - finalizedQs.length;
      console.log(`[RankFlow AI] Batch generated ${finalizedQs.length}/${totalWanted} questions. Filling missing ${needed} via procedural generator.`);
      
      const localFallbacks = generateProceduralQuestions(allocations, difficulty);
      if (localFallbacks.length > 0) {
        for (let i = 0; i < needed && i < localFallbacks.length; i++) {
          finalizedQs.push({
            ...localFallbacks[i],
            id: `gen-batch-fallback-reconciled-${Math.random().toString(36).substring(7)}-${i}`
          });
        }
        
        while (finalizedQs.length < totalWanted) {
          const fallbackQ = localFallbacks[finalizedQs.length % localFallbacks.length];
          finalizedQs.push({
            ...fallbackQ,
            id: `gen-batch-fallback-reconciled-loop-${Math.random().toString(36).substring(7)}-${finalizedQs.length}`
          });
        }
      }
    }

    res.json({ questions: finalizedQs, isFallback: hasUsedFallback });
  } catch (err: any) {
    console.warn("[RankFlow AI] Batch Generation Error/Quota Limit. Safely resorting to tailored procedural compilation:", err.message);
    try {
      const finalizedQs = generateProceduralQuestions(allocations, difficulty);
      return res.json({ questions: finalizedQs, isFallback: true });
    } catch (fallbackErr: any) {
      console.error("[RankFlow AI] High-level fallback failed as well:", fallbackErr);
      res.status(500).json({ error: "Failed to generate batch questions", details: err.message });
    }
  }
});

export default router;
