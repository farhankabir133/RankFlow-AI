# RankFlow-AI — AI-Powered Job & Exam Ecosystem

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan?logo=tailwindcss)

[AI Studio Instance](https://ai.studio/apps/39f60206-dace-43d2-97f2-07950188a8b3)

---

## Executive Summary

**RankFlow-AI** modernizes exam preparation and job applicant analytics by providing a comprehensive AI web-app with bilingual features. The platform gathers real-time government job circulars, personalized analytics, memory revision science, and interactive chat-based learning into a unified user experience.

Students and job seekers benefit from:
- Real-time exam & job alerts
- Adaptive learning analytics with cohort benchmarking
- Personalized spaced repetition for memory and topic mastery
- Bilingual interactive AI tutor
- Secure, smooth onboarding and authentication (email/password, Google OAuth)

---

## Quick Links

- App Demo: https://ai.studio/apps/39f60206-dace-43d2-97f2-07950188a8b3
- Repository: https://github.com/farhankabir133/RankFlow-AI

---

## Features

### Core Functionality
- **Bilingual AI Tutor:** Bangla and English Q&A, stepwise explanations, subject decomposition
- **Real-time Circular Registry:** Government job circular aggregation, deadlines, and notifications
- **User Dashboard:** Personalized streak, rank, XP, percentile, and target exam/year
- **Memory Revision Engine:** Data-driven spaced repetition scheduling for weak topics
- **Analytics Hub:** Cohort milestone benchmarking, subject mastery radar, percentile progress
- **Adaptive Onboarding:** Guided setup for goals, exam type, and diagnostic assessment
- **Fast Authentication:** Email/password & Google sign-in

### Notable UX
- Animated transitions and gradients
- Cohort percentile tracking by district and archetype
- All key text and feedback (onboarding, errors) supports Bangla

| Area               | Key Capabilities                                                  |
|--------------------|-------------------------------------------------------------------|
| Dashboard          | Personalized stats, leaderboard, goals, exam readiness            |
| Analytics          | Mastery heatmaps, trendlines, consistency, percentile ranking     |
| CareerOS           | Real-time job circulars, organization/deadline/vacancy breakdown  |
| Memory Revision    | Topic streaks, urgency index, neural retention simulation         |
| AI Tutor           | Bilingual chat, visual & stepwise explanations                    |
| Profile Identity   | XP, levels, archetype, district ranking, contact info             |

---

## Technical Deep Dive

### Why TypeScript & Tailwind CSS?
- Static typing, scalable React codebase (TypeScript)
- Custom design & dark-theme support (Tailwind)
- Animations for polished transitions (`animate-fadeIn`, slideUp)

### State & Data
- User, analytics, and circulars are managed via React Contexts and hooks: `src/lib/AuthContext.tsx`, `src/components/Dashboard.tsx`, `src/components/Analytics.tsx`
- Profile persistence via Firebase (auth, Firestore)
- Environment config via `.env.local` (API keys)

---

## Developer Experience (DX)

Everything in this repo is designed for easy local runs and onboarding.

### Prerequisites
- Node.js (v18+ recommended)
- Gemini API key for AI functionality

### Environment Variables
Create a `.env.local` file with:
```env
GEMINI_API_KEY=your-gemini-api-key
```

### Local Development
```sh
git clone https://github.com/farhankabir133/RankFlow-AI.git
cd RankFlow-AI
npm install
npm run dev
```

---

## Project Structure

- `src/components/` — UI (Dashboard, Analytics, AI Tutor, CareerOS, MemoryRevision, etc.)
- `src/lib/` — Contexts and utility modules
- `src/types.ts` — Data models
- `src/App.tsx` — Application root
- `src/index.css` — Tailwind base, custom theming

---

## Deployment

The project builds to a static bundle and can be deployed to Vercel, Netlify, or any static hosting. Set relevant environment variables in your deployment platform.

---

## Security Notes
- Store API keys/credentials in `.env.local`
- Restrict editable operations to authenticated users
- Review usage of Firestore and Google OAuth before production

---

## Meet the Developer

**A. S. M. Farhan Kabir Redoy** — Author, RankFlow-AI
- Portfolio: https://farhankabir.me/
- Medium: https://medium.com/@farhankabir
- Email: farhankabir133@gmail.com

For queries, suggestions, or developer walkthroughs, open an issue or email directly.

---

>This README's structure and tone is adapted from the Auto Spark BD style, tailored as a technical reference and portfolio spotlight. For edits/updates, open a PR or issue in the repo.
