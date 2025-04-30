
import QuizController from "@/components/quiz/QuizController";
import { sampleQuiz } from "@/data/sampleQuiz";

const Index = () => {
  return <QuizController config={sampleQuiz} />;
};

export default Index;
