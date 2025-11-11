
import QuizController from "@/components/quiz/QuizController";
import { officialQuiz } from "@/data/officialQuiz";

const Index = () => {
  return <QuizController config={officialQuiz} />;
};

export default Index;
