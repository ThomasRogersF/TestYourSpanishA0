
import { QuizQuestion, QuizOption, QuizImageOption, ResultTemplate } from "./quiz";

// Interface for question templates with correct answer indication
export interface QuestionTemplate extends Omit<QuizQuestion, 'options' | 'imageOptions'> {
  options?: (QuizOption & { isCorrect?: boolean })[];
  imageOptions?: (QuizImageOption & { isCorrect?: boolean })[];
  correctAnswer?: string | string[];
}

// Export question and result template collections
export interface QuizTemplateCollection {
  questions: QuestionTemplate[];
  resultTemplates: ResultTemplate[];
}
