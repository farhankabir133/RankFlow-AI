import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, GitBranch, FileText, ShieldAlert, Landmark, User, MessageCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface FooterProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Footer({ activeTab, setActiveTab }: FooterProps) {
  const { t } = useLanguage();

  const ecosystemLinks = [
    { id: 'dashboard', label: t('Dashboard', 'ড্যাশবোর্ড') },
    { id: 'analytics', label: t('Analytics', 'অ্যানালিটিক্স') },
    { id: 'career-os', label: t('Career OS', 'ক্যারিয়ার ওএস') },
    { id: 'exam-engine', label: t('Exam Engine', 'পরীক্ষা ইঞ্জিন') },
    { id: 'memory-revision', label: t('Memory Revision', 'মেমোরি রিভিশন') },
    { id: 'written-evaluator', label: t('Written Evaluator', 'লিখিত মূল্যায়ন') },
  ];

  const handleEcosystemClick = (id: string) => {
    if (setActiveTab) {
      setActiveTab(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const springTransition = { type: 'spring', stiffness: 400, damping: 15 };

  return (
    <footer className="w-full px-4 sm:px-6 bg-slate-950/40">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-slate-800/40">
        
        {/* Column 1: Brand statement */}
        <div className="col-span-2 md:col-span-1 space-y-4 text-left">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-lg">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <span className="font-bold tracking-tight text-white text-sm">
              {t('RANKFLOW AI', 'র‍্যাঙ্কফ্লো এআই')}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            {t(
              'The next-generation autonomous learning operating system supporting competitive job exams in Bangladesh.',
              'বাংলাদেশের প্রতিযোগিতামূলক চাকরি পরীক্ষার জন্য পরবর্তী প্রজন্মের স্বায়ত্তশাসিত লার্নিং অপারেটিং সিস্টেম।'
            )}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {t('Live Uptime: 99.99%', 'সক্রিয় সময়: ৯৯.৯৯%')}
          </span>
        </div>

        {/* Column 2: Ecosystem Links */}
        <div className="space-y-3 text-xs text-left">
          <h5 className="text-slate-350 font-bold tracking-widest uppercase text-[10px]">
            {t('Ecosystem', 'ইকোসিস্টেম')}
          </h5>
          <ul className="space-y-2 text-slate-450 font-medium">
            {ecosystemLinks.map((item) => (
              <li key={item.id}>
                <motion.button
                  whileHover={{ y: -2 }}
                  transition={springTransition}
                  onClick={() => handleEcosystemClick(item.id)}
                  className={`cursor-pointer hover:text-cyan-400 transition-colors text-left block ${
                    activeTab === item.id ? 'text-cyan-400 font-semibold' : 'text-slate-450'
                  }`}
                >
                  {item.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Resources & Open Source */}
        <div className="space-y-3 text-xs text-left">
          <h5 className="text-slate-350 font-bold tracking-widest uppercase text-[10px]">
            {t('Resources', 'রিসোর্সসমূহ')}
          </h5>
          <ul className="space-y-2 text-slate-450 font-medium">
            {[
              { label: t('Git Repository', 'গিট রিপোজিটরি'), icon: GitBranch, href: 'https://github.com/farhankabir133/RankFlow-AI' },
              { label: t('Documentation', 'ডকুমেন্টেশন'), icon: FileText, href: 'https://github.com/farhankabir133/RankFlow-AI#readme' },
              { label: t('License Terms', 'লাইসেন্স শর্তাবলী'), icon: ShieldAlert, href: 'https://github.com/farhankabir133/RankFlow-AI/blob/main/LICENSE' },
              { label: t('Public Issues', 'পাবলিক ইস্যু'), icon: Landmark, href: 'https://github.com/farhankabir133/RankFlow-AI/issues/new/choose' },
            ].map((res) => (
              <li key={res.label}>
                <motion.a 
                  href={res.href} 
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  transition={springTransition}
                  className="hover:text-cyan-400 text-slate-455 transition-colors inline-flex items-center gap-1.5"
                >
                  <res.icon className="w-3.5 h-3.5 text-slate-500" />
                  {res.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Creator Attributes */}
        <div className="space-y-3 text-xs text-left">
          <h5 className="text-slate-350 font-bold tracking-widest uppercase text-[10px]">
            {t('Developer', 'ডেভেলপার')}
          </h5>
          <div className="p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl space-y-3 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-indigo-950 border border-indigo-800 text-indigo-400 rounded-lg">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-200">Farhan Kabir</span>
            </div>
            <div className="flex flex-col gap-2 text-[11px] text-slate-400 font-medium">
              <motion.a 
                href="https://farhankabir.me/" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -2 }}
                transition={springTransition}
                className="hover:text-cyan-400 transition-colors block"
              >
                🌐 farhankabir.me
              </motion.a>
              <motion.a 
                href="https://medium.com/@farhankabir" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -2 }}
                transition={springTransition}
                className="hover:text-cyan-400 transition-colors block"
              >
                ✍️ Medium articles
              </motion.a>
              <motion.a 
                href="mailto:contact@farhankabir.me" 
                whileHover={{ y: -2 }}
                transition={springTransition}
                className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
                {t('Contact Creator', 'যোগাযোগ')}
              </motion.a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
