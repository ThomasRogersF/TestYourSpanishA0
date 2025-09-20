import { useState, useEffect } from "react";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Check, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderQuestionProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onNotification?: (isCorrect: boolean) => void;
}

const OrderQuestion = ({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onNotification
}: OrderQuestionProps) => {
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const correctAnswer = question.orderQuestion?.correctAnswer || '';
  const allWords = question.orderQuestion?.words || [];

  // Shuffle words and reset state when question changes
  useEffect(() => {
    console.log("OrderQuestion: Question changed", question.id);
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setSelectedWords(currentAnswer?.value ? (currentAnswer.value as string).split(' ') : []);
    setIsCorrect(null);
  }, [question.id, currentAnswer]);

  const handleWordClick = (word: string, isSelected: boolean) => {
    if (isSelected) {
      // Remove word from selected and add back to shuffled
      setSelectedWords(prev => prev.filter(w => w !== word));
      setShuffledWords(prev => [...prev, word]);
    } else {
      // Add word to selected and remove from shuffled
      setSelectedWords(prev => [...prev, word]);
      setShuffledWords(prev => prev.filter(w => w !== word));
    }
    setIsCorrect(null); // Reset correctness check when words change
  };

  const handleReset = () => {
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setSelectedWords([]);
    setIsCorrect(null);
  };

  const handleNext = () => {
    console.log('OrderQuestion: handleNext called');
    // Auto-validate when proceeding
    const userAnswer = selectedWords.join(' ');
    const isAnswerCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    console.log('OrderQuestion: userAnswer:', userAnswer);
    console.log('OrderQuestion: correctAnswer:', correctAnswer);
    console.log('OrderQuestion: isAnswerCorrect:', isAnswerCorrect);

    setIsCorrect(isAnswerCorrect);

    console.log('OrderQuestion: Setting notification:', isAnswerCorrect);
    onNotification?.(isAnswerCorrect);

    onAnswer({
      questionId: question.id,
      type: 'order',
      value: userAnswer
    });

    // Allow progression regardless of correctness
    onNext();
  };

  const handleSkip = () => {
    onAnswer({
      questionId: question.id,
      type: 'order',
      value: null
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-lg font-medium text-gray-700 mb-4">
        Click the words to form the correct sentence 📝
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          Click on words below to add them to your sentence. Click words in your sentence to remove them.
          When you've used all words, click "Next question" to continue!
        </p>
      </div>

      {/* Sentence display */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Your Sentence:</h3>
        <div className="min-h-[80px] p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
          {selectedWords.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              Click words below to build your sentence
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 items-center">
              {selectedWords.map((word, index) => (
                <button
                  key={`${word}-selected-${index}`}
                  onClick={() => handleWordClick(word, true)}
                  className={cn(
                    "px-3 py-2 bg-white border-2 border-green-400 rounded-lg",
                    "hover:bg-green-100 hover:border-green-500 transition-colors",
                    "shadow-sm hover:shadow-md cursor-pointer",
                    "text-green-800 font-medium"
                  )}
                >
                  {word}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Available words */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">Available Words:</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
        <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
          {shuffledWords.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              All words have been used in your sentence!
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {shuffledWords.map((word, index) => (
                <button
                  key={`${word}-available-${index}`}
                  onClick={() => handleWordClick(word, false)}
                  className={cn(
                    "px-3 py-2 bg-white border-2 border-blue-400 rounded-lg",
                    "hover:bg-blue-100 hover:border-blue-500 transition-colors",
                    "shadow-sm hover:shadow-md cursor-pointer",
                    "text-blue-800 font-medium"
                  )}
                >
                  {word}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result feedback - shows after Next is clicked */}
      {isCorrect !== null && (
        <div className={cn(
          "p-4 rounded-lg border flex items-center gap-3",
          isCorrect
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-orange-50 border-orange-200 text-orange-800"
        )}>
          {isCorrect ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <X className="w-5 h-5 text-orange-600" />
          )}
          <div>
            <p className="font-medium">
              {isCorrect ? "Perfect! 🎉" : "Keep practicing!"}
            </p>
            {!isCorrect && (
              <p className="text-sm mt-1">
                The correct sentence is: <span className="font-medium">"{correctAnswer}"</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action buttons */}
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
          className="quiz-button shadow-soft"
          disabled={selectedWords.length !== allWords.length}
        >
          Next question
        </Button>
      </div>

    </div>
  );
};

export default OrderQuestion;