
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { QuizConfig } from "@/types/quiz";
import ProgressBar from "./ProgressBar";

interface UserInfoFormProps {
  config: QuizConfig;
  onSubmit: (name: string, email: string) => void;
}

const UserInfoForm = ({ config, onSubmit }: UserInfoFormProps) => {
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
      onSubmit(name, email);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="quiz-container w-full max-w-md shadow-soft">
      <ProgressBar progress={100} />
      
      {config.logoUrl && (
        <div className="flex justify-center mb-6">
          <img 
            src={config.logoUrl} 
            alt={`${config.title} logo`}
            className="h-14 w-auto"
          />
        </div>
      )}
      
      <h1 className="quiz-title">Almost Done! 🙌</h1>
      
      <p className="quiz-subtitle mb-6">Please enter your contact information to see your personalized results.</p>
      
      <form onSubmit={handleSubmit} className="space-y-5 bg-brand-background p-6 rounded-[1rem] shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-medium">👤 Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="quiz-input"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium">✉️ Your Email</Label>
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
          className="quiz-button w-full mt-6 shadow-soft"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "See My Results ✨"}
        </Button>
      </form>
    </div>
  );
};

export default UserInfoForm;
