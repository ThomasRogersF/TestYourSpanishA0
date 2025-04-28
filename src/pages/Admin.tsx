
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import AdminPanel from "@/components/quiz/AdminPanel";
import { QuizConfig } from "@/types/quiz";
import { sampleQuiz } from "@/data/sampleQuiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Admin = () => {
  const [quizConfig, setQuizConfig] = useState<QuizConfig>(sampleQuiz);
  const { toast } = useToast();

  const handleConfigUpdate = (updatedConfig: QuizConfig) => {
    setQuizConfig(updatedConfig);
    toast({
      title: "Settings updated",
      description: "Your quiz configuration has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-6 border-b">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quiz
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Quiz Flow Pro Admin</h1>
          </div>
        </div>
        
        <AdminPanel config={quizConfig} onConfigUpdate={handleConfigUpdate} />
      </div>
    </div>
  );
};

export default Admin;
