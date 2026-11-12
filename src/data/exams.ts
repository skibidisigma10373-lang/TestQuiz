import { ExamConfig, MathCategory } from '../types/math';
import { mathQuestions } from './mathQuestions';

export const predefinedExams: ExamConfig[] = [
  {
    id: 'exam-algebra-1',
    title: 'Algebra I & Functions Diagnostic Exam',
    category: 'algebra',
    categoryLabel: 'Algebra',
    description: 'Comprehensive test covering linear equations, factoring, quadratics, functions, and systems of equations.',
    durationMinutes: 15,
    badge: 'Core Curriculum',
    difficulty: 'medium',
    questions: mathQuestions.filter(q => q.category === 'algebra')
  },
  {
    id: 'exam-geometry-mastery',
    title: 'Euclidean Geometry & Trigonometry Honors',
    category: 'geometry',
    categoryLabel: 'Geometry & Trig',
    description: 'Mastery assessment on Pythagorean theorem, circles, parallel lines, 3D volume, and trigonometric identities.',
    durationMinutes: 20,
    badge: 'Honors Level',
    difficulty: 'medium',
    questions: mathQuestions.filter(q => q.category === 'geometry' || q.category === 'trigonometry')
  },
  {
    id: 'exam-calculus-preview',
    title: 'AP Calculus AB Readiness Benchmark',
    category: 'calculus',
    categoryLabel: 'Calculus',
    description: 'Calculus evaluation testing limits, power rule derivatives, chain rule applications, and definite integrals.',
    durationMinutes: 15,
    badge: 'Advanced Placement',
    difficulty: 'hard',
    questions: mathQuestions.filter(q => q.category === 'calculus')
  },
  {
    id: 'exam-sat-standard',
    title: 'Standardized Math Mock Exam (SAT/ACT Style)',
    category: 'all',
    categoryLabel: 'Comprehensive',
    description: 'Mixed battery across Algebra, Geometry, Statistics, and Pre-Algebra designed to simulate standardized test conditions.',
    durationMinutes: 25,
    badge: 'Standardized Mock',
    difficulty: 'mixed',
    questions: [
      ...mathQuestions.filter(q => q.category === 'algebra').slice(0, 3),
      ...mathQuestions.filter(q => q.category === 'geometry').slice(0, 3),
      ...mathQuestions.filter(q => q.category === 'trigonometry').slice(0, 2),
      ...mathQuestions.filter(q => q.category === 'arithmetic').slice(0, 2),
      ...mathQuestions.filter(q => q.category === 'statistics').slice(0, 2),
    ]
  },
  {
    id: 'exam-stats-arithmetic',
    title: 'Applied Statistics & Quantitative Reasoning',
    category: 'statistics',
    categoryLabel: 'Stats & Arithmetic',
    description: 'Focuses on numerical proficiency, probability trees, central tendency, percentages, and combinations.',
    durationMinutes: 15,
    badge: 'Practical Math',
    difficulty: 'medium',
    questions: [
      ...mathQuestions.filter(q => q.category === 'statistics'),
      ...mathQuestions.filter(q => q.category === 'arithmetic')
    ]
  }
];

export const categoryMeta: Record<MathCategory, { name: string; color: string; bg: string; border: string; desc: string }> = {
  algebra: {
    name: 'Algebra',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    desc: 'Linear systems, quadratic roots, exponents, polynomials, and function inverses.'
  },
  geometry: {
    name: 'Geometry',
    color: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    desc: 'Triangles, circle theorems, coordinate geometry, angles, and 3D solid volumes.'
  },
  trigonometry: {
    name: 'Trigonometry',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    desc: 'Sine, cosine, tangent, unit circle values, Pythagorean identity, and Law of Sines.'
  },
  calculus: {
    name: 'Calculus',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    desc: 'Limits, derivatives, power and chain rules, and definite integrals.'
  },
  statistics: {
    name: 'Statistics & Probability',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: 'Mean, median, mode, sample spaces, dice/card probability, and combinations.'
  },
  arithmetic: {
    name: 'Arithmetic & Pre-Algebra',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    desc: 'Order of operations (PEMDAS), fractions, ratios, discount percentages, and foundations.'
  }
};
