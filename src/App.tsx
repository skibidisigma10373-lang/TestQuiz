/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Calculator as CalcIcon, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Globe, 
  Sparkles, 
  X, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Navbar, ActiveTab } from './components/Navbar';
import { TopicsView } from './components/TopicsView';
import { ExamsView } from './components/ExamsView';
import { FormulaGuide } from './components/FormulaGuide';
import { Calculator } from './components/Calculator';
import { QuizRunner } from './components/QuizRunner';
import { ExamRunner } from './components/ExamRunner';
import { MizuPortalViewer } from './components/MizuPortalViewer';
import { CustomQuizModal } from './components/CustomQuizModal';
import { MathCategory, MathQuestion, ExamConfig, UserExamAttempt } from './types/math';
import { mathQuestions } from './data/mathQuestions';
import { predefinedExams } from './data/exams';

const LOCAL_STORAGE_KEY_ATTEMPTS = 'testquiz_exam_attempts_v1';
const LOCAL_STORAGE_KEY_MIZU = 'testquiz_mizu_unlocked_v1';
const LOCAL_STORAGE_KEY_CODE = 'testquiz_mizu_code_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('topics');
  
  // Quiz & Exam Session State
  const [activeQuiz, setActiveQuiz] = useState<{ questions: MathQuestion[]; title: string } | null>(null);
  const [activeExam, setActiveExam] = useState<ExamConfig | null>(null);

  // Floating Calculator modal
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Custom Quiz modal
  const [isCustomQuizOpen, setIsCustomQuizOpen] = useState(false);

  // Secret Mizu Easter egg state
  const [mizuUnlocked, setMizuUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY_MIZU) === 'true';
    } catch {
      return false;
    }
  });

  const [mizuAccessCode, setMizuAccessCode] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY_CODE) || 'MIZU-234-HEALTH-ACCESS';
    } catch {
      return 'MIZU-234-HEALTH-ACCESS';
    }
  });

  const [isMizuPortalOpen, setIsMizuPortalOpen] = useState(false);

  // Exam records in localStorage
  const [examAttempts, setExamAttempts] = useState<UserExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save exam attempts
  const handleSaveAttempt = (attempt: UserExamAttempt) => {
    const updated = [attempt, ...examAttempts];
    setExamAttempts(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ATTEMPTS, JSON.stringify(updated));
    } catch {
      // Ignore quota error
    }
  };

  // Triggered when secret code {234+0} is entered into calculator
  const handleUnlockMizu = (generatedCode: string) => {
    setMizuUnlocked(true);
    setMizuAccessCode(generatedCode);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_MIZU, 'true');
      localStorage.setItem(LOCAL_STORAGE_KEY_CODE, generatedCode);
    } catch {
      // Ignore
    }
    // Directly open the Mizu Portal viewer within TestQuiz
    setIsMizuPortalOpen(true);
  };

  // Launch practice quiz for category
  const handleStartPracticeQuiz = (category: MathCategory | 'all') => {
    let pool = mathQuestions;
    let title = 'General Mathematics Practice';

    if (category !== 'all') {
      pool = mathQuestions.filter(q => q.category === category);
      title = `${category.charAt(0).toUpperCase() + category.slice(1)} Practice Quiz`;
    }

    // Shuffle questions
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setActiveExam(null);
    setActiveQuiz({ questions: shuffled, title });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch pre-made exam by category
  const handleSelectExamByCategory = (category: MathCategory) => {
    const matchingExam = predefinedExams.find(e => e.category === category) || predefinedExams[0];
    handleStartExam(matchingExam);
  };

  const handleStartExam = (exam: ExamConfig) => {
    setActiveQuiz(null);
    setActiveExam(exam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCustomQuiz = (questions: MathQuestion[], title: string) => {
    setActiveExam(null);
    setActiveQuiz({ questions, title });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setActiveQuiz(null);
          setActiveExam(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCalculatorModal={() => setIsCalculatorOpen(true)}
        onOpenCustomQuiz={() => setIsCustomQuizOpen(true)}
        mizuUnlocked={mizuUnlocked}
        mizuAccessCode={mizuAccessCode}
        onOpenMizuPortal={() => setIsMizuPortalOpen(true)}
      />

      {/* Secret Mizu Notification Banner (if unlocked) */}
      {mizuUnlocked && !isMizuPortalOpen && (
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-emerald-200 px-4 py-2 border-b border-emerald-500/30 text-xs flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                <strong className="text-white">Mizu Portal Connected</strong> (Code: <code className="font-mono text-emerald-300">{mizuAccessCode}</code>)
              </span>
            </div>
            <button
              onClick={() => setIsMizuPortalOpen(true)}
              className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 rounded-lg transition flex items-center gap-1 shadow-xs"
            >
              <span>View In-Site</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* If Quiz is in progress */}
        {activeQuiz ? (
          <QuizRunner
            questions={activeQuiz.questions}
            categoryTitle={activeQuiz.title}
            onExit={() => setActiveQuiz(null)}
            onTakeExam={() => {
              setActiveQuiz(null);
              setActiveTab('exams');
            }}
          />
        ) : activeExam ? (
          <ExamRunner
            exam={activeExam}
            onExit={() => setActiveExam(null)}
            onSaveAttempt={handleSaveAttempt}
          />
        ) : (
          <>
            {activeTab === 'topics' && (
              <TopicsView
                onStartQuiz={handleStartPracticeQuiz}
                onSelectExamByCategory={handleSelectExamByCategory}
                onOpenFormulas={() => setActiveTab('formulas')}
                onOpenCalculator={() => setActiveTab('calculator')}
                onOpenCustomQuiz={() => setIsCustomQuizOpen(true)}
                recentAttempts={examAttempts}
              />
            )}

            {activeTab === 'exams' && (
              <ExamsView
                onStartExam={handleStartExam}
                attempts={examAttempts}
              />
            )}

            {activeTab === 'formulas' && (
              <FormulaGuide
                onOpenCalculator={() => setIsCalculatorOpen(true)}
              />
            )}

            {activeTab === 'calculator' && (
              <div className="max-w-3xl mx-auto space-y-6 pb-12">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Scientific &amp; Standard Math Calculator
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                    Evaluate algebraic formulas, trigonometric ratios, exponents, square roots, and expression grouping with braces.
                  </p>
                </div>

                <Calculator onUnlockMizu={handleUnlockMizu} />
              </div>
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-slate-700">
              <img 
                src="/assets/aistudio/image_34009fbb__1__679781ac.jpg" 
                alt="TestQuiz" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-white font-extrabold text-base tracking-tight">TestQuiz</span>
              <p className="text-xs text-slate-400">Geometry, Algebra, Calculus &amp; Standardized Exams</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <button onClick={() => { setActiveTab('topics'); setActiveQuiz(null); setActiveExam(null); }} className="hover:text-white transition">
              Mathematics Topics
            </button>
            <button onClick={() => { setActiveTab('exams'); setActiveQuiz(null); setActiveExam(null); }} className="hover:text-white transition">
              Timed Examinations
            </button>
            <button onClick={() => { setActiveTab('formulas'); setActiveQuiz(null); setActiveExam(null); }} className="hover:text-white transition">
              Formula Reference
            </button>
            <button onClick={() => setIsCalculatorOpen(true)} className="hover:text-white transition">
              Launch Calculator
            </button>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} TestQuiz Platform. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Action Launcher for Calculator */}
      {!isCalculatorOpen && (
        <button
          onClick={() => setIsCalculatorOpen(true)}
          className="fixed bottom-6 right-6 z-30 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-2xl hover:shadow-sky-500/20 border border-slate-700/80 transition-all hover:scale-105 group flex items-center gap-2"
          title="Open Floating Calculator"
        >
          <CalcIcon className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs font-bold pr-1">Calculator</span>
        </button>
      )}

      {/* Floating Calculator Modal / Drawer */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="relative">
            <Calculator
              onUnlockMizu={handleUnlockMizu}
              isFloating={true}
              onCloseFloating={() => setIsCalculatorOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Custom Quiz Modal */}
      <CustomQuizModal
        isOpen={isCustomQuizOpen}
        onClose={() => setIsCustomQuizOpen(false)}
        onStartCustomQuiz={handleStartCustomQuiz}
      />

      {/* Secret Mizu Portal In-Site Viewer Modal */}
      <MizuPortalViewer
        isOpen={isMizuPortalOpen}
        onClose={() => setIsMizuPortalOpen(false)}
        accessCode={mizuAccessCode}
      />

    </div>
  );
}
