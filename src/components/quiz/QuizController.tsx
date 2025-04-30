
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { QuizConfig, QuizParticipant, QuizAnswer, ResultTemplate } from "@/types/quiz";
import { getNextQuestionId, getPersonalizedResult, sendDataToWebhook } from "@/utils/quizUtils";
import IntroductionPage from "./IntroductionPage";
import QuestionCard from "./QuestionCard";
import ResultsPage from "./ResultsPage";
import ThankYouPage from "./ThankYouPage";
import UserInfoForm from "./UserInfoForm";

interface QuizControllerProps {
  config: QuizConfig;
}

type QuizStage = "intro" | "questions" | "user-info" | "results" | "thank-you";

const QuizController = ({ config }: QuizControllerProps) => {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    config.questions.length > 0 ? config.questions[0].id : null
  );
  const [participant, setParticipant] = useState<QuizParticipant>({
    name: "",
    email: "",
    answers: []
  });
  const [personalizedResult, setPersonalizedResult] = useState<ResultTemplate | null>(null);
  const { toast } = useToast();

  // Effect to handle quiz completion
  useEffect(() => {
    // If we're in questions stage but there's no current question, move to user-info
    if (stage === "questions" && currentQuestionId === null && participant.answers.length > 0) {
      console.log("All questions completed, moving to user info form");
      const result = getPersonalizedResult(participant.answers, config.resultTemplates);
      setPersonalizedResult(result);
      setStage("user-info");
    }
  }, [currentQuestionId, stage, participant.answers, config.resultTemplates]);

  const handleStartQuiz = () => {
    setStage("questions");
  };

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
    if (!currentQuestionId) {
      console.log("No current question ID, cannot proceed to next question");
      return;
    }
    
    console.log("Attempting to move to next question from:", currentQuestionId);
    const nextQuestionId = getNextQuestionId(
      currentQuestionId,
      participant.answers,
      config.questions
    );
    
    console.log("Next question ID determined:", nextQuestionId);
    
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
    } else {
      // End of questions, proceed to user info collection
      console.log("Quiz completed, proceeding to user info form");
      setCurrentQuestionId(null); // Explicitly set to null to trigger the useEffect
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
    if (config.webhookUrl) {
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
    }
    
    setStage("results");
  };
  
  const handleContinueToThankYou = () => {
    setStage("thank-you");
  };

  const handleExternalRedirect = () => {
    // Redirect to external URL if provided
    if (config.externalRedirectUrl) {
      window.location.href = config.externalRedirectUrl;
    }
  };
  
  // Calculate progress
  const calculateProgress = () => {
    if (!currentQuestionId || config.questions.length === 0) return 0;
    
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

  console.log("Current stage:", stage, "Current question ID:", currentQuestionId, "Answers count:", participant.answers.length);

  // Render the appropriate stage
  const renderStage = () => {
    switch (stage) {
      case "intro":
        return (
          <IntroductionPage 
            config={config}
            onStart={handleStartQuiz}
          />
        );
      case "questions":
        return currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            progress={calculateProgress()}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        ) : (
          <div className="quiz-container">Loading next question...</div>
        );
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
        return (
          <ThankYouPage 
            config={config} 
            onExternalRedirect={handleExternalRedirect}
          />
        );
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
