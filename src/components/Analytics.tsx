import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line 
} from 'recharts';
import { Sparkles, Brain, Award, Clock, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { AnalyticsData, UserProfile } from '../types';

interface AnalyticsProps {
  analyticsData: AnalyticsData;
  profile: UserProfile;
}

export default function Analytics({ analyticsData, profile }: AnalyticsProps) {
  return (
    <div className="space-y-6 animate-fadeIn text-slate-100">
      
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
            <span className="text-[10px] uppercase font-mono text-slate-500">Median Accuracy</span>
            <span className="text-2xl font-mono font-bold block text-white mt-1">79.2%</span>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-center md:text-left">
            <span className="text-[10px] uppercase font-mono text-slate-500">Consistency Quotient</span>
            <span className="text-2xl font-mono font-bold block text-emerald-400 mt-1">{profile.consistencyScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Charts bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar charts of Subject Mastery (Col span 5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Syllabus Mastery Heatmap</h3>
            <p className="text-xs text-slate-500">Target metrics vs median candidate capabilities</p>
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
            <span>Mathematical skills exceed 90% of students. Prioritize International Affairs.</span>
          </div>
        </div>

        {/* Predictive national rank curves (Col span 7) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">National Predicted Rank Trajectory</h3>
              <p className="text-xs text-slate-500">Daily rank progression indices (Lower is supreme)</p>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold font-mono bg-emerald-950/30 px-2 py-1 rounded">
              ▲ Improved 420 positions
            </span>
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
            X-Axis representing recent adaptive test dates. Y-Axis inverted to mock supreme ranks properly.
          </p>
        </div>

      </div>

      {/* Speed trends vs Fatigue index */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Fatigue curves */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Simulated Testing Co-efficient & Fatigue Tracker</h3>
            <p className="text-xs text-slate-500">Accuracy degradation relative to consecutive testing hours</p>
          </div>

          <div className="h-60">
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
            <span>High fatigue mapped at Hour 4. Complete mock tests in under 120 minutes is recommended.</span>
          </div>
        </div>

        {/* Time Spent levels per Question */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Average Pacing Matrix</h3>
            <p className="text-xs text-slate-500">Actual seconds spent per question index vs cohort target</p>
          </div>

          <div className="h-60">
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
            ⚡ Decisive speed optimization: Average pacing represents 28 seconds under mock levels.
          </div>
        </div>

      </div>

    </div>
  );
}
