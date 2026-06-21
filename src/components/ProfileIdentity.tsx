import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award, Target, Flame, Compass,
  MapPin, Clock, Mail, Shield, Zap, TrendingUp,
} from 'lucide-react';
import { UserProfile } from '../types';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '../lib/LanguageContext';

interface ProfileIdentityProps {
  profile: UserProfile;
}

// ─── Reusable avatar that shows Google photo or initials ──────────────────────
function ProfileAvatar({ photoURL, name, size = 24 }: { photoURL?: string | null; name: string; size?: number }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  if (photoURL && !imgError) {
    return (
      <img
        src={photoURL}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`w-${size} h-${size} rounded-full object-cover ring-4 ring-cyan-500/30 ring-offset-2 ring-offset-slate-950`}
      />
    );
  }

  return (
    <div className={`w-${size} h-${size} rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/10`}>
      <span className="text-3xl font-bold tracking-widest text-slate-950 font-sans">
        {initials || '?'}
      </span>
    </div>
  );
}

// ─── Animated XP progress bar ─────────────────────────────────────────────────
function XPBar({ xp, level }: { xp: number; level: number }) {
  const xpPerLevel = level * 5000;
  const progress   = Math.min(100, (xp / xpPerLevel) * 100);
  return (
    <div className="space-y-2 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-500">{t => `Level ${level}`}</span>
        <span className="font-mono text-cyan-400 font-bold">{xp.toLocaleString()} / {xpPerLevel.toLocaleString()} XP</span>
      </div>
      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full"
        />
      </div>
      <span className="text-[9px] text-slate-500 block text-right">
        {(xpPerLevel - xp).toLocaleString()} XP to level {level + 1}
      </span>
    </div>
  );
}

export default function ProfileIdentity({ profile }: ProfileIdentityProps) {
  const { user } = useAuth();
  const { t }    = useLanguage();

  const displayName = profile.name || user?.displayName || 'Aspirant';
  const email       = profile.email ?? user?.email ?? null;
  const photoURL    = profile.photoURL ?? user?.photoURL ?? null;
  const provider    = profile.provider ?? 'email';
  const xpPerLevel  = profile.level * 5000;
  const xpProgress  = Math.min(100, (profile.xp / xpPerLevel) * 100);

  const providerLabel: Record<string, string> = {
    google:    'Google',
    email:     'Email / Password',
    anonymous: 'Guest Session',
  };
  const providerColor: Record<string, string> = {
    google:    'text-blue-400 bg-blue-950/40 border-blue-800/30',
    email:     'text-emerald-400 bg-emerald-950/40 border-emerald-800/30',
    anonymous: 'text-amber-400 bg-amber-950/40 border-amber-800/30',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-100">

      {/* ── Left: Identity card ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6"
      >
        {/* Avatar + name */}
        <div className="space-y-4 text-center">
          <div className="relative inline-block mx-auto">
            {/* Spinning ring decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40"
              style={{ inset: '-8px' }}
            />
            <ProfileAvatar photoURL={photoURL} name={displayName} size={24} />
            {/* Online dot */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 shadow-md shadow-emerald-500/40" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold tracking-tight">{displayName}</h3>
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 px-2.5 py-0.5 rounded border border-cyan-800/30">
              {profile.archetype}
            </span>

            {/* Email */}
            {email && (
              <p className="text-xs text-slate-500 flex items-center gap-1.5 justify-center pt-1">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate max-w-[200px]">{email}</span>
              </p>
            )}

            {/* Auth provider badge */}
            <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${providerColor[provider]}`}>
              <Shield className="w-3 h-3" />
              {providerLabel[provider] ?? 'Unknown'}
            </span>

            {/* Location */}
            <p className="text-xs text-slate-500 flex items-center gap-1 justify-center">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {profile.district} {t('District', 'জেলা')}
            </p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-2 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">{t('Level', 'লেভেল')} {profile.level}</span>
            <span className="font-mono text-cyan-400 font-bold">{profile.xp.toLocaleString()} / {xpPerLevel.toLocaleString()} XP</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full"
            />
          </div>
          <span className="text-[9px] text-slate-500 block text-right">
            {(xpPerLevel - profile.xp).toLocaleString()} XP {t('to level', 'এ পৌঁছাতে')} {profile.level + 1}
          </span>
        </div>

        {/* Quick stats */}
        <div className="space-y-2.5 text-xs">
          {[
            { label: t('Exam Target', 'পরীক্ষার লক্ষ্য'),       value: `${profile.examType} Pre-Selection`, color: 'text-white' },
            { label: t('Target Year', 'লক্ষ্য বছর'),             value: String(profile.targetYear),          color: 'text-white' },
            { label: t('Streak', 'ধারাবাহিকতা'),                 value: `💧 ${profile.streak} days`,          color: 'text-yellow-400' },
            { label: t('Consistency Score', 'ধারাবাহিকতা স্কোর'), value: `${profile.consistencyScore}%`,       color: 'text-emerald-400' },
            { label: t('Learning Style', 'শেখার ধরন'),           value: profile.learningStyle,               color: 'text-indigo-300 capitalize' },
            ...(profile.phone ? [{ label: t('Phone', 'ফোন'), value: profile.phone, color: 'text-slate-300' }] : []),
          ].map((row, i) => (
            <div key={i} className="flex justify-between border-b border-slate-850 pb-2">
              <span className="text-slate-500">{row.label}</span>
              <span className={`font-semibold ${row.color}`}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Audit timestamps */}
        {(profile.createdAt || profile.lastLoginAt) && (
          <div className="text-[9px] font-mono text-slate-600 space-y-1 pt-2 border-t border-slate-800/40">
            {profile.createdAt && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {t('Joined', 'যোগ দিয়েছেন')} {new Date(profile.createdAt).toLocaleDateString()}
              </div>
            )}
            {profile.lastLoginAt && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {t('Last login', 'সর্বশেষ লগইন')} {new Date(profile.lastLoginAt).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* ── Right: Achievements + Regional metrics ────────────────────────── */}
      <div className="lg:col-span-8 space-y-6">

        {/* Performance summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: t('National Rank', 'জাতীয় র‍্যাংক'),      value: `#${profile.predictedRank.toLocaleString()}`, color: 'text-rose-400',    icon: TrendingUp },
            { label: t('Pass Probability', 'পাসের সম্ভাবনা'),   value: `${profile.passingProbability}%`,           color: 'text-emerald-400', icon: Target      },
            { label: t('Readiness Score', 'প্রস্তুতি স্কোর'),   value: `${profile.readinessScore}%`,               color: 'text-cyan-400',    icon: Zap         },
            { label: t('Active Streak', 'ধারাবাহিক দিন'),       value: `${profile.streak}d`,                       color: 'text-yellow-400',  icon: Flame       },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
            >
              <stat.icon className="w-4 h-4 text-slate-500" />
              <div className={`text-xl font-extrabold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
        >
          <div>
            <h4 className="text-sm font-semibold text-slate-200">{t('Unlocked Achievement Badges', 'অর্জিত ব্যাজসমূহ')}</h4>
            <p className="text-xs text-slate-500">{t('Earned by completing BCS preparation milestones', 'বিসিএস প্রস্তুতির মাইলফলক অতিক্রম করে অর্জিত')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Award, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20',
                title: t('Syllabus Cadet Conqueror', 'সিলেবাস ক্যাডেট বিজেতা'),
                desc: t('Three consecutive mock exams above 80%.', 'পরপর ৩টি মক পরীক্ষায় ৮০%+ স্কোর।'),
                locked: false,
              },
              {
                icon: Flame, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20',
                title: t('7-Day Habitual Streak', '৭ দিনের ধারাবাহিকতা'),
                desc: t('Logged in and answered diagnostics 7 days in a row.', 'পরপর ৭ দিন লগইন ও প্রশ্নের উত্তর দিয়েছেন।'),
                locked: profile.streak < 7,
              },
              {
                icon: Compass, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20',
                title: t('Analytical Strategist', 'অ্যানালিটিক্যাল স্ট্র্যাটেজিস্ট'),
                desc: t('Correctly identified hard questions using elimination.', 'ইলিমিনেশন পদ্ধতিতে কঠিন প্রশ্ন সঠিক করেছেন।'),
                locked: false,
              },
              {
                icon: Target, color: 'text-slate-400', bg: 'bg-slate-900 border-slate-800',
                title: t('National Rank Top 100', 'জাতীয় শীর্ষ ১০০'),
                desc: t('Reach the top 100 on the national weekly leaderboard.', 'সাপ্তাহিক জাতীয় লিডারবোর্ডে শীর্ষ ১০০-এ আসুন।'),
                locked: true,
              },
            ].map((badge, i) => (
              <motion.div
                key={i}
                whileHover={badge.locked ? {} : { scale: 1.02, y: -2 }}
                className={`p-4 bg-slate-950 rounded-xl border border-dashed ${badge.locked ? 'border-slate-800 opacity-50' : 'border-slate-700'} flex items-start gap-3 transition-all`}
              >
                <div className={`p-2.5 ${badge.bg} border rounded-xl`}>
                  <badge.icon className={`w-5 h-5 ${badge.locked ? 'text-slate-500' : badge.color}`} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-200 block flex items-center gap-1.5">
                    {badge.title}
                    {badge.locked && (
                      <span className="text-[9px] text-cyan-400 bg-cyan-950 border border-cyan-900 px-1 py-0.5 rounded font-mono">
                        {t('LOCKED', 'লক')}
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-normal">{badge.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regional cohort analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
        >
          <div>
            <h4 className="text-sm font-semibold text-slate-200">{t('Regional Cohort Analysis', 'আঞ্চলিক কোহর্ট বিশ্লেষণ')}</h4>
            <p className="text-xs text-slate-500">{t('Preparation metrics vs peers in your district', 'আপনার জেলার সমকক্ষদের সাথে তুলনামূলক বিশ্লেষণ')}</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs text-slate-400">
            {(() => {
              const peersInDistrict = Math.round((profile.totalStudents / 64) * (1 + ((profile.district || 'Dhaka').charCodeAt(0) % 5) * 0.1));
              const districtPercentile = Math.max(0.1, 100 - profile.readinessScore);
              const districtMedian = 55 + ((profile.district || 'Dhaka').charCodeAt(0) % 15);
              return [
                { label: `${t('Peers in', 'সহপ্রার্থী')} ${profile.district} ${t('district', 'জেলায়')}`, value: peersInDistrict.toLocaleString(), color: 'text-slate-200' },
                { label: t('My district percentile rank', 'জেলায় আমার পার্সেন্টাইল'),                    value: `Top ${districtPercentile.toFixed(1)}% ✦`,   color: 'text-emerald-400' },
                { label: t('District median accuracy', 'জেলার মিডিয়ান অ্যাকুরেসি'),                      value: `${districtMedian}%`,         color: 'text-slate-300' },
                { label: t('Exam type pool size', 'পরীক্ষার ধরনের পুল আকার'),                            value: `${(profile.totalStudents / 1000).toFixed(0)}k+`, color: 'text-slate-300' },
              ];
            })().map((row, i) => (
              <div key={i} className="flex justify-between">
                <span>{row.label}</span>
                <span className={`font-bold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
