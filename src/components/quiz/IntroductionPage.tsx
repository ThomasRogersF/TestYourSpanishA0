
import { Button } from "@/components/ui/button";
import { QuizConfig } from "@/types/quiz";
import { ArrowRight } from "lucide-react";

interface IntroductionPageProps {
  config: QuizConfig;
  onStart: () => void;
}

const IntroductionPage = ({ config, onStart }: IntroductionPageProps) => {
  return (
    <div className="quiz-container w-full max-w-md animate-fade-in shadow-soft">
      {config.logoUrl && (
        <div className="flex justify-center mb-8">
          <img 
            src={config.logoUrl} 
            alt={`${config.title} logo`}
            className="h-16 w-auto"
          />
        </div>
      )}
      
      <h1 className="quiz-title font-bold">
        {config.title} ✨
      </h1>
      
      {config.description && (
        <p className="quiz-subtitle mb-6">{config.description}</p>
      )}

      {config.introImageUrl && (
        <div className="mb-8 rounded-[1rem] overflow-hidden shadow-md">
          <img 
            src={config.introImageUrl}
            alt="Quiz introduction"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {config.introText && (
        <div className="mb-8 text-gray-700 bg-brand-background p-5 rounded-[1rem]">
          <p>{config.introText}</p>
        </div>
      )}
      
      <Button 
        className="quiz-button w-full mt-6 group shadow-soft"
        onClick={onStart}
      >
        Start Now
        <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
      </Button>

      {config.estimatedTime && (
        <p className="text-sm text-gray-500 text-center mt-4">
          ⏱️ Estimated time: {config.estimatedTime}
        </p>
      )}
    </div>
  );
};

export default IntroductionPage;
