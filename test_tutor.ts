import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

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

const listParts = [
  {
    role: "user",
    parts: [
      {
        text: `User is preparing for BCS Exam. Subject is General Studies.\nUser asks: "চর্যাপদ কী?"`
      }
    ]
  }
];

console.log("Calling model...");
ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: listParts,
  config: {
    systemInstruction: sysInstruction,
    responseMimeType: "application/json",
    temperature: 0.7,
  }
}).then(res => {
  console.log("RAW TEXT START:");
  console.log(res.text);
  console.log("RAW TEXT END");
  try {
    const parsed = JSON.parse(res.text || "{}");
    console.log("SUCCESSFULLY PARSED!");
  } catch (err: any) {
    console.error("PARSE ERROR:", err.message);
  }
}).catch(err => {
  console.error("API ERROR:", err);
});
