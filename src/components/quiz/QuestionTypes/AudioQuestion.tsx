
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Volume2, Play, Pause } from "lucide-react";

interface AudioQuestionProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
}

const AudioQuestion = ({
  question,
  currentAnswer,
  onAnswer,
  onNext
}: AudioQuestionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  // Create the audio element if it doesn't exist yet
  const handlePlayAudio = () => {
    if (!audioElement && question.audioUrl) {
      const audio = new Audio(question.audioUrl);
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setAudioCompleted(true);
        
        // Mark as answered once audio is completed
        onAnswer({
          questionId: question.id,
          type: question.type,
          value: "completed"
        });
      });
      
      audio.addEventListener('pause', () => {
        setIsPlaying(false);
      });
      
      audio.addEventListener('play', () => {
        setIsPlaying(true);
      });
      
      setAudioElement(audio);
      audio.play();
      setIsPlaying(true);
    } else if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };
  
  const handleNext = () => {
    if (audioElement) {
      audioElement.pause();
    }
    
    if (audioCompleted || !question.required) {
      onNext();
    } else if (question.required) {
      // We can either require them to listen or make it optional
      onNext(); // For now, we'll make listening optional
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
        {question.helpText && (
          <p className="text-sm text-gray-500 mb-4">{question.helpText}</p>
        )}
        
        <div className="flex items-center justify-center mb-4">
          <Volume2 className="w-10 h-10 text-primary mr-4" />
          <p className="text-gray-600">
            {isPlaying ? "Playing audio..." : (audioCompleted ? "Audio completed" : "Audio ready to play")}
          </p>
        </div>
        
        <Button
          type="button"
          onClick={handlePlayAudio}
          className="quiz-button flex items-center"
        >
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? "Pause Audio" : "Play Audio"}
        </Button>
      </div>
      
      <div className="flex justify-between mt-8">
        {!question.required && (
          <Button 
            type="button" 
            variant="outline" 
            className="quiz-button-secondary"
            onClick={onNext}
          >
            Skip
          </Button>
        )}
        <Button 
          type="button" 
          className={`quiz-button ml-auto ${audioCompleted ? "" : "opacity-90"}`}
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AudioQuestion;
