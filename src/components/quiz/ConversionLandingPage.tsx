import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuizConfig, QuizParticipant, ResultTemplate } from "@/types/quiz";
import { Download, Calendar, Check, ArrowRight } from "lucide-react";

interface ConversionLandingPageProps {
  config: QuizConfig;
  participant: QuizParticipant;
  personalizedResult: ResultTemplate | null;
}

const ConversionLandingPage = ({ 
  config, 
  participant, 
  personalizedResult 
}: ConversionLandingPageProps) => {
  
  // Load HubSpot meetings script when the component mounts
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    script.type = "text/javascript";
    
    // Add script to document
    document.body.appendChild(script);
    
    // Clean up when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-quiz-gray-light">
      <div className="container max-w-4xl mx-auto p-4 py-8">
        {/* Header with Logo and Success Icon */}
        <div className="text-center mb-8">
          {config.logoUrl && (
            <div className="flex justify-center mb-6">
              <img 
                src={config.logoUrl} 
                alt={`${config.title} logo`}
                className="h-12 w-auto"
              />
            </div>
          )}
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-brand-primary mb-4">
            ¡Felicidades! Your Results Are Ready 🎉
          </h1>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          {personalizedResult ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-brand-primary text-center">
                {personalizedResult.title}
              </h2>
              <p className="text-gray-700 mb-6 text-center leading-relaxed">
                {personalizedResult.description}
              </p>
            </>
          ) : (
            <p className="text-gray-700 mb-6 text-center leading-relaxed">
              Thank you for completing the quiz! We've analyzed your responses and have some great recommendations for you.
            </p>
          )}
          
          {/* Personal Summary */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-brand-secondary text-center">Personal Summary</h3>
            <div className="bg-brand-background p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div>
                  <span className="text-2xl">👤</span>
                  <p className="font-medium text-gray-800">{participant.name}</p>
                </div>
                <div>
                  <span className="text-2xl">✉️</span>
                  <p className="font-medium text-gray-800">{participant.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Calendar and Ebook */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Calendar Section */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">
                Get a Free 1:1 Class with a Native Teacher
              </h3>
              <p className="text-gray-600 text-sm">
                Book your personalized Spanish lesson now!
              </p>
            </div>
            
            <div 
              className="meetings-iframe-container rounded-lg overflow-hidden border border-gray-200" 
              data-src="https://meetings.hubspot.com/support558/free-class-with-spanishvip?embed=true" 
              style={{ width: "100%", minHeight: "400px", overflow: "auto", position: "relative" }}
            ></div>
          </div>

          {/* Ebook Download Section */}
          <div className="space-y-6">
            {/* Ebook Box */}
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl shadow-soft p-8 text-white">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Download our 'Easy Spanish Shortcuts' Ebook for free
                </h3>
                <p className="text-white/90 text-sm mb-6">
                  Get instant access to proven techniques that will accelerate your Spanish learning journey.
                </p>
              </div>
              
              {config.incentiveEnabled && config.incentiveUrl ? (
                <a 
                  href={config.incentiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-white text-brand-primary hover:bg-white/90 font-semibold py-3 rounded-xl shadow-md">
                    Download Free Ebook <Download className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <Button className="w-full bg-white text-brand-primary hover:bg-white/90 font-semibold py-3 rounded-xl shadow-md">
                  Download Free Ebook <Download className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Additional CTA */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-brand-primary mb-2">
                  Ready to Start Your Journey?
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Join thousands of students who have already transformed their Spanish skills with SpanishVIP.
                </p>
                
                {config.externalRedirectUrl && (
                  <Button 
                    onClick={() => window.parent.postMessage({ action: 'redirect', url: config.externalRedirectUrl }, '*')}
                    className="w-full quiz-button-secondary font-semibold py-3 rounded-xl"
                  >
                    Explore SpanishVIP <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              This isn't a formal test to evaluate your Spanish skills — it's just a fun way to get to know you better 
              so we can send you personalized recommendations, resources, and exclusive deals from SpanishVIP. 🎁✨<br/>
              So no pressure — just enjoy it!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionLandingPage;