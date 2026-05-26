# RankFlow AI

An AI-powered Intelligent Learning Operating System for Bangladesh Competitive Exams. Features include real-time rank prediction, adaptive mock tests, spaced repetition memory, a personalized Bangla AI Tutor, and handwriting-based written exam evaluation.

## Features

- **Adaptive MCQ Exam Engine**: Smart generation and evaluation for BCS, Bank, University Admission, SSC, and HSC exams.
- **Bangla AI Tutor**: Bilingual (Bangla/English) tutoring with concept decomposition, step-by-step explanations, and MCQ breakdowns.
- **Spaced Repetition Memory Trainer**: Tracks forgetting curves, predicts memory decay, and schedules revision based on SuperMemo algorithms.
- **Handwriting Snap Evaluator**: Upload handwriting scans (PDF, JPEG, PNG); advanced OCR technologies extract and analyze Bangla essay responses.
- **Written Exam Evaluator AI**: Provides scoring and actionable feedback for written drafts, including grammar, coherence, and structure.
- **Real-time Rank Tracking & Analytics**: Personal analytics dashboards for predicted rank, mastery trends, fatigue, and performance pacing.
- **Firebase Integration**: User authentication, analytics, and exam profiles are managed securely in Google Firebase.

## Installation

### Prerequisites

- Node.js (see `engines` in `package.json`)
- [Gemini API Key](https://ai.google.dev/): Required for live Gemini AI features (see `.env.example`).

### Steps

1. **Install dependencies**  
   ```sh
   npm install
   ```

2. **Environment Setup**  
   Copy `.env.example` to `.env.local` and add your keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   APP_URL=your_app_url
   ```

3. **Start the development server**  
   ```sh
   npm run dev
   ```

   The server runs on [http://localhost:3000](http://localhost:3000) by default.

## Usage

- **Login/Register**: Supports Google and email-based sign-in. Your exam progress, streaks, and skills are stored in Firebase.
- **Start an Exam**: Choose your exam type (BCS, Bank, Admission, SSC, HSC) and begin adaptive MCQ or written assessments.
- **AI Tutor**: Access the Bangla AI Tutor for bilingual explanations, exam strategies, and topic breakdowns.
- **Handwriting Upload**: For written responses, upload scanned drafts for instant OCR and AI grading.
- **Analytics**: Visualize your preparation trajectory, predicted rank, and memory decay curves.

## Project Structure

- `/src/components/`: React components for UI and application logic.
- `/src/lib/`: Firebase integration, authentication, and context providers.
- `server.ts`: Express server with Gemini AI and REST endpoints.
- `firebase-applet-config.json`: Firebase project configuration.

## Configuration

- `.env.local`: API keys and app URLs (see `.env.example`).
- `firebase-applet-config.json`: Replace with your Firebase project credentials if deploying your own instance.

## Scripts

- `npm run dev` – Run locally in development mode.
- `npm run build` – Build for production.
- `npm run start` – Start the production server.

## Authentication

- Uses Firebase Auth (Google/email) and Firestore for user metrics and profiles.

## License

All rights reserved © 2026. See source code for details.

```
