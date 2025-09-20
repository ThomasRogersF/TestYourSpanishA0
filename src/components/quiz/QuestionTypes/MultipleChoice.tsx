
import { useState, useEffect } from "react";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { isAnswerCorrect } from "@/utils/quizUtils";

interface MultipleChoiceProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onNotification?: (isCorrect: boolean) => void;
}

const MultipleChoice = ({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onNotification
}: MultipleChoiceProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    currentAnswer?.value as string || null
  );
  
  // Reset selected option when question changes
  useEffect(() => {
    console.log("MultipleChoice: Question or answer changed", question.id);
    setSelectedOption(currentAnswer?.value as string || null);
  }, [question.id, currentAnswer]);

  const handleOptionSelect = (optionValue: string) => {
    console.log("MultipleChoice: Option selected", optionValue);
    setSelectedOption(optionValue);
    
    onAnswer({
      questionId: question.id,
      type: 'mcq',
      value: optionValue
    });
  };

  const handleNext = () => {
    console.log("MultipleChoice: Next button clicked");
    // Ensure an option is selected before proceeding or allow skipping if not required
    if (selectedOption || !question.required) {
      console.log("MultipleChoice: Proceeding to next question");

      // Show debug notification if callback is provided
      if (onNotification && selectedOption) {
        const answer: QuizAnswer = {
          questionId: question.id,
          type: 'mcq',
          value: selectedOption
        };
        const isCorrect = isAnswerCorrect(answer);
        console.log("MultipleChoice: Answer correctness:", isCorrect);

        console.log('MultipleChoice: Setting notification:', isCorrect);
        onNotification(isCorrect);
      }

      onNext();
    } else {
      console.log("MultipleChoice: Cannot proceed - No option selected and question is required");
    }
  };

  const handleSkip = () => {
    console.log("MultipleChoice: Skip button clicked");
    onAnswer({
      questionId: question.id,
      type: 'mcq',
      value: null
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Heading for multiple choice questions */}
      <div className="text-lg font-medium text-gray-700 mb-4">
        Select the correct answer to the question 🤔
      </div>

      {/* Display image if imageUrl exists */}
      {question.imageUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={question.imageUrl}
            alt="Question visual"
            className="max-w-full max-h-64 rounded-lg shadow-md object-contain"
            onError={(e) => {
              console.error("Failed to load image:", question.imageUrl);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {question.options && question.options.map((option) => (
        <div
          key={option.id}
          onClick={() => handleOptionSelect(option.value)}
          className={cn(
            "p-4 border rounded-[1rem] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md",
            selectedOption === option.value
              ? "border-brand-primary bg-brand-background"
              : "border-gray-200 hover:border-brand-secondary"
          )}
        >
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300",
                selectedOption === option.value
                  ? "bg-brand-primary text-white"
                  : "border border-gray-300"
              )}
            >
              {selectedOption === option.value && <Check className="h-4 w-4" />}
            </div>
            <span className="font-medium">{option.text}</span>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleSkip}
          className="text-gray-500"
        >
          Skip question
        </Button>
        <Button 
          onClick={handleNext}
          className="quiz-button ml-auto shadow-soft"
          disabled={question.required && !selectedOption}
        >
          Next question
        </Button>
      </div>
    </div>
  );
};

export default MultipleChoice;
