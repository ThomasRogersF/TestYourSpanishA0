
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "./ProgressBar";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import ImageSelection from "./QuestionTypes/ImageSelection";
import AudioQuestion from "./QuestionTypes/AudioQuestion";
import TextInput from "./QuestionTypes/TextInput";
import FillInBlanks from "./QuestionTypes/FillInBlanks";
import OrderQuestion from "./QuestionTypes/OrderQuestion";
import PronunciationQuestion from "./QuestionTypes/PronunciationQuestion";
import { useNotification } from "@/hooks/useNotification";
import { Notification } from "@/components/ui/Notification";

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
  const { notification, showAnswerNotification } = useNotification();

  // Calculate question number based on question ID
  const getQuestionNumber = () => {
    // Extract number from question ID (e.g., "q1" -> "1")
    const match = question.id.match(/\d+/);
    return match ? match[0] : "1";
  };

  // Special handling for question 2 to extract conversation
  const getQuestionContent = () => {
    if (question.id === "q2" && question.title.includes("conversation:")) {
      const parts = question.title.split("conversation:");
      return {
        mainQuestion: "Complete the following conversation",
        conversation: parts[1].trim()
      };
    }
    return { mainQuestion: question.title, conversation: null };
  };

  const { mainQuestion, conversation } = getQuestionContent();

  const renderQuestionType = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <MultipleChoice
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
            onNotification={showAnswerNotification}
          />
        );
      case 'image-selection':
        return (
          <ImageSelection
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
            onNotification={showAnswerNotification}
          />
        );
      case 'audio':
        return (
          <AudioQuestion
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
            onNotification={showAnswerNotification}
          />
        );
      case 'text':
        return (
          <TextInput
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
            onNotification={showAnswerNotification}
          />
        );
      case 'fill-in-blanks':
        return (
          <FillInBlanks
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
            onNotification={showAnswerNotification}
          />
        );
      case 'order':
        return (
          <OrderQuestion
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
            onNotification={showAnswerNotification}
          />
        );
      case 'pronunciation':
        return (
          <PronunciationQuestion
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
            onNotification={showAnswerNotification}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Notification Component */}
      <Notification notification={notification} />

      {/* Top actions: SpanishVIP link and Previous question */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.parent.postMessage({ action: 'redirect', url: 'https://spanishvip.com/' }, '*')}
          aria-label="Go to SpanishVIP website"
          title="SpanishVIP"
        >
          SpanishVIP
        </Button>

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

      {/* Main question container */}
      <div className="quiz-container animate-scale-in shadow-soft">
        <ProgressBar progress={progress} />

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">
          {getQuestionNumber()}. {mainQuestion}
        </h2>

        {/* Special conversation box for question 2 - inside quiz container */}
        {question.id === "q2" && conversation && (
          <div className="mb-6 p-6 bg-gray-50 border-2 border-gray-200 rounded-[1rem] shadow-sm">
            <div className="text-gray-700 whitespace-pre-line font-mono text-lg leading-relaxed">
              {conversation}
            </div>
          </div>
        )}

        {question.subtitle && (
          <p className="text-gray-600 mb-6">{question.subtitle}</p>
        )}

        {renderQuestionType()}
      </div>
    </div>
  );
};

export default QuestionCard;
