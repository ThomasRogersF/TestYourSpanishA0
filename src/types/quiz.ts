
export type QuestionType = 'mcq' | 'image-selection' | 'audio' | 'text';

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
  audioUrl?: string;
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

export interface QuizConfig {
  id: string;
  title: string;
  description?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  webhookUrl: string;
  questions: QuizQuestion[];
  resultTemplates: ResultTemplate[];
  incentiveEnabled: boolean;
  incentiveTitle?: string;
  incentiveUrl?: string;
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
}

export interface QuizAdminProps {
  config: QuizConfig;
  onConfigUpdate: (config: QuizConfig) => void;
}
