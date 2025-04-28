
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { toast } from "@/components/ui/use-toast";

interface AudioRecordingProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
}

const AudioRecording = ({
  question,
  currentAnswer,
  onAnswer,
  onNext
}: AudioRecordingProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        
        onAnswer({
          questionId: question.id,
          type: question.type,
          value: audioBlob
        });
        
        // Stop all tracks of the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record audio",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleNext = () => {
    if (audioBlob || !question.required) {
      onNext();
    } else if (question.required) {
      toast({
        title: "Recording required",
        description: "Please record an audio response or skip if allowed",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
        {question.helpText && (
          <p className="text-sm text-gray-500 mb-4">{question.helpText}</p>
        )}
        
        {!audioUrl ? (
          <Button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? "bg-red-500 hover:bg-red-600" : "quiz-button"}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        ) : (
          <div className="w-full">
            <audio controls src={audioUrl} className="w-full mb-4" />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setAudioBlob(null);
                setAudioUrl(null);
                onAnswer({
                  questionId: question.id,
                  type: question.type,
                  value: null
                });
              }}
              className="quiz-button-secondary"
            >
              Record Again
            </Button>
          </div>
        )}
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
          className="quiz-button ml-auto"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AudioRecording;
