
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { QuizConfig, QuizParticipant, QuizAnswer, ResultTemplate } from "@/types/quiz";
import { getNextQuestionId, getPersonalizedResult, sendDataToWebhook } from "@/utils/quizUtils";
import QuestionCard from "./QuestionCard";
import ResultsPage from "./ResultsPage";
import ThankYouPage from "./ThankYouPage";
import UserInfoForm from "./UserInfoForm";

interface QuizControllerProps {
  config: QuizConfig;
}

type QuizStage = "questions" | "user-info" | "results" | "thank-you";

const QuizController = ({ config }: QuizControllerProps) => {
  const [stage, setStage] = useState<QuizStage>("questions");
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(config.questions[0].id);
  const [participant, setParticipant] = useState<QuizParticipant>({
    name: "",
    email: "",
    answers: []
  });
  const [personalizedResult, setPersonalizedResult] = useState<ResultTemplate | null>(null);
  const { toast } = useToast();

  const handleAnswer = (answer: QuizAnswer) => {
    // Update or add the answer
    const existingIndex = participant.answers.findIndex(
      (a) => a.questionId === answer.questionId
    );
    
    if (existingIndex > -1) {
      const updatedAnswers = [...participant.answers];
      updatedAnswers[existingIndex] = answer;
      setParticipant({ ...participant, answers: updatedAnswers });
    } else {
      setParticipant({
        ...participant,
        answers: [...participant.answers, answer]
      });
    }
  };
  
  const handleNext = () => {
    if (!currentQuestionId) return;
    
    const nextQuestionId = getNextQuestionId(
      currentQuestionId,
      participant.answers,
      config.questions
    );
    
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
    } else {
      // End of questions, proceed to user info collection
      const result = getPersonalizedResult(participant.answers, config.resultTemplates);
      setPersonalizedResult(result);
      setStage("user-info");
    }
  };

  const handleUserInfoSubmit = (name: string, email: string) => {
    // Update participant info
    const updatedParticipant = {
      ...participant,
      name,
      email
    };
    
    setParticipant(updatedParticipant);
    
    // Send data to webhook
    sendDataToWebhook(config.webhookUrl, updatedParticipant)
      .then((success) => {
        if (!success) {
          toast({
            title: "Data submission issue",
            description: "There was an issue sending your responses. Please try again later.",
            variant: "destructive"
          });
        }
      });
    
    setStage("results");
  };
  
  const handleContinueToThankYou = () => {
    setStage("thank-you");
  };
  
  // Calculate progress
  const calculateProgress = () => {
    if (!currentQuestionId) return 0;
    
    const currentIndex = config.questions.findIndex(q => q.id === currentQuestionId);
    if (currentIndex === -1) return 0;
    
    return Math.round(((currentIndex + 1) / config.questions.length) * 100);
  };
  
  // Find current question
  const currentQuestion = currentQuestionId
    ? config.questions.find(q => q.id === currentQuestionId)
    : null;
  
  // Find current answer if it exists
  const currentAnswer = currentQuestionId
    ? participant.answers.find(a => a.questionId === currentQuestionId)
    : undefined;

  // Render the appropriate stage
  const renderStage = () => {
    switch (stage) {
      case "questions":
        return currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            progress={calculateProgress()}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        ) : null;
      case "user-info":
        return (
          <UserInfoForm 
            onSubmit={handleUserInfoSubmit}
            config={config}
          />
        );
      case "results":
        return (
          <ResultsPage
            config={config}
            participant={participant}
            personalizedResult={personalizedResult}
            onContinue={handleContinueToThankYou}
          />
        );
      case "thank-you":
        return <ThankYouPage config={config} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-quiz-gray-light p-4">
      {renderStage()}
    </div>
  );
};

export default QuizController;
