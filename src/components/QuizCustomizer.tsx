import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Play, 
  CheckCircle2, 
  Sliders, 
  Sparkles, 
  BookOpen, 
  Copy, 
  ArrowLeft,
  Save,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  FileCheck
} from 'lucide-react';
import { MathQuestion, MathCategory, DifficultyLevel, ExamConfig } from '../types/math';
import { mathQuestions } from '../data/mathQuestions';
import { SchoolUser } from '../types/auth';

export interface CustomQuiz {
  id: string;
  title: string;
  description: string;
  category: MathCategory | 'mixed';
  author: string;
  authorRole: string;
  durationMinutes: number;
  questions: MathQuestion[];
  createdAt: string;
}

interface Props {
  onBack: () => void;
  onLaunchQuiz: (questions: MathQuestion[], title: string) => void;
  onLaunchExam: (exam: ExamConfig) => void;
  currentUser: SchoolUser | null;
}

const LOCAL_STORAGE_KEY_CUSTOM_QUIZZES = 'testquiz_custom_quizzes_v1';

export const QuizCustomizer: React.FC<Props> = ({
  onBack,
  onLaunchQuiz,
  onLaunchExam,
  currentUser
}) => {
  const [quizzes, setQuizzes] = useState<CustomQuiz[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_QUIZZES);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    // Default sample custom quiz
    return [
      {
        id: 'cust-1',
        title: 'High School Honors Geometry & Algebra Review',
        description: 'Teacher-curated review focusing on quadratic factoring, Pythagorean right triangles, and cylinder volumes.',
        category: 'mixed',
        author: 'Dr. Sarah Rodriguez',
        authorRole: 'teacher',
        durationMinutes: 15,
        createdAt: new Date().toISOString(),
        questions: [
          mathQuestions.find(q => q.id === 'alg-2') || mathQuestions[0],
          mathQuestions.find(q => q.id === 'geo-1') || mathQuestions[1],
          mathQuestions.find(q => q.id === 'geo-4') || mathQuestions[2],
          mathQuestions.find(q => q.id === 'trig-2') || mathQuestions[3]
        ]
      }
    ];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);

  // Form State for creating/editing a custom quiz
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [quizQuestions, setQuizQuestions] = useState<MathQuestion[]>([]);

  // Bank selector drawer
  const [showBankPicker, setShowBankPicker] = useState(false);
  const [bankCategoryFilter, setBankCategoryFilter] = useState<MathCategory | 'all'>('all');

  // New Custom Question Modal state
  const [isAuthoringQuestion, setIsAuthoringQuestion] = useState(false);
  const [qTopic, setQTopic] = useState('Algebra');
  const [qCategory, setQCategory] = useState<MathCategory>('algebra');
  const [qDifficulty, setQDifficulty] = useState<DifficultyLevel>('medium');
  const [qQuestion, setQQuestion] = useState('');
  const [qFormula, setQFormula] = useState('');
  const [qOptA, setQOptA] = useState('');
  const [qOptB, setQOptB] = useState('');
  const [qOptC, setQOptC] = useState('');
  const [qOptD, setQOptD] = useState('');
  const [qCorrectIdx, setQCorrectIdx] = useState(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qHint, setQHint] = useState('');

  const saveQuizzesToStorage = (updated: CustomQuiz[]) => {
    setQuizzes(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CUSTOM_QUIZZES, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleStartNewQuiz = () => {
    setTitle(currentUser?.role === 'teacher' ? 'Classroom Mathematics Assessment' : 'My Custom Study Quiz');
    setDescription('Customized question set created on TestQuiz.');
    setDurationMinutes(15);
    setQuizQuestions([mathQuestions[0], mathQuestions[1]]);
    setEditingQuizId(null);
    setIsEditing(true);
  };

  const handleEditQuiz = (quiz: CustomQuiz) => {
    setTitle(quiz.title);
    setDescription(quiz.description);
    setDurationMinutes(quiz.durationMinutes);
    setQuizQuestions([...quiz.questions]);
    setEditingQuizId(quiz.id);
    setIsEditing(true);
  };

  const handleDeleteQuiz = (id: string) => {
    const updated = quizzes.filter(q => q.id !== id);
    saveQuizzesToStorage(updated);
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || quizQuestions.length === 0) return;

    const quizData: CustomQuiz = {
      id: editingQuizId || 'cust-' + Date.now(),
      title: title.trim(),
      description: description.trim() || 'Custom math evaluation',
      category: 'mixed',
      author: currentUser?.name || 'Educator / Student',
      authorRole: currentUser?.role || 'student',
      durationMinutes,
      questions: quizQuestions,
      createdAt: new Date().toISOString()
    };

    let updated: CustomQuiz[];
    if (editingQuizId) {
      updated = quizzes.map(q => q.id === editingQuizId ? quizData : q);
    } else {
      updated = [quizData, ...quizzes];
    }

    saveQuizzesToStorage(updated);
    setIsEditing(false);
  };

  const handleAddQuestionFromBank = (q: MathQuestion) => {
    if (!quizQuestions.some(existing => existing.id === q.id)) {
      setQuizQuestions(prev => [...prev, q]);
    }
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuizQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSaveCustomQuestion = () => {
    if (!qQuestion.trim() || !qOptA.trim() || !qOptB.trim()) return;

    const newQ: MathQuestion = {
      id: 'custom-q-' + Date.now(),
      category: qCategory,
      topic: qTopic || 'General Mathematics',
      difficulty: qDifficulty,
      question: qQuestion.trim(),
      formula: qFormula.trim() || undefined,
      options: [qOptA.trim(), qOptB.trim(), qOptC.trim() || 'None of the above', qOptD.trim() || 'Cannot be determined'],
      correctIndex: qCorrectIdx,
      explanation: qExplanation.trim() || 'Direct computation yields the answer.',
      steps: [qExplanation.trim() || 'Apply formula and simplify.'],
      hint: qHint.trim() || 'Review foundational definitions.'
    };

    setQuizQuestions(prev => [...prev, newQ]);
    setIsAuthoringQuestion(false);
    // Reset form
    setQQuestion('');
    setQOptA('');
    setQOptB('');
    setQOptC('');
    setQOptD('');
    setQFormula('');
    setQExplanation('');
    setQHint('');
  };

  const filteredBank = mathQuestions.filter(q => 
    bankCategoryFilter === 'all' || q.category === bankCategoryFilter
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
              title="Return to Hub"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-400/30 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-300" />
              <span>Quiz Customizer &amp; Builder</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Customize Your Own Mathematics Quizzes</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
            Create tailored problem sets for classroom exams or self-study. Combine questions from algebra, geometry, and calculus, or write your own custom questions with solutions.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleStartNewQuiz}
            className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-2xl shadow-lg transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Quiz</span>
          </button>
        )}
      </div>

      {/* Editing / Creating Mode */}
      {isEditing ? (
        <form onSubmit={handleSaveQuiz} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {editingQuizId ? 'Edit Custom Quiz' : 'Create Custom Quiz'}
              </h2>
              <p className="text-xs text-slate-500">Configure quiz metadata and select or write questions</p>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition"
            >
              Cancel
            </button>
          </div>

          {/* Quiz Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quiz Title
              </label>
              <input
                type="text"
                placeholder="e.g., Geometry Triangle Theorems & Quadratic Factoring"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Time Limit (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={120}
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quiz Description / Instructions
              </label>
              <input
                type="text"
                placeholder="e.g., Prepared for Period 3 Honors Math students or SAT practice."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Questions List Header */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Included Questions ({quizQuestions.length})
                </h3>
                <p className="text-xs text-slate-500">Add questions from the standard bank or author new problems</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBankPicker(prev => !prev)}
                  className="px-3.5 py-2 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                >
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>{showBankPicker ? 'Hide Question Bank' : '+ Add from Bank'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAuthoringQuestion(true)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Question</span>
                </button>
              </div>
            </div>

            {/* Bank Picker Drawer */}
            {showBankPicker && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Standard Question Bank
                  </span>
                  
                  {/* Category Filter */}
                  <select
                    value={bankCategoryFilter}
                    onChange={e => setBankCategoryFilter(e.target.value as any)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-xs font-medium"
                  >
                    <option value="all">All Topics</option>
                    <option value="algebra">Algebra</option>
                    <option value="geometry">Geometry</option>
                    <option value="trigonometry">Trigonometry</option>
                    <option value="calculus">Calculus</option>
                    <option value="statistics">Statistics</option>
                    <option value="arithmetic">Arithmetic</option>
                  </select>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredBank.map(q => {
                    const alreadyAdded = quizQuestions.some(item => item.id === q.id);
                    return (
                      <div
                        key={q.id}
                        className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1 truncate">
                          <span className="font-bold text-slate-900 block truncate">{q.question}</span>
                          <span className="text-slate-400 capitalize">{q.category} • {q.topic}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddQuestionFromBank(q)}
                          disabled={alreadyAdded}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                            alreadyAdded
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-sky-600 hover:bg-sky-700 text-white'
                          }`}
                        >
                          {alreadyAdded ? 'Added' : '+ Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Questions Selected Cards */}
            {quizQuestions.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-xs">
                No questions added yet. Click "+ Add from Bank" or "Write New Question".
              </div>
            ) : (
              <div className="space-y-3">
                {quizQuestions.map((q, idx) => (
                  <div
                    key={q.id + '-' + idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{q.question}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="capitalize text-sky-700 font-medium">{q.category}</span>
                          <span>•</span>
                          <span>Correct Answer: {q.options[q.correctIndex]}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      title="Remove question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={quizQuestions.length === 0 || !title.trim()}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Custom Quiz</span>
            </button>
          </div>

        </form>
      ) : (
        /* List of Custom Quizzes */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Your Customized Quizzes</h2>
            <span className="text-xs text-slate-500 font-mono">{quizzes.length} Quizzes Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quizzes.map(quiz => (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                      Custom Quiz
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{quiz.durationMinutes} min</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{quiz.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {quiz.description}
                  </p>

                  <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>{quiz.questions.length} Questions</span>
                    <span>•</span>
                    <span>By {quiz.author} ({quiz.authorRole})</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditQuiz(quiz)}
                      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                      title="Edit quiz"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete quiz"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLaunchQuiz(quiz.questions, quiz.title)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-800" />
                      <span>Practice</span>
                    </button>

                    <button
                      onClick={() => {
                        const examConfig: ExamConfig = {
                          id: quiz.id,
                          title: quiz.title,
                          category: 'all',
                          categoryLabel: 'Custom Exam',
                          description: quiz.description,
                          durationMinutes: quiz.durationMinutes,
                          badge: 'Custom Exam',
                          difficulty: 'mixed',
                          questions: quiz.questions
                        };
                        onLaunchExam(examConfig);
                      }}
                      className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Timed Exam</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Author New Question Modal */}
      {isAuthoringQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Author Custom Math Question</h3>
              <button onClick={() => setIsAuthoringQuestion(false)} className="text-slate-400 hover:text-slate-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                <select
                  value={qCategory}
                  onChange={e => setQCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs"
                >
                  <option value="algebra">Algebra</option>
                  <option value="geometry">Geometry</option>
                  <option value="trigonometry">Trigonometry</option>
                  <option value="calculus">Calculus</option>
                  <option value="statistics">Statistics</option>
                  <option value="arithmetic">Arithmetic</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Difficulty</label>
                <select
                  value={qDifficulty}
                  onChange={e => setQDifficulty(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Topic / Concept</label>
              <input
                type="text"
                placeholder="e.g., Quadratic Equations or Triangle Area"
                value={qTopic}
                onChange={e => setQTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Question Prompt</label>
              <textarea
                rows={2}
                placeholder="e.g., What is the perimeter of a regular pentagon with side length 7 cm?"
                value={qQuestion}
                onChange={e => setQQuestion(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Optional Formula</label>
              <input
                type="text"
                placeholder="e.g., P = 5s"
                value={qFormula}
                onChange={e => setQFormula(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
              />
            </div>

            {/* 4 Choices */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase block">
                Answer Choices (Select radio for correct answer)
              </label>
              
              <div className="space-y-1.5">
                {[
                  { label: 'A', val: qOptA, set: setQOptA, idx: 0 },
                  { label: 'B', val: qOptB, set: setQOptB, idx: 1 },
                  { label: 'C', val: qOptC, set: setQOptC, idx: 2 },
                  { label: 'D', val: qOptD, set: setQOptD, idx: 3 },
                ].map(opt => (
                  <div key={opt.label} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={qCorrectIdx === opt.idx}
                      onChange={() => setQCorrectIdx(opt.idx)}
                      className="accent-emerald-600 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-xs w-4">{opt.label}:</span>
                    <input
                      type="text"
                      placeholder={`Option ${opt.label}`}
                      value={opt.val}
                      onChange={e => opt.set(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border text-xs font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Step-by-Step Explanation</label>
              <textarea
                rows={2}
                placeholder="e.g., Multiply side length 7 by 5 sides: P = 5 * 7 = 35 cm."
                value={qExplanation}
                onChange={e => setQExplanation(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAuthoringQuestion(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomQuestion}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                Add Question
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
