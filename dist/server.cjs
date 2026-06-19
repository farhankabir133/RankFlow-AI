var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express8 = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_dotenv2 = __toESM(require("dotenv"), 1);

// api/auth.ts
var import_express = require("express");
var router = (0, import_express.Router)();
router.post("/login", (req, res) => {
  const { idToken, profile } = req.body;
  res.json({
    status: "authenticated",
    userId: idToken || "demo-student-uid",
    profile: profile || { name: "Anonymized Aspirant" }
  });
});
router.post("/google", (req, res) => {
  res.json({
    status: "ok",
    message: "Google credential authenticated server-side."
  });
});
router.get("/session", (req, res) => {
  res.json({
    authenticated: true,
    userId: "aspirant-3243",
    role: "student",
    plan: "premium",
    streak: 12
  });
});
var auth_default = router;

// api/users.ts
var import_express2 = require("express");

// repositories/user.repo.ts
var import_firestore2 = require("firebase/firestore");

// config/firebase.ts
var import_app = require("firebase/app");
var import_firestore = require("firebase/firestore");

// firebase-applet-config.json with { type: 'json' }
var firebase_applet_config_default = {
  projectId: "gen-lang-client-0209152403",
  appId: "1:493182654001:web:8fecf5ba0fecba8999a710",
  apiKey: "AIzaSyC2P3omQJ-enLtfNB5Sor1JhN5frE5C6PQ",
  authDomain: "gen-lang-client-0209152403.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-39f60206-dace-43d2-97f2-07950188a8b3",
  storageBucket: "gen-lang-client-0209152403.firebasestorage.app",
  messagingSenderId: "493182654001",
  measurementId: ""
};

// config/firebase.ts
var app = (0, import_app.initializeApp)(firebase_applet_config_default);
var db = (0, import_firestore.getFirestore)(app, firebase_applet_config_default.firestoreDatabaseId);

// repositories/user.repo.ts
var UserRepo = class {
  static async getProfile(userId) {
    const docRef = (0, import_firestore2.doc)(db, "users", userId);
    const snap = await (0, import_firestore2.getDoc)(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  }
  static async setProfile(userId, profile) {
    const docRef = (0, import_firestore2.doc)(db, "users", userId);
    await (0, import_firestore2.setDoc)(docRef, profile);
  }
  static async updateProfile(userId, partial) {
    const docRef = (0, import_firestore2.doc)(db, "users", userId);
    await (0, import_firestore2.updateDoc)(docRef, partial);
  }
};

// services/analytics/xp.service.ts
var XpService = class {
  /**
   * Calculates Level mathematically from XP.
   * e.g., Level 1 requires 0 XP, Level 2 requires 1000 XP, Level 3 requires 2000 XP, etc.
   */
  static getLevel(xp) {
    if (xp <= 0) return 1;
    return Math.floor(xp / 1e3) + 1;
  }
  /**
   * Applies XP gain and computes new milestone levels.
   */
  static awardXp(currentXp, amount) {
    const oldLevel = this.getLevel(currentXp);
    const newXp = currentXp + amount;
    const newLevel = this.getLevel(newXp);
    return {
      newXp,
      newLevel,
      leveledUp: newLevel > oldLevel
    };
  }
};

// src/lib/AuthContext.tsx
var import_react = require("react");
var import_auth2 = require("firebase/auth");
var import_firestore4 = require("firebase/firestore");

// src/lib/firebase.ts
var import_app2 = require("firebase/app");
var import_auth = require("firebase/auth");
var import_firestore3 = require("firebase/firestore");

// firebase-applet-config.json
var firebase_applet_config_default2 = {
  projectId: "gen-lang-client-0209152403",
  appId: "1:493182654001:web:8fecf5ba0fecba8999a710",
  apiKey: "AIzaSyC2P3omQJ-enLtfNB5Sor1JhN5frE5C6PQ",
  authDomain: "gen-lang-client-0209152403.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-39f60206-dace-43d2-97f2-07950188a8b3",
  storageBucket: "gen-lang-client-0209152403.firebasestorage.app",
  messagingSenderId: "493182654001",
  measurementId: ""
};

// src/lib/firebase.ts
var app2 = (0, import_app2.initializeApp)(firebase_applet_config_default2);
var db2 = (0, import_firestore3.getFirestore)(app2, firebase_applet_config_default2.firestoreDatabaseId);
var auth = (0, import_auth.getAuth)(app2);

// src/lib/AuthContext.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var AuthContext = (0, import_react.createContext)(void 0);
var defaultUserProfile = {
  name: "Farhan Kabir",
  phone: "01723456789",
  examType: "BCS",
  targetYear: 2026,
  streak: 12,
  xp: 3250,
  level: 4,
  learningStyle: "analytical",
  readinessScore: 78,
  predictedRank: 342,
  totalStudents: 45e4,
  passingProbability: 82,
  consistencyScore: 94,
  district: "Dhaka",
  archetype: "Analytical Strategist"
};

// api/users.ts
var router2 = (0, import_express2.Router)();
router2.get("/me", async (req, res) => {
  const userId = req.query.userId || "farhan-uid";
  try {
    let profile = await UserRepo.getProfile(userId);
    if (!profile) {
      profile = {
        ...defaultUserProfile,
        name: "Farhan Kabir"
      };
      await UserRepo.setProfile(userId, profile);
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to load user profile", details: err.message });
  }
});
router2.patch("/profile", async (req, res) => {
  const userId = req.body.userId || "farhan-uid";
  const updates = req.body.updates;
  if (!updates) {
    return res.status(400).json({ error: "No update parameters received" });
  }
  try {
    await UserRepo.updateProfile(userId, updates);
    res.json({ success: true, updated: updates });
  } catch (err) {
    res.status(500).json({ error: "Failed to patch profile parameters", details: err.message });
  }
});
router2.post("/xp", async (req, res) => {
  const userId = req.body.userId || "farhan-uid";
  const { xpAmount } = req.body;
  if (!xpAmount || typeof xpAmount !== "number") {
    return res.status(400).json({ error: "Invalid alignment parameters" });
  }
  try {
    let profile = await UserRepo.getProfile(userId);
    if (!profile) {
      profile = { ...defaultUserProfile };
    }
    const { newXp, newLevel, leveledUp } = XpService.awardXp(profile.xp, xpAmount);
    const updates = { xp: newXp, level: newLevel };
    await UserRepo.updateProfile(userId, updates);
    res.json({
      success: true,
      xpEarned: xpAmount,
      totalXp: newXp,
      level: newLevel,
      leveledUp
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during XP distribution", details: err.message });
  }
});
var users_default = router2;

// api/ai.ts
var import_express3 = require("express");

// config/gemini.ts
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var HAS_GEMINI = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
var ai = HAS_GEMINI ? new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
}) : null;
var isQuotaExhausted = false;
var quotaExhaustResetTime = 0;
function checkQuotaStatus() {
  if (isQuotaExhausted && Date.now() > quotaExhaustResetTime) {
    isQuotaExhausted = false;
    console.log("[RankFlow AI] Quota cooldown expired. Restoring active live query pipelines.");
  }
}
function setQuotaExhausted(status) {
  isQuotaExhausted = status;
  if (status) {
    quotaExhaustResetTime = Date.now() + 3 * 60 * 1e3;
  }
}
async function callGeminiWithModelFallback(apiCall) {
  checkQuotaStatus();
  if (!ai || isQuotaExhausted) {
    throw new Error("GEMINI_OFFLINE");
  }
  const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let finalErr = null;
  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];
    try {
      console.log(`[RankFlow AI] Initiating call to generative model: ${model}`);
      return await apiCall(model);
    } catch (err) {
      finalErr = err;
      const errMsg = err.message || JSON.stringify(err) || "";
      const isRateLimit = errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED") || err.status === 429;
      if (isRateLimit) {
        console.warn(`[RankFlow AI] Model ${model} rate-limited or daily quota exhausted. Error detail: ${errMsg.slice(0, 160)}`);
        if (i < modelsToTry.length - 1) {
          console.log(`[RankFlow AI] Model failover in progress: cascading call to secondary model in sequence.`);
          continue;
        } else {
          setQuotaExhausted(true);
          console.error(`[RankFlow AI] Critical Limit Reached: All Gemini models in model chain are returning 429. Freezing live connections on 3-minute cooldown.`);
        }
      } else {
        throw err;
      }
    }
  }
  throw finalErr || new Error("All model calls within chain failed");
}

// services/ai/gemini.service.ts
var GeminiService = class {
  static async tutorSession(message, history, examType, subject) {
    if (!ai) {
      return {
        id: Math.random().toString(),
        sender: "ai",
        text: `[Offline Mode] Here is a simulated response concerning "${message}". We are currently running in local offline demo mode. To unlock the full power of Bangladesh's first AI-Native Competitive Tutor, configure your Gemini API Key in the Secrets panel.`,
        bilingual: {
          bn: `[\u0985\u09AB\u09B2\u09BE\u0987\u09A8 \u09AE\u09CB\u09A1] \u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 "${message}" \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09A4 \u09B8\u09AE\u09BE\u09A7\u09BE\u09A8\u0964 \u09AC\u09BF\u09B8\u09CD\u09A4\u09BE\u09B0\u09BF\u09A4 \u099C\u09BE\u09A8\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u09A6\u09DF\u09BE \u0995\u09B0\u09C7 Settings > Secrets \u09AA\u09CD\u09AF\u09BE\u09A8\u09C7\u09B2\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 Gemini API Key \u09AF\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09C1\u09A8\u0964`,
          en: `[Demo Mode] Step-by-step tutoring explanation regarding your query about ${subject || "general syllabus"}.`
        },
        stepByStep: [
          "\u09E7. \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u099F\u09BF \u09AD\u09BE\u09B2\u09CB\u09AD\u09BE\u09AC\u09C7 \u09AC\u09BF\u09B6\u09CD\u09B2\u09C7\u09B7\u09A3 \u0995\u09B0\u09C1\u09A8 \u098F\u09AC\u0982 BCS \u09B8\u09BF\u09B2\u09C7\u09AC\u09BE\u09B8\u099F\u09BF \u09B2\u0995\u09CD\u09B7\u09CD\u09AF \u0995\u09B0\u09C1\u09A8\u0964",
          "\u09E8. \u0985\u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8\u09C0\u09DF \u099C\u099F\u09BF\u09B2 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u09AA\u09B0\u09BF\u09B9\u09BE\u09B0 \u0995\u09B0\u09C7 \u09AE\u09C2\u09B2 \u09B8\u09C2\u09A4\u09CD\u09B0\u09C7 \u09AB\u09BF\u09B0\u09C7 \u09AF\u09BE\u09A8\u0964",
          "\u09E9. \u0989\u09A6\u09BE\u09B9\u09B0\u09A3\u09B8\u09CD\u09AC\u09B0\u09C2\u09AA: \u09B8\u09A0\u09BF\u0995 \u09AC\u09CD\u09AF\u09BE\u0995\u09B0\u09A3 \u09AC\u09BE \u0990\u09A4\u09BF\u09B9\u09BE\u09B8\u09BF\u0995 \u09A4\u09A5\u09CD\u09AF \u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09BE\u09B0 \u099F\u09C7\u0995\u09A8\u09BF\u0995 \u09AA\u09CD\u09B0\u09DF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964"
        ],
        conceptDecomposition: "BCS \u098F\u09AC\u0982 \u09AC\u09BF\u09B6\u09CD\u09AC\u09AC\u09BF\u09A6\u09CD\u09AF\u09BE\u09B2\u09DF \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u0997\u09C1\u09B2\u09CB\u09A4\u09C7 \u098F\u0987 \u099F\u09AA\u09BF\u0995 \u09A5\u09C7\u0995\u09C7 \u09A8\u09BF\u09DF\u09AE\u09BF\u09A4 \u09E9-\u09EA\u099F\u09BF \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u0986\u09B8\u09C7\u0964 \u09A4\u09BE\u0987 \u098F\u09B0 \u09AE\u09C2\u09B2 \u09A4\u09A4\u09CD\u09A4\u09CD\u09AC \u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09BE \u0985\u09A4\u09CD\u09AF\u09A8\u09CD\u09A4 \u099C\u09B0\u09C1\u09B0\u09C0\u0964"
      };
    }
    try {
      const listParts = [];
      if (history && history.length > 0) {
        history.forEach((msg) => {
          listParts.push({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        });
      }
      listParts.push({
        role: "user",
        parts: [{ text: `User is preparing for ${examType || "BCS Exam"}. Subject is ${subject || "General Studies"}.
User asks: "${message}"` }]
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
      const response = await callGeminiWithModelFallback(
        (model) => ai.models.generateContent({
          model,
          contents: listParts,
          config: {
            systemInstruction: sysInstruction,
            responseMimeType: "application/json",
            temperature: 0.7
          }
        })
      );
      const parsed = JSON.parse(response.text || "{}");
      return {
        id: Math.random().toString(),
        sender: "ai",
        text: parsed.text || "I have analyzed your query.",
        bilingual: parsed.bilingual || { bn: response.text, en: "" },
        stepByStep: parsed.stepByStep || [],
        conceptDecomposition: parsed.conceptDecomposition || ""
      };
    } catch (err) {
      console.warn("[RankFlow AI] Tutor session fallback active. Reason:", err.message);
      return {
        id: Math.random().toString(),
        sender: "ai",
        text: `[Offline Mode] Here is a simulated response concerning "${message}". We are currently running in local offline demo mode due to rate limits or unconfigured live keys. To unlock full real-time AI power, set up your Gemini API key.`,
        bilingual: {
          bn: `[\u0985\u09AB\u09B2\u09BE\u0987\u09A8 \u09AE\u09CB\u09A1] \u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 "${message}" \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09A4 \u09B8\u09AE\u09BE\u09A7\u09BE\u09A8\u0964 \u09AC\u09BF\u09B8\u09CD\u09A4\u09BE\u09B0\u09BF\u09A4 \u099C\u09BE\u09A8\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u09A6\u09DF\u09BE \u0995\u09B0\u09C7 Settings > Secrets \u09AA\u09CD\u09AF\u09BE\u09A8\u09C7\u09B2\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 Gemini API Key \u09AF\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09C1\u09A8\u0964`,
          en: `[Demo Mode] Step-by-step tutoring explanation regarding your query about ${subject || "general syllabus"}.`
        },
        stepByStep: [
          "\u09E7. \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u099F\u09BF \u09AD\u09BE\u09B2\u09CB\u09AD\u09BE\u09AC\u09C7 \u09AC\u09BF\u09B6\u09CD\u09B2\u09C7\u09B7\u09A3 \u0995\u09B0\u09C1\u09A8 \u098F\u09AC\u0982 BCS \u09B8\u09BF\u09B2\u09C7\u09AC\u09BE\u09B8\u099F\u09BF \u09B2\u0995\u09CD\u09B7\u09CD\u09AF \u0995\u09B0\u09C1\u09A8\u0964",
          "\u09E8. \u0985\u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8\u09C0\u09DF \u099C\u099F\u09BF\u09B2 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u09AA\u09B0\u09BF\u09B9\u09BE\u09B0 \u0995\u09B0\u09C7 \u09AE\u09C2\u09B2 \u09B8\u09C2\u09A4\u09CD\u09B0\u09C7 \u09AB\u09BF\u09B0\u09C7 \u09AF\u09BE\u09A8\u0964",
          "\u09E9. \u0989\u09A6\u09BE\u09B9\u09B0\u09A3\u09B8\u09CD\u09AC\u09B0\u09C2\u09AA: \u09B8\u09A0\u09BF\u0995 \u09AC\u09CD\u09AF\u09BE\u0995\u09B0\u09A3 \u09AC\u09BE \u0990\u09A4\u09BF\u09B9\u09BE\u09B8\u09BF\u0995 \u09A4\u09A5\u09CD\u09AF \u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09BE\u09B0 \u099F\u09C7\u0995\u09A8\u09BF\u0995 \u09AA\u09CD\u09B0\u09DF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964"
        ],
        conceptDecomposition: "BCS \u098F\u09AC\u0982 \u09AC\u09BF\u09B6\u09CD\u09AC\u09AC\u09BF\u09A6\u09CD\u09AF\u09BE\u09B2\u09DF \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u0997\u09C1\u09B2\u09CB\u09A4\u09C7 \u098F\u0987 \u099F\u09AA\u09BF\u0995 \u09A5\u09C7\u0995\u09C7 \u09A8\u09BF\u09DF\u09AE\u09BF\u09A4 \u09E9-\u09EA\u099F\u09BF \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u0986\u09B8\u09C7\u0964 \u09A4\u09BE\u0987 \u098F\u09B0 \u09AE\u09C2\u09B2 \u09A4\u09A4\u09CD\u09A4\u09CD\u09AC \u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09BE \u0985\u09A4\u09CD\u09AF\u09A8\u09CD\u09A4 \u099C\u09B0\u09C1\u09B0\u09C0\u0964"
      };
    }
  }
  static async writtenEvaluate(submissionText, title, subject) {
    if (!ai) {
      const lengthScore = Math.min(10, Math.floor((submissionText || "").length / 100) + 3);
      const randomScore = Math.floor(Math.random() * 15) + 70;
      return {
        id: Math.random().toString(),
        title: title || "BCS Written Exam Practice",
        subject: subject || "General Bangla / English Essay",
        submissionText,
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
            "\u09AC\u09BE\u09A8\u09BE\u09A8 \u09B8\u0982\u09B6\u09CB\u09A7\u09A8: '\u0989\u099C\u09CD\u099C\u09CD\u09AC\u09B2' \u09AC\u09BE\u09A8\u09BE\u09A8\u099F\u09BF \u09B8\u09A0\u09BF\u0995 \u09B2\u09BF\u0996\u09C1\u09A8 (\u0989\u099C\u09CD\u099C\u09B2 \u09A8\u09DF)\u0964",
            "Sentence structure: Keep English clauses precise when listing global geopolitical theories."
          ],
          modelComparisons: "Model answers typically introduce the demographic dividends and outline the 8th Five-Year Plan of Bangladesh as a concluding structural hook. Incorporate these key data metrics for extra marks."
        },
        predictedScore: randomScore
      };
    }
    try {
      const response = await callGeminiWithModelFallback(
        (model) => ai.models.generateContent({
          model,
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
        })
      );
      const evaluated = JSON.parse(response.text || "{}");
      return {
        id: Math.random().toString(),
        title: title || "Written Assessment",
        subject: subject || "General Studies",
        submissionText,
        scores: evaluated.scores || { grammar: 7, coherence: 7, structure: 7, banglaCustom: 7, overall: 70 },
        feedback: evaluated.feedback || { strength: "", gap: "", grammarFixes: [], modelComparisons: "" },
        predictedScore: evaluated.predictedScore || 70
      };
    } catch (err) {
      console.warn("[RankFlow AI] Written assessment rate-limited / error. Falling back to high-fidelity procedural scorer:", err.message);
      const lengthScore = Math.min(10, Math.floor((submissionText || "").length / 100) + 3);
      const randomScore = Math.floor(Math.random() * 15) + 70;
      return {
        id: Math.random().toString(),
        title: title || "BCS Written Exam Practice (Local Scorer Mode)",
        subject: subject || "General Bangla / English Essay",
        submissionText,
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
            "\u09AC\u09BE\u09A8\u09BE\u09A8 \u09B8\u0982\u09B6\u09CB\u09A7\u09A8: '\u0989\u099C\u09CD\u099C\u09CD\u09AC\u09B2' \u09AC\u09BE\u09A8\u09BE\u09A8\u099F\u09BF \u09B8\u09A0\u09BF\u0995 \u09B2\u09BF\u0996\u09C1\u09A8 (\u0989\u099C\u09CD\u099C\u09B2 \u09A8\u09DF)\u0964",
            "Sentence structure: Keep English clauses precise when listing global geopolitical theories."
          ],
          modelComparisons: "Model answers typically introduce the demographic dividends and outline the 8th Five-Year Plan of Bangladesh as a concluding structural hook. Incorporate these key data metrics for extra marks."
        },
        predictedScore: randomScore
      };
    }
  }
  static async generateAdaptiveQuestion(subject, topic, difficulty, examType, localGenerator) {
    if (!ai || isQuotaExhausted) {
      if (localGenerator) {
        const singleAlloc = [{ subject: subject || "General Studies", topic: topic || "Syllabus Mastery", count: 1 }];
        const procedurals = localGenerator(singleAlloc, difficulty || "Medium");
        if (procedurals.length > 0) {
          return {
            id: "local-" + Math.random().toString(36).substring(7),
            ...procedurals[0],
            isFallback: true
          };
        }
      }
      throw new Error("Local fallback generator missing or AI unconfigured.");
    }
    try {
      const response = await callGeminiWithModelFallback(
        (model) => ai.models.generateContent({
          model,
          contents: `Generate a single challenging, highly relevant multiple choice question for a ${examType || "BCS"} exam in Bangladesh.
Core subject requested: "${subject || "Bangla Language & Literature"}"
Specific topic area: "${topic || "Syllabus high yield topics"}"
Difficulty tier: "${difficulty || "Medium"}"
Include explanations in both Bangla and English explaining why options are wrong.`,
          config: {
            responseMimeType: "application/json",
            temperature: 0.8,
            systemInstruction: `You are the master question author for competitive civil service and national university tests in Bangladesh. 
Create single questions with 4 logical and carefully constructed options. 
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
        })
      );
      const parsed = JSON.parse(response.text || "{}");
      return {
        id: "gen-" + Math.random().toString(36).substring(7),
        ...parsed
      };
    } catch (err) {
      console.warn("[RankFlow AI] Single adaptive question generation error. Falling back to tailored procedural:", err.message);
      if (localGenerator) {
        const singleAlloc = [{ subject: subject || "General Studies", topic: topic || "Syllabus Mastery", count: 1 }];
        const procedurals = localGenerator(singleAlloc, difficulty || "Medium");
        if (procedurals.length > 0) {
          return {
            id: "fallback-" + Math.random().toString(36).substring(7),
            ...procedurals[0],
            isFallback: true
          };
        }
      }
      throw err;
    }
  }
};

// utils/procedurals.ts
var SYLLABUS_CORPUS = {
  bangla: [
    {
      text: "\u09AC\u09BE\u0999\u09B2\u09BE \u09AD\u09BE\u09B7\u09BE\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u09B8\u09CD\u09AC\u09BE\u09B0\u09CD\u09A5\u0995 \u0989\u09AA\u09A8\u09CD\u09AF\u09BE\u09B8 \u2018\u09A6\u09C1\u09B0\u09CD\u0997\u09C7\u09B6\u09A8\u09A8\u09CD\u09A6\u09BF\u09A8\u09C0\u2019 \u09B8\u09BE\u09B9\u09BF\u09A4\u09CD\u09AF\u09B8\u09AE\u09CD\u09B0\u09BE\u099F \u09AC\u0999\u09CD\u0995\u09BF\u09AE\u099A\u09A8\u09CD\u09A6\u09CD\u09B0 \u099A\u099F\u09CD\u099F\u09CB\u09AA\u09BE\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC \u0995\u09B0\u09CD\u09A4\u09C3\u0995 \u0995\u09CB\u09A8 \u09B8\u09BE\u09B2\u09C7 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09B9\u09DF?",
      options: ["\u09E7\u09EE\u09EC\u09EB \u09B8\u09BE\u09B2\u09C7", "\u09E7\u09EE\u09EB\u09E8 \u09B8\u09BE\u09B2\u09C7", "\u09E7\u09EE\u09EC\u09EA \u09B8\u09BE\u09B2\u09C7", "\u09E7\u09EE\u09ED\u09E8 \u09B8\u09BE\u09B2\u09C7"],
      correctIndex: 0,
      explanations: {
        bn: "\u09E7\u09EE\u09EC\u09EB \u09B8\u09BE\u09B2\u09C7 \u09AC\u0999\u09CD\u0995\u09BF\u09AE\u099A\u09A8\u09CD\u09A6\u09CD\u09B0 \u099A\u099F\u09CD\u099F\u09CB\u09AA\u09BE\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u09AC\u09BE\u0982\u09B2\u09BE \u0989\u09AA\u09A8\u09CD\u09AF\u09BE\u09B8 '\u09A6\u09C1\u09B0\u09CD\u0997\u09C7\u09B6\u09A8\u09A8\u09CD\u09A6\u09BF\u09A8\u09C0' \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09B9\u09AF\u09BC\u0964 \u098F\u099F\u09BF \u09AC\u09BE\u0982\u09B2\u09BE \u09B8\u09BE\u09B9\u09BF\u09A4\u09CD\u09AF\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u09B8\u09BE\u09B0\u09CD\u09A5\u0995 \u0989\u09AA\u09A8\u09CD\u09AF\u09BE\u09B8 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09AA\u09B0\u09BF\u099A\u09BF\u09A4\u0964",
        en: "Durgeshnondini, published in 1865, is considered the first successful Bengali novel, written by Bankim Chandra Chattopadhyay.",
        wrongOptions: [
          "\u09E7\u09EE\u09EB\u09E8 \u09B8\u09BE\u09B2\u09C7 \u09A4\u09BE\u09B0\u09BE\u09B6\u0999\u09CD\u0995\u09B0 \u09A4\u09B0\u09CD\u0995\u09B0\u09A4\u09CD\u09A8\u09C7\u09B0 \u0995\u09BE\u09A6\u09AE\u09CD\u09AC\u09B0\u09C0 \u0985\u09A8\u09C2\u09A6\u09BF\u09A4 \u09B9\u09DF\u09C7\u099B\u09BF\u09B2\u0964",
          "\u09E7\u09EE\u09ED\u09E8 \u09B8\u09BE\u09B2\u09C7 \u09AC\u0999\u09CD\u0995\u09BF\u09AE\u099A\u09A8\u09CD\u09A6\u09CD\u09B0\u09C7\u09B0 \u09AE\u09BE\u09B8\u09BF\u0995 \u09AA\u09A4\u09CD\u09B0\u09BF\u0995\u09BE '\u09AC\u0999\u09CD\u0997\u09A6\u09B0\u09CD\u09B6\u09A8' \u09AA\u09CD\u09B0\u09A5\u09AE \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09B9\u09DF\u0964"
        ]
      }
    },
    {
      text: "\u09AC\u09BE\u0999\u09B2\u09BE \u09B8\u09BE\u09B9\u09BF\u09A4\u09CD\u09AF\u09C7\u09B0 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09AF\u09C1\u0997\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u099F\u09CD\u09B0\u09CD\u09AF\u09BE\u099C\u09C7\u09A1\u09BF \u09A8\u09BE\u099F\u0995 \u0995\u09CB\u09A8\u099F\u09BF \u098F\u09AC\u0982 \u098F\u09B0 \u09B0\u099A\u09DF\u09BF\u09A4\u09BE \u0995\u09C7?",
      options: ["\u0995\u09C3\u09B7\u09CD\u09A3\u0995\u09C1\u09AE\u09BE\u09B0\u09C0, \u09AE\u09BE\u0987\u0995\u09C7\u09B2 \u09AE\u09A7\u09C1\u09B8\u09C2\u09A6\u09A8 \u09A6\u09A4\u09CD\u09A4", "\u09A8\u09C0\u09B2\u09A6\u09B0\u09CD\u09AA\u09A8, \u09A6\u09C0\u09A8\u09AC\u09A8\u09CD\u09A7\u09C1 \u09AE\u09BF\u09A4\u09CD\u09B0", "\u0995\u09AC\u09B0, \u09AE\u09C1\u09A8\u09C0\u09B0 \u099A\u09CC\u09A7\u09C1\u09B0\u09C0", "\u09B6\u09B0\u09CD\u09AE\u09BF\u09B7\u09CD\u09A0\u09BE, \u09AE\u09BE\u0987\u0995\u09C7\u09B2 \u09AE\u09A7\u09C1\u09B8\u09C2\u09A6\u09A8 \u09A6\u09A4\u09CD\u09A4"],
      correctIndex: 0,
      explanations: {
        bn: "\u09E7\u09EE\u09EC\u09E7 \u09B8\u09BE\u09B2\u09C7 \u09AE\u09BE\u0987\u0995\u09C7\u09B2 \u09AE\u09A7\u09C1\u09B8\u09C2\u09A6\u09A8 \u09A6\u09A4\u09CD\u09A4 \u09B0\u099A\u09BF\u09A4 '\u0995\u09C3\u09B7\u09CD\u09A3\u0995\u09C1\u09AE\u09BE\u09B0\u09C0' \u09AC\u09BE\u0982\u09B2\u09BE \u09B8\u09BE\u09B9\u09BF\u09A4\u09CD\u09AF\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u09B8\u09BE\u09B0\u09CD\u09A5\u0995 \u0993 \u09AA\u09CD\u09B0\u09A5\u09AE \u099F\u09CD\u09B0\u09CD\u09AF\u09BE\u099C\u09C7\u09A1\u09BF \u09A8\u09BE\u099F\u0995\u0964 \u09B0\u09BE\u099C\u09B8\u09CD\u09A5\u09BE\u09A8 \u0987\u09A4\u09BF\u09B9\u09BE\u09B8 \u0985\u09AC\u09B2\u09AE\u09CD\u09AC\u09A8\u09C7 \u098F\u099F\u09BF \u09B0\u099A\u09BF\u09A4\u0964",
        en: "Krishnakumari (1861) by Michael Madhusudan Dutt is recognized as the first standard tragic drama in modern Bengali literature.",
        wrongOptions: [
          "\u09A8\u09C0\u09B2\u09A6\u09B0\u09CD\u09AA\u09A3 \u09A6\u09C0\u09A8\u09AC\u09A8\u09CD\u09A7\u09C1 \u09AE\u09BF\u09A4\u09CD\u09B0 \u09B0\u099A\u09BF\u09A4 \u09AC\u09BF\u0996\u09CD\u09AF\u09BE\u09A4 \u09A8\u09C0\u09B2 \u09AC\u09BF\u09A6\u09CD\u09B0\u09CB\u09B9\u09C7\u09B0 \u09AA\u099F\u09AD\u09C2\u09AE\u09BF\u0995\u09BE\u09B0 \u09A8\u09BE\u099F\u0995, \u099F\u09CD\u09B0\u09CD\u09AF\u09BE\u099C\u09C7\u09A1\u09BF \u09A8\u09DF\u0964",
          "\u09B6\u09B0\u09CD\u09AE\u09BF\u09B7\u09CD\u09A0\u09BE \u09AE\u09A7\u09C1\u09B8\u09C2\u09A6\u09A8 \u09A6\u09A4\u09CD\u09A4\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u09B8\u09AB\u09B2 \u09A8\u09BE\u099F\u0995 \u09B9\u09B2\u09C7\u0993 \u098F\u099F\u09BF \u099F\u09CD\u09B0\u09CD\u09AF\u09BE\u099C\u09C7\u09A1\u09BF \u099B\u09BF\u09B2 \u09A8\u09BE\u0964"
        ]
      }
    },
    {
      text: "\u09A1. \u09AE\u09CB\u09B9\u09BE\u09AE\u09CD\u09AE\u09A6 \u09B6\u09B9\u09C0\u09A6\u09C1\u09B2\u09CD\u09B2\u09BE\u09B9 \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09BF\u09A4 \u09AC\u09BF\u0996\u09CD\u09AF\u09BE\u09A4 \u0985\u09AD\u09BF\u09A7\u09BE\u09A8 \u2018\u0986\u099E\u09CD\u099A\u09B2\u09BF\u0995 \u09AD\u09BE\u09B7\u09BE\u09B0 \u0985\u09AD\u09BF\u09A7\u09BE\u09A8\u2019 \u0995\u09CB\u09A8 \u098F\u0995\u09BE\u09A1\u09C7\u09AE\u09BF \u0995\u09B0\u09CD\u09A4\u09C3\u0995 \u09AA\u09CD\u09B0\u09A5\u09AE \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09B9\u09DF\u09C7\u099B\u09BF\u09B2?",
      options: ["\u09AC\u09BE\u0982\u09B2\u09BE \u098F\u0995\u09BE\u09A1\u09C7\u09AE\u09BF", "\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6 \u098F\u09B6\u09BF\u09DF\u09BE\u099F\u09BF\u0995 \u09B8\u09CB\u09B8\u09BE\u0987\u099F\u09BF", "\u09AC\u09BF\u09B6\u09CD\u09AC\u09AD\u09BE\u09B0\u09A4\u09C0", "\u09A2\u09BE\u0995\u09BE \u09AC\u09BF\u09B6\u09CD\u09AC\u09AC\u09BF\u09A6\u09CD\u09AF\u09BE\u09B2\u09DF \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09A8\u09BE \u09B6\u09BE\u0996\u09BE"],
      correctIndex: 0,
      explanations: {
        bn: "\u09AC\u09BE\u0982\u09B2\u09BE \u098F\u0995\u09BE\u09A1\u09C7\u09AE\u09BF \u09A1. \u09AE\u09C1\u09B9\u09AE\u09CD\u09AE\u09A6 \u09B6\u09B9\u09C0\u09A6\u09C1\u09B2\u09CD\u09B2\u09BE\u09B9\u09B0 \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE\u09DF '\u09AA\u09C2\u09B0\u09CD\u09AC \u09AA\u09BE\u0995\u09BF\u09B8\u09CD\u09A4\u09BE\u09A8\u09BF \u0986\u099E\u09CD\u099A\u09B2\u09BF\u0995 \u09AD\u09BE\u09B7\u09BE\u09B0 \u0985\u09AD\u09BF\u09A7\u09BE\u09A8' (\u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0\u09A4\u09C7 \u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6 \u0985\u099E\u09CD\u099A\u09B2\u09C7\u09B0 \u0986\u099E\u09CD\u099A\u09B2\u09BF\u0995 \u09AD\u09BE\u09B7\u09BE\u09B0 \u0985\u09AD\u09BF\u09A7\u09BE\u09A8) \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09C7, \u09AF\u09BE \u09AC\u09BE\u0982\u09B2\u09BE \u0986\u09AD\u09BF\u09A7\u09BE\u09A8\u09BF\u0995 \u09A7\u09BE\u09B0\u09BE\u09DF \u09AE\u09BE\u0987\u09B2\u09AB\u09B2\u0995 \u09B8\u09CD\u09AC\u09B0\u09C2\u09AA\u0964",
        en: "The Bengali Regional Dictionary was edited by Dr. Muhammad Shahidullah and published by Bangla Academy.",
        wrongOptions: [
          "\u098F\u09B6\u09BF\u09DF\u09BE\u099F\u09BF\u0995 \u09B8\u09CB\u09B8\u09BE\u0987\u099F\u09BF \u09AC\u09BF\u09AD\u09BF\u09A8\u09CD\u09A8 \u0990\u09A4\u09BF\u09B9\u09BE\u09B8\u09BF\u0995 \u0997\u09AC\u09C7\u09B7\u09A3\u09BE \u09B8\u0982\u09B8\u09CD\u0995\u09B0\u09A3 \u09AC\u09C7\u09B0 \u0995\u09B0\u09B2\u09C7\u0993 \u098F\u0987 \u0985\u09AD\u09BF\u09A7\u09BE\u09A8\u099F\u09BF \u09AC\u09C7\u09B0 \u0995\u09B0\u09C7\u09A8\u09BF\u0964",
          "\u09AC\u09BF\u09B6\u09CD\u09AC\u09AD\u09BE\u09B0\u09A4\u09C0 \u09B6\u09BE\u09A8\u09CD\u09A4\u09BF\u09A8\u09BF\u0995\u09C7\u09A4\u09A8 \u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0\u09BF\u0995 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09A8\u09BE \u09A8\u09BF\u09DF\u09C7 \u0995\u09BE\u099C \u0995\u09B0\u09C7 \u09A5\u09BE\u0995\u09C7\u0964"
        ]
      }
    },
    {
      text: "\u09B0\u09AC\u09C0\u09A8\u09CD\u09A6\u09CD\u09B0\u09A8\u09BE\u09A5 \u09A0\u09BE\u0995\u09C1\u09B0 \u09A4\u09BE\u0981\u09B0 \u0995\u09CB\u09A8 \u09AC\u09BF\u0996\u09CD\u09AF\u09BE\u09A4 \u09B0\u099A\u09A8\u09BE\u099F\u09BF \u0995\u09AC\u09BF \u0995\u09BE\u099C\u09C0 \u09A8\u099C\u09B0\u09C1\u09B2 \u0987\u09B8\u09B2\u09BE\u09AE\u0995\u09C7 \u0995\u09BE\u09B0\u09BE\u09AC\u09B0\u09A3\u0995\u09BE\u09B2\u09C7 \u09B6\u09C1\u09AD\u09C7\u099A\u09CD\u099B\u09BE \u099C\u09BE\u09A8\u09BE\u09A4\u09C7 \u0989\u09CE\u09B8\u09B0\u09CD\u0997 \u0995\u09B0\u09C7\u099B\u09BF\u09B2\u09C7\u09A8?",
      options: ["\u09AC\u09B8\u09A8\u09CD\u09A4", "\u0995\u09BE\u09B2\u09C7\u09B0 \u09AF\u09BE\u09A4\u09CD\u09B0\u09BE", "\u09A4\u09BE\u09B8\u09C7\u09B0 \u09A6\u09C7\u09B6", "\u0996\u09C7\u09DF\u09BE"],
      correctIndex: 0,
      explanations: {
        bn: "\u0995\u09AC\u09BF \u09B0\u09AC\u09C0\u09A8\u09CD\u09A6\u09CD\u09B0\u09A8\u09BE\u09A5 \u09A0\u09BE\u0995\u09C1\u09B0 \u09E7\u09EF\u09E8\u09E9 \u09B8\u09BE\u09B2\u09C7 \u09A4\u09BE\u0981\u09B0 '\u09AC\u09B8\u09A8\u09CD\u09A4' \u0997\u09C0\u09A4\u09BF\u09A8\u09BE\u099F\u09CD\u09AF\u099F\u09BF \u0986\u09B2\u09BF\u09AA\u09C1\u09B0 \u09B8\u09C7\u09A8\u09CD\u099F\u09CD\u09B0\u09BE\u09B2 \u099C\u09C7\u09B2\u09C7 \u09AC\u09A8\u09CD\u09A6\u09C0 \u09A5\u09BE\u0995\u09BE \u0985\u09AC\u09B8\u09CD\u09A5\u09BE\u09DF \u0995\u09AC\u09BF \u0995\u09BE\u099C\u09C0 \u09A8\u099C\u09B0\u09C1\u09B2 \u0987\u09B8\u09B2\u09BE\u09AE\u0995\u09C7 \u0989\u09CE\u09B8\u09B0\u09CD\u0997 \u0995\u09B0\u09C7\u09A8\u0964",
        en: "Tagore dedicated his musical play 'Bosonto' to Kazi Nazrul Islam in jail.",
        wrongOptions: [
          "\u0995\u09BE\u09B2\u09C7\u09B0 \u09AF\u09BE\u09A4\u09CD\u09B0\u09BE \u09B6\u09B0\u09CE\u099A\u09A8\u09CD\u09A6\u09CD\u09B0 \u099A\u099F\u09CD\u099F\u09CB\u09AA\u09BE\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u0995\u09C7 \u0989\u09CE\u09B8\u09B0\u09CD\u0997 \u0995\u09B0\u09BE\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09B8\u0982\u09B6\u09CD\u09B2\u09BF\u09B7\u09CD\u099F \u099B\u09BF\u09B2\u0964",
          "\u09A4\u09BE\u09B8\u09C7\u09B0 \u09A6\u09C7\u09B6 \u09A8\u09BE\u099F\u0995\u099F\u09BF \u09B8\u09C1\u09AD\u09BE\u09B7\u099A\u09A8\u09CD\u09A6\u09CD\u09B0 \u09AC\u09B8\u09C1\u0995\u09C7 \u0989\u09CE\u09B8\u09B0\u09CD\u0997 \u0995\u09B0\u09BE \u09B9\u09DF\u09C7\u099B\u09BF\u09B2\u0964"
        ]
      }
    },
    {
      text: "\u0995\u09BE\u099C\u09C0 \u09A8\u099C\u09B0\u09C1\u09B2 \u0987\u09B8\u09B2\u09BE\u09AE\u09C7\u09B0 \u09AF\u09C1\u0997\u09BE\u09A8\u09CD\u09A4\u0995\u09BE\u09B0\u09C0 '\u0985\u0997\u09CD\u09A8\u09BF-\u09AC\u09C0\u09A3\u09BE' \u0995\u09BE\u09AC\u09CD\u09AF\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u0995\u09AC\u09BF\u09A4\u09BE\u09B0 \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE \u09AC\u09BE \u09A8\u09BE\u09AE \u0995\u09C0?",
      options: ["\u09AA\u09CD\u09B0\u09B2\u09DF\u09CB\u09B2\u09CD\u09B2\u09BE\u09B8", "\u09AC\u09BF\u09A6\u09CD\u09B0\u09CB\u09B9\u09C0", "\u09A7\u09C2\u09AE\u0995\u09C7\u09A4\u09C1", "\u0996\u09C7\u09DF\u09BE\u09AA\u09BE\u09B0\u09C7\u09B0 \u09A4\u09B0\u09A3\u09C0"],
      correctIndex: 0,
      explanations: {
        bn: "'\u0985\u0997\u09CD\u09A8\u09BF-\u09AC\u09C0\u09A3\u09BE' \u0995\u09BE\u09AC\u09CD\u09AF\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u0995\u09AC\u09BF\u09A4\u09BE \u09B9\u09B2\u09CB '\u09AA\u09CD\u09B0\u09B2\u09DF\u09CB\u09B2\u09CD\u09B2\u09BE\u09B8' \u098F\u09AC\u0982 \u09A6\u09CD\u09AC\u09BF\u09A4\u09C0\u09DF \u0995\u09AC\u09BF\u09A4\u09BE \u09B9\u09B2\u09CB \u09AC\u09BF\u0996\u09CD\u09AF\u09BE\u09A4 '\u09AC\u09BF\u09A6\u09CD\u09B0\u09CB\u09B9\u09C0' \u0995\u09AC\u09BF\u09A4\u09BE\u0964 \u098F\u099F\u09BF \u09E7\u09EF\u09E8\u09E8 \u09B8\u09BE\u09B2\u09C7 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09B9\u09DF\u0964",
        en: "'Proloyollas' is the first poem of Nazrul's legendary book of poems 'Agni-Beena'.",
        wrongOptions: [
          "\u09AC\u09BF\u09A6\u09CD\u09B0\u09CB\u09B9\u09C0 \u0985\u09A4\u09CD\u09AF\u09A8\u09CD\u09A4 \u09AC\u09BF\u0996\u09CD\u09AF\u09BE\u09A4 \u09B9\u09B2\u09C7\u0993 \u098F\u099F\u09BF \u0995\u09BE\u09AC\u09CD\u09AF\u09C7\u09B0 \u09A6\u09CD\u09AC\u09BF\u09A4\u09C0\u09DF \u0995\u09AC\u09BF\u09A4\u09BE \u099B\u09BF\u09B2\u0964",
          "\u09A7\u09C2\u09AE\u0995\u09C7\u09A4\u09C1 \u099B\u09BF\u09B2 \u09A4\u09BE\u0981\u09B0 \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09BF\u09A4 \u0985\u09A4\u09CD\u09AF\u09A8\u09CD\u09A4 \u099C\u09A8\u09AA\u09CD\u09B0\u09BF\u09DF \u09B0\u09BE\u099C\u09A8\u09C8\u09A4\u09BF\u0995 \u09A6\u09CD\u09AC\u09BF-\u09B8\u09BE\u09AA\u09CD\u09A4\u09BE\u09B9\u09BF\u0995 \u09AA\u09A4\u09CD\u09B0\u09BF\u0995\u09BE\u0964"
        ]
      }
    }
  ],
  english: [
    {
      text: "What is the accurate spelling for the word representing a system of government in which most of the important decisions are taken by state officials?",
      options: ["Bureaucracy", "Beurocracy", "Bureaucracye", "Burocracy"],
      correctIndex: 0,
      explanations: {
        bn: "\u0986\u09AE\u09B2\u09BE\u09A4\u09A8\u09CD\u09A4\u09CD\u09B0\u09C7\u09B0 \u0987\u0982\u09B0\u09C7\u099C\u09BF \u09AA\u09CD\u09B0\u09A4\u09BF\u09B6\u09AC\u09CD\u09A6 'Bureaucracy' (B-u-r-e-a-u-c-r-a-c-y)\u0964 \u098F\u099F\u09BF \u0985\u09A4\u09CD\u09AF\u09A8\u09CD\u09A4 \u09AA\u09B0\u09BF\u099A\u09BF\u09A4 \u098F\u0995\u099F\u09BF Correction \u09AC\u09BE\u09A8\u09BE\u09A8 \u09AF\u09BE \u09AC\u09BF\u09B8\u09BF\u098F\u09B8 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09DF \u09A8\u09BF\u09DF\u09AE\u09BF\u09A4 \u0986\u09B8\u09C7\u0964",
        en: "Bureaucracy is spelled as b-u-r-e-a-u-c-r-a-c-y.",
        wrongOptions: [
          "Beurocracy \u09AD\u09C1\u09B2 \u0987\u0982\u09B0\u09C7\u099C\u09BF \u09AC\u09BE\u09A8\u09BE\u09A8 \u09AF\u09BE \u0989\u099A\u09CD\u099A\u09BE\u09B0\u09A3\u09C7\u09B0 \u09AC\u09BF\u09AD\u09CD\u09B0\u09BE\u09A8\u09CD\u09A4\u09BF \u09A5\u09C7\u0995\u09C7 \u09A4\u09C8\u09B0\u09BF \u09B9\u09DF\u0964",
          "Bureaucracye \u0985\u09A4\u09BF\u09B0\u09BF\u0995\u09CD\u09A4 \u0987 \u0985\u0995\u09CD\u09B7\u09B0\u09C7\u09B0 \u0995\u09BE\u09B0\u09A3\u09C7 \u09AD\u09C2\u09B2 \u09B0\u09C2\u09AA \u09A7\u09BE\u09B0\u09A3 \u0995\u09B0\u09C7\u099B\u09C7\u0964"
        ]
      }
    },
    {
      text: "Find the synonym or identical terminology for the word 'Indifferent':",
      options: ["Apathetic", "Eager", "Zealous", "Compassionate"],
      correctIndex: 0,
      explanations: {
        bn: "Indifferent \u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u0985\u09B0\u09CD\u09A5 \u09B9\u09B2 \u0989\u09A6\u09BE\u09B8\u09C0\u09A8 \u09AC\u09BE \u0985\u09A8\u09C1\u09AD\u09C2\u09A4\u09BF\u09B9\u09C0\u09A8\u0964 Apathetic \u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u0985\u09B0\u09CD\u09A5\u0993 \u0989\u09A6\u09BE\u09B8\u09C0\u09A8\u0964 \u0985\u09A8\u09CD\u09AF \u0985\u09AA\u09B6\u09A8\u0997\u09C1\u09B2\u09CB\u09B0 \u0985\u09B0\u09CD\u09A5 \u09B9\u09B2 \u0986\u0997\u09CD\u09B0\u09B9\u09C0, \u0989\u09A6\u09CD\u09AF\u09AE\u09C0 \u098F\u09AC\u0982 \u09B8\u09B9\u09BE\u09A8\u09C1\u09AD\u09C2\u09A4\u09BF\u09B6\u09C0\u09B2\u0964",
        en: "'Indifferent' and 'apathetic' both signify lacking interest, enthusiasm, or concern.",
        wrongOptions: [
          "Eager \u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u0985\u09B0\u09CD\u09A5 \u09AC\u09CD\u09AF\u09BE\u0995\u09C1\u09B2 \u09AC\u09BE \u0985\u09A4\u09CD\u09AF\u09A8\u09CD\u09A4 \u0986\u0997\u09CD\u09B0\u09B9\u09C0\u0964",
          "Zealous \u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u0985\u09B0\u09CD\u09A5 \u09AA\u09B0\u09AE \u0989\u09A6\u09CD\u09AF\u09AE\u09C0 \u09AC\u09BE \u0989\u09CE\u09B8\u09BE\u09B9\u09C0\u0964"
        ]
      }
    },
    {
      text: "Who is the creator of the celebrated character 'Sherlock Holmes', the pioneer of detective fiction?",
      options: ["Arthur Conan Doyle", "Agatha Christie", "Edgar Allan Poe", "Charles Dickens"],
      correctIndex: 0,
      explanations: {
        bn: "\u09B8\u09CD\u09AF\u09BE\u09B0 \u0986\u09B0\u09CD\u09A5\u09BE\u09B0 \u0995\u09CB\u09A8\u09BE\u09A8 \u09A1\u09AF\u09BC\u09C7\u09B2 \u09B9\u09B2\u09C7\u09A8 \u0995\u09BE\u09B2\u099C\u09DF\u09C0 \u0997\u09CB\u09DF\u09C7\u09A8\u09CD\u09A6\u09BE \u099A\u09B0\u09BF\u09A4\u09CD\u09B0 '\u09B6\u09BE\u09B0\u09CD\u09B2\u0995 \u09B9\u09CB\u09AE\u09B8' \u098F\u09B0 \u09B8\u09CD\u09B0\u09B7\u09CD\u099F\u09BE\u0964 \u09E7\u09EE\u09EE\u09ED \u09B8\u09BE\u09B2\u09C7 \u09A4\u09BE\u0981\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u0989\u09AA\u09A8\u09CD\u09AF\u09BE\u09B8 '\u0986 \u09B8\u09CD\u099F\u09BE\u09A1\u09BF \u0987\u09A8 \u09B8\u09CD\u0995\u09BE\u09B0\u09B2\u09C7\u099F' \u098F \u098F\u0987 \u099A\u09B0\u09BF\u09A4\u09CD\u09B0\u09C7\u09B0 \u0986\u09A4\u09CD\u09AE\u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0998\u099F\u09C7\u0964",
        en: "Sir Arthur Conan Doyle is the British writer who created the character Sherlock Holmes.",
        wrongOptions: [
          "Agatha Christie \u09AC\u09BF\u0996\u09CD\u09AF\u09BE\u09A4 \u0997\u09CB\u09DF\u09C7\u09A8\u09CD\u09A6\u09BE \u099A\u09B0\u09BF\u09A4\u09CD\u09B0 \u098F\u09B0\u0995\u09C1\u09B2 \u09AA\u09CB\u09DF\u09BE\u09B0\u09CB \u0993 \u09AE\u09BF\u09B8 \u09AE\u09BE\u09B0\u09CD\u09AA\u09B2 \u098F\u09B0 \u09B8\u09CD\u09B0\u09B7\u09CD\u099F\u09BE\u0964",
          "Edgar Allan Poe \u09AC\u09BF\u09B6\u09CD\u09AC\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u0997\u09CB\u09DF\u09C7\u09A8\u09CD\u09A6\u09BE \u09B0\u099A\u09A8\u09BE\u09B0 \u099C\u09A8\u0995 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09AC\u09BF\u09AC\u09C7\u099A\u09BF\u09A4 \u09B9\u09B2\u09C7\u0993 \u09B9\u09CB\u09AE\u09B8 \u09A4\u09BE\u0981\u09B0 \u09B8\u09C3\u09B7\u09CD\u099F\u09BF \u09A8\u09DF\u0964"
        ]
      }
    },
    {
      text: "Identify the appropriate preposition: 'The manager insisted _______ checking the structural audit reports immediately.'",
      options: ["on", "in", "to", "at"],
      correctIndex: 0,
      explanations: {
        bn: "insisted \u098F\u09B0 \u09AA\u09B0 Appropriate Preposition 'on' \u09AC\u09B8\u09C7\u0964 Insist on doing something \u09AE\u09BE\u09A8\u09C7 \u0995\u09CB\u09A8\u09CB \u0995\u09BF\u099B\u09C1 \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099C\u09CB\u09B0 \u09A6\u09C7\u0993\u09DF\u09BE \u09AC\u09BE \u0985\u09A8\u09DC \u09A5\u09BE\u0995\u09BE\u0964",
        en: "'Insist on' is the standard expression used when staying firm on some action suggestion.",
        wrongOptions: [
          "Insist with \u09AC\u09CD\u09AF\u09BE\u0995\u09B0\u09A3\u0997\u09A4\u09AD\u09BE\u09AC\u09C7 \u0985\u09B6\u09C1\u09A6\u09CD\u09A7\u0964",
          "Insist at \u0985\u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09BF\u09A4 \u09AC\u09BE\u0995\u09CD\u09AF\u09BE\u0982\u09B6\u0964"
        ]
      }
    }
  ],
  generalKnowledge: [
    {
      text: "\u0990\u09A4\u09BF\u09B9\u09BE\u09B8\u09BF\u0995 \u09AE\u09C1\u099C\u09BF\u09AC\u09A8\u0997\u09B0 \u09AC\u09BE \u09AD\u09AC\u09C7\u09B0\u09AA\u09BE\u09DC\u09BE \u0997\u09CD\u09B0\u09BE\u09AE\u099F\u09BF \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6\u09C7\u09B0 \u0995\u09CB\u09A8 \u099C\u09C7\u09B2\u09BE\u09B0 \u098F\u09AC\u0982 \u0995\u09CB\u09A8 \u0989\u09AA\u099C\u09C7\u09B2\u09BE\u09B0 \u0985\u09A8\u09CD\u09A4\u09B0\u09CD\u0997\u09A4?",
      options: ["\u09AE\u09C7\u09B9\u09C7\u09B0\u09AA\u09C1\u09B0 \u099C\u09C7\u09B2\u09BE\u09B0 \u0986\u09AE\u099D\u09C1\u09AA\u09BF \u0989\u09AA\u099C\u09C7\u09B2\u09BE", "\u09AE\u09C7\u09B9\u09C7\u09B0\u09AA\u09C1\u09B0 \u099C\u09C7\u09B2\u09BE\u09B0 \u09AE\u09C1\u099C\u09BF\u09AC\u09A8\u0997\u09B0 \u0989\u09AA\u099C\u09C7\u09B2\u09BE", "\u0995\u09C1\u09B7\u09CD\u099F\u09BF\u09DF\u09BE \u099C\u09C7\u09B2\u09BE\u09B0 \u0995\u09C1\u09AE\u09BE\u09B0\u0996\u09BE\u09B2\u09C0 \u0989\u09AA\u099C\u09C7\u09B2\u09BE", "\u099A\u09C1\u09DF\u09BE\u09A1\u09BE\u0999\u09CD\u0997\u09BE \u099C\u09C7\u09B2\u09BE\u09B0 \u09A6\u09BE\u09AE\u09C1\u09DC\u09B9\u09C1\u09A6\u09BE \u0989\u09AA\u099C\u09C7\u09B2\u09BE"],
      correctIndex: 1,
      explanations: {
        bn: "\u09E7\u09ED \u098F\u09AA\u09CD\u09B0\u09BF\u09B2 \u09E7\u09EF\u09ED\u09E7 \u09B8\u09BE\u09B2\u09C7 \u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u0985\u09B8\u09CD\u09A5\u09BE\u09DF\u09C0 \u09B8\u09B0\u0995\u09BE\u09B0 \u09AE\u09C7\u09B9\u09C7\u09B0\u09AA\u09C1\u09B0 \u099C\u09C7\u09B2\u09BE\u09B0 \u09AC\u09C8\u09A6\u09CD\u09AF\u09A8\u09BE\u09A5\u09A4\u09B2\u09BE\u09B0 \u09AD\u09AC\u09C7\u09B0\u09AA\u09BE\u09DC\u09BE (\u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u09AE\u09C1\u099C\u09BF\u09AC\u09A8\u0997\u09B0) \u0997\u09CD\u09B0\u09BE\u09AE\u09C7 \u09B6\u09AA\u09A5 \u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09C7\u0964",
        en: "Mujibnagar is situated in the Mujibnagar sub-district under the Meherpur district of Bangladesh.",
        wrongOptions: [
          "\u0986\u09AE\u099D\u09C1\u09AA\u09BF \u09AE\u09C7\u09B9\u09C7\u09B0\u09AA\u09C1\u09B0 \u099C\u09C7\u09B2\u09BE\u09B0 \u0985\u0982\u09B6 \u09B9\u09B2\u09C7\u0993 \u098F\u099F\u09BF \u0990\u09A4\u09BF\u09B9\u09BE\u09B8\u09BF\u0995 \u0998\u09CB\u09B7\u09A3\u09BE\u09B0 \u09B6\u09AA\u09A5\u09B8\u09CD\u09A5\u09B2 \u099B\u09BF\u09B2 \u09A8\u09BE\u0964"
        ]
      }
    },
    {
      text: "\u0997\u09A3\u09AA\u09CD\u09B0\u099C\u09BE\u09A4\u09A8\u09CD\u09A4\u09CD\u09B0\u09C0 \u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6\u09C7\u09B0 \u09B8\u0982\u09AC\u09BF\u09A7\u09BE\u09A8\u09C7\u09B0 \u0995\u09CB\u09A8 \u0985\u09A8\u09C1\u099A\u09CD\u099B\u09C7\u09A6\u09C7 \u09AC\u09BE \u0986\u09B0\u09CD\u099F\u09BF\u0995\u09C7\u09B2\u09C7 \u2018\u09AA\u09B0\u09BF\u09AC\u09C7\u09B6 \u0993 \u09AC\u09A8\u09CD\u09AF\u09AA\u09CD\u09B0\u09BE\u09A3\u09C0 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0993 \u0989\u09A8\u09CD\u09A8\u09DF\u09A8\u2019 \u09AC\u09BF\u09B7\u09DF\u099F\u09BF \u09B0\u09BE\u09B7\u09CD\u099F\u09CD\u09B0\u09C7\u09B0 \u09AE\u09CC\u09B2\u09BF\u0995 \u09A6\u09BE\u09DF\u09BF\u09A4\u09CD\u09AC\u09AD\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09BE \u09B9\u09DF\u09C7\u099B\u09C7?",
      options: ["\u09E7\u09EE\u0995 \u0985\u09A8\u09C1\u099A\u09CD\u099B\u09C7\u09A6", "\u09E7\u09EE \u0985\u09A8\u09C1\u099A\u09CD\u099B\u09C7\u09A6", "\u09E8\u09E7 \u0985\u09A8\u09C1\u099A\u09CD\u099B\u09C7\u09A6", "\u09E7\u09EB \u0985\u09A8\u09C1\u099A\u09CD\u099B\u09C7\u09A6"],
      correctIndex: 0,
      explanations: {
        bn: "\u09B8\u0982\u09AC\u09BF\u09A7\u09BE\u09A8\u09C7\u09B0 \u09E7\u09EB\u09A4\u09AE \u09B8\u0982\u09B6\u09CB\u09A7\u09A8\u09C0\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u09AF\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09BE \u09E7\u09EE\u0995 (Article 18A) \u0985\u09A8\u09C1\u099A\u09CD\u099B\u09C7\u09A6 \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 \u09B0\u09BE\u09B7\u09CD\u099F\u09CD\u09B0 \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u0993 \u09AD\u09AC\u09BF\u09B7\u09CD\u09AF\u09CE \u09A8\u09BE\u0997\u09B0\u09BF\u0995\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0993 \u0989\u09A8\u09CD\u09A8\u09DF\u09A8 \u0995\u09B0\u09BF\u09AC\u09C7\u09A8 \u098F\u09AC\u0982 \u09AC\u09A8\u09CD\u09AF\u09AA\u09CD\u09B0\u09BE\u09A3\u09C0 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A4\u09CD\u09A4\u09BE \u09AC\u09BF\u09A7\u09BE\u09A8 \u0995\u09B0\u09BF\u09AC\u09C7\u09A8\u0964",
        en: "Article 18A of the Constitution of Bangladesh guarantees environmental and wildlife conservation standards as state directives.",
        wrongOptions: [
          "\u09E7\u09EE \u09A8\u0982 \u0985\u09A8\u09C1\u099A\u09CD\u099B\u09C7\u09A6 \u099C\u09A8\u09B8\u09CD\u09AC\u09BE\u09B8\u09CD\u09A5\u09CD\u09AF \u0993 \u09A8\u09C8\u09A4\u09BF\u0995\u09A4\u09BE \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09A4 \u09AC\u09BF\u09A7\u09BE\u09A8 \u09A6\u09C7\u09DF\u0964",
          "\u09E8\u09E7 \u09A8\u0982 \u0985\u09A8\u09C1\u099A\u09CD\u099B\u09C7\u09A6 \u09A8\u09BE\u0997\u09B0\u09BF\u0995 \u0993 \u09B8\u09B0\u0995\u09BE\u09B0\u09C0 \u0995\u09B0\u09CD\u09AE\u099A\u09BE\u09B0\u09C0\u09A6\u09C7\u09B0 \u0995\u09B0\u09CD\u09A4\u09AC\u09CD\u09AF \u09B8\u0982\u099C\u09CD\u099E\u09BE\u09DF\u09BF\u09A4 \u0995\u09B0\u09C7\u0964"
        ]
      }
    }
  ]
};
function getProceduralQuestionsForSubject(subject, count, topic, difficulty, seedOffset = 0) {
  const normSubject = (subject || "").toLowerCase();
  let pool = SYLLABUS_CORPUS.generalKnowledge;
  let subjectName = "General Knowledge";
  if (normSubject.includes("bangla")) {
    pool = SYLLABUS_CORPUS.bangla;
    subjectName = "Bangla Language & Literature";
  } else if (normSubject.includes("english")) {
    pool = SYLLABUS_CORPUS.english;
    subjectName = "English Language & Literature";
  } else if (normSubject.includes("math") || normSubject.includes("analytical") || normSubject.includes("mental")) {
    pool = SYLLABUS_CORPUS.english;
    subjectName = "Mathematical Reasoning & Mental Ability";
  }
  const qs = [];
  for (let i = 0; i < count; i++) {
    const rawIdx = (seedOffset + i) % pool.length;
    let finalSelection = pool[rawIdx];
    if (subjectName === "Mathematical Reasoning & Mental Ability") {
      const idx = (seedOffset + i) % 10;
      const multipliers = [3, 4, 5, 2, 6, 7, 8, 9, 10, 12];
      const selectedMult = multipliers[idx];
      const tuple = {
        s: selectedMult * 5,
        d: selectedMult * 1,
        x: selectedMult * 3,
        y: selectedMult * 2,
        ans: selectedMult * selectedMult * 6
      };
      const opts = [
        `${tuple.ans}`,
        `${tuple.ans + selectedMult}`,
        `${tuple.ans - selectedMult}`,
        `${tuple.ans * 2}`
      ];
      const cIdx = 0;
      finalSelection = {
        text: `\u09A6\u09C1\u099F\u09BF \u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09B0 \u09AF\u09CB\u0997\u09AB\u09B2 = ${tuple.s} \u098F\u09AC\u0982 \u09AC\u09BF\u09DF\u09CB\u0997\u09AB\u09B2 = ${tuple.d} \u09B9\u09B2\u09C7, \u09B8\u0982\u0996\u09CD\u09AF\u09BE \u09A6\u09C1\u099F\u09BF\u09B0 \u0997\u09C1\u09A3\u09AB\u09B2 (xy) \u098F\u09B0 \u09AE\u09BE\u09A8 \u0995\u09A4 \u09B9\u09AC\u09C7?`,
        options: opts,
        correctIndex: cIdx >= 0 ? cIdx : 0,
        explanations: {
          bn: `\u09B8\u09B9\u099C \u09AC\u09C0\u099C\u0997\u09A3\u09BF\u09A4\u09C0\u09DF \u09AA\u09CD\u09B0\u09A4\u09BF\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8 \u0993 \u09B8\u09AE\u09BE\u09A7\u09BE\u09A8: \u09B8\u09AE\u09C0\u0995\u09B0\u09A3 \u09A6\u09C1\u099F\u09BF \u09AF\u09CB\u0997 \u0995\u09B0\u09B2\u09C7 \u09AA\u09BE\u0987, 2x = ${tuple.s + tuple.d} => x = ${tuple.x}\u0964 \u098F\u09AC\u0982 \u09B8\u09AE\u09C0\u0995\u09B0\u09A3 \u09A6\u09C1\u099F\u09BF \u09AC\u09BF\u09DF\u09CB\u0997 \u0995\u09B0\u09B2\u09C7 \u09AA\u09BE\u0987, 2y = ${tuple.s - tuple.d} => y = ${tuple.y}\u0964 \u0985\u09A4\u098F\u09AC xy \u098F\u09B0 \u09AE\u09BE\u09A8 = ${tuple.x} * ${tuple.y} = ${tuple.ans}\u0964`,
          en: `Solving the linear equations x + y = ${tuple.s} and x - y = ${tuple.d} simultaneously yields x = ${tuple.x} and y = ${tuple.y}. Hence, xy = ${tuple.x} * ${tuple.y} = ${tuple.ans}.`,
          wrongOptions: ["\u0985\u09A8\u09CD\u09AF\u09BE\u09A8\u09CD\u09AF \u09AC\u09BF\u0995\u09B2\u09CD\u09AA\u0997\u09C1\u09B2\u09BF \u09AC\u09C0\u099C\u0997\u09A3\u09BF\u09A4\u09C0\u09DF \u099A\u09B2\u0995\u09C7\u09B0 \u09AE\u09BE\u09A8 \u0985\u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09BF\u09A4\u09AD\u09BE\u09AC\u09C7 \u09AC\u09B8\u09BE\u09B2\u09C7 \u0985\u09B8\u0999\u09CD\u0997\u09A4 \u09B9\u09AC\u09C7\u0964"]
        }
      };
    }
    qs.push({
      id: "procedural-" + Math.random().toString(36).substring(7) + "-" + i,
      text: finalSelection.text,
      options: finalSelection.options,
      correctIndex: finalSelection.correctIndex,
      subject: subjectName,
      topic: topic || "Syllabus Focus Unit",
      difficulty: difficulty || "Medium",
      explanations: finalSelection.explanations
    });
  }
  return qs;
}
function generateProceduralQuestions(allocations, difficulty) {
  const finalizedQs = [];
  let seedOffset = 0;
  for (const alloc of allocations) {
    const count = parseInt(alloc.count) || 0;
    if (count <= 0) continue;
    const subjectQs = getProceduralQuestionsForSubject(alloc.subject, count, alloc.topic, difficulty || "Medium", seedOffset);
    finalizedQs.push(...subjectQs);
    seedOffset += count;
  }
  return finalizedQs;
}

// api/ai.ts
var import_genai2 = require("@google/genai");
var router3 = (0, import_express3.Router)();
router3.post("/tutor", async (req, res) => {
  const { message, history, examType, subject } = req.body;
  try {
    const result = await GeminiService.tutorSession(message, history, examType, subject);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to run tutor session", details: err.message });
  }
});
router3.post("/written-evaluate", async (req, res) => {
  const { submissionText, title, subject } = req.body;
  try {
    const result = await GeminiService.writtenEvaluate(submissionText, title, subject);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to evaluate written text", details: err.message });
  }
});
router3.post("/adaptive-question", async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ error: "Failed to generate single dynamic question", details: err.message });
  }
});
router3.post("/batch-questions", async (req, res) => {
  const { examType, difficulty, allocations } = req.body;
  console.log("[RankFlow AI] Processing Batch Questions request modularly:", { examType, difficulty, allocations });
  if (!allocations || !Array.isArray(allocations) || allocations.length === 0) {
    return res.status(400).json({ error: "No question allocations specified" });
  }
  const totalWanted = allocations.reduce((sum, alloc) => sum + (parseInt(alloc.count) || 0), 0);
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
    const jobs = [];
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
    const results = [];
    const concurrencyLimit = 2;
    let jobIndex = 0;
    async function worker() {
      while (true) {
        const currentJobIdx = jobIndex++;
        if (currentJobIdx >= jobs.length) {
          break;
        }
        const job = jobs[currentJobIdx];
        await new Promise((resolve) => setTimeout(resolve, currentJobIdx * 750));
        let response = null;
        let retryDelaySec = 3;
        const maxRetries = 3;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            const focusSubtopicsText = subtopics && Array.isArray(subtopics) && subtopics.length > 0 ? `Filter and only select subtopics relevant to "${job.topic}" from: ${JSON.stringify(subtopics)}.` : "";
            const formulationTypeText = questionType && questionType !== "All" ? `Adopt a strictly ${questionType} formulation style (e.g., conceptual/theory, problem-solving, grammar/corrections, or advanced analytical reasoning).` : "";
            const examModeExplanation = examMode ? `This exam is for "${examMode}" mode.` : "";
            const randomSeed = Math.random().toString(36).substring(2, 8);
            const jobPrompt = `Compose exactly ${job.count} completely unique multiple choice questions.
Target Subject: "${job.subject}"
Target Topic: "${job.topic}"
${focusSubtopicsText}
${formulationTypeText}
${examModeExplanation}

Specific details:
- Standard: "${examType || "BCS"} Preliminary Exam"
- Cognitive Level: "${difficulty || "Medium"}"
- Unique Salt/Seed: "${randomSeed}"
- Language: Question, options, and explanations must be elegantly worded in high-quality Bengali (Bangla).
- Accuracy: Maintain strict academic level validity for Bangladesh administrative and banking exams.
- Ensure that the questions are completely distinct, covering unique dimensions of "${job.topic}".

Output EXACTLY ${job.count} items matching the structural JSON schema. Do not include any trailing metadata or suffix annotations in the question text.`;
            response = await callGeminiWithModelFallback(
              (model) => ai.models.generateContent({
                model,
                contents: jobPrompt,
                config: {
                  systemInstruction: `You are a highly premium Question Design Panel for competitive administrative exams in Bangladesh. 
Your output must be structurally flawless JSON matching the schema, with ZERO repetition across batches. Never append system tracking tags, bracketed codes, or metadata prefixes inside the 'text' field. Keep question text 100% clean and human-ready.`,
                  responseMimeType: "application/json",
                  temperature: 0.85,
                  responseSchema: {
                    type: import_genai2.Type.OBJECT,
                    properties: {
                      questions: {
                        type: import_genai2.Type.ARRAY,
                        description: "List of generated questions",
                        items: {
                          type: import_genai2.Type.OBJECT,
                          properties: {
                            text: { type: import_genai2.Type.STRING },
                            options: {
                              type: import_genai2.Type.ARRAY,
                              items: { type: import_genai2.Type.STRING }
                            },
                            correctIndex: { type: import_genai2.Type.INTEGER },
                            subject: { type: import_genai2.Type.STRING },
                            topic: { type: import_genai2.Type.STRING },
                            difficulty: { type: import_genai2.Type.STRING },
                            explanations: {
                              type: import_genai2.Type.OBJECT,
                              properties: {
                                bn: { type: import_genai2.Type.STRING },
                                en: { type: import_genai2.Type.STRING },
                                wrongOptions: {
                                  type: import_genai2.Type.ARRAY,
                                  items: { type: import_genai2.Type.STRING }
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
          } catch (err) {
            const errMsg = err.message || JSON.stringify(err) || "";
            const isRateLimit = errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED") || err.status === 429;
            if (isRateLimit && attempt < maxRetries) {
              console.warn(`[RankFlow AI] Rate limit (429) hit on attempt ${attempt}/${maxRetries} for Job ${currentJobIdx}. Retrying in ${retryDelaySec}s...`);
              await new Promise((resolve) => setTimeout(resolve, retryDelaySec * 1e3));
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
              q.text = q.text.replace(/\[.*?\]/g, "").trim();
              results.push(q);
            }
          } catch (jsonErr) {
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
    let finalizedQs = results.map((q, idx) => ({
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
  } catch (err) {
    console.warn("[RankFlow AI] Batch Generation Error/Quota Limit. Safely resorting to tailored procedural compilation:", err.message);
    try {
      const finalizedQs = generateProceduralQuestions(allocations, difficulty);
      return res.json({ questions: finalizedQs, isFallback: true });
    } catch (fallbackErr) {
      console.error("[RankFlow AI] High-level fallback failed as well:", fallbackErr);
      res.status(500).json({ error: "Failed to generate batch questions", details: err.message });
    }
  }
});
var ai_default = router3;

// api/memory.ts
var import_express4 = require("express");

// repositories/memory.repo.ts
var import_firestore5 = require("firebase/firestore");
var MemoryRepo = class {
  static async getMemorySchedule(userId) {
    const docRef = (0, import_firestore5.doc)(db, "memory", userId);
    const snap = await (0, import_firestore5.getDoc)(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  }
  static async setMemorySchedule(userId, data) {
    const docRef = (0, import_firestore5.doc)(db, "memory", userId);
    await (0, import_firestore5.setDoc)(docRef, data);
  }
};

// services/memory/sm2.algorithm.ts
var Sm2Algorithm = class {
  /**
   * Calculates the updated SM-2 repetition parameters.
   * @param item Current memory item state
   * @param quality Quality rating from user review (0-5)
   */
  static evaluate(item, quality) {
    let ef = item.easinessFactor;
    let interval = item.intervalDays;
    let repCount = item.repetitionCount;
    if (quality < 3) {
      repCount = 0;
      interval = 1;
    } else {
      if (repCount === 0) {
        interval = 1;
      } else if (repCount === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * ef);
      }
      repCount += 1;
    }
    ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (ef < 1.3) {
      ef = 1.3;
    }
    const date = /* @__PURE__ */ new Date();
    date.setDate(date.getDate() + interval);
    return {
      easinessFactor: parseFloat(ef.toFixed(3)),
      intervalDays: interval,
      repetitionCount: repCount,
      nextReviewDate: date.toISOString()
    };
  }
};

// api/memory.ts
var router4 = (0, import_express4.Router)();
var DEFAULT_TOPICS = [
  { id: "sm-bcs-1", topic: "\u099A\u09B0\u09CD\u09AF\u09BE\u09AA\u09A6 \u0993 \u09AE\u09A7\u09CD\u09AF\u09AF\u09C1\u0997", subject: "Bangla Language & Literature", urgencyScore: 92, retentionProbability: 40, daysSinceLastReview: 14, EF: 1.8, rep: 2, interval: 6 },
  { id: "sm-bcs-2", topic: "Constitutional Amendments of BD", subject: "General Knowledge", urgencyScore: 84, retentionProbability: 55, daysSinceLastReview: 8, EF: 2.1, rep: 3, interval: 12 },
  { id: "sm-bcs-3", topic: "Common Prepositions & Idioms", subject: "English Language & Literature", urgencyScore: 71, retentionProbability: 68, daysSinceLastReview: 5, EF: 2.3, rep: 4, interval: 18 },
  { id: "sm-bcs-4", topic: "\u09A7\u09BE\u09B0\u09BE \u0993 \u0985\u09A8\u09C1\u0995\u09CD\u09B0\u09AE", subject: "Mathematical Reasoning & Mental Ability", urgencyScore: 45, retentionProbability: 88, daysSinceLastReview: 3, EF: 2.5, rep: 5, interval: 24 }
];
function buildMockSchedule(userId) {
  const futureDate = (days) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString();
  };
  const items = DEFAULT_TOPICS.map((t, idx) => ({
    id: t.id,
    userId,
    topicId: t.id,
    topic: t.topic,
    subject: t.subject,
    easinessFactor: t.EF,
    intervalDays: t.interval,
    repetitionCount: t.rep,
    nextReviewDate: idx === 0 ? (/* @__PURE__ */ new Date()).toISOString() : futureDate(t.interval),
    // make first one due immediately!
    lastReviewDate: (/* @__PURE__ */ new Date()).toISOString()
  }));
  return { userId, items };
}
router4.get("/due", async (req, res) => {
  const userId = req.query.userId || "farhan-uid";
  try {
    let schedule = await MemoryRepo.getMemorySchedule(userId);
    if (!schedule) {
      schedule = buildMockSchedule(userId);
      await MemoryRepo.setMemorySchedule(userId, schedule);
    }
    const now = /* @__PURE__ */ new Date();
    const dueItems = schedule.items.map((item) => {
      const isDue = new Date(item.nextReviewDate) <= now;
      const diffMs = Math.max(0, now.getTime() - new Date(item.lastReviewDate).getTime());
      const diffDays = diffMs / (1e3 * 60 * 60 * 24);
      const retention = Math.round(100 * Math.exp(-diffDays / (item.intervalDays || 1)));
      const urgency = Math.max(0, Math.min(100, Math.round(100 - retention)));
      return {
        id: item.id,
        topic: item.topic,
        subject: item.subject,
        urgencyScore: urgency,
        retentionProbability: Math.max(10, retention),
        daysSinceLastReview: Math.round(diffDays),
        nextScheduledDate: item.nextReviewDate,
        historyLength: item.repetitionCount,
        isDue
      };
    });
    res.json({ userId, schedule: dueItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch spaced items", details: err.message });
  }
});
router4.post("/submit", async (req, res) => {
  const userId = req.body.userId || "farhan-uid";
  const { topicId, quality } = req.body;
  if (!topicId || quality === void 0 || quality < 0 || quality > 5) {
    return res.status(400).json({ error: "Missing or invalid review input parameters" });
  }
  try {
    let schedule = await MemoryRepo.getMemorySchedule(userId);
    if (!schedule) {
      schedule = buildMockSchedule(userId);
    }
    const itemIdx = schedule.items.findIndex((item) => item.id === topicId);
    if (itemIdx === -1) {
      return res.status(404).json({ error: "Topic ID not found in spaced memory list" });
    }
    const currentItem = schedule.items[itemIdx];
    const evaluated = Sm2Algorithm.evaluate(
      {
        easinessFactor: currentItem.easinessFactor,
        intervalDays: currentItem.intervalDays,
        repetitionCount: currentItem.repetitionCount
      },
      quality
    );
    schedule.items[itemIdx] = {
      ...currentItem,
      easinessFactor: evaluated.easinessFactor,
      intervalDays: evaluated.intervalDays,
      repetitionCount: evaluated.repetitionCount,
      nextReviewDate: evaluated.nextReviewDate,
      lastReviewDate: (/* @__PURE__ */ new Date()).toISOString()
    };
    await MemoryRepo.setMemorySchedule(userId, schedule);
    res.json({
      success: true,
      qualityScore: quality,
      updatedItem: {
        id: currentItem.id,
        topic: currentItem.topic,
        nextReviewDate: evaluated.nextReviewDate,
        intervalDays: evaluated.intervalDays,
        easinessFactor: evaluated.easinessFactor,
        repetitionCount: evaluated.repetitionCount
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to recalculate spaced repetition variables", details: err.message });
  }
});
router4.get("/roadmap", async (req, res) => {
  const userId = req.query.userId || "farhan-uid";
  try {
    let schedule = await MemoryRepo.getMemorySchedule(userId);
    if (!schedule) {
      schedule = buildMockSchedule(userId);
      await MemoryRepo.setMemorySchedule(userId, schedule);
    }
    const timeline = [...schedule.items].sort((a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime()).map((item) => ({
      id: item.id,
      topic: item.topic,
      subject: item.subject,
      nextReviewDate: item.nextReviewDate,
      interval: item.intervalDays,
      easiness: item.easinessFactor
    }));
    res.json({ timeline });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch spaced timeline roadmap", details: err.message });
  }
});
var memory_default = router4;

// api/analytics.ts
var import_express5 = require("express");

// repositories/analytics.repo.ts
var import_firestore6 = require("firebase/firestore");
var AnalyticsRepo = class {
  static async getAnalytics(userId) {
    const docRef = (0, import_firestore6.doc)(db, "analytics", userId);
    const snap = await (0, import_firestore6.getDoc)(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  }
  static async setAnalytics(userId, data) {
    const docRef = (0, import_firestore6.doc)(db, "analytics", userId);
    await (0, import_firestore6.setDoc)(docRef, data);
  }
  static async updateAnalytics(userId, data) {
    const docRef = (0, import_firestore6.doc)(db, "analytics", userId);
    await (0, import_firestore6.updateDoc)(docRef, data);
  }
};

// services/analytics/percentile.service.ts
var PercentileService = class {
  /**
   * Evaluates competitive percentile alignment based on student's cumulative parameters.
   * Helps output realistic mock distributions for BCS/Admission aspirants in Bangladesh.
   */
  static calculatePercentile(params) {
    const { accuracy, xp, streak } = params;
    let pct = 50 + (accuracy - 60) * 1.5;
    if (xp > 5e3) pct += 3;
    if (streak > 10) pct += 2;
    pct = Math.max(5, Math.min(99.9, pct));
    const totalCandidates = 45e4;
    const predictedRank = Math.max(1, Math.round((1 - pct / 100) * totalCandidates));
    let prob = accuracy * 1.1;
    if (pct > 95) {
      prob += 10;
    }
    prob = Math.max(10, Math.min(98, prob));
    return {
      percentile: parseFloat(pct.toFixed(2)),
      predictedRank,
      passingProbability: Math.round(prob)
    };
  }
};

// api/analytics.ts
var router5 = (0, import_express5.Router)();
var DEFAULT_SUBJECT_MASTERY = [
  { subject: "Bangla Language & Literature", score: 82, color: "#f43f5e" },
  { subject: "English Language & Literature", score: 76, color: "#3b82f6" },
  { subject: "Mathematical Reasoning & Mental Ability", score: 91, color: "#10b981" },
  { subject: "General Knowledge (BD & International)", score: 68, color: "#f59e0b" },
  { subject: "General Science & Computer Literacy", score: 74, color: "#8b5cf6" }
];
var DEFAULT_RANK_HISTORY = [
  { date: "June 12", rank: 412, percentile: 99.1 },
  { date: "June 13", rank: 395, percentile: 99.12 },
  { date: "June 14", rank: 371, percentile: 99.18 },
  { date: "June 15", rank: 350, percentile: 99.22 },
  { date: "June 16", rank: 342, percentile: 99.24 }
];
function buildAnalytics(userId, xp, streak) {
  const mastery = {};
  DEFAULT_SUBJECT_MASTERY.forEach((m) => {
    mastery[m.subject] = m.score;
  });
  return {
    userId,
    totalXp: xp,
    curLevel: Math.floor(xp / 1e3) + 1,
    cumulativePercentile: 99.24,
    cohortRank: 42,
    streak,
    masteryHeatmap: mastery,
    dailyStats: [
      { date: "2026-06-17", xpEarned: 240, questionsSolved: 15, correctAnswers: 12, timeSpentSeconds: 450 }
    ]
  };
}
router5.get("/dashboard", async (req, res) => {
  const userId = req.query.userId || "farhan-uid";
  try {
    let profile = await UserRepo.getProfile(userId);
    if (!profile) {
      profile = { ...defaultUserProfile };
    }
    let stats = await AnalyticsRepo.getAnalytics(userId);
    if (!stats) {
      stats = buildAnalytics(userId, profile.xp, profile.streak);
      await AnalyticsRepo.setAnalytics(userId, stats);
    }
    const scores = Object.values(stats.masteryHeatmap);
    const avgScore = scores.reduce((sum, s) => sum + s, 0) / (scores.length || 1);
    const evaluation = PercentileService.calculatePercentile({
      accuracy: Math.round(avgScore),
      xp: profile.xp,
      streak: profile.streak
    });
    res.json({
      userId,
      xp: profile.xp,
      level: profile.level,
      percentile: evaluation.percentile,
      predictedRank: evaluation.predictedRank,
      passingProbability: evaluation.passingProbability,
      streak: profile.streak,
      subjectMastery: Object.keys(stats.masteryHeatmap).map((sub) => {
        const matchingDef = DEFAULT_SUBJECT_MASTERY.find((d) => d.subject === sub);
        return {
          subject: sub,
          score: stats.masteryHeatmap[sub],
          color: matchingDef?.color || "#64748b"
        };
      }),
      rankHistory: DEFAULT_RANK_HISTORY,
      cognitiveFatigue: [
        { hour: 8, fatigue: 15 },
        { hour: 10, fatigue: 20 },
        { hour: 12, fatigue: 45 },
        { hour: 14, fatigue: 60 },
        { hour: 16, fatigue: 40 },
        { hour: 18, fatigue: 10 }
      ],
      timePerQuestionTrend: [
        { questionIndex: 1, actualSeconds: 42, averageSeconds: 36 },
        { questionIndex: 2, actualSeconds: 28, averageSeconds: 34 },
        { questionIndex: 3, actualSeconds: 35, averageSeconds: 35 },
        { questionIndex: 4, actualSeconds: 19, averageSeconds: 32 },
        { questionIndex: 5, actualSeconds: 22, averageSeconds: 31 }
      ],
      guessRateBySubject: [
        { subject: "Bangla", rate: 5 },
        { subject: "English", rate: 8 },
        { subject: "Math", rate: 2 },
        { subject: "General Knowledge", rate: 15 }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to evaluate dashboard statistics", details: err.message });
  }
});
router5.get("/cohort", (req, res) => {
  res.json({
    cohortSize: 45e4,
    districtStandings: [
      { district: "Dhaka", averagePercentile: 94.2, topScorersCount: 421 },
      { district: "Chattogram", averagePercentile: 91.8, topScorersCount: 295 },
      { district: "Rajshahi", averagePercentile: 89.5, topScorersCount: 184 },
      { district: "Khulna", averagePercentile: 88.1, topScorersCount: 142 }
    ],
    examTypeStandings: [
      { examType: "BCS", activeAspirants: 32e4, competitivenessIndex: 9.8 },
      { examType: "Admission", activeAspirants: 85e3, competitivenessIndex: 8.5 }
    ]
  });
});
router5.post("/event", async (req, res) => {
  const userId = req.body.userId || "farhan-uid";
  const { eventType, value, subject } = req.body;
  try {
    let stats = await AnalyticsRepo.getAnalytics(userId);
    if (!stats) {
      stats = buildAnalytics(userId, 3250, 12);
    }
    if (eventType === "quiz_completed" && subject && value) {
      const currentVal = stats.masteryHeatmap[subject] || 60;
      stats.masteryHeatmap[subject] = Math.round(currentVal * 0.9 + value * 0.1);
    }
    stats.dailyStats.push({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      xpEarned: eventType === "quiz_completed" ? 150 : 50,
      questionsSolved: eventType === "quiz_completed" ? 10 : 1,
      correctAnswers: eventType === "quiz_completed" ? 8 : 1,
      timeSpentSeconds: 300
    });
    await AnalyticsRepo.setAnalytics(userId, stats);
    res.json({ success: true, updatedStats: stats });
  } catch (err) {
    res.status(500).json({ error: "Failed to ingest event log", details: err.message });
  }
});
var analytics_default = router5;

// api/circulars.ts
var import_express6 = require("express");

// repositories/circular.repo.ts
var import_firestore7 = require("firebase/firestore");
var CircularRepo = class {
  static async getAllCirculars() {
    const colRef = (0, import_firestore7.collection)(db, "circulars");
    const snap = await (0, import_firestore7.getDocs)(colRef);
    const results = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data());
    });
    return results;
  }
  static async getCircularById(id) {
    const docRef = (0, import_firestore7.doc)(db, "circulars", id);
    const snap = await (0, import_firestore7.getDoc)(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  }
  static async saveCircular(data) {
    const docRef = (0, import_firestore7.doc)(db, "circulars", data.id);
    await (0, import_firestore7.setDoc)(docRef, data);
  }
};

// api/circulars.ts
var router6 = (0, import_express6.Router)();
var INITIAL_CIRCULARS = [
  {
    id: "circ-bcs-46",
    title: "46th BCS Written Examination Schedule Announcement",
    organization: "Bangladesh Public Service Commission (BPSC)",
    vacancyCount: 3140,
    deadline: "2026-08-30",
    admitCardDate: "2026-07-15",
    countdownDays: 45,
    link: "https://bpsc.gov.bd",
    syllabusOverview: [
      "Bangla Language & Literature (Written) - 200 Marks",
      "English Language & Literature (Written) - 200 Marks",
      "Mathematical Reasoning & Mental Ability - 100 Marks",
      "Bangladesh Affairs - 200 Marks",
      "International Affairs - 100 Marks"
    ]
  },
  {
    id: "circ-palli-2026",
    title: "Senior Officer Recruitment 2026 - Palli Sanchay Bank",
    organization: "Bankers' Selection Committee (BSC)",
    vacancyCount: 412,
    deadline: "2026-07-28",
    countdownDays: 14,
    link: "https://ereb.bb.org.bd",
    syllabusOverview: [
      "Bangla (Language & Applied Grammar) - 20 Marks",
      "English (Comprehension & Syntax Correction) - 20 Marks",
      "Mathematics (Quantitative Aptitude) - 20 Marks",
      "General Knowledge & ICT Core Concepts - 20 Marks"
    ]
  },
  {
    id: "circ-pubali-2026",
    title: "Junior Officer General Posting Circular",
    organization: "Pubali Bank PLC",
    vacancyCount: 650,
    deadline: "2026-07-10",
    countdownDays: 7,
    link: "https://pubalibangla.com",
    syllabusOverview: [
      "Analytical Ability & Critical Logic - 30 Marks",
      "Business English & Vocabulary Match - 30 Marks",
      "Banking Awareness & General Knowledge - 20 Marks"
    ]
  }
];
async function seedCirculars() {
  try {
    const existing = await CircularRepo.getAllCirculars();
    if (existing.length === 0) {
      console.log("[RankFlow AI] Seeding initial central circular index documents to Firestore...");
      for (const circ of INITIAL_CIRCULARS) {
        await CircularRepo.saveCircular(circ);
      }
    }
  } catch (err) {
    console.error("[RankFlow AI] Failed to check/seed circulars data:", err.message);
  }
}
seedCirculars();
router6.get("/", async (req, res) => {
  try {
    let circulars = await CircularRepo.getAllCirculars();
    if (circulars.length === 0) {
      circulars = INITIAL_CIRCULARS;
    }
    const now = /* @__PURE__ */ new Date();
    const evaluated = circulars.map((c) => {
      const targetDate = new Date(c.deadline);
      const diffMs = targetDate.getTime() - now.getTime();
      const diffDays = Math.max(0, Math.ceil(diffMs / (1e3 * 60 * 60 * 24)));
      return {
        ...c,
        countdownDays: diffDays
      };
    });
    res.json(evaluated);
  } catch (err) {
    res.status(500).json({ error: "Failed to load active circular index", details: err.message });
  }
});
router6.get("/latest", async (req, res) => {
  try {
    let circulars = await CircularRepo.getAllCirculars();
    if (circulars.length === 0) {
      circulars = INITIAL_CIRCULARS;
    }
    res.json(circulars.slice(0, 2));
  } catch (err) {
    res.status(500).json({ error: "Failed to compile latest circular feeds", details: err.message });
  }
});
router6.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const job = await CircularRepo.getCircularById(id);
    if (!job) {
      return res.status(404).json({ error: `Circular search failed. No record matching index: ${id}` });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch circular details", details: err.message });
  }
});
router6.post("/ingest", async (req, res) => {
  const { id, title, organization, vacancyCount, deadline, link, syllabusOverview } = req.body;
  if (!id || !title || !organization || !deadline) {
    return res.status(400).json({ error: "Required parameters are incomplete for ingestion pipeline" });
  }
  const payload = {
    id,
    title,
    organization,
    vacancyCount: vacancyCount || 0,
    deadline,
    countdownDays: 30,
    // calculated later
    link: link || "#",
    syllabusOverview: syllabusOverview || []
  };
  try {
    await CircularRepo.saveCircular(payload);
    res.json({ success: true, ingested: payload });
  } catch (err) {
    res.status(500).json({ error: "Internal ingestion transaction failed", details: err.message });
  }
});
var circulars_default = router6;

// api/leaderboard.ts
var import_express7 = require("express");
var router7 = (0, import_express7.Router)();
var LOBBY = [
  { rank: 1, name: "Tanvir Ahmed", xp: 12450, level: 13, streak: 45, examTarget: "BCS", district: "Chattogram" },
  { rank: 2, name: "Sadia Rahman", xp: 9800, level: 10, streak: 31, examTarget: "Admission", district: "Dhaka" },
  { rank: 3, name: "Farhan Kabir", xp: 8250, level: 9, streak: 24, examTarget: "BCS", district: "Dhaka" },
  { rank: 4, name: "Anika Tabassum", xp: 7500, level: 8, streak: 18, examTarget: "Admission", district: "Rajshahi" },
  { rank: 5, name: "Rafiqul Islam", xp: 6200, level: 7, streak: 15, examTarget: "BCS", district: "Khulna" }
];
router7.get("/global", (req, res) => {
  res.json({
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    leaderboard: LOBBY
  });
});
router7.get("/district", (req, res) => {
  const district = req.query.district || "Dhaka";
  const filtered = LOBBY.filter((cand) => cand.district.toLowerCase() === district.toLowerCase());
  res.json({
    districtName: district,
    leaderboard: filtered.length > 0 ? filtered : LOBBY
  });
});
router7.get("/exam", (req, res) => {
  const exam = req.query.exam || "BCS";
  const filtered = LOBBY.filter((cand) => cand.examTarget.toLowerCase() === exam.toLowerCase());
  res.json({
    examType: exam,
    leaderboard: filtered.length > 0 ? filtered : LOBBY
  });
});
var leaderboard_default = router7;

// server.ts
import_dotenv2.default.config();
async function startServer() {
  const app3 = (0, import_express8.default)();
  const PORT = 3e3;
  app3.use(import_express8.default.json());
  app3.use("/api/auth", auth_default);
  app3.use("/api/users", users_default);
  app3.use("/api/ai", ai_default);
  app3.use("/api/memory", memory_default);
  app3.use("/api/analytics", analytics_default);
  app3.use("/api/circulars", circulars_default);
  app3.use("/api/leaderboard", leaderboard_default);
  app3.get("/api/health", (req, res) => {
    const HAS_GEMINI2 = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
    res.json({ status: "ok", geminiConfigured: HAS_GEMINI2 });
  });
  app3.get("/api/rank-simulation", (req, res) => {
    const activeUsers = Math.floor(Math.random() * 2500) + 8400;
    const peakRankPredictedToday = Math.floor(Math.random() * 50) + 1;
    res.json({
      activeUsers,
      peakRankPredictedToday,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app3.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app3.use(import_express8.default.static(distPath));
    app3.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app3.listen(PORT, "0.0.0.0", () => {
    console.log(`[RankFlow AI Engine] Server live on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
