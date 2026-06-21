import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Sparkles, Award, ArrowRight, Brain, AlertTriangle,
  RefreshCw, TrendingUp, Compass, Users,
  BookOpen, Star, CheckCircle2, Shield, Zap, Target, Clock
} from 'lucide-react';
import { ExamType, Question } from '../types';
import { useLanguage } from '../lib/LanguageContext';

interface LandingPageProps {
  onStartOnboarding: (selectedExam: ExamType) => void;
  user: any;
  onOpenAuth: () => void;
  onGoToDashboard: () => void;
  onViewChange?: (view: string) => void;
}

// ─── Scroll-triggered section fade-up wrapper ───────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 3D Tilt card ────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => { x.set(0.5); y.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      className={`relative group rounded-3xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated count-up number ────────────────────────────────────────────────
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

export default function LandingPage({ onStartOnboarding, user, onOpenAuth, onGoToDashboard }: LandingPageProps) {
  const { language, t } = useLanguage();
  const [selectedExam, setSelectedExam] = useState<ExamType>('BCS');
  const [expectedScore, setExpectedScore] = useState<number>(65);
  const [estimatedRank, setEstimatedRank] = useState<string>('3,200 - 4,500');
  const [scoreProbability, setScoreProbability] = useState<number>(55);
  const [demoState, setDemoState] = useState<'question' | 'answered'>('question');
  const [selectedDemoAnswer, setSelectedDemoAnswer] = useState<number | null>(null);
  const [demoFeedback, setDemoFeedback] = useState<string>('');

  // Exam types for Bangladesh job exams only
  const examTypes: { id: ExamType; label: string; labelBn: string }[] = [
    { id: 'BCS', label: 'BCS Cadre', labelBn: 'বিসিএস ক্যাডার' },
    { id: 'BankAD', label: 'Bangladesh Bank AD', labelBn: 'বাংলাদেশ ব্যাংক এডি' },
    { id: 'GovtJob', label: '9th Grade Jobs', labelBn: '৯ম গ্রেড জব' },
  ];

  const sampleDemoQuestion: Question = {
    id: 'demo-q1',
    text: 'সংবিধানের কোন অনুচ্ছেদ অনুযায়ী বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) গঠিত হয় এবং এর সদস্য মেয়াদ কত বছর?',
    options: ['১৩৭ নং অনুচ্ছেদ, ৫ বছর', '১৪০ নং অনুচ্ছেদ, ৪ বছর', '১৩৫ নং অনুচ্ছেদ, ৫ বছর', '১৩৮ নং অনুচ্ছেদ, ৬ বছর'],
    correctIndex: 0,
    subject: 'Bangladesh Constitution',
    topic: 'Article 137',
    difficulty: 'Medium',
  };

  useEffect(() => {
    if (expectedScore > 85) { setEstimatedRank('12 - 250'); setScoreProbability(98); }
    else if (expectedScore > 75) { setEstimatedRank('251 - 1,200'); setScoreProbability(89); }
    else if (expectedScore > 65) { setEstimatedRank('1,201 - 4,500'); setScoreProbability(74); }
    else if (expectedScore > 50) { setEstimatedRank('4,501 - 18,000'); setScoreProbability(48); }
    else { setEstimatedRank('18,001 - 45,000'); setScoreProbability(22); }
  }, [expectedScore]);

  const handleDemoAnswer = (idx: number) => {
    setSelectedDemoAnswer(idx);
    setDemoState('answered');
    setDemoFeedback(
      idx === sampleDemoQuestion.correctIndex
        ? 'সঠিক উত্তর! অনুচ্ছেদ ১৩৭ অনুযায়ী BPSC গঠিত। আপনার প্রজেক্টেড র‍্যাংক ৩২০ ধাপ এগিয়েছে!'
        : 'ভুল উত্তর। সংবিধানের ১৩৭ অনুচ্ছেদ সঠিক। এই দুর্বলতা স্পেসড রিভিশনে যুক্ত করা হয়েছে।'
    );
  };

  const springVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative pt-10 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -top-16 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column */}
          <div className="lg:col-span-7 space-y-8">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-950/60 border border-cyan-800/40 rounded-full text-[11px] font-mono text-cyan-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t('Bangladesh\'s First AI Job Exam OS', 'বাংলাদেশের প্রথম এআই চাকরি পরীক্ষা ওএস')}
            </motion.div>

            {/* Exam selector pill strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative inline-flex p-1 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800 gap-1"
            >
              {examTypes.map((exam) => (
                <button
                  key={exam.id}
                  onClick={() => setSelectedExam(exam.id)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer z-10 ${
                    selectedExam === exam.id ? 'text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {selectedExam === exam.id && (
                    <motion.span
                      layoutId="exam-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(exam.label, exam.labelBn)}</span>
                </button>
              ))}
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              >
                {language === 'bn' ? (
                  <>অন্ধভাবে পড়া বন্ধ করুন।<br /><span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">বৈজ্ঞানিকভাবে</span><br />র‍্যাংক নিশ্চিত করুন।</>
                ) : (
                  <>Stop Studying<br /><span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Blindly.</span><br />Engineer Your Rank.</>
                )}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed"
              >
                {t(
                  `RankFlow AI models your memory decay curves, predicts your national rank in real-time, and delivers adaptive revision queues built for ${selectedExam === 'BCS' ? 'BCS Cadre' : selectedExam === 'Bank' ? 'Bangladesh Bank AD' : '9th Grade'} aspirants.`,
                  `র‍্যাঙ্কফ্লো এআই আপনার মেমোরি ডিকে কার্ভ বিশ্লেষণ করে, রিয়েল-টাইম জাতীয় র‍্যাংক পূর্বাভাস দেয়, এবং ${selectedExam === 'BCS' ? 'বিসিএস ক্যাডার' : selectedExam === 'Bank' ? 'বাংলাদেশ ব্যাংক এডি' : '৯ম গ্রেড'} পরীক্ষার জন্য স্মার্ট রিভিশন সিডিউল তৈরি করে।`
                )}
              </motion.p>
            </div>

            {/* Rank Predictor Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 animate-pulse" />
                  {t('Live Rank Simulator', 'লাইভ র‍্যাংক সিমুলেটর')}
                </span>
                <span className="text-[10px] text-slate-500">{t('Based on 200,000+ candidate data', '২ লাখ+ প্রার্থীর তথ্য বিশ্লেষণ')}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">{t('Target Score Rate', 'টার্গেট স্কোর হার')}</span>
                    <span className="font-mono text-cyan-400 font-bold">{expectedScore}%</span>
                  </div>
                  <input
                    type="range" min="30" max="100" value={expectedScore}
                    onChange={(e) => setExpectedScore(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 rounded-full bg-slate-800 appearance-none cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">{t('Slide to see projected rank', 'স্লাইড করুন প্রজেক্টেড র‍্যাংক দেখতে')}</p>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 grid grid-cols-2 gap-3 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">{t('Predicted Rank', 'প্রজেক্টেড র‍্যাংক')}</span>
                    <span className="text-base font-mono font-bold text-white tracking-tight">{estimatedRank}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">{t('Pass Probability', 'উত্তীর্ণের সম্ভাবনা')}</span>
                    <span className={`text-base font-mono font-bold tracking-tight ${scoreProbability > 70 ? 'text-emerald-400' : scoreProbability > 40 ? 'text-yellow-400' : 'text-rose-400'}`}>
                      {scoreProbability}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => user ? onStartOnboarding(selectedExam) : onOpenAuth()}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold shadow-xl shadow-cyan-500/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                {user ? t('Start AI Diagnostic', 'ডায়াগনস্টিক শুরু') : t('Start Free — No Card Needed', 'ফ্রি শুরু করুন')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                href="#demo"
                className="px-6 py-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/70 transition-all font-semibold text-center text-slate-300 flex items-center justify-center gap-2"
              >
                {t('Try Interactive Demo', 'ডেমো ট্রায়াল দেখুন')}
              </motion.a>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 text-xs text-slate-500"
            >
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-cyan-400" />{t('BPSC Mock Standards', 'বিপিএসসি মানসম্পন্ন')}</span>
              <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-indigo-400" />{t('Adaptive Mastery', 'অ্যাডাপটিভ মাস্টারি')}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" />{t('64 Districts Covered', '৬৪ জেলায় কভারেজ')}</span>
            </motion.div>
          </div>

          {/* Right column — Dashboard preview card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-600 opacity-15 blur-xl" />
              <div className="relative p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono text-slate-400">{t('MEMBERSHIP INTELLIGENCE OS', 'মেম্বারশিপ ইন্টেলিজেন্স ওএস')}</span>
                  <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono border border-cyan-800/30">{t('BCS PRE COMPLETED', 'বিসিএস প্রি সম্পন্ন')}</span>
                </div>
                {/* Progress bars */}
                <div className="space-y-3 font-mono text-xs text-slate-400">
                  {[
                    { label: t('Bengali Language', 'বাংলা ভাষা'), pct: 82, color: 'from-cyan-500 to-indigo-500' },
                    { label: t('International Affairs', 'আন্তর্জাতিক বিষয়'), pct: 51, color: 'from-yellow-500 to-amber-500' },
                    { label: t('Mathematical Reasoning', 'গাণিতিক যুক্তি'), pct: 91, color: 'from-emerald-500 to-cyan-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.label}</span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="text-cyan-400"
                        >{item.pct}%</motion.span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ delay: 0.7 + i * 0.15, duration: 0.9, ease: 'easeOut' }}
                          className={`bg-gradient-to-r ${item.color} h-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
                    <span className="text-xs text-slate-400">{t('Memory decay estimate:', 'মেমোরি ডিকে হিসাব:')}</span>
                  </div>
                  <span className="text-xs text-rose-300 font-bold font-mono bg-rose-950/30 px-2 py-1 border border-rose-900/30 rounded">
                    {t('Review in 4h', '৪ ঘণ্টায় রিভিশন')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Platform Status Numbers */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 8432, suffix: '+', label: t('Active Preparers', 'সক্রিয় পরীক্ষার্থী') },
            { value: 125000, suffix: '+', label: t('Questions Attempted', 'প্রশ্ন অনুশীলন') },
            { value: 64, suffix: '', label: t('Districts Covered', 'জেলায় কভারেজ') },
            { value: 99, suffix: '%', label: t('Uptime', 'আপটাইম') },
          ].map((stat, i) => (
            <div key={i}>
              <FadeUp delay={i * 0.08}>
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-extrabold font-mono text-white">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 sm:px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-800/30">
              {t('Core Features', 'মূল ফিচারসমূহ')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t("Built for Bangladesh's Toughest Exams", 'বাংলাদেশের কঠিনতম পরীক্ষার জন্য তৈরি')}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t(
                'Every module is engineered around the BCS, Bangladesh Bank AD, and 9th Grade exam syllabi — not generic study tools.',
                'প্রতিটি মডিউল বিসিএস, বাংলাদেশ ব্যাংক এডি, এবং ৯ম গ্রেড পরীক্ষার সিলেবাস অনুযায়ী ডিজাইন করা হয়েছে।'
              )}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                color: 'from-cyan-500/20 to-cyan-500/5',
                border: 'border-cyan-800/30',
                iconColor: 'text-cyan-400',
                title: t('Memory Decay Engine', 'মেমোরি ডিকে ইঞ্জিন'),
                desc: t(
                  'Forgetting curves identify when you\'ll lose topics and auto-schedule spaced revision before memory lapses.',
                  'ভুলে যাওয়ার গাণিতিক সূত্র ধরে স্বয়ংক্রিয়ভাবে রিভিশন সিডিউল তৈরি করে।'
                ),
              },
              {
                icon: Target,
                color: 'from-indigo-500/20 to-indigo-500/5',
                border: 'border-indigo-800/30',
                iconColor: 'text-indigo-400',
                title: t('National Rank Predictor', 'জাতীয় র‍্যাংক পূর্বাভাস'),
                desc: t(
                  'Cross-analyze your mock scores with 200,000+ historical BCS candidates to get your exact national percentile.',
                  '২ লাখেরও বেশি বিসিএস প্রার্থীর ডেটার সাথে তুলনা করে আপনার সঠিক জাতীয় পার্সেন্টাইল নির্ণয় করে।'
                ),
              },
              {
                icon: Zap,
                color: 'from-emerald-500/20 to-emerald-500/5',
                border: 'border-emerald-800/30',
                iconColor: 'text-emerald-400',
                title: t('Adaptive MCQ Engine', 'অ্যাডাপটিভ এমসিকিউ ইঞ্জিন'),
                desc: t(
                  'Questions auto-scale in difficulty based on your rolling accuracy — keeping you always in the learning zone.',
                  'আপনার রোলিং অ্যাকুরেসির ভিত্তিতে প্রশ্নের কঠিনতা স্বয়ংক্রিয়ভাবে পরিবর্তন হয়।'
                ),
              },
              {
                icon: BookOpen,
                color: 'from-purple-500/20 to-purple-500/5',
                border: 'border-purple-800/30',
                iconColor: 'text-purple-400',
                title: t('Written Evaluator AI', 'লিখিত উত্তর মূল্যায়ন এআই'),
                desc: t(
                  'Upload a photo of your handwritten answer sheet. Get OCR-powered scores in under 5 seconds.',
                  'হাতের লেখার ছবি আপলোড করুন। মাত্র ৫ সেকেন্ডে ওসিআর-চালিত স্কোর পান।'
                ),
              },
              {
                icon: Clock,
                color: 'from-amber-500/20 to-amber-500/5',
                border: 'border-amber-800/30',
                iconColor: 'text-amber-400',
                title: t('Career OS — Circular Tracker', 'ক্যারিয়ার ওএস — সার্কুলার ট্র্যাকার'),
                desc: t(
                  'Never miss a BPSC circular. Deadlines, admit cards, and syllabus overviews — all in one dashboard.',
                  'বিপিএসসি সার্কুলার মিস করবেন না। ডেডলাইন, অ্যাডমিট কার্ড, সিলেবাস — সবকিছু এক জায়গায়।'
                ),
              },
              {
                icon: TrendingUp,
                color: 'from-rose-500/20 to-rose-500/5',
                border: 'border-rose-800/30',
                iconColor: 'text-rose-400',
                title: t('Cognitive Analytics', 'কগনিটিভ অ্যানালিটিক্স'),
                desc: t(
                  'Fatigue curves, guess rate analysis, subject mastery heatmaps, and accuracy trends in a live dashboard.',
                  'ক্লান্তি কার্ভ, গেস রেট, সাবজেক্ট মাস্টারি হিটম্যাপ লাইভ ড্যাশবোর্ডে।'
                ),
              },
            ].map((feat, i) => (
              <div key={i}>
                <FadeUp delay={i * 0.07}>
                  <TiltCard className={`bg-gradient-to-b ${feat.color} border ${feat.border} p-6 h-full space-y-4 shadow-lg`}>
                    <div className={`p-3 w-fit rounded-xl bg-slate-950/40 border ${feat.border}`}>
                      <feat.icon className={`w-5 h-5 ${feat.iconColor}`} />
                    </div>
                    <h3 className="text-base font-bold text-white">{feat.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                  </TiltCard>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DEMO ──────────────────────────────────────────────── */}
      <section id="demo" className="py-24 px-4 sm:px-6 border-t border-slate-900">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-12 space-y-4">
            <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest bg-indigo-950/40 px-2.5 py-1 rounded-full border border-indigo-800/30">
              {t('Interactive Trial', 'ইন্টারেক্টিভ ট্রায়াল')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('Experience the Intelligence', 'বুদ্ধিমত্তার অভিজ্ঞতা নিন')}
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              {t(
                'Answer one question. Watch your predicted national rank shift in real-time.',
                'একটি প্রশ্নের উত্তর দিন। দেখুন কিভাবে আপনার জাতীয় র‍্যাংক রিয়েল-টাইমে পরিবর্তন হয়।'
              )}
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-6 md:p-10 space-y-6 shadow-2xl shadow-cyan-950/20">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  {t('LIVE SIMULATION', 'লাইভ সিমুলেশন')}
                </span>
                <span className="text-cyan-400">Q-ID: {sampleDemoQuestion.id}</span>
              </div>

              <p className="text-base font-semibold leading-relaxed text-slate-200">
                {sampleDemoQuestion.text}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sampleDemoQuestion.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={demoState === 'question' ? { scale: 1.02, x: 4 } : {}}
                    whileTap={demoState === 'question' ? { scale: 0.98 } : {}}
                    disabled={demoState !== 'question'}
                    onClick={() => handleDemoAnswer(idx)}
                    className={`p-4 rounded-2xl text-left text-sm font-medium transition-all cursor-pointer ${
                      demoState === 'question'
                        ? 'bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300'
                        : idx === sampleDemoQuestion.correctIndex
                          ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300'
                          : selectedDemoAnswer === idx
                            ? 'bg-rose-950/80 border border-rose-500/60 text-rose-300'
                            : 'bg-slate-950/40 text-slate-500 border border-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{idx + 1}. {opt}</span>
                      {demoState !== 'question' && idx === sampleDemoQuestion.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {demoState === 'answered' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/20 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-200">{demoFeedback}</p>
                        <button
                          onClick={() => { setDemoState('question'); setSelectedDemoAnswer(null); setDemoFeedback(''); }}
                          className="text-xs text-cyan-400 hover:underline font-mono inline-flex items-center gap-1 mt-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          {t('Try Again', 'আবার চেষ্টা করুন')}
                        </button>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 items-center justify-between text-xs text-slate-400 font-mono">
                      <span>{t('Subject:', 'বিষয়:')} <strong className="text-white">{sampleDemoQuestion.subject}</strong></span>
                      <span className={selectedDemoAnswer === sampleDemoQuestion.correctIndex ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {selectedDemoAnswer === sampleDemoQuestion.correctIndex ? '▲ +320 rank positions' : '▼ −740 rank positions'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp className="space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/50 px-3 py-1 rounded-full border border-indigo-900/40">
              {t('Social Proof', 'সফলতার প্রমাণ')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('How Top Cadres Are Engineered Across 64 Districts', '৬৪ জেলায় ভবিষ্যৎ ক্যাডাররা যেভাবে প্রস্তুত হচ্ছেন')}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t(
                'RankFlow AI monitors the top talent pools from Dhaka University, BUET, and elite colleges. With localized cohort clusters, you know exactly where you stand.',
                'র‍্যাঙ্কফ্লো এআই ঢাকা বিশ্ববিদ্যালয়, বুয়েট এবং শীর্ষ কলেজের মেধাবীদের সাথে তুলনা করে আপনার প্রকৃত অবস্থান জানায়।'
              )}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t('Median Mock Accuracy', 'মিডিয়ান অ্যাকুরেসি'), value: '71.4%', color: 'text-cyan-400' },
                { label: t('Revision Adherence', 'রিভিশন পালন হার'), value: '89.2%', color: 'text-emerald-400' },
              ].map((s, i) => (
                <div key={i} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-500 font-mono block">{s.label}</span>
                  <span className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold">{t('Simulated National Weekly Board', 'সিমুলেটেড জাতীয় সাপ্তাহিক বোর্ড')}</h4>
                <span className="text-xs text-cyan-400 font-mono">{t('Elite Segment', 'এলিট বিভাগ')}</span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                {[
                  { rank: 1, name: 'Sajidul Islam', ins: 'BUET, EE', accuracy: '94.2%', dist: 'Dhaka' },
                  { rank: 2, name: 'Anika Rahman', ins: 'DU, Law', accuracy: '91.8%', dist: 'Mymensingh' },
                  { rank: 3, name: 'Tanzir Ahmed', ins: 'DMC, MBBS', accuracy: '90.5%', dist: 'Chittagong' },
                  { rank: 4, name: 'Farhan Kabir', ins: 'IBA, BBA', accuracy: '89.1%', dist: 'Sylhet' },
                ].map((usr, i) => (
                  <motion.div
                    key={usr.rank}
                    custom={i}
                    variants={springVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-950 transition-colors border border-transparent hover:border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 flex items-center justify-center rounded-full font-bold text-[10px] ${
                        usr.rank === 1 ? 'bg-amber-400 text-slate-950' : usr.rank === 2 ? 'bg-slate-300 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>{usr.rank}</span>
                      <div>
                        <span className="text-slate-200 block font-sans font-medium text-sm">{usr.name}</span>
                        <span className="text-[10px] text-slate-500">{usr.ins} · {usr.dist}</span>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold">{usr.accuracy}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 border-t border-slate-900">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest bg-indigo-950/40 px-2.5 py-1 rounded-full border border-indigo-800/30">
              {t('Comparisons', 'পার্থক্য')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('Why RankFlow Outperforms Alternatives', 'কেন র‍্যাঙ্কফ্লো অনন্য')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 p-5 border-b border-slate-800 font-mono text-[9px] sm:text-xs text-slate-500 uppercase font-bold">
                <div>{t('Feature', 'ফিচার')}</div>
                <div>{t('Coaching Centers', 'সাধারণ কোচিং')}</div>
                <div className="text-cyan-400">{t('RankFlow AI', 'র‍্যাঙ্কফ্লো এআই')}</div>
              </div>
              <div className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                {[
                  { f: t('Adaptive Tests', 'অ্যাডাপটিভ টেস্ট'), old: t('Same for all', 'সবার জন্য একই'), next: t('Auto-scaling difficulty', 'স্বয়ংক্রিয় কঠিনতা পরিবর্তন') },
                  { f: t('Memory Tracking', 'মেমোরি ট্র্যাকিং'), old: t('None', 'কিছু নেই'), next: t('Spaced decay calculators', 'স্পেসড রিভিশন ক্যালকুলেটর') },
                  { f: t('Written Evaluation', 'লিখিত মূল্যায়ন'), old: t('7+ days manual', '৭+ দিনের প্রক্রিয়া'), next: t('OCR analysis in 5 seconds', '৫ সেকেন্ডে ওসিআর বিশ্লেষণ') },
                  { f: t('National Standing', 'জাতীয় র‍্যাংকিং'), old: t('Raw isolated scores', 'সাধারণ স্কোর'), next: t('National percentile forecast', 'জাতীয় পার্সেন্টাইল পূর্বাভাস') },
                  { f: t('AI Tutor', 'এআই টিউটর'), old: t('Static answer keys', 'স্ট্যাটিক উত্তরপত্র'), next: t('Bilingual step-by-step solutions', 'বাংলা ও ইংরেজিতে ধাপে ধাপে সমাধান') },
                ].map((row, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.07 }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(30,41,59,0.3)' }}
                    className="grid grid-cols-3 p-5 border-l-2 border-l-transparent hover:border-l-cyan-400 transition-all"
                  >
                    <div className="font-bold text-slate-200">{row.f}</div>
                    <div className="text-slate-500 pr-4">{row.old}</div>
                    <div className="text-cyan-300 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{row.next}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ABOUT / CTA ───────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-4 sm:px-6 border-t border-slate-900">
        <FadeUp className="max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full border border-indigo-500/10"
            />

            <div className="space-y-4 max-w-2xl mx-auto relative z-10">
              <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-800/30">
                {t('About RankFlow AI', 'র‍্যাঙ্কফ্লো এআই সম্পর্কে')}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t(
                  'Stop Studying Blindly. Engineer Your Success Path.',
                  'অন্ধভাবে পড়াশোনা বন্ধ করুন। বৈজ্ঞানিক উপায়ে সাফল্য নিশ্চিত করুন।'
                )}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t(
                  'RankFlow AI is built by engineers and educators who understand what it takes to crack Bangladesh\'s most competitive government exams. Every feature maps to a real pain point in the preparation journey.',
                  'র‍্যাঙ্কফ্লো এআই এমন ইঞ্জিনিয়ার ও শিক্ষকদের দ্বারা তৈরি যারা বাংলাদেশের সবচেয়ে প্রতিযোগিতামূলক সরকারি পরীক্ষার প্রস্তুতির প্রতিটি চ্যালেঞ্জ বোঝেন।'
                )}
              </p>
            </div>

            <div className="max-w-sm mx-auto relative z-10 space-y-4">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />{t('SECURE CONNECTION', 'নিরাপদ সংযোগ')}</span>
                <span className="text-cyan-400">{t('RankFlow Accounts', 'র‍্যাঙ্কফ্লো অ্যাকাউন্ট')}</span>
              </div>

              {user ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onStartOnboarding(selectedExam)}
                  className="w-full py-4 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-extrabold rounded-2xl text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  {t('Launch Onboarding Test', 'অনবোর্ডিং পরীক্ষা শুরু')}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenAuth}
                    className="w-full py-4 bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-500 text-slate-950 font-extrabold rounded-2xl text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    {t('Sign In / Create Free Account', 'সাইন ইন / ফ্রি অ্যাকাউন্ট তৈরি')}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <p className="text-center text-[10px] text-slate-500">
                    {t(
                      'Free tier — 20+ diagnostics and 5 revision runs daily. No credit card.',
                      'ফ্রি প্ল্যানে দৈনিক ২০+ প্রশ্ন ও ৫টি রিভিশন রান। কোনো ক্রেডিট কার্ড নেই।'
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-900 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-500">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="font-bold tracking-wider text-sm">{t('RANKFLOW AI', 'র‍্যাঙ্কফ্লো এআই')}</span>
            </div>
            <p className="leading-relaxed">
              {t(
                'The next-generation AI learning OS for BCS, Bangladesh Bank AD, and 9th Grade competitive exams.',
                'বিসিএস, বাংলাদেশ ব্যাংক এডি, এবং ৯ম গ্রেড চাকরি পরীক্ষার জন্য পরবর্তী প্রজন্মের এআই শিক্ষা ওএস।'
              )}
            </p>
          </div>
          <div>
            <h5 className="text-slate-300 font-semibold mb-3">{t('EXAMS SUPPORTED', 'সমর্থিত পরীক্ষাসমূহ')}</h5>
            <ul className="space-y-2">
              <li>{t('BCS MCQ Pre-Selection Engine', 'বিসিএস এমসিকিউ প্রি-সিলেকশন')}</li>
              <li>{t('Bangladesh Bank AD Preparation', 'বাংলাদেশ ব্যাংক এডি প্রস্তুতি')}</li>
              <li>{t('Senior Officer Exam Prep', 'সিনিয়র অফিসার পরীক্ষা প্রস্তুতি')}</li>
              <li>{t('9th Grade Government Jobs', '৯ম গ্রেড সরকারি চাকরি')}</li>
            </ul>
          </div>
          <div>
            <h5 className="text-slate-300 font-semibold mb-3">{t('SYSTEM MODULES', 'সিস্টেম মডিউলসমূহ')}</h5>
            <ul className="space-y-2">
              <li>{t('Adaptive MCQ Question Pool', 'অ্যাডাপটিভ এমসিকিউ পুল')}</li>
              <li>{t('Spaced Memory Revision', 'স্পেসড মেমোরি রিভিশন')}</li>
              <li>{t('Bilingual AI Tutor', 'দ্বিভাষিক এআই টিউটর')}</li>
              <li>{t('Written Answer Evaluator', 'লিখিত উত্তর মূল্যায়নকারী')}</li>
            </ul>
          </div>
          <div>
            <h5 className="text-slate-300 font-semibold mb-3">{t('TRUST & POLICIES', 'বিশ্বাস ও নীতিমালা')}</h5>
            <p className="leading-relaxed">
              {t(
                'Data models are private sandboxed structures. Rankings use BPSC national cohort guidelines. © 2026 RankFlow AI.',
                'ডেটা মডেল ব্যক্তিগত স্যান্ডবক্সড কাঠামো। র‍্যাংকিং বিপিএসসি জাতীয় কোহর্ট গাইডলাইন ব্যবহার করে। © ২০২৬ র‍্যাঙ্কফ্লো এআই।'
              )}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
