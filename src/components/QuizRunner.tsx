import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw, 
  Lightbulb, 
  ListOrdered, 
  ArrowLeft,
  Sparkles,
  Award,
  Layers,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathQuestion, MathCategory } from '../types/math';
import { GeometryDiagram } from './GeometryDiagram';
import { playSuccessSound, playErrorSound, playClickSound } from '../utils/sound';

interface Props {
  questions: MathQuestion[];
  categoryTitle?: string;
  onExit: () => void;
  onTakeExam?: () => void;
  onReportQuestion?: (context: { id: string; title: string; category?: string }) => void;
}

export const QuizRunner: React.FC<Props> = ({ 
  questions, 
  categoryTitle = 'Practice Quiz', 
  onExit,
  onTakeExam,
  onReportQuestion
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userHistory, setUserHistory] = useState<Array<{ qId: string; selected: number; correct: boolean }>>([]);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    playClickSound();
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsAnswered(true);

    if (isCorrect) {
      playSuccessSound();
      setScore(s => s + 1);
    } else {
      playErrorSound();
    }

    setUserHistory(prev => [
      ...prev, 
      { qId: currentQ.id, selected: selectedOption, correct: isCorrect }
    ]);
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setShowSteps(false);
    } else {
      setQuizFinished(true);
      if (score >= questions.length * 0.7) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestart = () => {
    playClickSound();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setShowSteps(false);
    setScore(0);
    setUserHistory([]);
    setQuizFinished(false);
  };

  if (!currentQ && !quizFinished) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
        <p className="text-slate-600">No questions available for this selection.</p>
        <button 
          onClick={onExit}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-semibold"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  // Final Completion Screen
  if (quizFinished) {
    const accuracy = Math.round((score / questions.length) * 100);
    const passed = accuracy >= 70;

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 to-indigo-700 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Award className="w-9 h-9 text-amber-300" />
          </div>
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-sky-100 text-sm mt-1">{categoryTitle}</p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Score card */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Total Score</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{score} / {questions.length}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Accuracy</span>
              <p className={`text-2xl sm:text-3xl font-extrabold mt-1 ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {accuracy}%
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Status</span>
              <p className={`text-base sm:text-lg font-bold mt-2 ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {passed ? 'Mastered 🌟' : 'Needs Practice'}
              </p>
            </div>
          </div>

          {/* Performance message */}
          <div className={`p-4 rounded-xl border ${
            passed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <p className="text-sm font-medium">
              {passed 
                ? 'Excellent work! You have demonstrated strong mastery over these mathematical concepts.' 
                : 'Good effort! Review the step-by-step explanations or consult our formula cheat sheets to strengthen your understanding.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full sm:flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry This Quiz</span>
            </button>

            {onTakeExam && (
              <button
                onClick={onTakeExam}
                className="w-full sm:flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Take Formal Exam</span>
              </button>
            )}

            <button
              onClick={onExit}
              className="w-full sm:w-auto py-3 px-5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-sm transition"
            >
              Return to Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
      
      {/* Top Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Back to topics"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">{categoryTitle}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="capitalize">{currentQ.topic}</span>
              <span>•</span>
              <span className={`px-1.5 py-0.2 rounded font-medium text-[10px] uppercase ${
                currentQ.difficulty === 'easy' ? 'bg-emerald-950 text-emerald-400' :
                currentQ.difficulty === 'medium' ? 'bg-amber-950 text-amber-400' :
                'bg-rose-950 text-rose-400'
              }`}>
                {currentQ.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Counter & Score */}
        <div className="flex items-center gap-4 text-sm font-mono">
          <div className="text-right">
            <span className="text-slate-400 text-xs block">QUESTION</span>
            <span className="font-bold text-sky-400">{currentIndex + 1}</span>
            <span className="text-slate-500 text-xs"> / {questions.length}</span>
          </div>
          <div className="text-right pl-3 border-l border-slate-700">
            <span className="text-slate-400 text-xs block">SCORE</span>
            <span className="font-bold text-emerald-400">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 h-1.5">
        <div 
          className="bg-sky-500 h-1.5 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Body */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed whitespace-pre-line">
            {currentQ.question}
          </h3>

          {/* Formula tag if provided */}
          {currentQ.formula && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono text-slate-700 border border-slate-200">
              <span className="text-slate-400">Formula:</span>
              <span className="font-semibold text-slate-900">{currentQ.formula}</span>
            </div>
          )}
        </div>

        {/* Diagram if applicable */}
        {currentQ.diagram && (
          <GeometryDiagram diagram={currentQ.diagram} labels={currentQ.diagramLabels} />
        )}

        {/* Options grid */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = idx === currentQ.correctIndex;

            let optionStyle = 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 bg-white text-slate-800';

            if (isAnswered) {
              if (isCorrectAnswer) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/30';
              } else if (isSelected && !isCorrectAnswer) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/30';
              } else {
                optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-500/30 font-medium';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between text-sm sm:text-base cursor-pointer ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                    isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {letter}
                  </span>
                  <span className="font-mono">{option}</span>
                </div>

                {isAnswered && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                )}
                {isAnswered && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Accordion & GEODVS Report */}
        <div className="pt-2 flex items-center justify-between">
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Need a hint?</span>
            </button>
          ) : (
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Hint:</span>
                <span>{currentQ.hint}</span>
              </div>
            </div>
          )}

          {onReportQuestion && (
            <button
              onClick={() => onReportQuestion({ id: currentQ.id, title: currentQ.question, category: currentQ.category })}
              className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 transition"
              title="Report an error or issue with this question"
            >
              <Bot className="w-3.5 h-3.5 text-sky-600" />
              <span>GEODVS Report</span>
            </button>
          )}
        </div>

        {/* Explanation & Steps (shown after answering) */}
        {isAnswered && (
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Detailed Explanation
              </span>
              <button
                onClick={() => setShowSteps(s => !s)}
                className="text-xs text-sky-700 hover:underline font-semibold flex items-center gap-1"
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>{showSteps ? 'Hide steps' : 'View step-by-step breakdown'}</span>
              </button>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              {currentQ.explanation}
            </p>

            {showSteps && (
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5">
                <span className="text-xs font-semibold text-slate-600 block mb-1">Mathematical Steps:</span>
                {currentQ.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs font-mono text-slate-700 bg-white p-2 rounded border border-slate-200">
                    <span className="text-sky-600 font-bold shrink-0">Step {sIdx + 1}:</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-400">
            {isAnswered ? 'Review your answer above' : 'Select an option and confirm'}
          </div>

          <div className="flex items-center gap-3">
            {!isAnswered ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm shadow-md transition"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>{currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
