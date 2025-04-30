
import { useState, useEffect } from "react";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
    setSelectedOption(currentAnswer?.value as string || null);
  }, [question.id, currentAnswer]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    onAnswer({
      questionId: question.id,
      type: 'mcq',
      value: optionId
    });
  };

  const handleNext = () => {
    // Ensure an option is selected before proceeding or allow skipping if not required
    if (selectedOption || !question.required) {
      console.log("Moving to next question from MultipleChoice");
      onNext();
    } else {
      console.log("Cannot proceed: No option selected and question is required");
    }
  };

  const isOptionSelected = (optionId: string) => {
    return selectedOption === optionId;
  };

  return (
    <div className="space-y-6">
      {question.options && question.options.map((option) => (
        <div
          key={option.id}
          onClick={() => handleOptionSelect(option.value)}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            isOptionSelected(option.value)
              ? "border-quiz-purple bg-quiz-purple bg-opacity-10"
              : "border-gray-200 hover:border-quiz-purple-light"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isOptionSelected(option.value)
                  ? "bg-quiz-purple text-white"
                  : "border border-gray-300"
              }`}
            >
              {isOptionSelected(option.value) && <Check className="h-4 w-4" />}
            </div>
            <span className="font-medium">{option.text}</span>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-4">
        {!question.required && (
          <Button
            variant="ghost"
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
