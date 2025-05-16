
import { Button } from "@/components/ui/button";
import { QuizConfig } from "@/types/quiz";
import { ArrowDown, ExternalLink, Calendar, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface ThankYouPageProps {
  config: QuizConfig;
  onExternalRedirect?: () => void;
}

const ThankYouPage = ({ config, onExternalRedirect }: ThankYouPageProps) => {
  return (
    <div className="quiz-container w-full max-w-2xl shadow-soft">
      <div className="flex justify-center mb-10">
        <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center shadow-md">
          <Check className="w-10 h-10 text-white" />
        </div>
      </div>
      
      <h1 className="quiz-title">Thank You! 🎉</h1>
      
      <p className="text-center text-lg text-gray-600 mb-10">
        Your responses have been successfully submitted. We appreciate your time and input!
      </p>
      
      {config.incentiveEnabled && config.incentiveTitle && config.incentiveUrl && (
        <div className="border-2 border-brand-secondary rounded-[1rem] p-6 bg-brand-background mb-8 shadow-soft">
          <h3 className="text-xl font-bold text-brand-primary mb-4">
            Your Free Spanish Book 📚
          </h3>
          <p className="text-gray-600 mb-6">
            As promised, here's your free {config.incentiveTitle}. Click the button below to download.
          </p>
          <a 
            href={config.incentiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quiz-button inline-flex items-center shadow-soft"
          >
            Download Book <ArrowDown className="ml-2 h-4 w-4" />
          </a>
        </div>
      )}
      
      {config.externalRedirectUrl && (
        <div className="text-center mt-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={onExternalRedirect}
              className="quiz-button inline-flex items-center shadow-soft"
            >
              Visit us <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            
            <Link to="/schedule">
              <Button 
                className="quiz-button-secondary inline-flex items-center shadow-soft"
              >
                Book a free class <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {!config.externalRedirectUrl && (
        <div className="text-center mt-10">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/schedule">
              <Button 
                className="quiz-button inline-flex items-center shadow-soft"
              >
                Book a free class <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Button asChild variant="outline" className="quiz-button-secondary">
              <a href="/">Return to Homepage</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThankYouPage;
