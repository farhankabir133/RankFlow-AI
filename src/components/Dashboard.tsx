import React from 'react';
import { 
  Sparkles, Award, TrendingUp, RefreshCw, AlertTriangle, 
  MapPin, Brain, Calendar, Clock, ArrowRight, Zap, Target, BookOpen, UserCheck
} from 'lucide-react';
import { UserProfile, RevisionSchedule, Circular } from '../types';

interface DashboardProps {
  profile: UserProfile;
  revisionItems: RevisionSchedule[];
  upcomingCirculars: Circular[];
  onNavigate: (section: string) => void;
  onQuickPractice: () => void;
}

export default function Dashboard({ 
  profile, 
  revisionItems, 
  upcomingCirculars, 
  onNavigate,
  onQuickPractice
}: DashboardProps) {
  
  // Filter for urgent, expiring memory revision gaps
  const urgentRevisions = revisionItems.filter(item => item.urgencyScore > 50).slice(0, 3);
  
  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      
      {/* Top Welcome Panel */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none"></div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest bg-cyan-950 text-cyan-300 border border-cyan-800/30 px-2.5 py-1 rounded">
              {profile.archetype.toUpperCase()}
            </span>
            <span className="text-xs text-yellow-500 font-mono flex items-center gap-1">
              💧 {profile.streak} Days Active Streak
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            আসসালামু আলাইকুম, <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">{profile.name}</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Targeting the <strong className="text-white">{profile.targetYear} {profile.examType} Exam</strong>. Currently in the 94th percentile in your district.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold leading-tight">National Predicted Rank</span>
            <span className="text-xl font-mono font-black text-rose-400">#{profile.predictedRank.toLocaleString()}</span>
            <span className="text-[9px] text-slate-500 block leading-none">out of {profile.totalStudents.toLocaleString()}</span>
          </div>
          <div className="w-[1px] h-10 bg-slate-800" />
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold leading-tight">Passing Probability</span>
            <span className="text-xl font-mono font-black text-emerald-400">{profile.passingProbability}%</span>
            <span className="text-[9px] text-slate-500 block leading-none">AI Confidence Index</span>
          </div>
        </div>
      </header>

      {/* Grid of Key AI Readiness Scores & Heatmap Trigger */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* AI Readiness radial dial component (Left) */}
        <div className="md:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">AI Readiness standing</h3>
              <p className="text-xs text-slate-500">Aggregate syllabus mastering level</p>
            </div>
            <span className="p-1.5 bg-cyan-950/40 rounded-lg border border-cyan-800/30 text-cyan-400">
              <Brain className="w-4 h-4" />
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            {/* Visual Dial representation */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer stroke shadow */}
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
                <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-mono">Cadre Ready</span>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 leading-relaxed max-w-xs">
              Your Math and Literature scores exceed 80% other candidates. Practice <strong className="text-yellow-400">International Studies</strong> to peak your score.
            </p>
          </div>

          <button 
            onClick={onQuickPractice}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs uppercase hover:scale-[1.01] active:opacity-90 transition-all flex items-center justify-center gap-1"
          >
            Launch Smart MCQ Test <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dashboard Center - Weakness checklist & smart mission modules */}
        <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Active Learning Priorities</h3>
              <p className="text-xs text-slate-500">Urgent syllabus objectives prioritized by AI</p>
            </div>
            <span className="p-1.5 bg-yellow-950/40 rounded-lg border border-yellow-800/30 text-yellow-400">
              <Zap className="w-4 h-4" />
            </span>
          </div>

          {/* Checklist queue */}
          <div className="space-y-3 flex-1 py-1">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                <div className="text-xs">
                  <span className="font-semibold block text-slate-200">International Affairs: Org Structures</span>
                  <span className="text-slate-500 block text-[10px]">Syllabus High yield (Estimated 4 questions missing in exams)</span>
                </div>
              </div>
              <button 
                onClick={onQuickPractice}
                className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold hover:underline"
              >
                Solve
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <div className="text-xs">
                  <span className="font-semibold block text-slate-200">Bangla Grammar: সন্ধি বিচ্ছেদ</span>
                  <span className="text-slate-500 block text-[10px]">Accuracy is currently sitting below median (48%)</span>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('tutor')}
                className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold hover:underline"
              >
                Tutor
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <div className="text-xs">
                  <span className="font-semibold block text-slate-200">English Literature: Modernist Writers</span>
                  <span className="text-slate-500 block text-[10px]">Memory decay imminent (Forgetting projection threshold: 14h)</span>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('revision')}
                className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold hover:underline"
              >
                Review
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-indigo-950/30 border border-indigo-900/30 rounded-xl text-xs text-indigo-300">
            <Award className="w-4 h-4 flex-shrink-0" />
            <span>Completing these items lifts predicted ranking by ~140 positions.</span>
          </div>
        </div>

        {/* Upcoming job circular and career tracking widgets (Right) */}
        <div className="md:col-span-3 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Exam Registry Tracker</h3>
              <span className="text-[10px] bg-indigo-900/40 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800/40 font-mono">CALENDAR</span>
            </div>
            <p className="text-xs text-slate-500">Deadlines and countdown trackers</p>
          </div>

          {/* Quick Circular timeline summary */}
          <div className="space-y-3 flex-1 py-2">
            {upcomingCirculars.slice(0, 2).map((job) => (
              <div key={job.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1 text-xs">
                <div className="flex justify-between items-start font-medium text-slate-200">
                  <span className="truncate pr-1 block font-semibold">{job.title}</span>
                  <span className="text-[10px] text-rose-500 font-mono font-medium flex-shrink-0 bg-rose-950/20 px-1.5 py-0.5 rounded">
                    {job.countdownDays}d left
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{job.organization}</span>
                  <span>{job.vacancyCount.toLocaleString()} Vacancies</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onNavigate('career')}
            className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-semibold hover:text-white text-slate-300 transition-colors flex items-center justify-center gap-1"
          >
            View Career Timeline <ArrowRight className="w-3.5 h-3.5" />
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
            <h4 className="text-sm font-semibold">Spaced Memory Curve Trigger</h4>
            <p className="text-xs text-slate-400">
              There are <strong className="text-white">{urgentRevisions.length} critical syllabus subjects</strong> scheduled for forgetting reviews today. Keep your streak optimized!
            </p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('revision')}
          className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs uppercase flex items-center gap-1 select-none"
        >
          Open Revision Queue <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </button>
      </div>

    </div>
  );
}
