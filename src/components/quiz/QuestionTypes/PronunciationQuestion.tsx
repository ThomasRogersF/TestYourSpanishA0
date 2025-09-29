import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Mic, MicOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isAnswerCorrect } from "@/utils/quizUtils";

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface PronunciationQuestionProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onNotification?: (isCorrect: boolean) => void;
}

const PronunciationQuestion = ({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onNotification
}: PronunciationQuestionProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const expectedWord = question.pronunciationQuestion?.word || "";

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = 'es-ES'; // Spanish
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setTranscript("");
        setIsCorrect(null);
        setFeedback("");
      };

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);

        // Simple string matching (case insensitive, trim whitespace)
        const normalizedTranscript = result.toLowerCase().trim();
        const normalizedExpected = expectedWord.toLowerCase().trim();
        const correct = normalizedTranscript === normalizedExpected;

        setIsCorrect(correct);
        setFeedback(correct ? "¡Perfecto! Pronunciation is correct." : `Try again. You said: "${result}". Expected: "${expectedWord}"`);

        // Play audio feedback
        const audio = new Audio(correct ? '/music/correct.mp3' : '/music/incorrect.mp3');
        audio.play().catch(err => console.error('Audio play error:', err));

        // Submit answer
        const answer: QuizAnswer = {
          questionId: question.id,
          type: question.type,
          value: correct ? expectedWord : result
        };
        onAnswer(answer);

        if (onNotification) {
          onNotification(correct);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setFeedback("Speech recognition error. Please try again.");
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [question.id, expectedWord, onAnswer, onNotification]);

  const handleRecord = () => {
    if (recognitionRef.current) {
      if (isRecording) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    } else {
      setFeedback("Speech recognition not supported in this browser.");
    }
  };

  const handleNext = () => {
    onNext();
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
      <div className="text-lg font-medium text-gray-700 mb-4">
        🗣️ Pronunciation Practice
      </div>

      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Say this word out loud:</p>
        <div className="text-3xl font-bold text-primary mb-6">
          {expectedWord}
        </div>

        <Button
          type="button"
          onClick={handleRecord}
          className={cn(
            "flex items-center",
            isRecording && "bg-red-500 hover:bg-red-600"
          )}
        >
          {isRecording ? (
            <>
              <MicOff className="w-4 h-4 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              Start Recording
            </>
          )}
        </Button>

        {transcript && (
          <div className="mt-4 p-4 rounded-lg w-full max-w-md">
            <p className="text-sm text-gray-600">You said:</p>
            <p className="font-medium">"{transcript}"</p>
          </div>
        )}

        {feedback && (
          <div className={cn(
            "mt-4 p-4 rounded-lg w-full max-w-md flex items-center",
            isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          )}>
            {isCorrect ? (
              <Check className="w-5 h-5 mr-2" />
            ) : (
              <X className="w-5 h-5 mr-2" />
            )}
            <p>{feedback}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handleSkip}
        >
          Skip question
        </Button>
        <Button
          type="button"
          className="quiz-button ml-auto"
          onClick={handleNext}
        >
          Next question
        </Button>
      </div>
    </div>
  );
};

export default PronunciationQuestion;