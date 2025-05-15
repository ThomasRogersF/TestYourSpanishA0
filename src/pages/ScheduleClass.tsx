
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ScheduleClass = () => {
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
      <div className="container max-w-6xl mx-auto p-4">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Quiz
            </Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-4 mb-8">
          <h1 className="text-3xl font-bold text-center text-brand-primary mb-6">
            Schedule a 1:1 Free Class with SpanishVIP
          </h1>
          
          <div 
            className="meetings-iframe-container" 
            data-src="https://meetings.hubspot.com/support558/free-class-with-spanishvip?embed=true" 
            style={{ width: "100%", minHeight: "600px", overflow: "auto", position: "relative" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleClass;
