# 🚀 RankFlow AI

[![Static Analysis](https://img.shields.io/badge/Linter-tsc%20--noEmit-emerald?style=flat-hard)](https://github.com/farhankabir133/RankFlow-AI)
[![Framework](https://img.shields.io/badge/React-19.0.1-bg-blue?style=flat-hard&logo=react)](https://react.dev)
[![Styles](https://img.shields.io/badge/Tailwind--CSS-v4.0-38bdf8?style=flat-hard&logo=tailwind-css)](https://tailwindcss.com)
[![Engine](https://img.shields.io/badge/Express--Node-v4.21-darkgreen?style=flat-hard&logo=node.js)](https://expressjs.com)
[![Database](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat-hard&logo=firebase)](https://firebase.google.com)
[![AI--Engine](https://img.shields.io/badge/Groq--AI-DeepSeek--R1-8e44ad?style=flat-hard&logo=google-cloud)](https://groq.com)

> ### 📢 Live Now!
> **RankFlow AI** is live on GitHub Pages with a Railway-powered backend.
> Frontend: https://farhankabir133.github.io/RankFlow-AI/
> Backend: https://rankflow-ai-production.up.railway.app

**RankFlow AI** is an advanced, AI-powered Intelligent Learning Operating System designed specifically for competitive exam seekers, university aspirants, and job candidates in Bangladesh. Powered by React 19, Tailwind v4, Express Node.js, and a pluggable AI provider layer (Groq primary, Gemini fallback), it provides real-time rank simulations, personalized bilingual tutoring, and persistent preparation metrics.

This platform re-imagines competitive learning from the ground up, delivering deep analytics, spaced-repetition revisions, AI-generated exam questions, and written answer evaluations.

---

## 📖 Table of Contents
1. [Overview](#-overview)
2. [Core Features](#-core-features)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Installation & Setup](#-installation--setup)
6. [Configuration & Environment](#-configuration--environment)
7. [AI Provider Architecture](#-ai-provider-architecture)
8. [API Endpoints](#-api-endpoints)
9. [Deployment](#-deployment)
10. [Enterprise Architecture](#-enterprise-architecture)
11. [Offline Sandbox Mode](#-offline-sandbox-mode)
12. [Roadmap](#-roadmap)
13. [Contributing](#-contributing)
14. [License](#-license)
15. [Author](#-author)

---

## 🔍 Overview

Historically, candidates preparing for high-stakes examinations in Bangladesh (such as the **BCS (Bangladesh Civil Service)**, **University Admissions**, and Bank recruitments) have relied on bulky paper question banks, rigid offline coaching centers, and unautomated evaluation. These structures offer zero individual analytics, lack personalized correction, and fail to track individual subject retention over time.

**RankFlow AI** steps in to solve these deficits by functioning as a complete **personal learning operating system**:
* **Predictive Competency Engine:** Analyzes speed, raw accuracy, and topic strengths across standard practice exams to project real-time competitive ranks.
* **Pluggable AI Engine:** Supports **Groq** (primary, free) and **Google Gemini** (fallback) via a unified service abstraction. Switches providers via `AI_PROVIDER` env var — the frontend never knows which provider is used.
* **Bangla AI Tutor Integration:** Bilingual (Bangla + English) step-by-step explanations, step-by-step solving, and concept decomposition mapped to BCS syllabus weighting.
* **AI Question Generation:** Generates exam-specific MCQs (BCS, Bank, University) with Bengali explanations, wrong-option analysis, and procedural fallback generators if the AI API fails.
* **Memory & Spaced Repetition Rails:** Helps prevent memory decay with active-recall flashcard setups tailored to high-density syllabus areas.
* **Written Answer Evaluator:** Scores long-form submissions with granular grammar, coherence, structure, and Bangla-custom metrics, plus actionable corrections.

---

## ✨ Core Features

### ⏱️ 1. RankFlow Exam Practice Engine
* **Dynamic Practice Modes:** Standard adaptive tests, live focus-timed mock screens, and customizable exam configurations (with target subjects, topics, and difficulty).
* **AI-Generated Questions:** Real-time MCQ generation via Groq/Gemini with Bengali explanations, wrong-option analysis, and exam-specific adaptation.
* **Instant Solutions:** Staggered answer panels showing English and Bengali solutions instantly, paired with interactive visual indicators.
* **Fault Tolerant Exports:** Export prepared sets directly as formatted text files. Integrated with an offline fallback option to save `.txt` practice sheets.

### 🤖 2. Personalized Bangla AI Tutor
* **Interactive Dynamic Sidebar:** Real-time conversational tutor designed to assist students with vocabulary, history details, math rules, or scientific formulae.
* **Bilingual Output:** Every response includes Bangla (`bn`) and English (`en`) explanations, step-by-step solving, and syllabus weight mapping.
* **Smart Prompt Suggestions:** Generates context-based preparation tips, syllabus shortcuts, and practice questions.
* **Provider Abstraction:** Uses Groq `deepseek-r1-distill-llama-8b` by default, with automatic fallback to procedural generators if the API is rate-limited.

### 🧠 3. Memory Revision (Spaced Repetitive Retention)
* **Custom Cue Cards:** Standard flashcard system powered by a spaced execution simulator.
* **Dynamic Metrics:** Pinpoints exactly when knowledge decay is imminent, alerting candidates to revise at the perfect psychological interval.

### 📝 4. Vision Written Exam Evaluator
* **Multi-Modal Input:** Users can simulate input, upload handwriting images, or paste written answers.
* **Granular Scoring:** Breaks down grading benchmarks into grammar (0-10), coherence (0-10), structure (0-10), Bangla custom (0-10), and overall (0-100).
* **Actionable Feedback:** Provides strength analysis, gap analysis, Bangla/English spelling corrections, and comparison advice against high-scoring model answers.

---

## 🛠️ Tech Stack

| Domain | Integrated Technologies |
| :--- | :--- |
| **Frontend Framework** | **React 19.0.1** (with TypeScript, ES Modules, and modern React hook design patterns) |
| **Styles & Theme** | **Tailwind CSS v4.0** (integrated with explicit fluid responsive variables, custom ambient glass filters, and dark cosmic slate accents) |
| **Server Engine** | **Express.js v4.21.2** (routing backend proxies, static build hosting, rate limiting, Zod validation) |
| **Authentication** | **Firebase Auth** (supporting Email/Password, Google OAuth, and full guest-session bypass) |
| **Durable Database** | **Firebase Firestore** (storing custom user progress, mock test logs, and personalized profile identity metrics) |
| **AI Provider Layer** | **Pluggable AI Service** — Primary: **Groq API** (`deepseek-r1-distill-llama-8b`), Fallback: **Google Gemini** (`@google/genai`) |
| **Validation** | **Zod** (strict schema validation on all API inputs) |
| **Logging** | **Winston** (structured backend logging) |
| **Visual Analytics** | **Recharts** (high-performance interactive canvas components for competency timelines and subject grids) |
| **Animations** | **Motion / Framer Motion v12** (optimized layout triggers, cards transition routines, and micro-hover states) |
| **Deployment** | **GitHub Pages** (frontend) + **Railway.app** (backend Docker container) |

---

## 📁 Project Structure

```bash
RankFlow-AI/
├── .env                          # Server-side secrets (NEVER commit)
├── .env.example                  # Schema template for env vars
├── Dockerfile                    # Multi-stage Docker build (Node 20 Alpine)
├── docker-compose.yml            # Local container orchestration
├── firebase.json                 # Firebase Hosting / Firestore config
├── firestore.rules               # Firestore security rules
├── index.html                    # Core application mounting webpage
├── package.json                  # Dependencies, scripts, and build workflows
├── server.ts                     # Express entrypoint (development + production)
├── tsconfig.json                 # Strict TypeScript configuration
├── vite.config.ts                # Vite + Tailwind compiler config
│
├── api/                          # Legacy Express route wrappers
│   ├── ai.ts                     # (REMOVED — moved to src/backend/)
│   ├── analytics.ts
│   ├── auth.ts
│   ├── circulars.ts
│   ├── leaderboard.ts
│   ├── memory.ts
│   └── users.ts
│
├── src/
│   ├── main.tsx                  # React client bootstrap
│   ├── App.tsx                   # Root router and layout orchestrator
│   ├── index.css                 # Global theme and Tailwind directives
│   ├── types.ts                  # Shared TypeScript interfaces (UserProfile, Question, ExamSession)
│   │
│   ├── backend/                  # ⭐ NEW: Modular backend architecture
│   │   ├── app.ts                # Express app, middleware, routes, CSP
│   │   ├── config/
│   │   │   ├── env.ts            # Zod-validated environment config (AI_PROVIDER, GROQ, GEMINI)
│   │   │   └── logging.ts        # Winston logger setup
│   │   ├── controllers/
│   │   │   ├── ai.controller.ts  # AI endpoint handlers (tutor, evaluate, questions)
│   │   │   └── ...               # Other controllers
│   │   ├── services/
│   │   │   ├── ai.service.ts     # AIService interface (contract for all providers)
│   │   │   ├── ai.types.ts       # Shared AI types (TutorResponse, Question, EvaluationResult)
│   │   │   ├── ai.provider.ts    # Factory: selects Groq or Gemini based on AI_PROVIDER
│   │   │   ├── gemini.service.ts # Google Gemini implementation with fallback chain
│   │   │   ├── groq.service.ts   # Groq API implementation with retry + sanitization
│   │   │   └── analytics/        # XP, percentile, and analytics services
│   │   ├── middleware/
│   │   │   ├── validate.middleware.ts  # Zod schema validation
│   │   │   ├── rateLimit.middleware.ts # Express rate limiting
│   │   │   └── error.middleware.ts     # Global error handler
│   │   ├── data/
│   │   │   └── syllabusCorpus.ts       # Procedural question fallback generator
│   │   ├── repositories/        # Data access layer (Firestore)
│   │   └── constants/
│   │       └── defaults.ts       # Backend-only default profiles
│   │
│   ├── components/
│   │   ├── AITutor.tsx           # Chat UI → calls ApiClient.getTutorResponse()
│   │   ├── WrittenEvaluator.tsx  # Essay grading UI → calls ApiClient.evaluateWritten()
│   │   ├── ExamEngine.tsx        # Exam simulation → calls ApiClient.getBatchQuestions()
│   │   ├── Analytics.tsx         # Dashboard charts and stats
│   │   ├── AuthModal.tsx         # Login/signup modal (Email, Google, Guest)
│   │   ├── Dashboard.tsx         # Main dashboard overview
│   │   ├── LandingPage.tsx       # Marketing landing page
│   │   ├── MemoryRevision.tsx    # Spaced repetition flashcards
│   │   ├── ProfileIdentity.tsx   # User profile inspector
│   │   └── common/              # Shared UI primitives (ErrorBoundary, Skeletons)
│   │
│   ├── lib/
│   │   ├── api.ts                # ⭐ ApiClient — auto-detects Railway vs localhost
│   │   ├── firebase.ts           # Firebase SDK initialization
│   │   ├── AuthContext.tsx       # React Auth context + Firestore profile sync
│   │   ├── firestoreHelpers.ts   # Firestore utility functions
│   │   └── useUserData.ts        # React hooks for user data
│   │
│   └── components/exam/
│       └── ExamData.ts            # Shared syllabus data, subtopics, question pool
│
└── tests/                        # Vitest test suite
    ├── setup.ts
    ├── integration/
    │   └── api.test.ts           # API endpoint integration tests
    └── unit/
        └── syllabus.test.ts      # Procedural question generator tests
```

---

## ⚙️ Configuration & Environment

RankFlow AI uses environment variables for secure server and client operations. Create a `.env` file in the root directory by mirroring `.env.example`:

```bash
# Duplicate the example config file
cp .env.example .env
```

### Required Environment Variables

```env
# =====================================
# AI PROVIDERS (Backend Only)
# =====================================

# Google Gemini API (Primary / fallback option)
GEMINI_API_KEY="your_gemini_api_key"

# Groq API (Free AI backend for RankFlow AI)
GROQ_API_KEY="your_groq_api_key"

# Active AI Provider Switch
# Options: "groq" | "gemini"
AI_PROVIDER="groq"

# =====================================
# APP CONFIG
# =====================================

APP_URL="https://your-domain.com"

# =====================================
# FRONTEND SAFE KEYS (VITE ONLY)
# ⚠️ NEVER PUT GROQ HERE
# =====================================

VITE_GEMINI_API_KEY="your_gemini_api_key"  # Optional for client-side fallback

# =====================================
# FIREBASE CLIENT CONFIG
# =====================================

VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abc123"
```

### AI Provider Configuration

The system automatically selects the AI provider based on `AI_PROVIDER`:

| Provider | Env Value | Model | Cost | Fallback |
|:---|:---|:---|:---|:---|
| **Groq** (default) | `groq` | `deepseek-r1-distill-llama-8b` | Free | Procedural generators |
| **Gemini** | `gemini` | `gemini-2.5-flash` | Paid | Groq |

Switch providers by changing `AI_PROVIDER` in Railway dashboard or `.env` locally. No code changes required.

---

## 📦 Installation & Setup

Ensure you have **Node.js LTS (v20 or higher)** installed on your machine.

### 1. Install dependencies
```bash
cd RankFlow-AI
npm install
```

### 2. Configure Firebase
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable **Authentication** → Email/Password, Google Sign-In
3. Create a **Firestore Database**
4. Add your domain to **Authorized domains** (localhost, your-username.github.io)
5. Add your GitHub Pages URL to **Google Cloud OAuth redirect URIs**:
   ```
   https://<username>.github.io/<repo>/__/auth/handler
   ```
6. Update `.env` with your Firebase config

### 3. Development mode
```bash
npm run dev
```
Opens at `http://localhost:3000` with:
- Express backend on port 3000
- Vite HMR middleware for frontend
- Hot-reloading for both server and client

### 4. Production build
```bash
npm run build
```
Produces:
- `dist/assets/` — Vite-bundled frontend (HTML, CSS, JS)
- `dist/server.cjs` — esbuild-bundled Express server (CJS)

---

## 🤖 AI Provider Architecture

RankFlow AI uses a **pluggable AI service abstraction** — the frontend never knows which AI provider is active.

```
Frontend (GitHub Pages)
    │
    ▼
ApiClient (src/lib/api.ts)
    │  auto-detects Railway URL when on GitHub Pages
    ▼
Express Routes (src/backend/app.ts)
    │  Zod validation → rate limiting
    ▼
AI Controller (src/backend/controllers/ai.controller.ts)
    │  fallback orchestration
    ▼
AIService Interface (src/backend/services/ai.service.ts)
    │
    ├──► GroqService (src/backend/services/groq.service.ts)   [PRIMARY]
    │        • Model: deepseek-r1-distill-llama-8b
    │        • Temperature: Tutor=0.6, Questions=0.1, Evaluation=0.3
    │        • Retry: 3 attempts with exponential backoff
    │        • Sanitization: strips <think> blocks, code fences
    │        • Fallback: procedural MCQ generator
    │
    └──► GeminiService (src/backend/services/gemini.service.ts) [FALLBACK]
             • Models: gemini-2.5-flash → gemini-1.5-flash → gemini-flash-latest
             • Model failover chain with 3-min cooldown on quota exhaustion
             • Retry: 3 attempts per model
             • Sanitization: strips <think> blocks, code fences
             • Fallback: offline bilingual responses
```

### AI Response Sanitization

All AI responses go through a sanitization pipeline before reaching the frontend:
1. Strip `<think>...</think>` reasoning blocks (Groq-specific)
2. Strip triple-backtick code fences
3. Trim to first `{...}` or `[...]` JSON boundary
4. Validate against Zod schema in controller
5. If parse fails → trigger fallback generator

### Output Contracts

Every AI endpoint returns **strict JSON** with this shape:

**Tutor (`POST /api/ai/tutor`)**
```json
{
  "id": "string",
  "sender": "ai",
  "text": "Brief conversational summary",
  "bilingual": { "bn": "Bangla explanation", "en": "English explanation" },
  "stepByStep": ["Step 1", "Step 2", "Step 3"],
  "conceptDecomposition": "Syllabus mapping insight"
}
```

**Batch Questions (`POST /api/ai/batch-questions`)**
```json
{
  "questions": [
    {
      "id": "string",
      "text": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "subject": "Bangla",
      "topic": "Grammar",
      "difficulty": "Medium",
      "explanations": {
        "bn": "Bangla explanation",
        "en": "English explanation",
        "wrongOptions": ["Why A is wrong", ...]
      }
    }
  ],
  "isFallback": false
}
```

**Written Evaluation (`POST /api/ai/written-evaluate`)**
```json
{
  "id": "string",
  "title": "Assignment title",
  "subject": "Subject",
  "submissionText": "Original text",
  "scores": {
    "grammar": 8,
    "coherence": 8,
    "structure": 8,
    "banglaCustom": 9,
    "overall": 78
  },
  "feedback": {
    "strength": "Positive feedback",
    "gap": "Areas to improve",
    "grammarFixes": ["Fix 1", "Fix 2"],
    "modelComparisons": "Model answer comparison"
  },
  "predictedScore": 78
}
```

**Adaptive Question (`POST /api/ai/adaptive-question`)**
```json
{
  "id": "string",
  "text": "Question text",
  "options": ["A", "B", "C", "D"],
  "correctIndex": 0,
  "subject": "Subject",
  "topic": "Topic",
  "difficulty": "Hard",
  "explanations": { "bn": "...", "en": "...", "wrongOptions": [...] },
  "isFallback": false
}
```

---

## 🌐 API Endpoints

All AI endpoints are rate-limited (`aiLimiter`) and validated via Zod schemas.

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/health` | Backend health check — returns `groqConfigured` status |
| `GET` | `/api/rank-simulation` | Live simulated active users and rank predictions |
| `POST` | `/api/ai/tutor` | Bilingual AI tutor (Bangla + English step-by-step) |
| `POST` | `/api/ai/written-evaluate` | Grade written submissions with rubric scoring |
| `POST` | `/api/ai/adaptive-question` | Generate a single adaptive MCQ |
| `POST` | `/api/ai/batch-questions` | Generate multiple MCQs with topic allocations |

### Frontend Auto-Routing

`src/lib/api.ts` automatically routes API calls:
- **GitHub Pages** → `https://rankflow-ai-production.up.railway.app`
- **Localhost** → `http://localhost:3000`

No manual config needed for deployment.

---

## 🚀 Deployment

### Frontend — GitHub Pages

```bash
# Build and deploy frontend
GITHUB_PAGES=true npm run build:client
npm run deploy
```

This pushes the Vite build to the `gh-pages` branch. GitHub Pages serves it at:
```
https://<username>.github.io/RankFlow-AI/
```

### Backend — Railway.app

1. **Connect Railway to your GitHub repo**
   - Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
   - Select `RankFlow-AI` repository
   - Railway auto-detects `Dockerfile`

2. **Set environment variables in Railway dashboard**
   - `AI_PROVIDER` = `groq`
   - `GROQ_API_KEY` = `your_groq_key`
   - `GEMINI_API_KEY` = `your_gemini_key`
   - All `VITE_FIREBASE_*` vars (needed at build time for frontend bundle)
   - `APP_URL` = `https://<username>.github.io/RankFlow-AI`

3. **Configure Railway Settings**
   - **Builder:** Dockerfile
   - **Dockerfile Path:** `/Dockerfile`
   - **Healthcheck Path:** `/health`
   - **Start Command:** `node dist/server.cjs`

4. **Deploy**
   - Railway builds via multi-stage Docker:
     - Stage 1 (builder): `npm ci` → `npm run build` (Vite + esbuild)
     - Stage 2 (runner): production deps only → `node dist/server.cjs`

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Production Stack                             │
├──────────────────────────┬──────────────────────────────────────────┤
│   GitHub Pages           │   Railway.app (Docker)                  │
│   ─────────────          │   ────────────────────                  │
│   Static frontend        │   Express + AI Service Layer           │
│   Vite bundle            │   Groq API (primary)                   │
│   index.html + assets    │   Gemini API (fallback)                │
│                          │   Firestore DB access                   │
│   https://<user>.        │   https://<service>.up.railway.app      │
│   github.io/RankFlow-AI/ │   Port 8080 (dynamic)                  │
└──────────────────────────┴──────────────────────────────────────────┘
         │                          │
         │   ApiClient auto-detects  │
         └──────────┬───────────────┘
                    ▼
            POST /api/ai/*
         (tutor, questions, evaluate)
```

---

## 🏗️ Enterprise Architecture

```
                       +-------------------------------------------------+
                       |                 Client Browser                  |
                       +-------------------------------------------------+
                                       |                   |
                      Asset Serving &  |                   | Auth & DB Logs 
                       Express Proxy   |                   | (Direct SDK)
                                       v                   v
+-------------------------------+-----------+    +----------------------+
|            Backend            |  Express  |    |       Firebase       |
|          Credentials          |  Service  |    |      Infrastructure  |
|  +-------------------------+  |  (CJS)    |    |  +----------------+  |
|  | GROQ_API_KEY           |  |           |    |  | Firestore      |  |
|  | GEMINI_API_KEY         |  |           |    |  +----------------+  |
|  +-------------------------+  |           |    |  | Firebase Auth  |  |
|  | Zod Validation         |  |           |    |  +----------------+  |
|  | Rate Limiting          |  |           |    |                      |
|  | CSP Headers            |  |           |    |                      |
|  +-------------------------+  +-----------+    +----------------------+
+-------------------------------+----------------+----------------------+
```

### Server Compilation System
* **Vite Static Bundling:** Client JavaScript and CSS are bundled into high-efficiency chunks inside `dist/assets/`.
* **esbuild Server Bundling:** `server.ts` is compiled to `dist/server.cjs` using esbuild with externalized `node_modules` and `fsevents`.
* **Why CJS bundling?** Packaging `server.ts` down to a single `.cjs` file avoids Node's runtime ES Module resolution loops while maintaining clean backtracks through sourcemaps.

---

## 🛡️ Offline Sandbox Mode

To cater to developers running the application without active API keys or Firebase configurations, **RankFlow AI** features a **Full Guest Sandbox Mode**:
* **Zero Configuration Blockers:** If AI providers are unconfigured, the system automatically falls back to procedural question generators and rule-based scorers.
* **Local Storage Persistence:** Enables complete local simulation of persistent data models using the browser's `localStorage` state engine.
* **Local Document Downloads:** If exports error out, clicking download directly compiles and downloads a structured question sheet with step-by-step explanations.

---

## 🗺️ Roadmap

- [x] **Pluggable AI Provider Layer** — Groq primary, Gemini fallback
- [x] **Backend-First Architecture** — No direct AI calls from frontend
- [x] **Production Deployment** — GitHub Pages + Railway
- [x] **Firebase Auth** — Google, Email, Anonymous
- [x] **Zod Validation** — All API inputs validated
- [x] **Rate Limiting** — AI endpoints protected
- [x] **Fallback Generators** — Procedural MCQs, rule-based scoring
- [ ] **Live Mock Tournaments:** Live timed examinations where candidates compete in real-time.
- [ ] **Native OCR Integration:** True client-side image cropping and OCR text extraction for written assessments.
- [ ] **Peer Comparison Panels:** Comparative analytical dashboard charts comparing student progress against global toppers.
- [ ] **Extended Spaced Repetition (SRS) Customization:** Ability to import personal spreadsheets directly into spaced repetition flashcards.

---

## 🤝 Contributing

Contributions are welcomed! Follow these simple steps:
1. **Fork** the repository.
2. Create your Feature Branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch: `git push origin feature/AmazingFeature`
5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the **MIT License** - see the `LICENSE` file for details.

---

## 🌟 Support & Author

Created with 🤍 by **Farhan Kabir**.

* **Tech Space:** AI Engineering, Full-Stack Development & Open Source building.
* **Portfolio:** [farhankabir.dev](https://farhankabir.dev)
* **GitHub:** [@farhankabir](https://github.com/farhankabir)
* **Email:** [farhankabir236@gmail.com](mailto:farhankabir236@gmail.com)

*Prep intelligently, measure accurately, succeed brilliantly.* 🚀
