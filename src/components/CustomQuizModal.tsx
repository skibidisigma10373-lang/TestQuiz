import React, { useState } from 'react';
import { Sparkles, Sliders, Play, X, Check } from 'lucide-react';
import { MathCategory, DifficultyLevel, MathQuestion } from '../types/math';
import { mathQuestions } from '../data/mathQuestions';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomQuiz: (questions: MathQuestion[], title: string) => void;
}

export const CustomQuizModal: React.FC<Props> = ({ isOpen, onClose, onStartCustomQuiz }) => {
  const [selectedCategories, setSelectedCategories] = useState<MathCategory[]>([
    'algebra',
    'geometry',
    'trigonometry'
  ]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [questionCount, setQuestionCount] = useState<number>(5);

  if (!isOpen) return null;

  const allCategories: Array<{ id: MathCategory; label: string }> = [
    { id: 'algebra', label: 'Algebra' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'trigonometry', label: 'Trigonometry' },
    { id: 'calculus', label: 'Calculus' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'arithmetic', label: 'Arithmetic & Pre-Alg' }
  ];

  const toggleCategory = (cat: MathCategory) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(c => c !== cat);
      } else {
        return [...prev, cat];
      }
    });
  };

  const handleLaunch = () => {
    let pool = mathQuestions.filter(q => selectedCategories.includes(q.category));

    if (difficulty !== 'all') {
      const filteredByDiff = pool.filter(q => q.difficulty === difficulty);
      if (filteredByDiff.length > 0) {
        pool = filteredByDiff;
      }
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    const catLabels = selectedCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
    const title = `Custom Quiz (${catLabels})`;

    onStartCustomQuiz(selected, title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Custom Quiz Creator</h3>
              <p className="text-xs text-slate-500">Pick specific mathematics branches and difficulty</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Topics
          </label>
          <div className="grid grid-cols-2 gap-2">
            {allCategories.map(cat => {
              const active = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                    active
                      ? 'bg-sky-50 border-sky-500 text-sky-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  {active && <Check className="w-4 h-4 text-sky-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty level */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Difficulty Tier
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['all', 'easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`py-2 text-xs font-bold rounded-xl border capitalize transition cursor-pointer ${
                  difficulty === d
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {d === 'all' ? 'Mixed' : d}
              </button>
            ))}
          </div>
        </div>

        {/* Question Count */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-500">Number of Questions</span>
            <span className="font-mono font-bold text-sky-600 text-sm">{questionCount} questions</span>
          </div>
          <input
            type="range"
            min={3}
            max={15}
            step={1}
            value={questionCount}
            onChange={e => setQuestionCount(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>3 quick</span>
            <span>8 medium</span>
            <span>15 deep</span>
          </div>
        </div>

        {/* Launch button */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLaunch}
            className="flex-2 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Custom Quiz</span>
          </button>
        </div>

      </div>
    </div>
  );
};
