
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "./ProgressBar";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import ImageSelection from "./QuestionTypes/ImageSelection";
import AudioQuestion from "./QuestionTypes/AudioQuestion";
import TextInput from "./QuestionTypes/TextInput";
import FillInBlanks from "./QuestionTypes/FillInBlanks";

interface QuestionCardProps {
  question: QuizQuestion;
  progress: number;
  currentAnswer?: QuizAnswer;
  canGoBack: boolean;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionCard = ({ 
  question, 
  progress,
  currentAnswer,
  canGoBack,
  onAnswer, 
  onNext,
  onPrevious
}: QuestionCardProps) => {
  // Calculate question number based on question ID
  const getQuestionNumber = () => {
    // Extract number from question ID (e.g., "q1" -> "1")
    const match = question.id.match(/\d+/);
    return match ? match[0] : "1";
  };

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
      case 'fill-in-blanks':
        return (
          <FillInBlanks
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
    <div className="quiz-container w-full max-w-2xl animate-scale-in shadow-soft">
      {/* Previous question button in top corner */}
      <div className="flex justify-end mb-4">
        {canGoBack && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={16} />
            Previous question
          </Button>
        )}
      </div>

      <ProgressBar progress={progress} />
      
      <h2 className="text-2xl font-bold mb-4 text-brand-primary">
        {getQuestionNumber()}. {question.title}
      </h2>
      
      {question.subtitle && (
        <p className="text-gray-600 mb-6">{question.subtitle}</p>
      )}
      
      {renderQuestionType()}
    </div>
  );
};

export default QuestionCard;
