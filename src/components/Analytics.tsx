import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line 
} from 'recharts';
import { Sparkles, Brain, Award, Clock, ArrowRight, ShieldAlert, TrendingUp } from 'lucide-react';
import { AnalyticsData, UserProfile } from '../types';
import { AnalyticsSummaryRecord } from '../lib/firestoreHelpers';
import { useLanguage } from '../lib/LanguageContext';

interface AnalyticsProps {
  analyticsData: AnalyticsData;
  profile: UserProfile;
  analyticsSummary: AnalyticsSummaryRecord | null;
  onNavigate?: (section: string) => void;
}

export default function Analytics({ analyticsData, profile, analyticsSummary, onNavigate }: AnalyticsProps) {
  const { t } = useLanguage();
  const hasData = analyticsSummary && analyticsSummary.totalExams > 0;

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100 relative">
      
      {/* Top statistical headers */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 flex-1 text-center md:text-left">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
            SYSTEM ANALYTICS HUB
          </span>
          <h2 className="text-2xl font-bold">Competitive Learning Intelligence Metrics</h2>
          <p className="text-xs text-slate-500 max-w-xl">
            Real time performance vectors cross analyzed against cohort milestones of the 45th BCS general pre examinations databases.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-auto">
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-center md:text-left">
            <span className="text-[10px] uppercase font-mono text-slate-500">{t('Median Accuracy', 'মিডিয়ান সঠিকতা')}</span>
            <span className="text-2xl font-mono font-bold block text-white mt-1">
              {analyticsSummary ? `${analyticsSummary.medianAccuracy}%` : 'N/A'}
            </span>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-center md:text-left">
            <span className="text-[10px] uppercase font-mono text-slate-500">{t('Consistency Quotient', 'ধারাবাহিকতা ভাগফল')}</span>
            <span className="text-2xl font-mono font-bold block text-emerald-400 mt-1">{profile.consistencyScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Charts bento grid */}
      <div className="relative">
        {!hasData && (
          <div className="absolute inset-x-0 top-12 z-20 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md rounded-3xl p-8 border border-slate-850 text-center space-y-4 shadow-2xl h-[500px]">
            <div className="p-4 bg-cyan-950/40 border border-cyan-800/20 text-cyan-400 rounded-full animate-pulse">
              <TrendingUp className="w-10 h-10" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-lg font-bold text-white">{t('Competitive Intelligence Locked', 'প্রতিযোগিতামূলক অ্যানালিটিক্স লক করা')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'Your cognitive mapping, subject mastery heatmap, rank trajectory and pacing metrics will unlock once you complete at least one mock exam.',
                  'আপনার কগনিটিভ ম্যাপিং, বিষয়ের দক্ষতা, র‍্যাঙ্ক ট্র্যাজেক্টরি এবং গতি সম্পর্কিত তথ্য দেখতে অন্তত একটি মক পরীক্ষা সম্পন্ন করুন।'
                )}
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('exam-engine')}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                {t('Launch Practice Exam', 'পরীক্ষা শুরু করুন')} <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${!hasData ? 'opacity-25 pointer-events-none filter blur-[2px]' : ''}`}>
          
          {/* Radar charts of Subject Mastery (Col span 5) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">{t('Syllabus Mastery Heatmap', 'সিলেবাস দক্ষতা হিটম্যাপ')}</h3>
              <p className="text-xs text-slate-500">{t('Target metrics vs median candidate capabilities', 'টার্গেট মেট্রিক্স বনাম সাধারণ প্রার্থীর ক্ষমতা')}</p>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analyticsData.subjectMastery}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                  <Radar name="My Score" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center gap-2 text-xs text-slate-400">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>
                {analyticsSummary && Object.keys(analyticsSummary.subjectAccuracy || {}).length > 0 ? (
                  (() => {
                    const sorted = Object.entries(analyticsSummary.subjectAccuracy).map(([name, val]) => ({
                      name,
                      accuracy: Math.round(val.total / Math.max(1, val.count))
                    })).sort((a, b) => b.accuracy - a.accuracy);
                    const strong = sorted[0];
                    const weak = sorted[sorted.length - 1];
                    if (strong.name === weak.name) {
                      return t(
                        `Your current subject accuracy sits at ${strong.accuracy}%. Keep practicing other topics.`,
                        `আপনার বর্তমান বিষয়ের সঠিকতার হার ${strong.accuracy}%। অন্যান্য বিষয়গুলো অনুশীলন করতে থাকুন।`
                      );
                    }
                    return t(
                      `Strongest area: ${strong.name} (${strong.accuracy}%). Prioritize: ${weak.name} (${weak.accuracy}%).`,
                      `সবচেয়ে শক্তিশালী বিষয়: ${strong.name} (${strong.accuracy}%)। গুরুত্ব দিন: ${weak.name} (${weak.accuracy}%)।`
                    );
                  })()
                ) : (
                  t('Awaiting mock exam session logs to generate detailed subject priorities.', 'বিষয়ের অগ্রাধিকার তৈরি করতে মক পরীক্ষার সেশনের জন্য অপেক্ষা করা হচ্ছে।')
                )}
              </span>
            </div>
          </div>

          {/* Predictive national rank curves (Col span 7) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">{t('National Predicted Rank Trajectory', 'জাতীয় সম্ভাব্য র‍্যাঙ্ক গতিপথ')}</h3>
                <p className="text-xs text-slate-500">{t('Daily rank progression indices (Lower is supreme)', 'দৈনিক র‍্যাঙ্ক উন্নতির সূচক (কম সংখ্যাটিই শ্রেষ্ঠ)')}</p>
              </div>
              {(() => {
                const rankHistory = analyticsSummary?.rankHistory || [];
                let rankDelta = 0;
                if (rankHistory.length >= 2) {
                  const prev = rankHistory[rankHistory.length - 2].rank;
                  const curr = rankHistory[rankHistory.length - 1].rank;
                  rankDelta = prev - curr;
                }
                if (rankDelta > 0) {
                  return (
                    <span className="text-[10px] text-emerald-450 font-bold font-mono bg-emerald-950/30 px-2 py-1 rounded">
                      ▲ {t(`Improved ${rankDelta} positions`, `${rankDelta} ধাপ উন্নত হয়েছে`)}
                    </span>
                  );
                } else if (rankDelta < 0) {
                  return (
                    <span className="text-[10px] text-rose-450 font-bold font-mono bg-rose-950/30 px-2 py-1 rounded">
                      ▼ {t(`Dropped ${Math.abs(rankDelta)} positions`, `${Math.abs(rankDelta)} ধাপ নিচে নেমেছে`)}
                    </span>
                  );
                } else {
                  return (
                    <span className="text-[10px] text-slate-400 font-bold font-mono bg-slate-950/40 px-2 py-1 rounded border border-slate-800">
                      ■ {t('Rank Stable', 'র‍্যাঙ্ক স্থিতিশীল')}
                    </span>
                  );
                }
              })()}
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.rankHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rankArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={9} />
                  <YAxis reversed stroke="#64748b" fontSize={9} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="rank" stroke="#6366f1" fillOpacity={1} fill="url(#rankArea)" name="Pred Rank" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-center text-[10px] text-slate-500 block font-mono">
              {t('X-Axis representing recent adaptive test dates. Y-Axis inverted to mock supreme ranks properly.', 'এক্স-অক্ষ সাম্প্রতিক পরীক্ষার তারিখগুলো নির্দেশ করে। ওয়াই-অক্ষ উল্টানো হয়েছে শীর্ষ র‍্যাঙ্কগুলো যথাযথভাবে ফুটিয়ে তুলতে।')}
            </p>
          </div>

        </div>
      </div>

      {/* Speed trends vs Fatigue index */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Fatigue curves */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">{t('Simulated Testing Co-efficient & Fatigue Tracker', 'টেস্টিং সহগ এবং ক্লান্তি ট্র্যাকার')}</h3>
            <p className="text-xs text-slate-500">{t('Accuracy degradation relative to consecutive testing hours', 'টানা পরীক্ষা দেওয়ার সময়ের সাথে সঠিকতা হ্রাসের অনুপাত')}</p>
          </div>

          <div className="h-60 relative">
            {(!analyticsData.cognitiveFatigue || analyticsData.cognitiveFatigue.length === 0) && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 rounded-xl border border-slate-850 text-center p-6 space-y-2">
                <ShieldAlert className="w-8 h-8 text-rose-500/80 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  {t('Pacing Telemetry Awaiting Data', 'ক্লান্তি ট্র্যাকার ক্যালিব্রেট হচ্ছে')}
                </span>
                <p className="text-[9px] text-slate-500 max-w-[200px] leading-normal mx-auto">
                  {t('Fatigue mapping requires consecutive testing hours. Answer questions in the Exam Engine to begin calibration.', 'টানা কয়েক সেশন পরীক্ষা দেওয়ার পর আপনার মানসিক ক্লান্তির হার চিহ্নিত করা হবে।')}
                </p>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.cognitiveFatigue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" label={{ value: 'Hours Spent', position: 'insideBottomRight', offset: -5 }} stroke="#64748b" fontSize={10} />
                <YAxis label={{ value: 'Fatigue IQ', angle: -90, position: 'insideLeft' }} stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="fatigue" stroke="#f43f5e" strokeWidth={2.5} name="Cognitive Shift Index" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="p-3 bg-rose-950/20 border border-rose-900/30 text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{t('High fatigue mapped at Hour 4. Complete mock tests in under 120 minutes is recommended.', 'টানা ৪ ঘণ্টা পরীক্ষা দেওয়ার পর ক্লান্তি লক্ষ্য করা যায়। ১২০ মিনিটের মধ্যে পরীক্ষা শেষ করতে পরামর্শ দেওয়া হচ্ছে।')}</span>
          </div>
        </div>

        {/* Time Spent levels per Question */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">{t('Average Pacing Matrix', 'গড় গতি ম্যাট্রিক্স')}</h3>
            <p className="text-xs text-slate-500">{t('Actual seconds spent per question index vs cohort target', 'প্রশ্ন প্রতি ব্যয় করা প্রকৃত সময় বনাম অন্যান্য প্রার্থীদের গড় সময়')}</p>
          </div>

          <div className="h-60 relative">
            {(!analyticsData.timePerQuestionTrend || analyticsData.timePerQuestionTrend.length === 0) && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 rounded-xl border border-slate-850 text-center p-6 space-y-2">
                <Clock className="w-8 h-8 text-cyan-500/80 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  {t('Awaiting Question-Level Telemetry', 'গতি telemetry ডাটার জন্য অপেক্ষা')}
                </span>
                <p className="text-[9px] text-slate-500 max-w-[200px] leading-normal mx-auto">
                  {t('Pacing analysis calibrates telemetry per answer response. Keep answering in mock tests to unlock.', 'প্রতিটি এমসিকিউ উত্তরের সময় বিশ্লেষণ করে আপনার ব্যক্তিগত গতি মেট্রিক্স তৈরি করা হবে।')}
                </p>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.timePerQuestionTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="questionIndex" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Legend fontSize={9} />
                <Bar dataKey="actualSeconds" fill="#0ea5e9" name="My Seconds" radius={[4, 4, 0, 0]} />
                <Bar dataKey="averageSeconds" fill="#334155" name="Cadre Average" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-xl text-xs text-slate-400 text-center font-mono">
            ⚡ {t('Decisive speed optimization: Average pacing represents 28 seconds under mock levels.', 'গতি অপ্টিমাইজেশন: মক পরীক্ষায় আপনার উত্তর দেওয়ার গড় গতি ২৮ সেকেন্ডের নিচে আছে।')}
          </div>
        </div>

      </div>

    </div>
  );
}
