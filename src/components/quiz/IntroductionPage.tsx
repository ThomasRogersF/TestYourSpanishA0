
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QuizConfig, QuizParticipant, QuizAnswer } from "@/types/quiz";
import { sampleQuiz } from "@/data/sampleQuiz";
import { ArrowRight, Settings } from "lucide-react";
import { useState } from "react";

// Mock data generation for debug purposes
const generateMockQuizData = () => {
  // Mock participant info
  const participant: QuizParticipant = {
    name: "Debug User",
    email: "debug@example.com",
    answers: []
  };

  // Generate answers for most questions (mix of correct and incorrect)
  const correctAnswers: Record<string, string> = {
    q1: 'perro', q2: 'gato', q3: 'mesa', q4: 'carro',
    q5: 'hola', q6: 'adios', q7: 'por_favor', q8: 'gracias',
    q9: 'Juan', q10: 'Mexico', // Fill in blanks - mock user input
    q11: 'la', q12: 'los', q13: 'los_museos', q14: 'las_bibliotecas',
    q15: 'soy', q16: 'es', q17: 'esta', q18: 'estamos',
    q19: 'good_morning', q20: 'good_evening_night', q21: 'mexico', q22: '25',
    q23: '10', q24: '15', q25: 'pedro', q26: '25', q27: '7_pm', q28: '8_am',
    q29: 'monday_wednesday', q30: '2', q31: 'bien', q32: 'soy_colombia',
    q33: 'mesa', q34: 'hermosa', q35: 'rapidamente', q36: 'febrero',
    q37: 'hoy_es_15_marzo', q38: 'hermano', q39: 'yo soy estudiante de psicología',
    q40: 'ella está en la playa'
  };

  // Generate answers for most questions with mix of correct/incorrect
  sampleQuiz.questions.forEach((question, index) => {
    let answerValue: string;

    // For most questions, alternate between correct and incorrect
    if (index % 3 === 0) {
      // Correct answer
      answerValue = correctAnswers[question.id] || '';
    } else if (index % 3 === 1) {
      // Incorrect answer - pick wrong option
      if (question.options && question.options.length > 1) {
        const correctValue = correctAnswers[question.id];
        const wrongOption = question.options.find(opt => opt.value !== correctValue);
        answerValue = wrongOption ? wrongOption.value : question.options[0].value;
      } else {
        answerValue = 'wrong_answer';
      }
    } else {
      // Skip some questions (no answer)
      return;
    }

    const answer: QuizAnswer = {
      questionId: question.id,
      type: question.type,
      value: answerValue
    };

    participant.answers.push(answer);
  });

  // Store data in localStorage
  localStorage.setItem('quizConfig', JSON.stringify(sampleQuiz));
  localStorage.setItem('quizParticipant', JSON.stringify(participant));

  // Compute and store results data
  const totalQuestions = sampleQuiz.questions.length;
  const answeredQuestions = participant.answers.length;
  const correctAnswersCount = participant.answers.filter(answer => {
    const question = sampleQuiz.questions.find(q => q.id === answer.questionId);
    if (!question) return false;

    const correctValue = correctAnswers[answer.questionId];
    return answer.value === correctValue;
  }).length;

  // Determine level based on correct answers (simplified)
  let level = 'A0';
  if (correctAnswersCount >= 30) level = 'B2';
  else if (correctAnswersCount >= 25) level = 'B1';
  else if (correctAnswersCount >= 20) level = 'A2';
  else if (correctAnswersCount >= 15) level = 'A1';

  const personalizedResult = {
    id: level.toLowerCase(),
    title: `${level} • ${level === 'A0' ? 'Absolute Beginner' : level === 'A1' ? 'Beginner' : level === 'A2' ? 'Elementary' : level === 'B1' ? 'Intermediate' : 'Upper-Intermediate'}`,
    description: `Your approximate level is ${level}: ${level === 'A0' ? 'you can communicate in very basic situations' : level === 'A1' ? 'you understand frequently used phrases' : level === 'A2' ? 'you understand frequently used phrases and expressions' : level === 'B1' ? 'you can handle most travel situations' : 'you can interact with fluency and spontaneity'}.`
  };

  const gradedAnswers = participant.answers.map(answer => ({
    questionId: answer.questionId,
    correct: correctAnswers[answer.questionId] === answer.value,
    answer: answer.value,
    correctAnswer: correctAnswers[answer.questionId],
    time: Math.floor(Math.random() * 30) + 5 // Random time between 5-35 seconds
  }));

  const userContext = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    screenSize: `${window.screen.width}x${window.screen.height}`
  };

  localStorage.setItem('personalizedResult', JSON.stringify(personalizedResult));
  localStorage.setItem('gradedAnswers', JSON.stringify(gradedAnswers));
  localStorage.setItem('userContext', JSON.stringify(userContext));
};

interface IntroductionPageProps {
  config: QuizConfig;
  onStart: () => void;
  onDebugLanding?: () => void; // Debug function to jump to landing page
}

const IntroductionPage = ({ config, onStart, onDebugLanding }: IntroductionPageProps) => {
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  return (
    <div className="quiz-container w-full max-w-md animate-fade-in shadow-soft">
      {config.logoUrl && (
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={() => window.parent.postMessage({ action: 'redirect', url: 'https://spanishvip.com/' }, '*')}
            aria-label="Go to SpanishVIP website"
            title="SpanishVIP"
            className="focus:outline-none"
          >
            <img 
              src={config.logoUrl} 
              alt={`${config.title} logo`}
              className="h-12 w-auto"
            />
          </button>
        </div>
      )}
      
      <h1 className="quiz-title font-bold">
        {config.title} ✨
      </h1>
      
      {config.description && (
        <p className="quiz-subtitle mb-6">{config.description}</p>
      )}

      {config.introImageUrl && (
        <div className="mb-6 rounded-[1rem] overflow-hidden shadow-md">
          <img 
            src={config.introImageUrl}
            alt="Quiz introduction"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Move Start Now button right below the image */}
      <Button
        className="quiz-button w-full mb-3 group shadow-soft"
        onClick={onStart}
      >
        Start Now
        <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
      </Button>

      {/* DEBUG: Skip to Results button */}
      <Button
        variant="destructive"
        className="w-full mb-3 bg-orange-500 hover:bg-orange-600 text-white font-bold"
        onClick={() => {
          generateMockQuizData();
          window.location.href = '/results/index.html';
        }}
      >
        DEBUG: Skip to Results
      </Button>

      <Button
        variant="outline"
        className="w-full mb-6"
        onClick={() => window.parent.postMessage({ action: 'redirect', url: 'https://spanishvip.com/' }, '*')}
        aria-label="Go back to SpanishVIP"
        title="Go back to SpanishVIP"
      >
        Go back to SpanishVIP
      </Button>

      {config.introText && (
        <div className="mb-8 text-gray-700 bg-brand-background p-5 rounded-[1rem]">
          <p>{config.introText}</p>
        </div>
      )}

      {config.estimatedTime && (
        <p className="text-sm text-gray-500 text-center mt-4">
          ⏱️ Estimated time: {config.estimatedTime}
        </p>
      )}

    </div>
  );
};

export default IntroductionPage;
