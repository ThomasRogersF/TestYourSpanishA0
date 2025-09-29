
export type QuestionType = 'mcq' | 'image-selection' | 'audio' | 'text' | 'fill-in-blanks' | 'order' | 'pronunciation';

export interface ConditionRule {
  questionId: string;
  answerId?: string;
  value?: string;
  nextQuestionId: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  helpText?: string;
  required: boolean;
  options?: QuizOption[];
  imageOptions?: QuizImageOption[];
  imageUrl?: string;
  audioUrl?: string;
  orderQuestion?: QuizOrderQuestion;
  pronunciationQuestion?: QuizPronunciationQuestion;
  conditionalLogic?: ConditionRule[];
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
}

export interface QuizImageOption {
  id: string;
  src: string;
  alt: string;
  value: string;
}

export interface QuizOrderQuestion {
  words: string[];
  correctAnswer: string;
}

export interface QuizPronunciationQuestion {
  word: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  description?: string;
  logoUrl?: string;
  introImageUrl?: string;
  introText?: string;
  estimatedTime?: string;
  primaryColor?: string;
  secondaryColor?: string;
  webhookUrl: string;
  questions: QuizQuestion[];
  resultTemplates: ResultTemplate[];
  incentiveEnabled: boolean;
  incentiveTitle?: string;
  incentiveUrl?: string;
  externalRedirectUrl?: string;
}

export interface ResultTemplate {
  id: string;
  title: string;
  description: string;
  conditions: {
    questionId: string;
    answerId?: string;
    value?: string;
  }[];
}

export interface QuizAnswer {
  questionId: string;
  type: QuestionType;
  value: string | string[] | File | null;
}

export interface QuizParticipant {
  name: string;
  email: string;
  answers: QuizAnswer[];
  totalTime?: number; // Total time spent on quiz in seconds
}

export interface QuizAdminProps {
  config: QuizConfig;
  onConfigUpdate: (config: QuizConfig) => void;
}
