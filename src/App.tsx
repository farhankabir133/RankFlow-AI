import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Award, TrendingUp, RefreshCw, AlertTriangle, 
  MapPin, Brain, Calendar, Clock, ArrowRight, Zap, Target, BookOpen, 
  MessageSquare, BarChart, Settings, LogOut, FileText, UserCheck, CheckCircle2, User,
  ChevronDown, Menu, X, Globe
} from 'lucide-react';

import { UserProfile, RevisionSchedule, Circular, AnalyticsData, ExamType } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ExamEngine from './components/ExamEngine';
import AITutor from './components/AITutor';
import Analytics from './components/Analytics';
import MemoryRevision from './components/MemoryRevision';
import WrittenEvaluator from './components/WrittenEvaluator';
import CareerOS from './components/CareerOS';
import ProfileIdentity from './components/ProfileIdentity';
import { useAuth, defaultUserProfile } from './lib/AuthContext';
import { useLanguage } from './lib/LanguageContext';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useUserData } from './lib/useUserData';
import { saveExamSession, seedRevisionItemsFromSession, updateRevisionItem } from './lib/firestoreHelpers';

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [selectedExamType, setSelectedExamType] = useState<ExamType>('BCS');
  
  // Onboarding Setup State Form
  const [onboardName, setOnboardName]       = useState<string>('');
  const [onboardPhone, setOnboardPhone]     = useState<string>('');
  const [onboardDistrict, setOnboardDistrict] = useState<string>('Dhaka');
  const [diagnosticScore, setDiagnosticScore] = useState<number | null>(null);
  const [onboardStep, setOnboardStep]       = useState<number>(0);

  // Authentication
  const { user, profile: authProfile, signOutUser, updateUserProfile } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const profile = authProfile || defaultUserProfile;

  // ─── REAL-TIME FIRESTORE DATA ────────────────────────────────────────────────
  const { revisionItems, examSessions, analyticsData, analyticsSummary } = useUserData();

  // Static public BPSC circulars (not user-specific — sourced from BPSC public data)
  const upcomingCirculars: Circular[] = [
    {
      id: 'cir-bpsc-46',
      title: '46th BCS General Pre-Selection Circular',
      organization: 'Bangladesh Public Service Commission (BPSC)',
      vacancyCount: 3105,
      deadline: 'June 15, 2026',
      admitCardDate: 'August 20, 2026',
      countdownDays: Math.max(0, Math.ceil((new Date('2026-06-15').getTime() - Date.now()) / 86400000)),
      link: 'https://bpsc.teletalk.com.bd',
      syllabusOverview: [
        'Language & Comp (35 Marks): Phonetics, parts of speech, syntax.',
        'Bangla Literature (35 Marks): Ancient to modern literary works.',
        'Mathematical Reasoning (30 Marks): Algebra, geometry, analytical tests.',
      ],
    },
    {
      id: 'cir-bb-ad-2026',
      title: 'Bangladesh Bank Assistant Director 2026',
      organization: 'Bangladesh Bank',
      vacancyCount: 100,
      deadline: 'July 10, 2026',
      countdownDays: Math.max(0, Math.ceil((new Date('2026-07-10').getTime() - Date.now()) / 86400000)),
      link: 'https://erecruitment.bb.org.bd',
      syllabusOverview: [
        'Economics & Banking (40 Marks): Monetary policy, financial instruments.',
        'Mathematics & Analytical (30 Marks): Quantitative aptitude, data interpretation.',
        'English (30 Marks): Comprehension, grammar, writing.',
      ],
    },
  ];

  // Navigation state
  const [currentView,         setCurrentView]         = useState<string>('landing');
  const [activeTutorTopic,    setActiveTutorTopic]    = useState<string | undefined>(undefined);
  const [selectedExamMode,    setSelectedExamMode]    = useState<{ type: 'BCS' | 'Bank' | 'Custom'; role?: string }>({ type: 'BCS' });
  const [isMobileMenuOpen,    setIsMobileMenuOpen]    = useState<boolean>(false);

  // React to Auth State Changes
  const prevUserRef = useRef(user);
  useEffect(() => {
    if (user && !prevUserRef.current) {
      setCurrentView('dashboard');
    } else if (!user && prevUserRef.current) {
      setCurrentView('landing');
    }
    prevUserRef.current = user;
  }, [user]);

  // Ensure authenticated user cannot access landing/onboarding marketing views
  useEffect(() => {
    if (user && (currentView === 'landing' || currentView === 'onboarding')) {
      setCurrentView('dashboard');
    }
  }, [user, currentView]);

  const handleSetCurrentView = (view: string) => {
    let targetView = view;
    if (view === 'revision') targetView = 'memory-revision';
    if (view === 'career') targetView = 'career-os';

    if (!user && targetView !== 'landing' && targetView !== 'onboarding') {
      setIsAuthModalOpen(true);
      setCurrentView('landing');
      return;
    }

    setCurrentView(targetView);
  };

  // Spaced memory state and other analytics data now loaded dynamically via useUserData()

  // Onboarding trigger
  const handleStartOnboarding = (exam: ExamType) => {
    setSelectedExamType(exam);
    handleSetCurrentView('onboarding');
    setOnboardStep(1);
  };

  const handleFinishOnboarding = () => {
    // Sync onboarding details onto global Profile states in Firestore
    updateUserProfile({
      name: onboardName,
      phone: onboardPhone,
      examType: selectedExamType,
      district: onboardDistrict,
      readinessScore: diagnosticScore || 78,
      predictedRank: diagnosticScore ? Math.max(100, 1500 - (diagnosticScore * 12)) : 342,
    });
    handleSetCurrentView('dashboard');
  };

  // Simulated diagnostic assessment MCQs on onboarding screen
  const dummyDiagnosticMcq = {
    text: "চর্যাপদ ১৯১৬ সালে হরপ্রসাদ শাস্ত্রী কর্তৃক কোন প্রকাশনী থেকে প্রথম মুদ্রিত গ্রন্থাকারে প্রকাশিত হয়?",
    options: [
      "বঙ্গীয় সাহিত্য পরিষদ",
      "বাংলা একাডেমী",
      "শ্রীরামপুর মিশন প্রেস",
      "কলকাতা বিশ্ববিদ্যালয় প্রেস"
    ],
    correctIndex: 0
  };

  const selectDiagnosticOption = (idx: number) => {
    if (idx === dummyDiagnosticMcq.correctIndex) {
      setDiagnosticScore(85);
    } else {
      setDiagnosticScore(65);
    }
    setOnboardStep(3); // Go to final review step
  };

  const handleTriggerTutor = (subject: string, topic: string) => {
    setActiveTutorTopic(`${subject}: ${topic}`);
    setCurrentView('tutor');
  };

  // When exam completes — save to Firestore, seed revision items from weak topics
  const handleExamCompleted = async (results: {
    score: number;
    totalPossible: number;
    accuracy: number;
    percentile: number;
    weakTopics: string[];
    guessDetections: number;
    confidenceLevel: string;
  }) => {
    if (!user) return;
    try {
      await saveExamSession(user.uid, {
        examType:        profile.examType,
        title:           `${profile.examType} Practice Session`,
        score:           results.score,
        totalPossible:   results.totalPossible,
        accuracy:        results.accuracy,
        percentile:      results.percentile ?? 50,
        weakTopics:      results.weakTopics ?? [],
        strongTopics:    [],
        guessDetections: results.guessDetections ?? 0,
        durationSeconds: 0,
        completedAt:     Date.now(),
      });
      // Update predictedRank as well
      const nextRank = results.percentile 
        ? Math.max(12, Math.round((profile.predictedRank || 50000) * (1 - results.accuracy / 150))) 
        : (profile.predictedRank || 50000);
        
      await updateUserProfile({
        predictedRank: nextRank
      });
      // Seed weak topics into the revision queue
      if ((results.weakTopics ?? []).length > 0) {
        await seedRevisionItemsFromSession(user.uid, results.weakTopics, profile.examType);
      }
    } catch (err) {
      console.error('[handleExamCompleted]', err);
    }
  };

  // When a revision item is reviewed — update Firestore + award XP
  const handleReviewCompletedInDatabase = async (topicId: string, newRetention: number) => {
    if (!user) return;
    const nextXp    = profile.xp + 250;
    const nextLevel = nextXp >= profile.level * 5000 ? profile.level + 1 : profile.level;
    await updateUserProfile({ xp: nextXp, level: nextLevel });
    await updateRevisionItem(user.uid, topicId, {
      retentionProbability: newRetention,
      daysSinceLastReview:  0,
      urgencyScore:         Math.max(10, 100 - newRetention),
      nextScheduledDate:    new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    });
  };

  const sidebarItems = [
    { id: 'dashboard', label: t('Dashboard', 'ড্যাশবোর্ড'), icon: Target },
    { id: 'exam-engine', label: t('Exam Engine', 'পরীক্ষা ইঞ্জিন'), icon: Brain },
    { id: 'tutor', label: t('AI Tutor', 'এআই টিউটর'), icon: MessageSquare },
    { id: 'written-evaluator', label: t('Written Evaluator', 'লিখিত মূল্যায়ন'), icon: FileText },
    { id: 'analytics', label: t('Intel Analytics', 'মনস্তাত্ত্বিক গ্রাফ'), icon: BarChart },
    { id: 'memory-revision', label: t('Memory Revision', 'মেমোরি রিভিশন'), icon: RefreshCw },
    { id: 'career-os', label: t('Career OS', 'ক্যারিয়ার ওএস'), icon: Calendar },
    { id: 'profile', label: t('Profile Identity', 'প্রোফাইল সেটিংস'), icon: User },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-900">
        <Navbar currentView={currentView} setCurrentView={handleSetCurrentView} onOpenAuth={() => setIsAuthModalOpen(true)} />
        
        <main className="grow flex flex-col">
          <AnimatePresence mode="wait">
            {currentView === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 max-w-7xl mx-auto overflow-x-hidden"
              >
                <LandingPage 
                  onStartOnboarding={handleStartOnboarding} 
                  user={user}
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                  onGoToDashboard={() => handleSetCurrentView('dashboard')}
                  onViewChange={handleSetCurrentView}
                />
              </motion.div>
            )}

            {currentView === 'onboarding' && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 max-w-7xl mx-auto overflow-x-hidden"
              >
                <div className="flex items-center justify-center p-6 bg-slate-950 font-sans">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-400"></div>

                  <div className="max-w-md w-full bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none"></div>

                    <div className="flex items-center gap-2 justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
                        <span className="text-sm font-bold tracking-wider font-mono">ONBOARDING PREPARATION</span>
                      </div>
                      <span className="text-xs text-slate-500">Step {onboardStep} of 3</span>
                    </div>

                    {/* Step 1: User Profile Details */}
                    {onboardStep === 1 && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold">Personalize Learning Identity</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Set up your authentic metadata so that the BPSC simulated cohort ranking maps accurately.
                          </p>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="space-y-1">
                            <label className="text-slate-500 block uppercase font-mono font-bold">Aspirant Name</label>
                            <input 
                              type="text" 
                              value={onboardName}
                              onChange={(e) => setOnboardName(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 p-3 rounded-xl outline-none text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-500 block uppercase font-mono font-bold">Mobile authentication number</label>
                            <input 
                              type="tel" 
                              value={onboardPhone}
                              onChange={(e) => setOnboardPhone(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 p-3 rounded-xl outline-none text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-500 block uppercase font-mono font-bold">District / Division</label>
                            <select 
                              value={onboardDistrict}
                              onChange={(e) => setOnboardDistrict(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 p-3 rounded-xl outline-none text-white"
                            >
                              <option value="Dhaka">Dhaka Division</option>
                              <option value="Mymensingh">Mymensingh Division</option>
                              <option value="Chittagong">Chittagong Division</option>
                              <option value="Rajshahi">Rajshahi Division</option>
                              <option value="Sylhet">Sylhet Division</option>
                            </select>
                          </div>
                        </div>

                        <button 
                          onClick={() => setOnboardStep(2)}
                          className="w-full py-3 bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs uppercase hover:bg-cyan-300 transition-all flex items-center justify-center gap-1"
                        >
                          Continue to Diagnostic Assessment <ArrowRight className="w-4 h-4 text-slate-950" />
                        </button>
                      </div>
                    )}

                    {/* Step 2: Adaptive 1 MCQ Diagnostic */}
                    {onboardStep === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <span className="text-[9px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/20 font-mono tracking-widest font-bold inline-block">
                            AI READINESS ASSESSMENT TRIAL
                          </span>
                          <h3 className="text-base font-bold text-white">Quick Onboard Validation Question</h3>
                          <p className="text-xs text-slate-400 leading-normal">
                            Answer this sample question to approximate your starting national ranking.
                          </p>
                        </div>

                        <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-xs font-sans leading-relaxed text-slate-200">
                          {dummyDiagnosticMcq.text}
                        </div>

                        <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-300">
                          {dummyDiagnosticMcq.options.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => selectDiagnosticOption(idx)}
                              className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-cyan-400/50 rounded-xl text-left font-sans text-white"
                            >
                              {idx + 1}. {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Predictive Result and Dashboard sync */}
                    {onboardStep === 3 && (
                      <div className="space-y-5 text-center">
                        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl animate-bounce">
                          ✓
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-lg font-bold">Onboarding Complete</h3>
                          <p className="text-xs text-slate-400">
                            We've approximated your starting preparation health score based on national competitive data.
                          </p>
                        </div>

                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block font-mono">Aggressed Score</span>
                            <span className="text-xl font-mono font-bold text-cyan-400">{diagnosticScore}%</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block font-mono">Apprx Rank Bound</span>
                            <span className="text-xl font-mono font-bold text-rose-300">
                              #{diagnosticScore === 85 ? '12,500' : '45,210'}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={handleFinishOnboarding}
                          className="w-full py-3 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-1 hover:scale-[1.01] transition-transform"
                        >
                          Confirm and Launch Dashboard <ArrowRight className="w-4 h-4 text-slate-950" />
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer activeTab={currentView} setActiveTab={handleSetCurrentView} />

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onSuccess={() => setIsAuthModalOpen(false)} 
        />
      </div>
    );
  }

  // Authenticated Application Shell
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-40 w-full flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSetCurrentView('dashboard')}>
          <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-indigo-650 rounded-lg">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-bold tracking-tight text-white text-sm">{t('RankFlow AI', 'র‍্যাঙ্কফ্লো এআই')}</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Mobile language switch */}
          <button 
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-cyan-400 bg-slate-950/40 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'EN' : 'বাংলা'}</span>
          </button>
          
          <span className="text-[10px] text-yellow-500 font-mono">
            💧 {profile?.streak || 0} Streak
          </span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Sticky Left Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md h-screen sticky top-0 shrink-0">
        <div>
          {/* Logo / Title */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-indigo-650 rounded-lg">
              <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
            </div>
            <span className="font-extrabold tracking-tight text-white text-base flex flex-col">
              <span>{t('RankFlow AI', 'র‍্যাঙ্কফ্লো এআই')}</span>
              <span className="text-[10px] text-cyan-400 font-medium font-sans">{t('BCS & Bank AD OS', 'বিসিএস ও ব্যাংক এডি ওএস')}</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="py-6 px-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSetCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  currentView === item.id
                    ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.05)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <item.icon className={`w-4 h-4 ${currentView === item.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Profile Summary & Language Toggle */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3">
          <button 
            onClick={() => handleSetCurrentView('profile')}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900 transition-colors text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-inner group-hover:scale-105 transition-transform">
              <User className="w-4 h-4 text-slate-100" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold block text-slate-200 truncate group-hover:text-cyan-400 transition-colors">
                {profile?.name || 'Profile'}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono block">💧 {profile?.streak || 0} Streak</span>
            </div>
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-850 bg-slate-950 text-[10px] font-bold text-slate-450 hover:text-cyan-400 rounded-xl transition-colors cursor-pointer"
              title={t('Switch Language', 'ভাষা পরিবর্তন')}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'EN' : 'বাংলা'}</span>
            </button>
            <button 
              onClick={() => signOutUser()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold text-slate-450 hover:text-rose-400 rounded-xl hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('Log Out', 'লগ আউট')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 flex flex-col justify-between h-screen md:hidden"
            >
              <div>
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-indigo-650 rounded-lg">
                      <Sparkles className="w-4 h-4 text-slate-950" />
                    </div>
                    <span className="font-extrabold text-white text-sm">{t('RankFlow AI', 'র‍্যাঙ্কফ্লো এআই')}</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-850"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="py-4 px-3 space-y-1 overflow-y-auto">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleSetCurrentView(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                        currentView === item.id
                          ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/40'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${currentView === item.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3">
                <button 
                  onClick={() => {
                    handleSetCurrentView('profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                    <User className="w-4 h-4 text-slate-100" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold block text-slate-200 truncate">
                      {profile?.name || 'Profile'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono block">💧 {profile?.streak || 0} Streak</span>
                  </div>
                </button>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setLanguage(language === 'en' ? 'bn' : 'en');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-slate-800 bg-slate-950 text-xs font-bold text-slate-400 hover:text-cyan-400 rounded-xl transition-colors cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'EN' : 'বাংলা'}</span>
                  </button>
                  <button 
                    onClick={() => {
                      signOutUser();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-405 hover:text-rose-400 rounded-xl hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('Log Out', 'লগ আউট')}</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Workspace Main Area */}
      <main className="flex-1 min-h-screen p-4 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto md:max-w-none">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full font-sans animate-none"
            >
              <Dashboard 
                profile={profile} 
                revisionItems={revisionItems}
                examSessions={examSessions}
                upcomingCirculars={upcomingCirculars}
                onNavigate={handleSetCurrentView}
                onQuickPractice={() => {
                  handleSetCurrentView('exam-engine');
                  setSelectedExamMode({ type: 'BCS' });
                }}
              />
            </motion.div>
          )}

          {currentView === 'exam-engine' && (
            <motion.div
              key="exam-engine"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full font-sans animate-none"
            >
              <ExamEngine 
                examType={profile.examType}
                selectedExamMode={selectedExamMode}
                onExamCompleted={handleExamCompleted}
                onTriggerTutor={handleTriggerTutor}
              />
            </motion.div>
          )}

          {currentView === 'tutor' && (
            <motion.div
              key="tutor"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full font-sans animate-none"
            >
              <AITutor examType={profile.examType} initialTopic={activeTutorTopic} />
            </motion.div>
          )}

          {currentView === 'written-evaluator' && (
            <motion.div
              key="written-evaluator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full font-sans animate-none"
            >
              <WrittenEvaluator />
            </motion.div>
          )}

          {currentView === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full font-sans animate-none"
            >
              <Analytics analyticsData={analyticsData} profile={profile} analyticsSummary={analyticsSummary} onNavigate={handleSetCurrentView} />
            </motion.div>
          )}

          {currentView === 'memory-revision' && (
            <motion.div
              key="memory-revision"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full font-sans animate-none"
            >
              <MemoryRevision 
                items={revisionItems} 
                onReviewCompleted={handleReviewCompletedInDatabase} 
              />
            </motion.div>
          )}

          {currentView === 'career-os' && (
            <motion.div
              key="career-os"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full font-sans animate-none"
            >
              <CareerOS circulars={upcomingCirculars} />
            </motion.div>
          )}

          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full font-sans animate-none"
            >
              <ProfileIdentity profile={profile} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
