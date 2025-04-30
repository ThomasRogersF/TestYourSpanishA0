export interface Option {
  id: string;
  label: string;
  description?: string;
  image?: string;
  isCorrect?: boolean;
  nextQuestionId?: string;
  resultId?: string;
}

export interface Question {
  id: string;
  label: string;
  text: string;
  type: "single" | "multiple" | "image";
  options: Option[];
}

export interface ResultTemplate {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  requiredScore?: number;
}

export interface QuizParticipant {
  name: string;
  email: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string | string[];
}

// Extend the QuizConfig interface to add properties for the introduction page
export interface QuizConfig {
  id: string;
  title: string;
  description?: string;
  logoUrl?: string;
  introImageUrl?: string;  // New property for intro image
  introText?: string;      // New property for detailed intro text
  estimatedTime?: string;  // New property for estimated completion time
  primaryColor?: string;
  questions: Question[];
  resultTemplates: ResultTemplate[];
  webhookUrl?: string;
  thankYouMessage?: string;
  thankYouHeading?: string;
}
