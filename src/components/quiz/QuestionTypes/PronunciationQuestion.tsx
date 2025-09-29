import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Mic, MicOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isAnswerCorrect } from "@/utils/quizUtils";

// Text normalization & fuzzy matching helpers
// normalize: remove punctuation, lower-case, remove diacritics, trim
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "") // remove punctuation (Unicode-aware)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritical marks
    .trim();

// Levenshtein distance (iterative, O(n*m) time, standard two-row implementation)
function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  const na = a;
  const nb = b;
  const n = na.length;
  const m = nb.length;
  if (n === 0) return m;
  if (m === 0) return n;

  let prev = new Array<number>(m + 1);
  let curr = new Array<number>(m + 1);

  for (let j = 0; j <= m; j++) prev[j] = j;

  for (let i = 1; i <= n; i++) {
    curr[0] = i;
    for (let j = 1; j <= m; j++) {
      const insertCost = prev[j] + 1;
      const deleteCost = curr[j - 1] + 1;
      const replaceCost = prev[j - 1] + (na[i - 1] === nb[j - 1] ? 0 : 1);
      curr[j] = Math.min(insertCost, deleteCost, replaceCost);
    }
    // swap prev and curr arrays
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }

  return prev[m];
}

// isSimilar: use normalized strings and allow a relative edit-distance threshold
const isSimilar = (a: string, b: string, threshold = 0.25) => {
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return true;
  const dist = levenshtein(na, nb);
  const maxLen = Math.max(na.length, nb.length);
  if (maxLen === 0) return true;
  const ratio = dist / maxLen;
  return ratio <= threshold;
};

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

  // Audio feedback refs
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);

  // Fallback and permission states
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const [fallbackText, setFallbackText] = useState<string>("");

  const expectedWord = question.pronunciationQuestion?.word || "";
  const isMobile = typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    // Setup audio feedback
    correctAudioRef.current = new Audio("/music/correct.mp3");
    incorrectAudioRef.current = new Audio("/music/incorrect.mp3");

    // Preload
    correctAudioRef.current.load();
    incorrectAudioRef.current.load();

    return () => {
      if (correctAudioRef.current) {
        correctAudioRef.current.pause();
        correctAudioRef.current = null;
      }
      if (incorrectAudioRef.current) {
        incorrectAudioRef.current.pause();
        incorrectAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Initialize speech recognition if available
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechSupported(false);
      setUsingFallback(true);
      return;
    }

    const SpeechRecognitionCtor: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition: SpeechRecognition = new SpeechRecognitionCtor();

    recognition.lang = 'es-ES'; // Spanish
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript("");
      setIsCorrect(null);
      setFeedback("");
      setPermissionDenied(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);

      // Fuzzy matching: normalize and allow small edit distance (handles punctuation/accents/typos)
      const normalizedTranscript = result;
      const normalizedExpected = expectedWord;
      const correct = isSimilar(normalizedTranscript, normalizedExpected);

      setIsCorrect(correct);
      setFeedback(
        correct
          ? "¡Perfecto! Pronunciation is correct."
          : `Try again. You said: "${result}". Expected: "${expectedWord}"`
      );

      // Play audio feedback
      try {
        if (correct && correctAudioRef.current) {
          correctAudioRef.current.currentTime = 0;
          correctAudioRef.current.play().catch(() => {});
        } else if (!correct && incorrectAudioRef.current) {
          incorrectAudioRef.current.currentTime = 0;
          incorrectAudioRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.error("Audio playback failed:", err);
      }

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

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error || event);
      setFeedback("Speech recognition error. Please try again.");
      setIsRecording(false);
      // If permission denied, switch to fallback
      const errCode = event?.error || event?.name;
      if (errCode === 'not-allowed' || errCode === 'service-not-allowed' || errCode === 'permission-denied') {
        setPermissionDenied(true);
        setUsingFallback(true);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
        recognitionRef.current = null;
      }
    };
  }, [question.id, expectedWord, onAnswer, onNotification]);

  // Utility: check microphone permission proactively
  const ensureMicrophonePermission = async (): Promise<boolean> => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop tracks - we only wanted to trigger permission prompt
      stream.getTracks().forEach(t => t.stop());
      setPermissionDenied(false);
      return true;
    } catch (err: any) {
      console.warn("Microphone permission denied or unavailable:", err);
      setPermissionDenied(true);
      return false;
    }
  };

  const handleRecord = async () => {
    if (!speechSupported || usingFallback) {
      setFeedback("Speech recognition not available. Use the fallback options below.");
      setUsingFallback(true);
      return;
    }

    // Try to ensure microphone permission first (helps on some browsers)
    const hasPermission = await ensureMicrophonePermission();
    if (!hasPermission) {
      setUsingFallback(true);
      setFeedback("Microphone permission denied. Please allow microphone access or use a fallback.");
      return;
    }

    if (recognitionRef.current) {
      try {
        if (isRecording) {
          recognitionRef.current.stop();
        } else {
          recognitionRef.current.start();
        }
      } catch (err) {
        console.error("Recognition start/stop error:", err);
        setFeedback("Unable to start speech recognition. Try again or use a fallback.");
        setUsingFallback(true);
      }
    } else {
      setFeedback("Speech recognition not initialized. Use a fallback method.");
      setUsingFallback(true);
    }
  };

  const handleFallbackTextSubmit = () => {
    const result = fallbackText.trim();
    if (!result) {
      setFeedback("Please enter what you said.");
      return;
    }

    // Use fuzzy matching for manual input as well
    const normalizedTranscript = result;
    const normalizedExpected = expectedWord;
    const correct = isSimilar(normalizedTranscript, normalizedExpected);

    setTranscript(result);
    setIsCorrect(correct);
    setFeedback(
      correct
        ? "¡Perfecto! Pronunciation (manual) is correct."
        : `Manual entry: "${result}". Expected: "${expectedWord}"`
    );

    // Play audio feedback
    try {
      if (correct && correctAudioRef.current) {
        correctAudioRef.current.currentTime = 0;
        correctAudioRef.current.play().catch(() => {});
      } else if (!correct && incorrectAudioRef.current) {
        incorrectAudioRef.current.currentTime = 0;
        incorrectAudioRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error("Audio playback failed:", err);
    }

    onAnswer({
      questionId: question.id,
      type: question.type,
      value: correct ? expectedWord : result
    });
    if (onNotification) onNotification(correct);
  };


  const handleTryMicAgain = () => {
    setUsingFallback(false);
    setFeedback("");
    setFallbackText("");
    setPermissionDenied(false);
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
        <p className="text-gray-600 mb-2">Say this word out loud:</p>
        <div className="text-3xl font-bold text-primary mb-4">
          {expectedWord}
        </div>

        <div className="mb-4 text-sm text-gray-500">
          {isMobile ? "On mobile, use the microphone button or the fallbacks below if permissions fail." : "Click the microphone to record your pronunciation."}
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

      {/* Fallback UI */}
      {usingFallback && (
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="font-medium mb-2">Fallback options</p>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Manual text input</label>
            <div className="flex space-x-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="Type what you said"
                value={fallbackText}
                onChange={(e) => setFallbackText(e.target.value)}
              />
              <Button onClick={handleFallbackTextSubmit}>Submit</Button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Use this if your browser does not support speech recognition or the microphone is blocked.</p>
          </div>

          {/* Removed audio upload option per request — only manual text input fallback is provided */}

          <div className="mt-4 flex space-x-2">
            <Button variant="outline" onClick={() => { setUsingFallback(false); setFeedback(""); }}>Hide fallback</Button>
            <Button onClick={() => { setUsingFallback(false); handleTryMicAgain(); }}>Try microphone again</Button>
          </div>
        </div>
      )}

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