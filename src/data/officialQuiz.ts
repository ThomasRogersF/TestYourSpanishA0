import officialTemplate from "./officialQuizTemplate.json";
import { compileQuizTemplate } from "@/utils/quizUtils";
import type { QuizConfig } from "@/types/quiz";
import type { QuizTemplateCollection } from "@/types/quizTemplates";

// Compile at build time and restore full intro content for the landing view
const compiled = compileQuizTemplate(officialTemplate as QuizTemplateCollection);

const officialQuiz: QuizConfig = {
  ...compiled,
  // Hero title (IntroductionPage adds ✨ automatically)
  title: "Start Spanish From Zero",
  // Subtitle
  description: "A super simple quiz for absolute beginners — even if you don’t know hola yet.",
  // Logo and intro image used previously
  logoUrl: "https://lwfiles.mycourse.app/6409eb5798e53550d7acd5f1-public/1bfa7bb23c37499f0d5908f0a004c50e.png",
  introImageUrl: "https://spanishvip.com/wp-content/uploads/2025/04/private-tutoring.jpg",
  // Body text block
  introText:
    "Start your Spanish journey with this short, stress-free quiz. You’ll see very basic words, pictures, and everyday phrases, and just choose the answer that feels right. No grades, no pressure — at the end we’ll simply show you where to start and which classes make the most sense for you.\n\n¡Vamos! Your first Spanish step starts here.",
  // Estimated time shown at the bottom
  estimatedTime: "5-7 minutes",
};

export { officialQuiz };