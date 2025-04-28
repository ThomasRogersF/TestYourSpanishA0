
import { useState } from "react";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import ProgressBar from "./ProgressBar";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import ImageSelection from "./QuestionTypes/ImageSelection";
import AudioQuestion from "./QuestionTypes/AudioQuestion";
import TextInput from "./QuestionTypes/TextInput";

interface QuestionCardProps {
  question: QuizQuestion;
  progress: number;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
}

const QuestionCard = ({ 
  question, 
  progress,
  currentAnswer,
  onAnswer, 
  onNext 
}: QuestionCardProps) => {
  const renderQuestionType = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <MultipleChoice
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      case 'image-selection':
        return (
          <ImageSelection
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      case 'audio':
        return (
          <AudioQuestion
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      case 'text':
        return (
          <TextInput
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="quiz-container w-full max-w-2xl">
      <ProgressBar progress={progress} />
      
      <h2 className="text-2xl font-semibold mb-4">{question.title}</h2>
      
      {question.subtitle && (
        <p className="text-gray-600 mb-6">{question.subtitle}</p>
      )}
      
      {renderQuestionType()}
    </div>
  );
};

export default QuestionCard;
