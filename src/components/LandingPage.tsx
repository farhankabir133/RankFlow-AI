import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Award, ArrowRight, Brain, AlertTriangle, 
  RefreshCw, TrendingUp, Compass, Users, MapPin, 
  BookOpen, Star, HelpCircle, CheckCircle2, Shield, Lock, Phone
} from 'lucide-react';
import { ExamType, Question } from '../types';

interface LandingPageProps {
  onStartOnboarding: (selectedExam: ExamType) => void;
  user: any;
  onOpenAuth: () => void;
  onGoToDashboard: () => void;
}

export default function LandingPage({ onStartOnboarding, user, onOpenAuth, onGoToDashboard }: LandingPageProps) {
  const [selectedExam, setSelectedExam] = useState<ExamType>('BCS');
  const [expectedScore, setExpectedScore] = useState<number>(65);
  const [estimatedRank, setEstimatedRank] = useState<string>('3,200 - 4,500');
  const [scoreProbability, setScoreProbability] = useState<number>(55);
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Trial MCQ State
  const [demoState, setDemoState] = useState<'question' | 'answered' | 'result'>('question');
  const [selectedDemoAnswer, setSelectedDemoAnswer] = useState<number | null>(null);
  const [demoFeedback, setDemoFeedback] = useState<string>('');

  
  const sampleDemoQuestion: Question = {
    id: "demo-q1",
    text: "সংবিধানের কোন অনুচ্ছেদ অনুযায়ী বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) গঠিত হয় এবং এর সদস্য মেয়াদ কত বছর?",
    options: [
      "১৩৭ নং অনুচ্ছেদ, ৫ বছর",
      "১৪০ নং অনুচ্ছেদ, ৪ বছর",
      "১৩৫ নং অনুচ্ছেদ, ৫ বছর",
      "১৩৮ নং অনুচ্ছেদ, ৬ বছর"
    ],
    correctIndex: 0,
    subject: "Bangladesh Constitution",
    topic: "Article 137",
    difficulty: "Medium"
  };

  // Predict rank bounds based on expected score input
  useEffect(() => {
    let lower = 45000;
    let upper = 60000;
    let prob = 12;

    if (expectedScore > 85) {
      lower = 12;
      upper = 250;
      prob = 98;
    } else if (expectedScore > 75) {
      lower = 251;
      upper = 1200;
      prob = 89;
    } else if (expectedScore > 65) {
      lower = 1201;
      upper = 4500;
      prob = 74;
    } else if (expectedScore > 50) {
      lower = 4501;
      upper = 18000;
      prob = 48;
    } else if (expectedScore > 40) {
      lower = 18001;
      upper = 35000;
      prob = 22;
    }

    setEstimatedRank(`${lower.toLocaleString()} - ${upper.toLocaleString()}`);
    setScoreProbability(prob);
  }, [expectedScore]);

  const handleDemoAnswerSubmit = (index: number) => {
    setSelectedDemoAnswer(index);
    setDemoState('answered');
    if (index === sampleDemoQuestion.correctIndex) {
      setDemoFeedback("সঠিক উত্তর! অসাধারন! চর্যাপদ ও সংবিধান থেকে প্রতি বছর ৩ নম্বর নিশ্চিত থাকে। আপনার সঠিক উত্তরের ফলে আপনার প্রজেক্টেড র‍্যাংক ৩২০ ধাপ এগিয়েছে!");
    } else {
      setDemoFeedback("ভুল উত্তর। সরকারি কর্ম কমিশন (BPSC) সংবিধানের ১৩৭ অনুচ্ছেদ দ্বারা গঠিত। এই দুর্বলতার কারণে প্রজেক্টেড র‍্যাংক ৭৪০ ধাপ পিছিয়ে গেছে। তবে চিন্তার কিছু নেই—RankFlow AI এটি রিভিশন করিয়ে নেবে!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900 pb-16">
      
      {/* Top Banner indicating interactive mode */}
      <div className="bg-gradient-to-r from-indigo-900 via-cyan-900 to-indigo-950 py-2.5 px-4 text-center text-xs font-mono tracking-wider border-b border-cyan-500/20 text-cyan-200">
        📢 BANGLADESH'S FIRST AI-POWERED LEARNING INTEGRATION SYSTEM | ACTIVE PREVIEW
      </div>

      {/* Header */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-900">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-6 h-6 text-slate-950" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
            RANKFLOW <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded border border-cyan-400/30 bg-cyan-950/40">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <a href="#how" className="hover:text-white transition-colors">Adaptive Engine</a>
          <a href="#demo" className="hover:text-white transition-colors">Interactive Trial</a>
          <a href="#proof" className="hover:text-white transition-colors">National Rankings</a>
          <div className="h-4 w-[1px] bg-slate-800"></div>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            8,432 Online Preparers Currently
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <button 
              onClick={onGoToDashboard}
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs uppercase hover:opacity-90 transition-all font-sans cursor-pointer"
            >
              ড্যাশবোর্ড (Dashboard)
            </button>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-cyan-400 hover:text-white rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer"
            >
              লগইন / সাইন-আপ (Sign In)
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-12 lg:pt-18 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Text / Intent Detection */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Target Exam Intent Picker */}
          <div className="inline-flex p-1.5 bg-slate-900/80 backdrop-blur rounded-xl border border-slate-800 gap-1">
            {(['BCS', 'Admission', 'SSC', 'HSC'] as ExamType[]).map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedExam === exam 
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-md shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {exam === 'BCS' && 'BCS Cadre'}
                {exam === 'Admission' && 'Varsity Admission'}
                {exam === 'SSC' && 'SSC 2026/27'}
                {exam === 'HSC' && 'HSC 2026/27'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Bangladesh’s First <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                AI-Powered Learning
              </span> <br />
              Operating System
            </h1>
            <p className="text-slate-400 text-lg max-w-xl">
              Coaching centers expose you to random lists. RankFlow AI models your unique memory decay, dynamically adjusts difficulty tiers, and delivers realistic national rankings for {selectedExam === 'BCS' ? 'BCS Cadre Aspirants' : `${selectedExam} students`}.
            </p>
          </div>

          {/* Quick AI Predictor Widget */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Live Rank Simulator
              </span>
              <span className="text-[10px] text-slate-500">Based on historical 200,000+ candidate statistics</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Target Score Rate</span>
                  <span className="font-mono text-cyan-400 font-bold">{expectedScore}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={expectedScore}
                  onChange={(e) => setExpectedScore(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg appearance-none h-1.5"
                />
                <p className="text-[10px] text-slate-500">Slide to view simulated output based on recent diagnostics</p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 grid grid-cols-2 gap-3 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Predicted Rank</span>
                  <span className="text-base font-mono font-bold text-white tracking-tight">{estimatedRank}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Passing Prob</span>
                  <span className={`text-base font-mono font-bold tracking-tight ${scoreProbability > 70 ? 'text-emerald-400' : scoreProbability > 40 ? 'text-yellow-400' : 'text-rose-400'}`}>
                    {scoreProbability}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                if (!user) {
                  onOpenAuth();
                } else {
                  onStartOnboarding(selectedExam);
                }
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              {user ? 'Start AI Diagnostic Exam' : 'Login & Start Free Diagnostic'} <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <a 
              href="#demo"
              className="px-6 py-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/70 transition-all font-semibold text-center text-slate-300 flex items-center justify-center gap-2"
            >
              Watch Interactive Demo
            </a>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-cyan-400" /> BPSC Mock Standards</span>
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-indigo-400" /> Adaptive Mastery</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> 125 Districts Integrated</span>
          </div>

        </div>

        {/* Right Column App Preview Graphics */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-600 opacity-20 blur-xl"></div>
          
          <div className="relative p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            
            {/* National Tracker Mockup */}
            <div className="flex items-center justify-between border-b border-light-slate-800 pb-4">
              <span className="text-xs font-mono text-slate-400">MEMBERSHIP INTELLIGENCE OS</span>
              <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono border border-cyan-800/30">BCS PRE COMPLETED</span>
            </div>

            {/* Simulated Live Track Chart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">Adaptive Mastery Graph</h4>
                  <p className="text-xs text-slate-500">Continuous skill evaluation across 5 indicators</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2 py-1 rounded">
                  +12.4% Mastery
                </span>
              </div>

              {/* Progress bars showing syllabus metrics */}
              <div className="space-y-3 font-mono text-xs text-slate-400">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>1. Bengali Language (বাংলা)</span>
                    <span className="text-cyan-400">82%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full w-[82%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>2. International Affairs (আন্তর্জাতিক)</span>
                    <span className="text-yellow-400">51%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 h-full w-[51%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>3. Mathematical Reasoning (গণিত)</span>
                    <span className="text-emerald-400">91%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full w-[91%]" />
                  </div>
                </div>
              </div>

              {/* Memory decay projection simulation */}
              <div className="pt-4 mt-2 border-t border-slate-800/60 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="text-xs text-slate-400">Estimated Spaced Memory decay:</span>
                </div>
                <span className="text-xs text-rose-300 font-bold font-mono bg-rose-950/30 px-2 py-1 border border-rose-900/30 rounded">
                  Next revision in 4 hours
                </span>
              </div>

            </div>

            {/* Dynamic visual graph illustration */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 select-none">
              <span className="text-[10px] font-mono text-slate-500 block mb-2 uppercase">RETAINABILITY INDEX VS FORGETTING CURVE</span>
              <div className="h-24 flex items-end justify-between gap-1">
                {[40, 55, 60, 45, 30, 68, 79, 90, 85, 95, 99, 88].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full rounded-t-sm transition-all duration-500"
                      style={{ 
                        height: `${val}%`, 
                        backgroundImage: idx === 10 ? 'linear-gradient(to top, #34d399, #10b981)' : 'linear-gradient(to top, #06b6d4, #3b82f6)' 
                      }}
                    />
                    <span className="text-[8px] font-mono text-slate-600 mt-1">{idx + 1}d</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </header>

      {/* Problem Comparison Narratives */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl w-fit">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
          </div>
          <h3 className="text-xl font-bold">The Offline Coaching Traps</h3>
          <p className="text-sm text-slate-400">
            Traditional offline institutes push raw lecture sheets and generic multiple-choice books without monitoring individual retention limits, forcing 92% of students to fail pre-exams.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl w-fit">
            <Brain className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold">Memory Decay Monitoring</h3>
          <p className="text-sm text-slate-400">
            Forgetting curve formulas map when you lose grasp of critical topics (e.g. historical periods or mathematical equations). The system automatically queues targeted reviews just before memory lapses.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold">Personalized National Percentile</h3>
          <p className="text-sm text-slate-400">
            RankFlow AI dynamically calculates your exact percentile placement by cross-analyzing millions of mock attempts with real BPSC cadre cutoffs, keeping your mock targets genuine.
          </p>
        </div>

      </section>

      {/* Embedded Demo (Conversion Core) */}
      <section id="demo" className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-center mb-2">Experience the Intelligence Trial</h2>
        <p className="text-sm text-slate-400 text-center mb-8">
          See how answering a single question shifts your predictive national ranks instantly on the AI server.
        </p>

        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl shadow-cyan-950/20">
          
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> INTERACTIVE SIMULATION DEMO
            </span>
            <span className="text-cyan-400">Question ID: {sampleDemoQuestion.id}</span>
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold leading-relaxed text-slate-200">
              {sampleDemoQuestion.text}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleDemoQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  disabled={demoState !== 'question'}
                  onClick={() => handleDemoAnswerSubmit(idx)}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    demoState === 'question' 
                      ? 'bg-slate-950 hover:bg-slate-800 hover:border-cyan-500/40 text-slate-300 border border-slate-800' 
                      : idx === sampleDemoQuestion.correctIndex 
                        ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 border' 
                        : selectedDemoAnswer === idx 
                          ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 border' 
                          : 'bg-slate-950/40 text-slate-500 border border-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{idx + 1}. {option}</span>
                    {demoState !== 'question' && idx === sampleDemoQuestion.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {demoState === 'answered' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/20 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-base">💡</span>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-200">
                      {demoFeedback}
                    </p>
                    <button 
                      onClick={() => setDemoState('question')}
                      className="text-xs text-cyan-400 hover:underline font-mono inline-flex items-center gap-1 mt-1"
                    >
                      <RefreshCw className="w-3 h-3 animate-spin duration-1000" /> Try Question and Simulated Calculation again
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Subject: <strong className="text-white">{sampleDemoQuestion.subject}</strong></span>
                  <span>Estimated Global BCS Rank Shift: <strong className={selectedDemoAnswer === sampleDemoQuestion.correctIndex ? 'text-emerald-400' : 'text-rose-400'}>
                    {selectedDemoAnswer === sampleDemoQuestion.correctIndex ? '▲ 320 positions gain' : '▼ 740 positions drop'}
                  </strong></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Social Proof National Leaderboard preview */}
      <section id="proof" className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/50 px-3 py-1 rounded-full border border-indigo-900/40">
            Social Proof & National Integration
          </span>
          <h2 className="text-3xl max-w-lg md:text-4xl font-extrabold tracking-tight">
            How Top Cadres Are Engineered Across 64 Districts
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            RankFlow AI monitors the top talent pools from Dhaka University, BUET, and elite medical colleges. With localized cohort clusters, you understand precisely where you rank against high-difficulty districts like Dhaka, Mymensingh, or Chittagong.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-500 font-mono block">MEDIAN MOCK ACCURACY</span>
              <span className="text-xl font-bold font-mono text-cyan-400">71.4%</span>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-500 font-mono block">REVISION ADHERENCE</span>
              <span className="text-xl font-bold font-mono text-emerald-400">89.2%</span>
            </div>
          </div>
        </div>

        {/* Mini Leaderboard preview table */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold tracking-tight">Simulated National Weekly Board (Elite Segment)</h4>
            <span className="text-xs text-cyan-400 font-mono uppercase font-bold text-slate-400">DU/BCS Cohort</span>
          </div>

          <div className="space-y-1 font-mono text-xs">
            {[
              { rank: 1, name: 'Sajidul Islam', ins: 'BUET, EE', xp: '18,432 XP', accuracy: '94.2%', dist: 'Dhaka' },
              { rank: 2, name: 'Anika Rahman', ins: 'DU, Law', xp: '17,901 XP', accuracy: '91.8%', dist: 'Mymensingh' },
              { rank: 3, name: 'Tanzir Ahmed', ins: 'DMC, MBBS', xp: '17,110 XP', accuracy: '90.5%', dist: 'Chittagong' },
              { rank: 4, name: 'Farhan Kabir', ins: 'IBA, BBA', xp: '16,530 XP', accuracy: '89.1%', dist: 'Sylet' },
            ].map((usr) => (
              <div key={usr.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-950 transition-colors border border-transparent hover:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full font-bold text-[10px] ${
                    usr.rank === 1 ? 'bg-amber-400 text-slate-950' : usr.rank === 2 ? 'bg-slate-300 text-slate-950' : 'bg-slate-800'
                  }`}>
                    {usr.rank}
                  </span>
                  <div>
                    <span className="text-slate-200 block font-sans font-medium text-sm">{usr.name}</span>
                    <span className="text-[10px] text-slate-500 block">{usr.ins} • {usr.dist}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 block font-bold">{usr.accuracy}</span>
                  <span className="text-[10px] text-slate-500 block">{usr.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Conversion Layer CTA */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center text-slate-100">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-cyan-500/20 space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Stop Studying Blindly. <br />
            Let AI Engineer Your Success Journey.
          </h2>
          
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Join thousands of competitive candidates mapping real syllabus competencies. Receive an precise initial learning diagnostic index instantly.
          </p>

          <div className="max-w-md mx-auto p-6 bg-slate-950/90 rounded-2xl border border-slate-800 text-left space-y-4">
            <span className="text-xs text-cyan-400 font-mono flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> SECURE AUTHENTICATION STATE</span>
            
            {user ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  আপনি ইমেইল <strong className="text-white">{user.email}</strong> দিয়ে সাইন-ইন করেছেন। পরীক্ষা প্রস্তুতি ও রিয়েল-টাইম র‍্যাংক ট্র্যাকিং শুরু করতে নিচে ক্লিক করুন।
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onStartOnboarding(selectedExam)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs uppercase hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    ডায়াগনস্টিক পরীক্ষা শুরু (Proceed to Assessment)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  পরীক্ষা প্রস্তুতি শুরু করতে ও আপনার আইডি ডাটা ক্লাউডে সংরক্ষণ করতে গুগল একাউন্ট অথবা ইমেইল দিয়ে লগইন করুন।
                </p>
                <button 
                  onClick={onOpenAuth}
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs uppercase hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  সাইন-ইন / নিবন্ধন করুন (Secure Sign In)
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Static Footer */}
      <footer className="border-t border-slate-900 pt-12 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-500">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-bold tracking-wider text-sm">RANKFLOW AI</span>
          </div>
          <p className="leading-relaxed">
            The next-generation autonomous learning operating system supporting competitive exams in Bangladesh. Developed by elite systems architects.
          </p>
        </div>
        <div>
          <h5 className="text-slate-300 font-semibold mb-3">EXAMS SUPPORTED</h5>
          <ul className="space-y-2">
            <li>BCS MCQ Pre-Selection Engine</li>
            <li>University Admission Roadmaps</li>
            <li>SSC Board Objective Analytics</li>
            <li>HSC Objective Retention Index</li>
          </ul>
        </div>
        <div>
          <h5 className="text-slate-300 font-semibold mb-3">SYSTEM MODULES</h5>
          <ul className="space-y-2">
            <li>Adaptive MCQ Question Pool</li>
            <li>Spaced Forgetting Memory model</li>
            <li>Bilingual Bangla-English Tutor</li>
            <li>Written Answer Evaluator AI</li>
          </ul>
        </div>
        <div>
          <h5 className="text-slate-300 font-semibold mb-3">TRUST & SYSTEM POLICIES</h5>
          <p className="leading-relaxed">
            Data models represent private sandboxed structures. Simulated rankings utilize national BPSC cohort guidelines accurately. All rights reserved © 2026.
          </p>
        </div>
      </footer>

    </div>
  );
}
