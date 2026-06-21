import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, TrendingUp, RefreshCw, AlertTriangle, 
  MapPin, Brain, Calendar, Clock, ArrowRight, Zap, Target, BookOpen, Mail
} from 'lucide-react';
import { UserProfile, RevisionSchedule, Circular } from '../types';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '../lib/LanguageContext';

// ─── Reusable avatar ─────────────────────────────────────────────────────────
function DashAvatar({ photoURL, name }: { photoURL?: string | null; name: string }) {
  const [err, setErr] = useState(false);
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  if (photoURL && !err) {
    return (
      <img
        src={photoURL}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setErr(true)}
        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-cyan-500/30 shadow-xl"
      />
    );
  }
  return (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-lg font-bold text-white shadow-xl">
      {initials || '?'}
    </div>
  );
}

import { StoredExamSession } from '../lib/useUserData';

interface DashboardProps {
  profile: UserProfile;
  revisionItems: RevisionSchedule[];
  examSessions: StoredExamSession[];
  upcomingCirculars: Circular[];
  onNavigate: (section: string) => void;
  onQuickPractice: () => void;
}

export default function Dashboard({ 
  profile, 
  revisionItems, 
  examSessions,
  upcomingCirculars, 
  onNavigate,
  onQuickPractice
}: DashboardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const displayName = profile.name || user?.displayName || 'Aspirant';
  const photoURL    = profile.photoURL ?? user?.photoURL ?? null;
  const email       = profile.email ?? user?.email ?? null;
  
  // Filter for urgent, expiring memory revision gaps
  const urgentRevisions = revisionItems.filter(item => item.urgencyScore > 50).slice(0, 3);

  // Gather weak topics from last few exam sessions
  const examWeakTopics = Array.from(new Set(
    (examSessions || []).flatMap(s => s.weakTopics || [])
  )).slice(0, 3);

  // Gather urgent revision items (urgencyScore > 50)
  const urgentRevItems = (revisionItems || [])
    .filter(item => item.urgencyScore > 50)
    .slice(0, 3);

  // Combine them into a single list of priorities (up to 3 items)
  const priorities: {
    title: string;
    description: string;
    actionLabel: string;
    actionView: string;
    badgeColor: string;
  }[] = [];

  // Add urgent revision items
  urgentRevItems.forEach(item => {
    priorities.push({
      title: item.topic,
      description: `${t('Memory decay imminent', 'ভুলে যাওয়ার আশঙ্কা')} (${t('Urgency', 'জরুরিতা')}: ${item.urgencyScore}%) · ${item.subject}`,
      actionLabel: t('Review', 'রিভিশন'),
      actionView: 'revision',
      badgeColor: 'bg-yellow-400'
    });
  });

  // Add exam weak topics
  examWeakTopics.forEach(topic => {
    // Avoid duplicates
    if (!priorities.some(p => p.title === topic)) {
      priorities.push({
        title: topic,
        description: t('Identified as weak area in your recent exam', 'সাম্প্রতিক পরীক্ষায় দুর্বলতা হিসেবে চিহ্নিত'),
        actionLabel: t('Tutor', 'টিউটর'),
        actionView: 'tutor',
        badgeColor: 'bg-rose-400 animate-pulse'
      });
    }
  });

  const activePriorities = priorities.slice(0, 3);
  
  return (
    <div className="space-y-8 animate-fadeIn text-slate-100 text-left">
      
      {/* Top Welcome Panel */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none" />

        {/* Left: avatar + text */}
        <div className="flex items-center gap-4">
          <DashAvatar photoURL={photoURL} name={displayName} />

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest bg-cyan-950 text-cyan-300 border border-cyan-800/30 px-2.5 py-1 rounded">
                {profile.archetype.toUpperCase()}
              </span>
              <span className="text-xs text-yellow-500 font-mono flex items-center gap-1">
                💧 {profile.streak} {t('Days Active Streak', 'দিন সক্রিয়তার ধারা')}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {t('Assalamu Alaikum,', 'আসসালামু আলাইকুম,')} <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">{displayName}</span>
            </h2>
            {email && (
              <p className="text-slate-500 text-xs flex items-center gap-1.5">
                <Mail className="w-3 h-3" />{email}
              </p>
            )}
            <p className="text-slate-400 text-xs md:text-sm">
              {t('Targeting the', 'টার্গেট:')} <strong className="text-white">{profile.targetYear} {profile.examType} Exam</strong> · {profile.district} {t('District', 'জেলা')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold leading-tight">{t('National Predicted Rank', 'জাতীয় সম্ভাব্য র‍্যাঙ্ক')}</span>
            <span className="text-xl font-mono font-black text-rose-400">#{profile.predictedRank.toLocaleString()}</span>
            <span className="text-[9px] text-slate-500 block leading-none">{t(`out of ${profile.totalStudents.toLocaleString()}`, `মোট ${profile.totalStudents.toLocaleString()} জনের মধ্যে`)}</span>
          </div>
          <div className="w-[1px] h-10 bg-slate-800" />
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold leading-tight">{t('Passing Probability', 'উত্তীর্ণের সম্ভাবনা')}</span>
            <span className="text-xl font-mono font-black text-emerald-400">{profile.passingProbability}%</span>
            <span className="text-[9px] text-slate-500 block leading-none">{t('AI Confidence Index', 'এআই আত্মবিশ্বাস সূচক')}</span>
          </div>
        </div>
      </motion.header>

      {/* Grid of Key AI Readiness Scores & Heatmap Trigger */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* AI Readiness radial dial component (Left) */}
        <div className="md:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{t('AI Readiness Standing', 'এআই প্রস্তুতি স্ট্যাটাস')}</h3>
              <p className="text-xs text-slate-500">{t('Aggregate syllabus mastery level', 'সিলেবাস আয়ত্ত করার সামগ্রিক হার')}</p>
            </div>
            <span className="p-1.5 bg-cyan-950/40 rounded-lg border border-cyan-800/30 text-cyan-400">
              <Brain className="w-4 h-4" />
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            {/* Visual Dial representation */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="58" stroke="#0f172a" strokeWidth="12" fill="transparent" />
                <circle cx="72" cy="72" r="58" stroke="url(#cyanIndigoGradient)" strokeWidth="12" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 58}
                        strokeDashoffset={2 * Math.PI * 58 * (1 - profile.readinessScore / 100)}
                        strokeLinecap="round" />
                <defs>
                  <linearGradient id="cyanIndigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-mono font-black tracking-tight text-white">{profile.readinessScore}<span className="text-xs text-slate-500 font-normal">%</span></span>
                <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-mono">{t('Cadre Ready', 'প্রস্তুত')}</span>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 leading-relaxed max-w-xs">
              {examSessions && examSessions.length > 0 ? (
                (() => {
                  const weakSubjects = Array.from(new Set(examSessions.flatMap(s => s.weakTopics || []))).slice(0, 2);
                  if (weakSubjects.length > 0) {
                    return t(
                      `Focus on improving your weak areas: ${weakSubjects.join(', ')}. Keep practicing to optimize your national percentile standing.`,
                      `আপনার দুর্বল বিষয়গুলোতে মনোযোগ দিন: ${weakSubjects.join(', ')}। আপনার জাতীয় পার্সেন্টাইল বাড়াতে অনুশীলন চালিয়ে যান।`
                    );
                  }
                  return t(
                    'Excellent overall performance. Keep taking exams to maintain your high readiness rating.',
                    'চমৎকার সামগ্রিক পারফরম্যান্স। আপনার উচ্চ প্রস্তুতি ধরে রাখতে পরীক্ষা চালিয়ে যান।'
                  );
                })()
              ) : (
                t(
                  'Complete your first diagnostic or practice exam to receive customized AI study advice and performance metrics.',
                  'আপনার প্রথম ডায়াগনস্টিক বা প্র্যাকটিস পরীক্ষাটি সম্পন্ন করুন কাস্টমাইজড এআই পরামর্শ এবং পারফরম্যান্স মেট্রিক্স পেতে।'
                )
              )}
            </p>
          </div>

          <button 
            onClick={onQuickPractice}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs uppercase hover:scale-[1.01] active:opacity-90 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            {t('Launch Smart MCQ Test', 'স্মার্ট এমসিকিউ টেস্ট শুরু')} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dashboard Center - Weakness checklist & smart mission modules */}
        <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{t('Active Learning Priorities', 'গুরুত্বপূর্ণ পড়ার বিষয়সমূহ')}</h3>
              <p className="text-xs text-slate-500">{t('Urgent syllabus objectives prioritized by AI', 'এআই দ্বারা নির্ধারিত সিলেবাসের অংশ')}</p>
            </div>
            <span className="p-1.5 bg-yellow-950/40 rounded-lg border border-yellow-800/30 text-yellow-400">
              <Zap className="w-4 h-4" />
            </span>
          </div>

          {/* Checklist queue */}
          <div className="space-y-3 flex-1 py-1">
            {activePriorities.length > 0 ? (
              activePriorities.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${item.badgeColor}`}></span>
                    <div className="text-xs">
                      <span className="font-semibold block text-slate-200">{item.title}</span>
                      <span className="text-slate-400 block text-[10px]">{item.description}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (item.actionView === 'revision') {
                        onNavigate('revision');
                      } else if (item.actionView === 'tutor') {
                        onNavigate('tutor');
                      } else {
                        onQuickPractice();
                      }
                    }}
                    className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold hover:underline cursor-pointer"
                  >
                    {item.actionLabel}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-slate-950/40 rounded-xl border border-dashed border-slate-800 text-center space-y-2">
                <Brain className="w-8 h-8 text-slate-700 mx-auto" />
                <div className="text-xs">
                  <p className="font-semibold text-slate-400">{t('No Active Gaps Found', 'কোনো সক্রিয় দুর্বলতা নেই')}</p>
                  <p className="text-[10px] text-slate-500 max-w-[220px] mx-auto mt-0.5">
                    {t('Complete a practice exam to identify learning priorities.', 'পড়ার অগ্রাধিকারসমূহ নির্ধারণ করতে একটি প্র্যাকটিস পরীক্ষা সম্পন্ন করুন।')}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 p-3 bg-indigo-950/30 border border-indigo-900/30 rounded-xl text-xs text-indigo-350">
            <Award className="w-4 h-4 flex-shrink-0" />
            <span>{t('Completing these items lifts predicted ranking by ~140 positions.', 'এই বিষয়গুলো শেষ করলে আপনার র‍্যাঙ্ক আনুমানিক ১৪০ ধাপ এগিয়ে যাবে।')}</span>
          </div>
        </div>

        {/* Upcoming job circular and career tracking widgets (Right) */}
        <div className="md:col-span-3 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('Exam Registry Tracker', 'পরীক্ষা ট্র্যাকার')}</h3>
              <span className="text-[10px] bg-indigo-900/40 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800/40 font-mono">CALENDAR</span>
            </div>
            <p className="text-xs text-slate-500">{t('Deadlines and countdown trackers', 'শেষ সময় ট্র্যাকার')}</p>
          </div>

          {/* Quick Circular timeline summary */}
          <div className="space-y-3 flex-1 py-2">
            {upcomingCirculars.slice(0, 2).map((job) => (
              <div key={job.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1 text-xs">
                <div className="flex justify-between items-start font-medium text-slate-200">
                  <span className="truncate pr-1 block font-semibold">{job.title}</span>
                  <span className="text-[10px] text-rose-500 font-mono font-medium flex-shrink-0 bg-rose-950/20 px-1.5 py-0.5 rounded">
                    {job.countdownDays}{t('d left', 'দিন বাকি')}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{job.organization}</span>
                  <span>{job.vacancyCount.toLocaleString()} {t('Vacancies', 'টি পদ')}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onNavigate('career')}
            className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-semibold hover:text-white text-slate-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            {t('View Career Timeline', 'টাইমলাইন দেখুন')} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Memory Spaced Repetition Block Alerts */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-slate-900 to-indigo-950/20 border border-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 rounded-xl">
            <RefreshCw className="w-6 h-6 animate-spin duration-3000" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{t('Spaced Memory Curve Trigger', 'মেমোরি রিভিশন এলার্ট')}</h4>
            <p className="text-xs text-slate-400">
              {urgentRevisions.length > 0 ? (
                t(
                  `There are ${urgentRevisions.length} critical syllabus subjects scheduled for forgetting reviews today. Keep your streak optimized!`,
                  `আজকে মেমোরি রিভিশন কিউতে ${urgentRevisions.length}টি বিষয় রিভিশন দেওয়ার কথা। রিভিশন দিয়ে আপনার স্ট্রিক বজায় রাখুন!`
                )
              ) : (
                t(
                  'Your memory retention is fully optimized! No urgent topics scheduled for review today.',
                  'আপনার মেমোরি রিটেনশন সম্পূর্ণ অপ্টিমাইজড! আজ রিভিশন দেওয়ার জন্য কোনো জরুরি বিষয় নেই।'
                )
              )}
            </p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('revision')}
          className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs uppercase flex items-center gap-1 cursor-pointer transition-colors"
        >
          {t('Open Revision Queue', 'রিভিশন কিউ খুলুন')} <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </button>
      </div>

    </div>
  );
}
