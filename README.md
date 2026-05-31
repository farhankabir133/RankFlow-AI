# RankFlow-AI

This repository contains everything needed to run the RankFlow-AI app locally.

---

## Overview

**RankFlow-AI** is an AI-powered job-related web application primarily built with TypeScript. It provides a comprehensive ecosystem for students and job seekers, offering analytics, real-time government exam circular notifications, user authentication, memory revision science, and interactive AI tutoring tailored for competitive exams.

---

## Features

- **User Authentication:** Email/password and Google sign-in, with onboarding and profile management.
- **Dashboard:** Personalized statistics, national predicted rank, exam targets, and activity streaks.
- **Memory Revision Engine:** Implements spaced repetition for syllabus topics, tracking retention and revision urgency.
- **Analytics Hub:** Visualizes learning metrics, subject mastery, and performance benchmarks using various charts.
- **AI Tutor:** Interactive bilingual (Bangla/English) chatbot for deep topic exploration, stepwise explanations, and subject breakdowns.
- **CareerOS:** Real-time registry of job circulars and government exam information, deadline tracking, and requirement details.
- **Profile Identity:** Visualizes user progress, archetype, district ranking, XP level, and quick stats.
- **Onboarding Workflow:** Guides new users through goal setup and target selection for relevant exams.

> _This feature list is derived directly from component and context implementations in the code. For more, explore the source code or UI._

---

## Installation

**Prerequisites:**  
- Node.js  
- A valid Gemini API key for AI functions

**Steps:**

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. Run the app locally:
   ```sh
   npm run dev
   ```

---

## Usage

- Access the app via your browser after running the development server.
- Sign up with email/password or Google to access all features.
- Use the dashboard to track learning progress, explore analytics, revise memory items, interact with the AI Tutor, and browse career opportunities.

---

## Project Structure

- `src/components/` — Core UI components (Dashboard, Analytics, AITutor, MemoryRevision, CareerOS, etc.)
- `src/lib/` — Context providers and utility modules
- `src/types.ts` — Data types and interfaces
- `src/App.tsx` — Main application logic/root component
- `src/index.css` — Styling, including Tailwind CSS and custom animations

---

## License

_For licensing information, please refer to a LICENSE file or official repository source if provided._

---

> **Note:**  
> This README has been generated directly from the source code. Content not appearing in the codebase (such as extended documentation or usage scenarios) is intentionally omitted.
