
import { Button } from "@/components/ui/button";
import { QuizConfig } from "@/types/quiz";
import { ArrowDown } from "lucide-react";

interface ThankYouPageProps {
  config: QuizConfig;
}

const ThankYouPage = ({ config }: ThankYouPageProps) => {
  return (
    <div className="quiz-container w-full max-w-2xl">
      <div className="flex justify-center mb-10">
        <div className="w-20 h-20 bg-quiz-purple rounded-full flex items-center justify-center">
          <Check className="w-10 h-10 text-white" />
        </div>
      </div>
      
      <h1 className="quiz-title">Thank You!</h1>
      
      <p className="text-center text-lg text-gray-600 mb-10">
        Your responses have been successfully submitted. We appreciate your time and input!
      </p>
      
      {config.incentiveEnabled && config.incentiveTitle && config.incentiveUrl && (
        <div className="border border-quiz-purple-light rounded-lg p-6 bg-quiz-gray-light mb-8">
          <h3 className="text-xl font-medium text-quiz-purple mb-4">
            Your Free Resource
          </h3>
          <p className="text-gray-600 mb-6">
            As promised, here's your free {config.incentiveTitle}. Click the button below to download.
          </p>
          <a 
            href={config.incentiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quiz-button inline-flex items-center"
          >
            Download Now <ArrowDown className="ml-2 h-4 w-4" />
          </a>
        </div>
      )}
      
      <div className="text-center mt-10">
        <Button asChild variant="outline" className="quiz-button-secondary">
          <a href="/">Return to Homepage</a>
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;

// Import Check icon
import { Check } from "lucide-react";
