
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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Submit answer
  const handleSubmit = () => {
    const answer: QuizAnswer = {
      questionId: question.id,
      type: question.type,
      value: userInput.trim()
    };
    
    onAnswer(answer);
    setHasSubmitted(true);

    // Show feedback toast
    toast({
      title: "Answer submitted",
      description: "Your answer has been recorded",
    });
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
      {question.subtitle && (
        <div className="text-lg mb-4">{question.subtitle}</div>
      )}
      
      {question.helpText && (
        <div className="text-gray-600 italic mb-4">{question.helpText}</div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <Input
          type="text" 
          placeholder="Type your answer here..."
          className="quiz-input"
          value={userInput}
          onChange={handleInputChange}
          disabled={hasSubmitted}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 justify-between mt-6">
        <Button
          variant="outline"
          className="quiz-button-secondary"
          onClick={handleSkip}
          disabled={hasSubmitted}
        >
          Skip question
        </Button>

        {!hasSubmitted ? (
          <Button 
            className="quiz-button" 
            onClick={handleSubmit} 
            disabled={userInput.trim() === ""}
          >
            Submit Answer
          </Button>
        ) : (
          <Button className="quiz-button" onClick={onNext}>
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default FillInBlanks;
