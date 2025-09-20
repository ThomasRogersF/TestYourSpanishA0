
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { isAnswerCorrect } from "@/utils/quizUtils";

interface TextInputProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onNotification?: (isCorrect: boolean) => void;
}

const TextInput = ({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onNotification
}: TextInputProps) => {
  const [text, setText] = useState<string>(
    currentAnswer ? currentAnswer.value as string : ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    
    onAnswer({
      questionId: question.id,
      type: question.type,
      value: value
    });
  };
  
  const handleNext = () => {
    if ((text && text.trim()) || !question.required) {
      // Show debug notification if callback is provided
      if (onNotification && text && text.trim()) {
        const answer: QuizAnswer = {
          questionId: question.id,
          type: question.type,
          value: text.trim()
        };
        const isCorrect = isAnswerCorrect(answer);
        console.log("TextInput: Answer correctness:", isCorrect);

        console.log('TextInput: Setting notification:', isCorrect);
        onNotification(isCorrect);
      }

      onNext();
    }
  };
  
  const handleSkip = () => {
    onAnswer({
      questionId: question.id,
      type: question.type,
      value: null
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <Textarea
        value={text}
        onChange={handleChange}
        placeholder="Type your answer here..."
        className="quiz-input min-h-[120px]"
      />
      
      {question.helpText && (
        <p className="text-sm text-gray-500">{question.helpText}</p>
      )}
      
      <div className="flex justify-between mt-8">
        <Button 
          type="button" 
          variant="outline" 
          className="quiz-button-secondary"
          onClick={handleSkip}
        >
          Skip question
        </Button>
        <Button 
          type="button" 
          className="quiz-button"
          onClick={handleNext}
          disabled={question.required && (!text || !text.trim())}
        >
          Next question
        </Button>
      </div>
    </div>
  );
};

export default TextInput;
