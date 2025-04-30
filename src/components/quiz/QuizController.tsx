
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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Effect to handle completion of questions and transition to user info stage
  useEffect(() => {
    console.log("Effect triggered - Stage:", stage, "Current Question ID:", currentQuestionId);
    
    if (stage === "questions" && currentQuestionId === null && participant.answers.length > 0) {
      console.log("Quiz questions completed. Transitioning to user info stage.");
      const result = getPersonalizedResult(participant.answers, config.resultTemplates);
      setPersonalizedResult(result);
      setStage("user-info");
    }
  }, [stage, currentQuestionId, participant.answers, config.resultTemplates]);

  const handleStartQuiz = () => {
    console.log("Starting quiz");
    setStage("questions");
  };

  const handleAnswer = (answer: QuizAnswer) => {
    console.log("Answer received:", answer);
    
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
    
    setIsLoading(true);
    console.log("Moving from question:", currentQuestionId);
    
    // Find next question ID
    const nextQuestionId = getNextQuestionId(
      currentQuestionId,
      participant.answers,
      config.questions
    );
    
    console.log("Next question ID determined:", nextQuestionId);
    
    if (nextQuestionId) {
      // Move to next question
      setTimeout(() => {
        setCurrentQuestionId(nextQuestionId);
        setIsLoading(false);
      }, 100); // Small delay for better UX
    } else {
      // End of questions
      console.log("No more questions. Proceeding to user info form.");
      setCurrentQuestionId(null);
      setIsLoading(false);
    }
  };

  const handleUserInfoSubmit = (name: string, email: string) => {
    console.log("User info submitted:", name, email);
    
    // Update participant info
    const updatedParticipant = {
      ...participant,
      name,
      email
    };
    
    setParticipant(updatedParticipant);
    
    // Send data to webhook if configured
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
        })
        .catch(error => {
          console.error("Error sending data to webhook:", error);
          toast({
            title: "Data submission error",
            description: "There was an error submitting your data.",
            variant: "destructive"
          });
        });
    }
    
    // Proceed to results page
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
        if (isLoading) {
          return (
            <div className="quiz-container flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent"></div>
                <p className="mt-2 text-gray-600">Loading next question...</p>
              </div>
            </div>
          );
        }
        
        return currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            progress={calculateProgress()}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        ) : (
          <div className="quiz-container">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent"></div>
              <p className="mt-2 text-gray-600">Preparing your results...</p>
            </div>
          </div>
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
