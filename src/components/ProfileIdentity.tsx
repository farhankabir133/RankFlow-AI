import React from 'react';
import { 
  Sparkles, Award, Target, Flame, Compass, 
  MapPin, UserCheck, Clock, Users, ShieldAlert 
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileIdentityProps {
  profile: UserProfile;
}

export default function ProfileIdentity({ profile }: ProfileIdentityProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-slate-100">
      
      {/* Target Left Column Profile Overview - 4 Columns */}
      <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
        
        <div className="space-y-4 text-center">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-slate-950" />
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-400 animate-spin" style={{ animationDuration: '30s' }} />
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <span className="text-2xl font-bold tracking-widest text-slate-950 font-sans">
                {profile.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold">{profile.name}</h3>
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 px-2.5 py-0.5 rounded border border-cyan-800/30">
              {profile.archetype}
            </span>
            <p className="text-xs text-slate-500 flex items-center gap-1 justify-center pt-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> {profile.district} District • {profile.phone}
            </p>
          </div>
        </div>

        {/* XP Progress bar */}
        <div className="space-y-2 p-4 bg-slate-950/60 rounded-xl border border-slate-850">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Level {profile.level}</span>
            <span className="font-mono text-cyan-400 font-bold">{profile.xp} / 5,000 XP</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[65%]" />
          </div>
          <span className="text-[9px] text-slate-500 block text-right">3,250 XP remaining until next level upgrade</span>
        </div>

        {/* Quick statistics checklist */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-xs border-b border-slate-850 pb-2">
            <span className="text-slate-500">Target Syllabus Exam:</span>
            <span className="font-semibold">{profile.examType} Pre-Selection</span>
          </div>
          <div className="flex justify-between text-xs border-b border-slate-850 pb-2">
            <span className="text-slate-500">Streak Period Rank:</span>
            <span className="font-semibold">💧 {profile.streak} Days Active</span>
          </div>
          <div className="flex justify-between text-xs border-b border-indigo-950/40 pb-2">
            <span className="text-slate-500">Cognitive style bias:</span>
            <span className="font-semibold capitalize text-indigo-300">{profile.learningStyle} analytical</span>
          </div>
        </div>

      </div>

      {/* Target Right Column Achieved Medals / Badges - 8 Columns */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Achievements list */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Unlocked Digital Competence Badges</h4>
            <p className="text-xs text-slate-500">Earned achievements representing critical BCS mock challenges</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-800 flex items-start gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-200 block">Syllabus Cadet Conqueror</span>
                <span className="text-[10px] text-slate-500 block leading-normal">
                  Completed three consecutive mock exams with score rates above 80%.
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-800 flex items-start gap-3">
              <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-200 block">7-Day Habitual Streak</span>
                <span className="text-[10px] text-slate-500 block leading-normal">
                  Logged into RankFlow AI and answered diagnostic questions 7 days in a row.
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-800 flex items-start gap-3">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-200 block">Analytical Strategist</span>
                <span className="text-[10px] text-slate-500 block leading-normal">
                  Correctly identified high-difficulty questions using elimination mode options.
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-800 block opacity-55 hover:opacity-100 transition-opacity">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-900 border border-slate-800 text-slate-500 rounded-xl">
                  <Target className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 block flex items-center gap-1">
                    National Rank Top 100 <span className="text-[9px] text-cyan-400 bg-cyan-950 border border-cyan-900 px-1 py-0.2 rounded font-mono">LOCKED</span>
                  </span>
                  <span className="text-[10px] text-slate-600 block leading-normal">
                    Reach the top 100 on the national weekly leaderboard.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Local District cohort rankings analysis */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-200">My Regional Cohort Metrics</h4>
            <p className="text-xs text-slate-500">Preparation diagnostics cross-analyzed against peers in your local district</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-3 font-mono text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Peers in {profile.district} district</span>
              <span className="text-slate-200">12,430 Aspirants</span>
            </div>
            <div className="flex justify-between">
              <span>My local district percentage ranking</span>
              <span className="text-emerald-400">Top 4.2% (Elite Cohort)</span>
            </div>
            <div className="flex justify-between">
              <span>District median syllabus accuracy rate</span>
              <span className="text-slate-300">64.5%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
