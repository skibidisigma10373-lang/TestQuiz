import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  FileCheck, 
  RotateCcw, 
  Printer, 
  ArrowLeft,
  Award,
  Sparkles,
  BarChart3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamConfig, MathQuestion, UserExamAttempt } from '../types/math';
import { GeometryDiagram } from './GeometryDiagram';
import { playClickSound, playSuccessSound, playErrorSound } from '../utils/sound';
import { prepareQuizQuestions } from '../utils/shuffle';

interface Props {
  exam: ExamConfig;
  onExit: () => void;
  onSaveAttempt?: (attempt: UserExamAttempt) => void;
}

export const ExamRunner: React.FC<Props> = ({ exam, onExit, onSaveAttempt }) => {
  const [questions] = useState<MathQuestion[]>(() => prepareQuizQuestions(exam.questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const currentQ = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (examSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeftSeconds <= 180 && !examSubmitted;

  const handleSelectAnswer = (optionIdx: number) => {
    if (examSubmitted) return;
    playClickSound();
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const handleToggleFlag = () => {
    playClickSound();
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleSubmitExam = () => {
    playClickSound();
    setExamSubmitted(true);
    setShowConfirmSubmit(false);

    // Calculate score
    let correctCount = 0;
    const catMap: Record<string, { correct: number; total: number }> = {};

    questions.forEach(q => {
      if (!catMap[q.category]) {
        catMap[q.category] = { correct: 0, total: 0 };
      }
      catMap[q.category].total += 1;

      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
        catMap[q.category].correct += 1;
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    const passed = percent >= 70;

    if (passed) {
      playSuccessSound();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 }
      });
    } else {
      playErrorSound();
    }

    const timeSpent = exam.durationMinutes * 60 - timeLeftSeconds;

    const attempt: UserExamAttempt = {
      id: 'att-' + Date.now(),
      examId: exam.id,
      examTitle: exam.title,
      completedAt: new Date().toISOString(),
      score: correctCount,
      totalQuestions: questions.length,
      percentage: percent,
      timeSpentSeconds: timeSpent,
      passed,
      categoryBreakdown: catMap,
      userAnswers
    };

    if (onSaveAttempt) {
      onSaveAttempt(attempt);
    }
  };

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  // Print results
  const handlePrint = () => {
    window.print();
  };

  // Exam Score Result View
  if (examSubmitted && !reviewMode) {
    let correctCount = 0;
    const catMap: Record<string, { correct: number; total: number }> = {};

    questions.forEach(q => {
      if (!catMap[q.category]) {
        catMap[q.category] = { correct: 0, total: 0 };
      }
      catMap[q.category].total += 1;
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
        catMap[q.category].correct += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 70;
    const timeSpentSeconds = exam.durationMinutes * 60 - timeLeftSeconds;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
          
          {/* Header Banner */}
          <div className={`p-8 text-white text-center ${
            passed 
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700' 
              : 'bg-gradient-to-r from-slate-800 to-slate-900'
          }`}>
            <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-md mb-3">
              <Award className="w-10 h-10 text-amber-300" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Exam Evaluation Completed</h1>
            <p className="text-sm opacity-90 mt-1">{exam.title}</p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Top Score Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 font-semibold uppercase">Final Score</span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{correctCount} / {questions.length}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 font-semibold uppercase">Grade</span>
                <p className={`text-2xl sm:text-3xl font-black mt-1 ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {percentage}%
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 font-semibold uppercase">Verdict</span>
                <p className={`text-sm sm:text-base font-bold mt-2 ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {passed ? 'PASSED (Honors)' : 'DID NOT PASS'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 font-semibold uppercase">Time Taken</span>
                <p className="text-lg sm:text-xl font-bold text-slate-800 mt-2 font-mono">
                  {formatTime(timeSpentSeconds)}
                </p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                <span>Performance Breakdown by Mathematical Branch</span>
              </h3>

              <div className="space-y-3">
                {Object.entries(catMap).map(([cat, data]) => {
                  const catPercent = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={cat} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="capitalize text-slate-800 font-bold">{cat}</span>
                        <span className="font-mono text-slate-600">{data.correct} of {data.total} correct ({catPercent}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            catPercent >= 75 ? 'bg-emerald-500' : catPercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${catPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReviewMode(true)}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Review Answers &amp; Solutions</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Report</span>
                </button>
              </div>

              <button
                onClick={onExit}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold text-sm transition"
              >
                Back to Exam Center
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Question review mode
  if (reviewMode) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setReviewMode(false)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base font-bold text-slate-900">Exam Solution Review</h2>
              <span className="text-xs text-slate-500">{exam.title}</span>
            </div>
          </div>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900"
          >
            Exit to Hub
          </button>
        </div>

        {/* List of all questions with answers & explanations */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctIndex;

            return (
              <div 
                key={q.id} 
                className={`bg-white rounded-2xl p-6 border shadow-sm ${
                  isCorrect ? 'border-emerald-200' : 'border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                      Question {idx + 1}
                    </span>
                    <span className="text-xs capitalize font-medium text-slate-500">{q.topic}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-4 h-4" /> Correct (+1)
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-lg">
                        <XCircle className="w-4 h-4" /> Incorrect (0)
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-base font-semibold text-slate-900 whitespace-pre-line mb-3">{q.question}</p>

                {q.diagram && <GeometryDiagram diagram={q.diagram} labels={q.diagramLabels} />}

                {/* Options list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                  {q.options.map((opt, optIdx) => {
                    const isStudentPick = userChoice === optIdx;
                    const isRightAnswer = optIdx === q.correctIndex;

                    let optBg = 'bg-slate-50 border-slate-200 text-slate-700';
                    if (isRightAnswer) {
                      optBg = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500';
                    } else if (isStudentPick && !isRightAnswer) {
                      optBg = 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400';
                    }

                    return (
                      <div key={optIdx} className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${optBg}`}>
                        <span className="font-mono">{String.fromCharCode(65 + optIdx)}. {opt}</span>
                        {isRightAnswer && <span className="text-[10px] uppercase font-bold text-emerald-700">Correct Answer</span>}
                        {isStudentPick && !isRightAnswer && <span className="text-[10px] uppercase font-bold text-rose-700">Your Answer</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
                  <span className="font-bold text-slate-900 block">Explanation &amp; Solution:</span>
                  <p>{q.explanation}</p>
                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    {q.steps.map((st, sI) => (
                      <div key={sI} className="font-mono text-[11px] text-slate-700">
                        • {st}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Normal Exam Taking Interface
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      
      {/* Exam Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">{exam.title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{exam.categoryLabel}</span>
              <span>•</span>
              <span>{questions.length} Questions</span>
            </div>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-mono font-bold text-sm border transition ${
            isLowTime 
              ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse' 
              : 'bg-slate-800 text-slate-200 border-slate-700'
          }`}>
            <Clock className={`w-4 h-4 ${isLowTime ? 'text-rose-400' : 'text-sky-400'}`} />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={() => setShowConfirmSubmit(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition"
          >
            Submit Exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Left 3 cols: Question Area */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 flex flex-col justify-between">
          <div>
            
            {/* Question Top metadata */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-sky-100 text-sky-900 px-2.5 py-1 rounded-lg">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-slate-500 font-medium capitalize">{currentQ.topic}</span>
              </div>

              <button
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                  flaggedQuestions[currentQ.id]
                    ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{flaggedQuestions[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}</span>
              </button>
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed whitespace-pre-line mb-4">
              {currentQ.question}
            </h3>

            {/* Diagram */}
            {currentQ.diagram && (
              <GeometryDiagram diagram={currentQ.diagram} labels={currentQ.diagramLabels} />
            )}

            {/* Options */}
            <div className="space-y-3 mt-6">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const letter = String.fromCharCode(65 + optIdx);

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 text-sm sm:text-base cursor-pointer ${
                      isSelected 
                        ? 'border-sky-600 bg-sky-50/80 text-sky-950 font-medium ring-2 ring-sky-500/30'
                        : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50 bg-white text-slate-800'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                      isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {letter}
                    </span>
                    <span className="font-mono">{opt}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
            <button
              onClick={() => {
                playClickSound();
                setCurrentIndex(i => Math.max(0, i - 1));
              }}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm text-slate-700 flex items-center gap-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-400 font-mono">
              {answeredCount} / {questions.length} Answered
            </span>

            {currentIndex + 1 < questions.length ? (
              <button
                onClick={() => {
                  playClickSound();
                  setCurrentIndex(i => Math.min(questions.length - 1, i + 1));
                }}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition"
              >
                <span>Review &amp; Submit</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right 1 col: Question Navigator Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Question Navigator
            </h4>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isFlagged = flaggedQuestions[q.id];

                let btnClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';

                if (isCurrent) {
                  btnClass = 'ring-2 ring-sky-600 bg-sky-50 text-sky-900 font-bold border-sky-400';
                } else if (isAnswered) {
                  btnClass = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      playClickSound();
                      setCurrentIndex(idx);
                    }}
                    className={`h-9 rounded-lg border text-xs font-mono relative flex items-center justify-center transition cursor-pointer ${btnClass}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
                <span>Unanswered ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Flagged for Review</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition"
            >
              Submit Exam Now
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-slate-900">Confirm Exam Submission?</h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              You have answered <span className="font-bold text-slate-900">{answeredCount}</span> out of <span className="font-bold text-slate-900">{questions.length}</span> questions.
              {unansweredCount > 0 && (
                <span className="block mt-1 text-amber-700 font-medium">
                  Notice: You still have {unansweredCount} unanswered questions remaining.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition"
              >
                Yes, Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
