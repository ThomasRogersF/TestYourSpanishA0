
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Volume2, Play, Pause, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [selectedOption, setSelectedOption] = useState<string | null>(
    currentAnswer ? currentAnswer.value as string : null
  );
  
  // Use useRef for the audio element to prevent recreation on re-renders
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Cleanup function for audio element
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOption(currentAnswer?.value as string || null);
  }, [question.id, currentAnswer]);
  
  const handlePlayAudio = () => {
    if (!audioRef.current && question.audioUrl) {
      const audio = new Audio(question.audioUrl);
      
      audio.addEventListener('ended', () => {
        console.log("Audio playback ended");
        setIsPlaying(false);
        setAudioCompleted(true);
      });
      
      audio.addEventListener('pause', () => {
        console.log("Audio paused");
        setIsPlaying(false);
      });
      
      audio.addEventListener('play', () => {
        console.log("Audio started playing");
        setIsPlaying(true);
      });
      
      audio.addEventListener('error', (e) => {
        console.error("Audio error:", e);
        setIsPlaying(false);
        // Mark as completed to allow proceeding even if audio fails
        setAudioCompleted(true);
      });
      
      audioRef.current = audio;
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
        setAudioCompleted(true); // Allow proceeding if audio fails to play
      });
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
    }
  };
  
  const handleSelect = (optionId: string) => {
    console.log("Option selected:", optionId);
    setSelectedOption(optionId);
    
    onAnswer({
      questionId: question.id,
      type: question.type,
      value: optionId
    });
  };
  
  const handleNext = () => {
    console.log("Next button clicked in AudioQuestion");
    
    // Stop audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Proceed if:
    // 1. Audio was completed AND a selection was made (if options exist)
    // 2. OR question is not required
    const canProceed = !question.required || 
                       (audioCompleted && 
                        (!question.options?.length || selectedOption));
    
    if (canProceed) {
      console.log("Proceeding to next question");
      onNext();
    } else {
      console.log("Cannot proceed: conditions not met");
      // If audio wasn't played, show a message or highlight the play button
      if (!audioCompleted) {
        // Optionally add visual indication that audio must be played
      }
    }
  };

  const handleSkip = () => {
    console.log("Skip button clicked in AudioQuestion");
    
    // Stop audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    onAnswer({
      questionId: question.id,
      type: question.type,
      value: null
    });
    
    onNext();
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
          className="flex items-center"
        >
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? "Pause Audio" : "Play Audio"}
        </Button>
      </div>
      
      {question.options && question.options.length > 0 && (
        <div className="space-y-4 mt-6">
          <p className="font-medium">Select the correct answer: <span className="text-sm text-gray-500 italic">(You need to listen first to continue)</span></p>
          
          {question.options.map((option) => (
            <div 
              key={option.id}
              className={cn(
                "p-4 border rounded-[1rem] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md",
                selectedOption === option.value
                  ? "border-brand-primary bg-brand-background"
                  : "border-gray-200 hover:border-brand-secondary"
              )}
              onClick={() => handleSelect(option.value)}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                  selectedOption === option.value ? "bg-brand-primary text-white" : "border border-gray-300"
                )}>
                  {selectedOption === option.value && <Check className="w-4 h-4" />}
                </div>
                <span className="font-medium">{option.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <Button 
          type="button" 
          variant="outline"
          onClick={handleSkip}
        >
          Skip
        </Button>
        <Button 
          type="button"
          className="quiz-button ml-auto"
          onClick={handleNext}
          disabled={question.required && ((question.options?.length > 0 && !selectedOption) || !audioCompleted)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AudioQuestion;
