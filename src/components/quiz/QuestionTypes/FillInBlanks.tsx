
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { useToast } from "@/components/ui/use-toast";

interface FillInBlanksProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
}

const FillInBlanks: React.FC<FillInBlanksProps> = ({
  question,
  currentAnswer,
  onAnswer,
  onNext
}) => {
  const [userInput, setUserInput] = useState<string>(
    currentAnswer?.value as string || ""
  );
  const { toast } = useToast();

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Submit answer and proceed to next question
  const handleSubmit = () => {
    const answer: QuizAnswer = {
      questionId: question.id,
      type: question.type,
      value: userInput.trim()
    };
    
    onAnswer(answer);
    
    // Automatically proceed to next question without toast notification
    onNext();
  };

  // Skip question
  const handleSkip = () => {
    const answer: QuizAnswer = {
      questionId: question.id,
      type: question.type,
      value: null
    };
    
    onAnswer(answer);
    onNext();
  };

  return (
    <div className="space-y-4">
      {/* Add single subtext for fill-in-blanks */}
      <div className="text-lg font-medium text-gray-700 mb-4">
        ✍️ Write your answer in the blank.
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <Input
          type="text" 
          placeholder="Type your answer here..."
          className="quiz-input"
          value={userInput}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 justify-between mt-6">
        <Button
          variant="outline"
          className="quiz-button-secondary"
          onClick={handleSkip}
        >
          Skip question
        </Button>

        <Button 
          className="quiz-button" 
          onClick={handleSubmit} 
          disabled={userInput.trim() === ""}
        >
          Next question
        </Button>
      </div>
    </div>
  );
};

export default FillInBlanks;
