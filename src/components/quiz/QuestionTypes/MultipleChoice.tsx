
import { useState, useEffect } from "react";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultipleChoiceProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
}

const MultipleChoice = ({ 
  question, 
  currentAnswer,
  onAnswer, 
  onNext 
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
      onNext();
    } else {
      console.log("MultipleChoice: Cannot proceed - No option selected and question is required");
    }
  };

  return (
    <div className="space-y-6">
      {question.options && question.options.map((option) => (
        <div
          key={option.id}
          onClick={() => handleOptionSelect(option.value)}
          className={cn(
            "p-4 border rounded-lg cursor-pointer transition-colors",
            selectedOption === option.value
              ? "border-quiz-purple bg-quiz-purple bg-opacity-10"
              : "border-gray-200 hover:border-quiz-purple-light"
          )}
        >
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center",
                selectedOption === option.value
                  ? "bg-quiz-purple text-white"
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
        {!question.required && (
          <Button
            variant="outline"
            onClick={onNext}
            className="text-gray-500"
          >
            Skip
          </Button>
        )}
        <Button 
          onClick={handleNext}
          className="quiz-button ml-auto"
          disabled={question.required && !selectedOption}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MultipleChoice;
