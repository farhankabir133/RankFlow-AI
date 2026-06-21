import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, LogOut, Globe } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebase';
import { useLanguage } from '../lib/LanguageContext';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenAuth: () => void;
}

// ─── Avatar: shows Google photo, falls back to initials ──────────────────────
function UserAvatar({ photoURL, name, size = 7 }: { photoURL?: string | null; name: string; size?: number }) {
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
        className={`w-${size} h-${size} rounded-lg object-cover ring-2 ring-cyan-500/30`}
      />
    );
  }

  return (
    <div className={`w-${size} h-${size} rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-inner`}>
      {initials || '?'}
    </div>
  );
}

export default function Navbar({ currentView, setCurrentView, onOpenAuth }: NavbarProps) {
  const { user, profile, signOutUser } = useAuth();
  const { language, setLanguage, t }   = useLanguage();
  const [isOpen, setIsOpen]             = useState(false);

  const currentUserResolved = user || auth.currentUser;

  const handleScrollToSection = (id: string) => {
    setCurrentView('landing');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const navItems = currentUserResolved
    ? [
        { id: 'dashboard',        label: t('Dashboard',       'ড্যাশবোর্ড')     },
        { id: 'analytics',        label: t('Analytics',       'অ্যানালিটিক্স')  },
        { id: 'career-os',        label: t('CareerOS',        'ক্যারিয়ার ওএস')  },
        { id: 'exam-engine',      label: t('ExamEngine',      'পরীক্ষা ইঞ্জিন') },
        { id: 'memory-revision',  label: t('MemoryRevision',  'মেমোরি রিভিশন')  },
        { id: 'written-evaluator',label: t('WrittenEvaluator','লিখিত মূল্যায়ন')},
      ]
    : [
        { id: 'features', label: t('Features',          'ফিচারসমূহ'),        isScroll: true },
        { id: 'demo',     label: t('Interactive Trial', 'ডেমো ট্রায়াল'),     isScroll: true },
        { id: 'about',    label: t('About',             'আমাদের সম্পর্কে'), isScroll: true },
      ];

  const handleNavClick = (item: { id: string; label: string; isScroll?: boolean }) => {
    if (item.isScroll) {
      handleScrollToSection(item.id);
    } else {
      setCurrentView(item.id);
    }
    setIsOpen(false);
  };

  const spring = { type: 'spring', stiffness: 400, damping: 15 };

  const displayName = profile?.name || user?.displayName || 'Profile';
  const photoURL    = profile?.photoURL ?? user?.photoURL ?? null;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setCurrentView('landing')}
        >
          <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-lg">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-bold tracking-tight text-white text-sm sm:text-base">
            {t('RankFlow AI', 'র‍্যাঙ্কফ্লো এআই')}
          </span>
        </div>

        {/* Desktop nav items */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ y: -2 }}
              transition={spring}
              onClick={() => handleNavClick(item)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                currentView === item.id
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Desktop right: language + user/auth */}
        <div className="hidden lg:flex items-center gap-3">

          {/* Language toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-bold text-slate-400 hover:text-cyan-400 bg-slate-950/40 hover:bg-slate-900 transition-all cursor-pointer"
            title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'EN' : 'বাংলা'}</span>
          </motion.button>

          {currentUserResolved ? (
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 py-1.5 pl-2 pr-1.5 rounded-xl shadow-md">

              {/* Avatar + name chip */}
              <button
                onClick={() => setCurrentView('profile')}
                className="flex items-center gap-2 cursor-pointer group"
                title={t('View Profile', 'প্রোফাইল দেখুন')}
              >
                <motion.div whileHover={{ scale: 1.08 }} className="relative">
                  <UserAvatar photoURL={photoURL} name={displayName} size={7} />
                  {/* Online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
                </motion.div>

                <div className="text-left leading-none">
                  <span className="text-xs font-semibold block text-slate-200 max-w-[120px] truncate group-hover:text-cyan-400 transition-colors">
                    {displayName}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono block mt-0.5 truncate max-w-[120px]">
                    {profile?.email ?? user?.email ?? t('Guest', 'অতিথি')}
                  </span>
                </div>
              </button>

              {/* Streak badge */}
              <div className="hidden xl:flex items-center gap-1 px-2 py-1 bg-slate-900 rounded-lg border border-slate-800 text-[9px] font-mono text-yellow-400">
                💧 {profile?.streak ?? 0}
              </div>

              {/* Sign out */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => signOutUser()}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                title={t('Log Out', 'লগ আউট')}
              >
                <LogOut className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ y: -2, boxShadow: '0 0 20px rgba(34,211,238,0.25)' }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              onClick={onOpenAuth}
              className="cursor-pointer flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-lg text-xs uppercase hover:opacity-95 transition-all shadow-md shadow-cyan-500/10"
            >
              <span>{t('Sign In', 'সাইন ইন')}</span>
            </motion.button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring}
            className="lg:hidden mt-3 pt-3 border-t border-slate-800/60 space-y-1 overflow-hidden"
          >
            {navItems.map(item => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                transition={spring}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer block ${
                  currentView === item.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </motion.button>
            ))}

            <div className="pt-2 border-t border-slate-800/40 space-y-2">
              <button
                onClick={() => { setLanguage(language === 'en' ? 'bn' : 'en'); setIsOpen(false); }}
                className="w-full py-2.5 border border-slate-800 bg-slate-950 rounded-xl text-xs font-bold text-slate-400 hover:text-cyan-400 transition-all flex items-center justify-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Switch to বাংলা' : 'ইংরেজিতে পরিবর্তন করুন'}</span>
              </button>

              {currentUserResolved ? (
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-800/30">
                  <button
                    onClick={() => { setCurrentView('profile'); setIsOpen(false); }}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <UserAvatar photoURL={photoURL} name={displayName} size={8} />
                    <div>
                      <span className="text-xs font-semibold block text-slate-200">{displayName}</span>
                      <span className="text-[10px] text-slate-500 block truncate max-w-[160px]">
                        {profile?.email ?? user?.email ?? ''}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => { signOutUser(); setIsOpen(false); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-rose-400 hover:text-white rounded-lg hover:bg-rose-950/20 text-xs transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { onOpenAuth(); setIsOpen(false); }}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs uppercase cursor-pointer"
                >
                  {t('Sign In', 'সাইন ইন')}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
