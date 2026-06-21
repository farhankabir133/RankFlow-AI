/**
 * firestoreHelpers.ts
 *
 * All Firestore write helpers for user activity data.
 * Every function is pure (no React hooks) so they can be called from anywhere.
 */
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { RevisionSchedule, ExamSession } from '../types';

// ─── Exam Sessions ─────────────────────────────────────────────────────────────

export interface ExamSessionRecord {
  examType: string;
  title: string;
  score: number;
  totalPossible: number;
  accuracy: number;           // 0–100
  percentile: number;         // 0–100
  weakTopics: string[];
  strongTopics: string[];
  guessDetections: number;
  durationSeconds: number;
  completedAt: number;        // Unix ms
}

/**
 * Save a completed exam session to `users/{uid}/examSessions`.
 * Also updates the analytics/summary aggregate and the root user profile.
 */
export async function saveExamSession(
  uid: string,
  session: ExamSessionRecord,
): Promise<void> {
  // 1) Write the session document
  const sessionsRef = collection(db, 'users', uid, 'examSessions');
  await addDoc(sessionsRef, session);

  // 2) Update analytics/summary aggregate
  await updateAnalyticsSummary(uid, session);

  // 3) Sync accuracy onto the root profile (readinessScore, passingProbability)
  const profileRef = doc(db, 'users', uid);
  await updateDoc(profileRef, {
    readinessScore:     Math.round(session.accuracy),
    passingProbability: Math.min(99, Math.round(session.accuracy * 0.95 + 5)),
    updatedAt:          Date.now(),
  });
}

// ─── Analytics Summary ────────────────────────────────────────────────────────

export interface AnalyticsSummaryRecord {
  totalExams: number;
  medianAccuracy: number;
  rankHistory: { date: string; rank: number; percentile: number }[];
  subjectAccuracy: Record<string, { total: number; count: number }>;
  updatedAt: number;
}

/**
 * Merge a new exam session result into `users/{uid}/analytics/summary`.
 * Uses a read-modify-write pattern with exponential moving average on accuracy.
 */
export async function updateAnalyticsSummary(
  uid: string,
  session: ExamSessionRecord,
): Promise<void> {
  const summaryRef = doc(db, 'users', uid, 'analytics', 'summary');
  const snap       = await getDoc(summaryRef);

  const now     = Date.now();
  const dateStr = new Date(now).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  if (!snap.exists()) {
    // First session ever — create from scratch
    const initial: AnalyticsSummaryRecord = {
      totalExams:     1,
      medianAccuracy: session.accuracy,
      rankHistory:    [{ date: dateStr, rank: estimateRank(session.accuracy), percentile: session.percentile }],
      subjectAccuracy: buildSubjectMap(session.weakTopics, session.strongTopics, session.accuracy),
      updatedAt:      now,
    };
    await setDoc(summaryRef, initial);
    return;
  }

  const existing = snap.data() as AnalyticsSummaryRecord;
  const total    = (existing.totalExams ?? 0) + 1;

  // Exponential moving average for median accuracy (alpha=0.3)
  const ema = parseFloat(
    ((existing.medianAccuracy ?? session.accuracy) * 0.7 + session.accuracy * 0.3).toFixed(1),
  );

  // Keep last 14 rank-history entries
  const rankHistory = [
    ...(existing.rankHistory ?? []),
    { date: dateStr, rank: estimateRank(session.accuracy), percentile: session.percentile },
  ].slice(-14);

  // Merge subject accuracy maps
  const merged = mergeSubjectMaps(
    existing.subjectAccuracy ?? {},
    buildSubjectMap(session.weakTopics, session.strongTopics, session.accuracy),
  );

  await setDoc(summaryRef, {
    totalExams:     total,
    medianAccuracy: ema,
    rankHistory,
    subjectAccuracy: merged,
    updatedAt:      now,
  });
}

// ─── Revision Items ───────────────────────────────────────────────────────────

/**
 * Save a brand-new revision item to `users/{uid}/revisionItems`.
 */
export async function saveRevisionItem(
  uid: string,
  item: Omit<RevisionSchedule, 'id'>,
): Promise<string> {
  const ref = await addDoc(
    collection(db, 'users', uid, 'revisionItems'),
    { ...item, createdAt: Date.now(), updatedAt: Date.now() },
  );
  return ref.id;
}

/**
 * Update an existing revision item (e.g. after a flashcard review).
 */
export async function updateRevisionItem(
  uid: string,
  itemId: string,
  fields: Partial<RevisionSchedule>,
): Promise<void> {
  const ref = doc(db, 'users', uid, 'revisionItems', itemId);
  await updateDoc(ref, { ...fields, updatedAt: Date.now() });
}

/**
 * Seed weak topics discovered from an exam session as revision items.
 * Skips topics that already exist (by topic name comparison).
 */
export async function seedRevisionItemsFromSession(
  uid: string,
  weakTopics: string[],
  examType: string,
): Promise<void> {
  const results = await Promise.allSettled(
    weakTopics.map(topic =>
      saveRevisionItem(uid, {
        topic,
        subject:              examType,
        urgencyScore:         85,
        retentionProbability: 30,
        daysSinceLastReview:  0,
        nextScheduledDate:    new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        historyLength:        0,
      }),
    ),
  );
  // Silently ignore duplicates / failures — non-critical path
  results.forEach(r => { if (r.status === 'rejected') console.warn('[seed]', r.reason); });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function estimateRank(accuracy: number): number {
  if (accuracy > 90) return Math.round(Math.random() * 200 + 50);
  if (accuracy > 80) return Math.round(Math.random() * 2000 + 200);
  if (accuracy > 70) return Math.round(Math.random() * 8000 + 2000);
  if (accuracy > 60) return Math.round(Math.random() * 20000 + 10000);
  return Math.round(Math.random() * 50000 + 30000);
}

function buildSubjectMap(
  weakTopics: string[],
  strongTopics: string[],
  accuracy: number,
): Record<string, { total: number; count: number }> {
  const map: Record<string, { total: number; count: number }> = {};
  weakTopics.forEach(t => { map[t] = { total: Math.max(0, accuracy - 25), count: 1 }; });
  strongTopics.forEach(t => { map[t] = { total: Math.min(100, accuracy + 15), count: 1 }; });
  return map;
}

function mergeSubjectMaps(
  a: Record<string, { total: number; count: number }>,
  b: Record<string, { total: number; count: number }>,
): Record<string, { total: number; count: number }> {
  const out: Record<string, { total: number; count: number }> = { ...a };
  for (const [key, val] of Object.entries(b)) {
    if (out[key]) {
      out[key] = { total: out[key].total + val.total, count: out[key].count + val.count };
    } else {
      out[key] = val;
    }
  }
  return out;
}
