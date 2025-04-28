
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { QuizConfig } from "@/types/quiz";

interface LandingPageProps {
  config: QuizConfig;
  onStart: (name: string, email: string) => void;
}

const LandingPage = ({ config, onStart }: LandingPageProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Valid email is required",
        description: "Please enter a valid email to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      onStart(name, email);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-quiz-gray-light p-4">
      <div className="quiz-container w-full max-w-md">
        {config.logoUrl && (
          <div className="flex justify-center mb-6">
            <img 
              src={config.logoUrl} 
              alt={`${config.title} logo`}
              className="h-12 w-auto"
            />
          </div>
        )}
        
        <h1 className="quiz-title">{config.title}</h1>
        
        {config.description && (
          <p className="quiz-subtitle">{config.description}</p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="quiz-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="quiz-input"
            />
          </div>
          
          <Button 
            type="submit" 
            className="quiz-button w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Start Quiz"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
