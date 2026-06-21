# RankFlow AI Core Rules

## Architecture Rules
- Only ONE backend system: src/backend/
- Only ONE Gemini service file allowed
- No duplicate API implementations
- All AI calls must go through backend Express layer

## Security Rules
- Never expose GEMINI_API_KEY in frontend
- Firebase Firestore must use validated writes only
- Anonymous users must be sandbox-isolated

## AI Behavior Rules
- Rank prediction must use:
  accuracy + speed + consistency + revision history

- SM-2 algorithm must NEVER be replaced, only extended

- All AI tutor responses must support:
  English + Bangla bilingual format

## Engineering Rules
- No feature is complete without Vitest tests
- TypeScript must pass strict compilation
- No unresolved merge conflicts allowed

## Data Rules
- Analytics must be deterministic (no random scoring)
- XP and rank must be reproducible from logs
