
import QuizController from "@/components/quiz/QuizController";
import { sampleQuiz } from "@/data/sampleQuiz";

const Index = () => {
  // Add intro properties to the sample quiz 
  const enhancedQuiz = {
    ...sampleQuiz,
    introImageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    introText: "This quiz will help you discover your learning style and provide personalized recommendations to enhance your educational journey. Take a few minutes to answer these simple questions and get insights tailored just for you.",
    estimatedTime: "2-3 minutes"
  };
  
  return <QuizController config={enhancedQuiz} />;
};

export default Index;
