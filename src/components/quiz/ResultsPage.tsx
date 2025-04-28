
import { Button } from "@/components/ui/button";
import { QuizConfig, QuizParticipant, ResultTemplate } from "@/types/quiz";
import { ArrowRight } from "lucide-react";

interface ResultsPageProps {
  config: QuizConfig;
  participant: QuizParticipant;
  personalizedResult: ResultTemplate | null;
  onContinue: () => void;
}

const ResultsPage = ({ 
  config, 
  participant, 
  personalizedResult,
  onContinue 
}: ResultsPageProps) => {
  return (
    <div className="quiz-container w-full max-w-2xl">
      <h1 className="quiz-title">Your Results</h1>
      
      {personalizedResult ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">{personalizedResult.title}</h2>
          <p className="text-gray-600 mb-6 text-left">{personalizedResult.description}</p>
        </>
      ) : (
        <p className="text-gray-600 mb-6">
          Thank you for completing the quiz! We'll analyze your responses and get back to you soon.
        </p>
      )}
      
      <div className="border-t border-gray-200 my-6 pt-6">
        <h3 className="text-lg font-medium mb-4">Personal Summary</h3>
        <div className="bg-quiz-gray-light p-4 rounded-lg mb-6">
          <p className="font-medium">Name: <span className="font-normal">{participant.name}</span></p>
          <p className="font-medium">Email: <span className="font-normal">{participant.email}</span></p>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Your results have been saved and will be sent to your email. 
          Feel free to reach out if you have any questions!
        </p>
      </div>
      
      <Button 
        className="quiz-button w-full"
        onClick={onContinue}
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ResultsPage;
