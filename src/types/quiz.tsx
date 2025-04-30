
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

// Extend the QuizConfig interface to add properties for the introduction page and external redirect
export interface QuizConfig {
  id: string;
  title: string;
  description?: string;
  logoUrl?: string;
  introImageUrl?: string;  // Property for intro image
  introText?: string;      // Property for detailed intro text
  estimatedTime?: string;  // Property for estimated completion time
  primaryColor?: string;
  questions: Question[];
  resultTemplates: ResultTemplate[];
  webhookUrl?: string;
  thankYouMessage?: string;
  thankYouHeading?: string;
  externalRedirectUrl?: string;  // Property for external redirect URL
}
