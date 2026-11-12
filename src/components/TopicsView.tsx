import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  FileCheck, 
  BookOpen, 
  Award, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  Calculator
} from 'lucide-react';
import { MathCategory, MathQuestion, UserExamAttempt } from '../types/math';
import { categoryMeta } from '../data/exams';
import { mathQuestions } from '../data/mathQuestions';

interface Props {
  onStartQuiz: (category: MathCategory | 'all') => void;
  onSelectExamByCategory: (category: MathCategory) => void;
  onOpenFormulas: () => void;
  onOpenCalculator: () => void;
  onOpenCustomQuiz: () => void;
  recentAttempts: UserExamAttempt[];
}

export const TopicsView: React.FC<Props> = ({
  onStartQuiz,
  onSelectExamByCategory,
  onOpenFormulas,
  onOpenCalculator,
  onOpenCustomQuiz,
  recentAttempts
}) => {
  const categories: MathCategory[] = [
    'algebra',
    'geometry',
    'trigonometry',
    'calculus',
    'statistics',
    'arithmetic'
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12 border border-slate-800">
        
        {/* Subtle decorative glow circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Comprehensive Mathematics Testing &amp; Learning Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Master Geometry, Algebra &amp; Calculus with <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">TestQuiz</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Sharpen your analytical skills with curated practice quizzes, timed standardized examinations, interactive diagrams, and built-in scientific calculation tools.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartQuiz('all')}
                className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-sky-500/25 transition flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Start Rapid Practice</span>
              </button>

              <button
                onClick={onOpenCustomQuiz}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-sm border border-white/10 transition"
              >
                Customize Quiz
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold text-sm border border-slate-700 transition flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>Calculator Tool</span>
              </button>
            </div>
          </div>

          {/* Hero Right: Logo feature card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center text-center max-w-xs w-full">
              <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-xl border-2 border-white/20 mb-4 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/assets/aistudio/image_34009fbb__1__679781ac.jpg" 
                  alt="TestQuiz Emblem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-extrabold text-lg text-white">TestQuiz Official</h3>
              <p className="text-xs text-slate-300 mt-1">
                Verified question bank with step-by-step mathematical proofs
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-around text-xs text-sky-300 font-mono">
                <div>
                  <span className="block font-bold text-white text-base">6</span>
                  <span>Branches</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <span className="block font-bold text-white text-base">100%</span>
                  <span>Accurate</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Main Mathematics Branches Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Select a Mathematical Branch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Each module includes step-by-step practice quizzes, diagram analysis, and timed certification exams.
            </p>
          </div>
          <button
            onClick={onOpenFormulas}
            className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 hover:underline"
          >
            <span>Formula Sheets</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => {
            const meta = categoryMeta[cat];
            const qCount = mathQuestions.filter(q => q.category === cat).length;

            return (
              <div
                key={cat}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-3">
                  
                  {/* Category Pill and Count */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${meta.bg} ${meta.color} border ${meta.border}`}>
                      {meta.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {qCount} Questions
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition">
                    {meta.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {meta.desc}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onStartQuiz(cat)}
                    className="flex-1 py-2 px-3 bg-white hover:bg-sky-50 text-sky-700 hover:text-sky-800 border border-slate-200 hover:border-sky-300 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
                    <span>Practice</span>
                  </button>

                  <button
                    onClick={() => onSelectExamByCategory(cat)}
                    className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Take Exam</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Exam Attempts History (if available) */}
      {recentAttempts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900">Your Recent Exam Records</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Saved Locally</span>
          </div>

          <div className="divide-y divide-slate-100">
            {recentAttempts.slice(0, 4).map(attempt => (
              <div key={attempt.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-900 block">{attempt.examTitle}</span>
                  <span className="text-slate-400 text-xs">
                    {new Date(attempt.completedAt).toLocaleDateString()} • {attempt.score}/{attempt.totalQuestions} Correct
                  </span>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold text-base ${
                    attempt.passed ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {attempt.percentage}%
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">
                    {attempt.passed ? 'Passed' : 'Needs Review'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Step-by-Step Proofs</h4>
            <p className="text-xs text-slate-500 mt-1">
              Never get stuck on an equation: view mathematical proofs with full intermediate derivations.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Interactive Calculator</h4>
            <p className="text-xs text-slate-500 mt-1">
              Test expressions, trigonometric functions, exponents, and explore equations directly in your browser.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Formal Exam Simulator</h4>
            <p className="text-xs text-slate-500 mt-1">
              Simulate actual standardized testing conditions with countdown timers and question flagging.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
