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
  Sparkles, 
  X, 
  ExternalLink,
  ShieldCheck,
  Check,
  Bot,
  School,
  Sliders
} from 'lucide-react';
import { Navbar, ActiveTab } from './components/Navbar';
import { TopicsView } from './components/TopicsView';
import { ExamsView } from './components/ExamsView';
import { FormulaGuide } from './components/FormulaGuide';
import { Calculator } from './components/Calculator';
import { QuizRunner } from './components/QuizRunner';
import { ExamRunner } from './components/ExamRunner';
import { MizuPortalViewer, SecretPortalTarget, PORTAL_TARGETS } from './components/MizuPortalViewer';
import { CustomQuizModal } from './components/CustomQuizModal';
import { QuizCustomizer } from './components/QuizCustomizer';
import { SchoolLoginModal } from './components/SchoolLoginModal';
import { GeodvsSupportModal } from './components/GeodvsSupportModal';
import { MathCategory, MathQuestion, ExamConfig, UserExamAttempt } from './types/math';
import { SchoolUser } from './types/auth';
import { mathQuestions } from './data/mathQuestions';
import { predefinedExams } from './data/exams';
import { prepareQuizQuestions } from './utils/shuffle';

const LOCAL_STORAGE_KEY_ATTEMPTS = 'testquiz_exam_attempts_v1';
const LOCAL_STORAGE_KEY_MIZU = 'testquiz_mizu_unlocked_v1';
const LOCAL_STORAGE_KEY_CODE = 'testquiz_mizu_code_v1';
const LOCAL_STORAGE_KEY_USER = 'testquiz_school_user_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('topics');
  
  // School-based Account (Google / Clever for Student & Teacher)
  const [currentUser, setCurrentUser] = useState<SchoolUser | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // GEODVS-Support Modal State (AI Issue Reporting Tool)
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [activeReportContext, setActiveReportContext] = useState<{ id: string; title: string; category?: string } | null>(null);

  // Quiz & Exam Session State
  const [activeQuiz, setActiveQuiz] = useState<{ questions: MathQuestion[]; title: string } | null>(null);
  const [activeExam, setActiveExam] = useState<ExamConfig | null>(null);

  // Floating Calculator modal
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Custom Quiz quick-modal
  const [isCustomQuizModalOpen, setIsCustomQuizModalOpen] = useState(false);

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
  const [activePortalId, setActivePortalId] = useState<SecretPortalTarget['id']>('mizu');

  // Exam records in localStorage
  const [examAttempts, setExamAttempts] = useState<UserExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Handle Login & Logout
  const handleLogin = (user: SchoolUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
    } catch {
      // Ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    } catch {
      // Ignore
    }
  };

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

  // Triggered when secret codes ({234+0} or {0001}) are entered into calculator
  const handleUnlockPortal = (portalId: SecretPortalTarget['id'], generatedCode: string) => {
    setActivePortalId(portalId);
    if (portalId === 'mizu') {
      setMizuUnlocked(true);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_MIZU, 'true');
      } catch {
        // Ignore
      }
    }
    setMizuAccessCode(generatedCode);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CODE, generatedCode);
    } catch {
      // Ignore
    }
    // Directly open the portal viewer within TestQuiz
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

    // Shuffle question order and randomize answer options
    const prepared = prepareQuizQuestions(pool);
    setActiveExam(null);
    setActiveQuiz({ questions: prepared, title });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch pre-made exam by category
  const handleSelectExamByCategory = (category: MathCategory) => {
    const matchingExam = predefinedExams.find(e => e.category === category) || predefinedExams[0];
    handleStartExam(matchingExam);
  };

  const handleStartExam = (exam: ExamConfig) => {
    const preparedQuestions = prepareQuizQuestions(exam.questions);
    setActiveQuiz(null);
    setActiveExam({ ...exam, questions: preparedQuestions });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCustomQuiz = (questions: MathQuestion[], title: string) => {
    const prepared = prepareQuizQuestions(questions);
    setActiveExam(null);
    setActiveQuiz({ questions: prepared, title });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReportWithQuestion = (context: { id: string; title: string; category?: string }) => {
    setActiveReportContext(context);
    setIsSupportModalOpen(true);
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
        onOpenSupportModal={() => {
          setActiveReportContext(null);
          setIsSupportModalOpen(true);
        }}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
      />

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
            onReportQuestion={handleOpenReportWithQuestion}
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
                onOpenCustomQuiz={() => setActiveTab('custom-quizzes')}
                onOpenSupport={() => {
                  setActiveReportContext(null);
                  setIsSupportModalOpen(true);
                }}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                currentUser={currentUser}
                recentAttempts={examAttempts}
              />
            )}

            {activeTab === 'exams' && (
              <ExamsView
                onStartExam={handleStartExam}
                attempts={examAttempts}
              />
            )}

            {activeTab === 'custom-quizzes' && (
              <QuizCustomizer
                onBack={() => setActiveTab('topics')}
                onLaunchQuiz={(questions, title) => {
                  setActiveExam(null);
                  setActiveQuiz({ questions: prepareQuizQuestions(questions), title });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onLaunchExam={(exam) => {
                  setActiveQuiz(null);
                  setActiveExam({ ...exam, questions: prepareQuizQuestions(exam.questions) });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                currentUser={currentUser}
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

                <Calculator onUnlockPortal={handleUnlockPortal} />
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
            <button onClick={() => { setActiveTab('topics'); setActiveQuiz(null); setActiveExam(null); }} className="hover:text-white transition cursor-pointer">
              Topics
            </button>
            <button onClick={() => { setActiveTab('exams'); setActiveQuiz(null); setActiveExam(null); }} className="hover:text-white transition cursor-pointer">
              Exams
            </button>
            <button onClick={() => { setActiveTab('custom-quizzes'); setActiveQuiz(null); setActiveExam(null); }} className="hover:text-white transition cursor-pointer">
              Customize Quizzes
            </button>
            <button onClick={() => { setActiveTab('formulas'); setActiveQuiz(null); setActiveExam(null); }} className="hover:text-white transition cursor-pointer">
              Formulas
            </button>
            <button onClick={() => { setActiveReportContext(null); setIsSupportModalOpen(true); }} className="hover:text-white transition text-sky-400 font-semibold cursor-pointer">
              GEODVS-Support
            </button>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} TestQuiz Platform. Integrated School SSO &amp; GEODVS AI.
          </p>
        </div>
      </footer>

      {/* Floating Action Launcher for Calculator */}
      {!isCalculatorOpen && (
        <button
          onClick={() => setIsCalculatorOpen(true)}
          className="fixed bottom-6 right-6 z-30 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-2xl hover:shadow-sky-500/20 border border-slate-700/80 transition-all hover:scale-105 group flex items-center gap-2 cursor-pointer"
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
              onUnlockPortal={handleUnlockPortal}
              isFloating={true}
              onCloseFloating={() => setIsCalculatorOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Custom Quiz Quick-Modal (if triggered from quick selector) */}
      <CustomQuizModal
        isOpen={isCustomQuizModalOpen}
        onClose={() => setIsCustomQuizModalOpen(false)}
        onStartCustomQuiz={handleStartCustomQuiz}
      />

      {/* GEODVS-Support AI Issue Reporting Modal */}
      <GeodvsSupportModal
        isOpen={isSupportModalOpen}
        onClose={() => {
          setIsSupportModalOpen(false);
          setActiveReportContext(null);
        }}
        currentUser={currentUser}
        activeQuestionContext={activeReportContext}
      />

      {/* School Account Single Sign-On Modal (Google / Clever for Student & Teacher) */}
      <SchoolLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Secret Portal In-Site Viewer Modal (Triggered by {234+0} or {0001} in calculator) */}
      <MizuPortalViewer
        isOpen={isMizuPortalOpen}
        onClose={() => setIsMizuPortalOpen(false)}
        accessCode={mizuAccessCode}
        portal={PORTAL_TARGETS[activePortalId]}
      />

    </div>
  );
}
