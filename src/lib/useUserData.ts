/**
 * useUserData.ts
 *
 * Central real-time data hook. Subscribes to three Firestore sub-collections
 * using onSnapshot and returns live-updating state to all consumers.
 *
 * Usage:
 *   const { revisionItems, examSessions, analyticsSummary, loading } = useUserData();
 */
import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { RevisionSchedule, AnalyticsData } from '../types';
import { ExamSessionRecord, AnalyticsSummaryRecord } from './firestoreHelpers';

// ─── Shape of exam sessions as stored in Firestore ───────────────────────────
export interface StoredExamSession extends ExamSessionRecord {
  id: string;
}

// ─── Shape of a derived AnalyticsData (for Recharts) ─────────────────────────
function buildAnalyticsData(summary: AnalyticsSummaryRecord | null): AnalyticsData {
  if (!summary) {
    return {
      subjectMastery:       [],
      rankHistory:          [],
      cognitiveFatigue:     [],
      timePerQuestionTrend: [],
      guessRateBySubject:   [],
    };
  }

  // Subject mastery from aggregated accuracy map
  const SUBJECT_COLORS: Record<string, string> = {
    default: '#38bdf8',
    BCS:     '#6366f1',
    BankAD:  '#34d399',
    GovtJob: '#f59e0b',
  };
  const subjectMastery = Object.entries(summary.subjectAccuracy ?? {}).map(([subject, data]) => ({
    subject,
    score: Math.round(data.total / Math.max(1, data.count)),
    color: SUBJECT_COLORS[subject] ?? SUBJECT_COLORS.default,
  }));

  return {
    subjectMastery,
    rankHistory:          summary.rankHistory ?? [],
    cognitiveFatigue:     [],   // future: computed from session timestamps
    timePerQuestionTrend: [],   // future: stored per-question timing
    guessRateBySubject:   [],   // future: stored guess flag per answer
  };
}

// ─── The hook ─────────────────────────────────────────────────────────────────

interface UseUserDataReturn {
  revisionItems:    RevisionSchedule[];
  examSessions:     StoredExamSession[];
  analyticsSummary: AnalyticsSummaryRecord | null;
  analyticsData:    AnalyticsData;
  loading:          boolean;
}

export function useUserData(): UseUserDataReturn {
  const { user } = useAuth();

  const [revisionItems,    setRevisionItems]    = useState<RevisionSchedule[]>([]);
  const [examSessions,     setExamSessions]     = useState<StoredExamSession[]>([]);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummaryRecord | null>(null);
  const [loading,          setLoading]          = useState(true);

  useEffect(() => {
    if (!user) {
      setRevisionItems([]);
      setExamSessions([]);
      setAnalyticsSummary(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    let resolved = 0;
    const totalListeners = 3;
    const tryDone = () => { if (++resolved >= totalListeners) setLoading(false); };

    // ── 1. Revision items — ordered by urgency descending ──────────────────
    const revQ = query(
      collection(db, 'users', user.uid, 'revisionItems'),
      orderBy('urgencyScore', 'desc'),
      limit(50),
    );
    const unsubRev = onSnapshot(revQ, snap => {
      setRevisionItems(
        snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<RevisionSchedule, 'id'>) })),
      );
      tryDone();
    }, err => { console.error('[useUserData] revisionItems:', err); tryDone(); });

    // ── 2. Exam sessions — last 20 ordered by completedAt desc ─────────────
    const sessQ = query(
      collection(db, 'users', user.uid, 'examSessions'),
      orderBy('completedAt', 'desc'),
      limit(20),
    );
    const unsubSess = onSnapshot(sessQ, snap => {
      setExamSessions(
        snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ExamSessionRecord, 'id'>) } as StoredExamSession)),
      );
      tryDone();
    }, err => { console.error('[useUserData] examSessions:', err); tryDone(); });

    // ── 3. Analytics summary document ──────────────────────────────────────
    const unsubAnalytics = onSnapshot(
      doc(db, 'users', user.uid, 'analytics', 'summary'),
      snap => {
        setAnalyticsSummary(snap.exists() ? (snap.data() as AnalyticsSummaryRecord) : null);
        tryDone();
      },
      err => { console.error('[useUserData] analytics:', err); tryDone(); },
    );

    return () => {
      unsubRev();
      unsubSess();
      unsubAnalytics();
    };
  }, [user?.uid]);

  return {
    revisionItems,
    examSessions,
    analyticsSummary,
    analyticsData: buildAnalyticsData(analyticsSummary),
    loading,
  };
}
