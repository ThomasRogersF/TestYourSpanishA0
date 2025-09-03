
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
    <div className="quiz-container w-full max-w-2xl shadow-soft">
      <div className="flex justify-center mb-6">
        <img
          src={config.logoUrl || "/placeholder.svg"}
          alt={`${config.title} logo`}
          className="h-14 w-auto"
        />
      </div>
      
      <h1 className="quiz-title">Your Results 🎉</h1>
      
      {personalizedResult ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-brand-primary">{personalizedResult.title}</h2>
          <p className="text-gray-600 mb-6 text-left p-4 bg-brand-background rounded-[1rem]">{personalizedResult.description}</p>
        </>
      ) : (
        <p className="text-gray-600 mb-6">
          Thank you for completing the quiz! We'll analyze your responses and get back to you soon.
        </p>
      )}
      
      <div className="border-t border-gray-200 my-6 pt-6">
        <h3 className="text-lg font-bold mb-4 text-brand-secondary">Personal Summary</h3>
        <div className="bg-brand-background p-5 rounded-[1rem] mb-6">
          <p className="font-medium">👤 Name: <span className="font-normal">{participant.name}</span></p>
          <p className="font-medium">✉️ Email: <span className="font-normal">{participant.email}</span></p>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Your results have been saved and will be sent to your email.
          Feel free to reach out if you have any questions!
        </p>
      </div>
      
      <Button
        className="quiz-button w-full shadow-soft"
        onClick={onContinue}
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <div className="mt-6 p-4 bg-brand-background rounded-[1rem] border border-gray-200">
        <p className="text-sm text-gray-600 italic">
          This isn't a formal test to evaluate your Spanish skills — it's just a fun way to get to know you better so we can send you personalized recommendations, resources, and exclusive deals from SpanishVIP. 🎁✨<br/>
          So no pressure — just enjoy it!
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;
