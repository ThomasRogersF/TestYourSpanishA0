
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface ImageSelectionProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
}

const ImageSelection = ({
  question,
  currentAnswer,
  onAnswer,
  onNext
}: ImageSelectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    currentAnswer ? currentAnswer.value as string : null
  );

  const handleSelect = (imageId: string) => {
    setSelectedImage(imageId);
    
    onAnswer({
      questionId: question.id,
      type: question.type,
      value: imageId
    });
  };
  
  const handleNext = () => {
    if (selectedImage || !question.required) {
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
      {/* Add subtext for image selection questions */}
      <div className="text-lg font-medium text-gray-700 mb-4">
        🖼️ Look at the images below and select the correct one.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.imageOptions && question.imageOptions.map((image) => (
          <div 
            key={image.id}
            className={cn(
              "quiz-image-option",
              selectedImage === image.id && "quiz-image-option-selected"
            )}
            onClick={() => handleSelect(image.id)}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 text-center text-sm">{image.alt}</div>
          </div>
        ))}
      </div>
      
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
          disabled={question.required && !selectedImage}
        >
          Next question
        </Button>
      </div>
    </div>
  );
};

export default ImageSelection;
