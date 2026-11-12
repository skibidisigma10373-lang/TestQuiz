import { MathQuestion } from '../types/math';

/**
 * Shuffles the options of a question and updates the correctIndex
 * so the correct answer is never predictably in position A (index 0).
 */
export function shuffleQuestionOptions(question: MathQuestion): MathQuestion {
  const correctAnswer = question.options[question.correctIndex];
  
  // Clone options array
  const options = [...question.options];
  
  // Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // Find where the correct answer ended up
  const newCorrectIndex = options.indexOf(correctAnswer);

  return {
    ...question,
    options,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
  };
}

/**
 * Shuffles an array of questions, and shuffles the options of every question
 */
export function prepareQuizQuestions(questions: MathQuestion[]): MathQuestion[] {
  // First shuffle the question order
  const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
  
  // Then randomize options inside each question
  return shuffledQuestions.map(q => shuffleQuestionOptions(q));
}
