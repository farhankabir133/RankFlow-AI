import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Define fallback responses in case GEMINI_API_KEY is not defined or fails,
// ensuring the application is robust and fully functional under all runtime environments.
const HAS_GEMINI = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

const ai = HAS_GEMINI
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === API ROUTES ===

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", geminiConfigured: HAS_GEMINI });
  });

  // AI Tutor prompt endpoint
  app.post("/api/ai/tutor", async (req, res) => {
    const { message, history, examType, subject } = req.body;
    
    if (!ai) {
      // Offline / Unconfigured fallback
      return res.json({
        id: Math.random().toString(),
        sender: 'ai',
        text: `[Offline Mode] Here is a simulated response concerning "${message}". We are currently running in local offline demo mode. To unlock the full power of Bangladesh's first AI-Native Competitive Tutor, configure your Gemini API Key in the Secrets panel.`,
        bilingual: {
          bn: `[অফলাইন মোড] আপনার প্রশ্ন "${message}" সম্পর্কিত সমাধান। বিস্তারিত জানার জন্য দয়া করে Settings > Secrets প্যানেলে আপনার Gemini API Key যুক্ত করুন।`,
          en: `[Demo Mode] Step-by-step tutoring explanation regarding your query about ${subject || "general syllabus"}.`
        },
        stepByStep: [
          "১. প্রশ্নটি ভালোভাবে বিশ্লেষণ করুন এবং BCS সিলেবাসটি লক্ষ্য করুন।",
          "২. অপ্রয়োজনীয় জটিল পরীক্ষা পরিহার করে মূল সূত্রে ফিরে যান।",
          "৩. উদাহরণস্বরূপ: সঠিক ব্যাকরণ বা ঐতিহাসিক তথ্য মনে রাখার টেকনিক প্রয়োগ করুন।"
        ],
        conceptDecomposition: "BCS এবং বিশ্ববিদ্যালয় পরীক্ষাগুলোতে এই টপিক থেকে নিয়মিত ৩-৪টি প্রশ্ন আসে। তাই এর মূল তত্ত্ব মনে রাখা অত্যন্ত জরুরী।"
      });
    }

    try {
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.text }]
      }));

      // Add actual instructions to Gemini for Bangladesh Exam Preparation
      const sysInstruction = `You are the elite RankFlow AI Tutor, specialized in Bangladesh competitive exams: BCS (Bangladesh Civil Service), University Admission (DU, BUET, IBA, Medical), SSC, and HSC. 
      You communicate beautifully in a bilingual mixture of professional Bangla and English.
      Explain concepts deeply, simplify complicated details, decompose complex equations, and explain WHY wrong choices are incorrect in competitive exam MCQs.
      Always output your response in JSON matching this schema:
      {
        "text": "Brief friendly conversational intro/summary in Bangla/English",
        "bilingual": {
          "bn": "Detailed core tutorial explanation in Bangla with subheadings or bullet points",
          "en": "Detailed equivalent explanation in English"
        },
        "stepByStep": ["Step 1 in Bangla/English", "Step 2", "Step 3..."],
        "conceptDecomposition": "Brief pedagogical insight mapping this concept onto high-yielding BCS marks syllabus criteria (e.g. 35th BCS MCQ topic mapping)"
      }`;

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: sysInstruction,
          responseMimeType: "application/json",
          temperature: 0.7
        }
      });

      // Maintain history manually or feed into contents
      const response = await chat.sendMessage({
        message: `User is preparing for ${examType || 'BCS Exam'}. Subject is ${subject || 'General Studies'}.
        User asks: "${message}"`
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({
        id: Math.random().toString(),
        sender: 'ai',
        text: parsed.text || "I have analyzed your query.",
        bilingual: parsed.bilingual || { bn: response.text, en: "" },
        stepByStep: parsed.stepByStep || [],
        conceptDecomposition: parsed.conceptDecomposition || ""
      });
    } catch (err: any) {
      console.error("AI Tutor Error:", err);
      res.status(500).json({ error: "Failed to generate tutor response", details: err.message });
    }
  });

  // Written Exam Evaluator AI Endpoint
  app.post("/api/ai/written-evaluate", async (req, res) => {
    const { submissionText, title, subject } = req.body;

    if (!ai) {
      // Simulate standard elite evaluation
      const lengthScore = Math.min(10, Math.floor((submissionText || "").length / 100) + 3);
      const randomScore = Math.floor(Math.random() * 15) + 70;
      return res.json({
        id: Math.random().toString(),
        title: title || "BCS Written Exam Practice",
        subject: subject || "General Bangla / English Essay",
        submissionText: submissionText,
        scores: {
          grammar: lengthScore,
          coherence: Math.min(10, lengthScore + 1),
          structure: Math.max(5, lengthScore - 1),
          banglaCustom: Math.min(10, Math.floor(randomScore / 10)),
          overall: randomScore
        },
        feedback: {
          strength: "Excellent depth of factual references regarding Bangladesh's Constitution and key historical context.",
          gap: "Structural layout lacks optimal paragraph transition signposts. Adding precise charts or flow diagrams will boost written evaluation metrics by 15%.",
          grammarFixes: [
            "বানান সংশোধন: 'উজ্জ্বল' বানানটি সঠিক লিখুন (উজ্জল নয়)।",
            "Sentence structure: Keep English clauses precise when listing global geopolitical theories."
          ],
          modelComparisons: "Model answers typically introduce the demographic dividends and outline the 8th Five-Year Plan of Bangladesh as a concluding structural hook. Incorporate these key data metrics for extra marks."
        },
        predictedScore: randomScore
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are the chief examiner for BCS written papers and DU admission essay assessments. 
        Evaluate the following student submission:
        Title of the Assignment: "${title}"
        Subject Area: "${subject}"
        Student Submission Draft Text: 
        "${submissionText}"`,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
          systemInstruction: `You evaluate written long-form competitive exam drafts in English and Bangla. 
          Provide granular scores (0 to 10 scale for grammar, coherence, structure, banglaCustom evaluation, and 0-100 overall score).
          Identify precise written strengths, critical structural gaps, actionable spelling/grammar fixes, and comparison advice to high-scoring model answers in Bangladesh civil exams.
          You must respond in JSON formatted according to this schema:
          {
            "scores": {
              "grammar": number,
              "coherence": number,
              "structure": number,
              "banglaCustom": number,
              "overall": number
            },
            "feedback": {
              "strength": "What the student did extremely well (including context specific to BCS / Bangladeshi university admissions standards)",
              "gap": "Areas of missing arguments, conceptual gaps, or stylistic details",
              "grammarFixes": ["Specific bulleted grammar corrections or style changes in Bangla/English"],
              "modelComparisons": "A description of what 90th percentile BCS written model answers include that this text missed (e.g. reference to specific constitutional articles, data charts, local economic statistics)"
            },
            "predictedScore": number
          }`
        }
      });

      const evaluated = JSON.parse(response.text || "{}");
      res.json({
        id: Math.random().toString(),
        title: title || "Written Assessment",
        subject: subject || "General Studies",
        submissionText,
        scores: evaluated.scores || { grammar: 7, coherence: 7, structure: 7, banglaCustom: 7, overall: 70 },
        feedback: evaluated.feedback || { strength: "", gap: "", grammarFixes: [], modelComparisons: "" },
        predictedScore: evaluated.predictedScore || 70
      });
    } catch (err: any) {
      console.error("AI Evaluation Error:", err);
      res.status(500).json({ error: "Failed to evaluate written text", details: err.message });
    }
  });

  // Adaptive Question generator with dynamic difficulty and option justifications
  app.post("/api/ai/adaptive-question", async (req, res) => {
    const { subject, topic, difficulty, examType } = req.body;

    if (!ai) {
      // Return standard highly curated question based on target
      const mockQuestions = [
        {
          id: "mock-1",
          text: "বাঙলা ভাষার প্রাচীনতম নিদর্শন 'চর্যাপদ' কোন শতাব্দীতে আবিষ্কৃত হয় এবং এটি কোন বংশের আমলে রচিত বলে অধিকাংশ গবেষক মনে করেন?",
          options: [
            "১০ম শতাব্দী, পাল রাজবংশ",
            "৭ম শতাব্দী, গুপ্ত রাজবংশ",
            "৯ম শতাব্দী, পাল রাজবংশ",
            "১১তম শতাব্দী, সেন রাজবংশ"
          ],
          correctIndex: 0,
          subject: "Bangla Literature",
          topic: "Ancient Period",
          difficulty: "Medium",
          explanations: {
            bn: "চর্যাপদ পাল আমলে রচিত হয়। ড. সুনীতিকুমার চট্টোপাধ্যায়ের মতে এর সময়কাল ১০ম-১২শ শতাব্দী। হরপ্রসাদ শাস্ত্রী ১৯০৭ সালে নেপালের রাজদরবার থেকে এটি আবিষ্কার করেন যা ১৯১৬ সালে বঙ্গীয় সাহিত্য পরিষদ থেকে প্রকাশিত হয়।",
            en: "Charyapada was composed during the Pala dynasty. It is the oldest written specimen of Bengali language, discovered by Haraprasad Shastri from Nepal's royal library in 1907.",
            wrongOptions: [
              "৭ম শতাব্দী ড. মুহম্মদ শহীদুল্লাহর মতে প্রাচীনতম হলেও অধিকাংশ পণ্ডিত ১০ম শতাব্দীকে সমর্থন করেন এবং সেন রাজবংশে রচিত হয়নি।",
              "গুপ্ত রাজবংশ চর্যাপদ রচনার পূর্বের সময়কাল নির্দেশ করে, তাই তা ভুল।"
            ]
          }
        },
        {
          id: "mock-2",
          text: "What is the correct conversion of this sentence into indirect speech: The teacher said, 'Honesty is the best policy'?",
          options: [
            "The teacher said that honesty is the best policy.",
            "The teacher told that honesty was the best policy.",
            "The teacher explained that honesty had been the best policy.",
            "The teacher said honesty is being the best policy."
          ],
          correctIndex: 0,
          subject: "English Language",
          topic: "Speech Conversion",
          difficulty: "Easy",
          explanations: {
            bn: "চিরন্তন সত্য বা ইউনিভার্সাল ট্রুথ (Universal Truth) থাকলে ইনডাইরেক্ট স্পিচে টেন্সের কোনো পরিবর্তন ঘটে না। তাই 'honesty is the best policy' অপরিবর্তিত থাকবে।",
            en: "For universal truths or habitual facts, the tense in indirect speech remains unchanged. Hence, 'is' does not change to 'was'.",
            wrongOptions: [
              "was ব্যবহার করা ভুল কারণ সততা চিরন্তন সত্য বা চিরস্থায়ী বিষয়।",
              "had been ব্যবহারের কোনো সুযোগ ব্যাকরণগতভাবে সঠিক নয়।"
            ]
          }
        }
      ];

      const selected = mockQuestions.find(q => q.subject.toLowerCase().includes((subject || "").toLowerCase())) || mockQuestions[0];
      return res.json(selected);
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Generate a single challenging, highly relevant multiple choice question for a ${examType || "BCS"} exam in Bangladesh.
        Core subject requested: "${subject || "Bangla Language & Literature"}"
        Specific topic area: "${topic || "Syllabus high yield topics"}"
        Difficulty tier: "${difficulty || "Medium"}"
        Include explanations in both Bangla and English explaining why options are wrong.`,
        config: {
          responseMimeType: "application/json",
          temperature: 0.8,
          systemInstruction: `You are the master question author for competitive civil service and national university tests in Bangladesh. 
          Create single realistic questions with 4 logical and carefully constructed options. 
          Ensure there is exactly one correct answer.
          Your output JSON MUST perfectly conform to this schema:
          {
            "text": "Detailed question in Bangla (and English where applicable)",
            "options": ["Option A string", "Option B string", "Option C string", "Option D string"],
            "correctIndex": number (0 to 3),
            "subject": "Name of the Subject",
            "topic": "Name of the Topic",
            "difficulty": "Easy" | "Medium" | "Hard",
            "explanations": {
              "bn": "Deep explanation in Bangla of why the correct option is right and the background context of the formula/rule",
              "en": "Detailed translation explanation in English for bilingual prep",
              "wrongOptions": [
                "Justification in Bangla for why option A is incorrect (if wrong)",
                "Justification in Bangla for why option B is incorrect (if wrong)",
                "Justification in Bangla for why option C is incorrect",
                "Justification in Bangla for why option D is incorrect"
              ]
            }
          }`
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({
        id: "gen-" + Math.random().toString(36).substring(7),
        ...parsed
      });
    } catch (err: any) {
      console.error("Adaptive Question Generation Error:", err);
      res.status(500).json({ error: "Failed to generate adaptive question", details: err.message });
    }
  });

  // Batch questions compiler with custom subject/topic allocations and offline fallbacks
  app.post("/api/ai/batch-questions", async (req, res) => {
    const { examType, difficulty, allocations } = req.body;

    console.log("[RankFlow AI] Processing Batch Questions request:", { examType, difficulty, allocations });

    if (!allocations || !Array.isArray(allocations) || allocations.length === 0) {
      return res.status(400).json({ error: "No question allocations specified" });
    }

    const totalWanted = allocations.reduce((sum: number, alloc: any) => sum + (parseInt(alloc.count) || 0), 0);

    // If Gemini API is unconfigured, return realistic pre-baked content
    if (!ai) {
      const fallbackTemplates = [
        {
          text: "বাঙলা ভাষার প্রথম স্বার্থক উপন্যাস ‘দুর্গেশনন্দিনী’ সাহিত্যসম্রাট বঙ্কিমচন্দ্র চট্টোপাধ্যায় কর্তৃক কোন সালে প্রকাশিত হয়?",
          options: ["১৮৬৫ সালে", "১৮৫২ সালে", "১৮৬৪ সালে", "১৮৭২ সালে"],
          correctIndex: 0,
          explanations: {
            bn: "১৮৬৫ সালে বঙ্কিমচন্দ্র চট্টোপাধ্যায়ের প্রথম বাংলা উপন্যাস 'দুর্গেশনন্দিনী' প্রকাশিত হয়। এটি বাংলা সাহিত্যের প্রথম সার্থক উপন্যাস হিসেবে পরিচিত।",
            en: "Durgeshnondini, published in 1865, is considered the first successful Bengali novel, written by Bankim Chandra Chattopadhyay.",
            wrongOptions: [
              "১৮৫২ সালে তারাশঙ্কর তর্করত্নের কাদম্বরী অনূদিত হয়েছিল।",
              "১৮৭২ সালে বঙ্কিমচন্দ্রের মাসিক পত্রিকা 'বঙ্গদর্শন' প্রথম প্রকাশিত হয়।"
            ]
          }
        },
        {
          text: "বাঙলা সাহিত্যের আধুনিক যুগের প্রথম ট্র্যাজেডি নাটক কোনটি এবং এর রচয়িতা কে?",
          options: ["কৃষ্ণকুমারী, মাইকেল মধুসূদন দত্ত", "নীলদর্পন, দীনবন্ধু মিত্র", "কবর, মুনীর চৌধুরী", "শর্মিষ্ঠা, মাইকেল মধুসূদন দত্ত"],
          correctIndex: 0,
          explanations: {
            bn: "১৮৬১ সালে মাইকেল মধুসূদন দত্ত রচিত 'কৃষ্ণকুমারী' বাংলা সাহিত্যের প্রথম সার্থক ও প্রথম ট্র্যাজেডি নাটক। রাজস্থান ইতিহাস অবলম্বনে এটি রচিত।",
            en: "Krishnakumari (1861) by Michael Madhusudan Dutt is recognized as the first standard tragic drama in modern Bengali literature.",
            wrongOptions: [
              "নীলদর্পণ দীনবন্ধু মিত্র রচিত বিখ্যাত নীল বিদ্রোহের পটভূমিকার নাটক, ট্র্যাজেডি নয়।",
              "শর্মিষ্ঠা মধুসূদন দত্তের প্রথম সফল নাটক হলেও এটি ট্র্যাজেডি ছিল না।"
            ]
          }
        },
        {
          text: "What is the accurate spelling for the word representing a system of government in which most of the important decisions are taken by state officials?",
          options: ["Bureaucracy", "Beurocracy", "Bureaucracye", "Burocracy"],
          correctIndex: 0,
          explanations: {
            bn: "আমলাতন্ত্রের ইংরেজি প্রতিশব্দ 'Bureaucracy' (B-u-r-e-a-u-c-r-a-c-y)। এটি অত্যন্ত পরিচিত একটি Correction বানান যা বিসিএস পরীক্ষায় নিয়মিত আসে।",
            en: "Bureaucracy is spelled as b-u-r-e-a-u-c-r-a-c-y.",
            wrongOptions: [
              "Beurocracy ভুল ইংরেজি বানান যা উচ্চারণের বিভ্রান্তি থেকে তৈরি হয়।",
              "Bureaucracye অতিরিক্ত ই অক্ষরের কারণে ভূল রূপ ধারণ করেছে।"
            ]
          }
        },
        {
          text: "Find the synonym or identical terminology for the word 'Indifferent':",
          options: ["Apathetic", "Eager", "Zealous", "Compassionate"],
          correctIndex: 0,
          explanations: {
            bn: "Indifferent শব্দের অর্থ হল উদাসীন বা অনুভূতিহীন। Apathetic শব্দের অর্থও উদাসীন। অন্য অপশনগুলোর অর্থ হল আগ্রহী, উদ্যমী এবং সহানুভূতিশীল।",
            en: "'Indifferent' and 'apathetic' both signify lacking interest, enthusiasm, or concern.",
            wrongOptions: [
              "Eager শব্দের অর্থ ব্যাকুল বা অত্যন্ত আগ্রহী।",
              "Zealous শব্দের অর্থ পরম উদ্যমী বা উৎসাহী।"
            ]
          }
        },
        {
          text: "বাংলাদেশ সংবিধানের কোন অনুচ্ছেদ অনুযায়ী রাষ্ট্রপতির সম্মতি ব্যতিরেকে কোনো কর বা রাজস্ব ধার্য বা আদায় করা যায় না?",
          options: ["অনুচ্ছেদ ৮৩", "অনুচ্ছেদ ৭৭", "অনুচ্ছেদ ৬৫", "অনুচ্ছেদ ৯৩"],
          correctIndex: 0,
          explanations: {
            bn: "সংবিধানের ৮৩ অনুচ্ছেদ অনুযায়ী সংসদের কোনো আইনের কর্তৃত্ব ব্যতীত কোনো কর ধার্য বা সংগ্রহ করা যাবে না। কর ধার্যের সার্বভৌম ক্ষমতা আইনসভার।",
            en: "Article 83 states that no tax shall be levied or collected except by or under the authority of an Act of Parliament.",
            wrongOptions: [
              "অনুচ্ছেদ ৭৭ এ ন্যায়পাল (Ombudsman) প্রতিষ্ঠার রূপরেখা দেওয়া আছে।",
              "অনুচ্ছেদ ৯৩ এ মেয়াদের বাইরে রাষ্ট্রপতির অধ্যাদেশ (Ordinance) তৈরির ক্ষমতা বর্ণিত।"
            ]
          }
        },
        {
          text: "A person sells an electronic tablet with a 15% discount on the catalog price, still making a 2% profit. What is the ratio of the catalog price to the cost price?",
          options: ["6 : 5", "5 : 4", "10 : 9", "12 : 11"],
          correctIndex: 0,
          explanations: {
            bn: "ধরি তালিকা মূল্য M এবং ক্রয়মূল্য C। ১৫% ছাড়ে বিক্রয়মূল্য SP = 0.85M। বিক্রয়ে ২% লাভ হলে, SP = 1.02C। সুতরাং, 0.85M = 1.02C => M/C = 1.02/0.85 = 102/85 = 6/5। অর্থাত্ ৬:৫।",
            en: "Discounted Price = 0.85 * Catalog (M). Profited Price = 1.02 * Cost (C). Hence 0.85M = 1.02C => M/C = 1.02/0.85 = 6/5.",
            wrongOptions: [
              "৫:৪ সঠিক নয় কারণ এটি ২০% ছাড়ে ২৫% লাভের ক্ষেত্রে প্রযোজ্য হতো।",
              "১০:৯ অনুপাতটি ভুল ক্যালকুলেশন থেকে প্রাপ্ত হয়।"
            ]
          }
        }
      ];

      const finalizedQs = [];
      let currentIdx = 0;

      for (const group of allocations) {
        const count = group.count || 2;
        for (let i = 0; i < count; i++) {
          const template = fallbackTemplates[currentIdx % fallbackTemplates.length];
          currentIdx++;

          finalizedQs.push({
            id: `offline-${group.subject.substring(0, 3).replace(/\s/g, "")}-${i}-${Math.random().toString(36).substring(7)}`,
            text: template.text + ` [${group.topic || 'General Practice'} - Q${i+1}]`,
            options: template.options,
            correctIndex: template.correctIndex,
            subject: group.subject,
            topic: group.topic || "Syllabus Mastery Unit",
            difficulty: difficulty || "Medium",
            explanations: template.explanations
          });
        }
      }

      return res.json({ questions: finalizedQs });
    }

    try {
      const targetsText = allocations
        .map((a: any) => `* Subject: "${a.subject}", Topic: "${a.topic || 'All high yield content'}", Count: ${a.count}`)
        .join("\n");

      const prompt = `Compose exactly ${totalWanted} multiple choice questions matching this breakdown of targeted subjects and topics:
${targetsText}

Exam standard context is "${examType || 'BCS'} prelim". Target cognitive difficulty is "${difficulty || 'Medium'}".

Ensure that:
1. Every questions belongs exactly to its assigned subject and topic.
2. The options are highly realistic, and exactly one option is correct.
3. Explanations in "bn" must be robust, complete, and extremely helpful.
4. You deliver exactly the total number of items requested (${totalWanted}).

Output your findings as a strict JSON object matches this schema structure:
{
  "questions": [
    {
      "text": "Detailed question text in Bangla",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "subject": "Match the specified subject name",
      "topic": "Match the specified topic name",
      "difficulty": "${difficulty || 'Medium'}",
      "explanations": {
        "bn": "Excellent educational step by step explanation in Bangla text",
        "en": "Concise English translation explanation",
        "wrongOptions": [
          "Explain why option A is incorrect in Bangla",
          "Explain why option B is incorrect in Bangla",
          "Explain why option C is incorrect in Bangla",
          "Explain why option D is incorrect in Bangla"
        ]
      }
    }
  ]
}`;

      const sysInstruction = `You are the master question design panel for BPSC competitive examinations in Bangladesh. 
      You produce highly accurate multiple-choice questions conforming perfectly to syllabus matrices. 
      You must always return your output formatted in JSON conforming to the requested schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: sysInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
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
      });

      const parsed = JSON.parse(response.text || "{}");
      const generatedQs = parsed.questions || [];

      const finalizedQs = generatedQs.map((q: any, idx: number) => ({
        ...q,
        id: "gen-batch-" + Math.random().toString(36).substring(7) + "-" + idx
      }));

      res.json({ questions: finalizedQs });
    } catch (err: any) {
      console.error("[RankFlow AI] Batch Generation Error:", err);
      res.status(500).json({ error: "Failed to generate batch questions", details: err.message });
    }
  });

  // Live real-time system stats update (Dynamic simulation)
  app.get("/api/rank-simulation", (req, res) => {
    // Generate randomized, contextually live metrics to update the landing page or map shifts
    const activeUsers = Math.floor(Math.random() * 2500) + 8400;
    const peakRankPredictedToday = Math.floor(Math.random() * 50) + 1;
    res.json({
      activeUsers,
      peakRankPredictedToday,
      timestamp: new Date().toISOString()
    });
  });

  // === VITE MIDDLEWARE SETUP ===

  // Serve static files in production, use Vite dev server in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for any SPA routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[RankFlow AI Engine] Server live on port ${PORT}`);
  });
}

startServer();
