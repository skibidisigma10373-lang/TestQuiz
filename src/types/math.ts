export type MathCategory = 
  | 'algebra' 
  | 'geometry' 
  | 'trigonometry' 
  | 'calculus' 
  | 'statistics' 
  | 'arithmetic';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface MathQuestion {
  id: string;
  category: MathCategory;
  topic: string;
  difficulty: DifficultyLevel;
  question: string;
  formula?: string;
  diagram?: 'right-triangle' | 'circle-radius' | 'parabola' | 'parallel-lines' | 'coordinate-plane' | 'cylinder-volume';
  diagramLabels?: {
    a?: string | number;
    b?: string | number;
    c?: string | number;
    r?: string | number;
    h?: string | number;
    angle?: string | number;
  };
  options: string[];
  correctIndex: number;
  explanation: string;
  steps: string[];
  hint: string;
}

export interface ExamConfig {
  id: string;
  title: string;
  category: MathCategory | 'all';
  categoryLabel: string;
  description: string;
  durationMinutes: number;
  questions: MathQuestion[];
  badge: string;
  difficulty: DifficultyLevel | 'mixed';
}

export interface UserExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  completedAt: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  passed: boolean;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  userAnswers: Record<string, number>; // questionId -> selectedIndex
}

export interface FormulaItem {
  id: string;
  name: string;
  category: MathCategory;
  formula: string;
  description: string;
  example: string;
}
