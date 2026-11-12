import React from 'react';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  Play, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { ExamConfig, UserExamAttempt } from '../types/math';
import { predefinedExams } from '../data/exams';

interface Props {
  onStartExam: (exam: ExamConfig) => void;
  attempts: UserExamAttempt[];
}

export const ExamsView: React.FC<Props> = ({ onStartExam, attempts }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-400/30">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Timed Standardized Evaluations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Mathematics Examinations &amp; Benchmarks</h1>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
          Take full-length standardized assessments under real exam conditions. Each test features strict timers, question navigation, flag-for-review, and instant diagnostic report generation.
        </p>
      </div>

      {/* Exam Cards */}
      <div className="space-y-4">
        {predefinedExams.map(exam => {
          const pastAttempt = attempts.find(a => a.examId === exam.id);

          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {exam.categoryLabel}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {exam.badge}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    exam.difficulty === 'hard' ? 'bg-rose-100 text-rose-800' :
                    exam.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {exam.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{exam.title}</h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  {exam.description}
                </p>

                {/* Exam Details Badges */}
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>{exam.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>{exam.questions.length} Multiple-Choice Questions</span>
                  </div>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                {pastAttempt && (
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Previous Score</span>
                    <span className={`font-mono font-bold text-sm ${pastAttempt.passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {pastAttempt.percentage}% ({pastAttempt.passed ? 'Passed' : 'Needs Work'})
                    </span>
                  </div>
                )}

                <button
                  onClick={() => onStartExam(exam)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-indigo-500/25 transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{pastAttempt ? 'Retake Exam' : 'Start Exam'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
