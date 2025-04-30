
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { cn } from "@/lib/utils";
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
    currentAnswer ? currentAnswer.value as string : null
  );
  
  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    onAnswer({
      questionId: question.id,
      type: question.type,
      value: optionId
    });
  };
  
  const handleNext = () => {
    if (selectedOption || !question.required) {
      onNext();
    }
  };
  
  return (
    <div className="space-y-6">
      {question.options && question.options.map((option) => (
        <div 
          key={option.id}
          className={cn(
            "quiz-option",
            selectedOption === option.id && "quiz-option-selected"
          )}
          onClick={() => handleSelect(option.id)}
        >
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
            {selectedOption === option.id && (
              <Check className="w-4 h-4 text-quiz-purple" />
            )}
          </div>
          <span>{option.text}</span>
        </div>
      ))}
      
      <div className="flex justify-between mt-8">
        <Button 
          type="button" 
          variant="outline" 
          className="quiz-button-secondary"
          onClick={onNext}
          disabled={question.required && !selectedOption}
        >
          Skip
        </Button>
        <Button 
          type="button" 
          className="quiz-button"
          onClick={handleNext}
          disabled={question.required && !selectedOption}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MultipleChoice;
