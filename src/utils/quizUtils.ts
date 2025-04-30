
import { QuizAnswer, QuizQuestion, ResultTemplate } from "@/types/quiz";

export const getNextQuestionId = (
  currentQuestionId: string,
  answers: QuizAnswer[],
  questions: QuizQuestion[]
): string | null => {
  // Find the current question's index
  const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
  
  if (currentIndex === -1) {
    console.error("Current question not found in questions array");
    return null;
  }
  
  console.log(`Current question index: ${currentIndex}, total questions: ${questions.length}`);
  
  // Check if there is a next question
  if (currentIndex < questions.length - 1) {
    return questions[currentIndex + 1].id;
  }
  
  // No more questions
  console.log("No more questions, quiz completed");
  return null;
};

export const getPersonalizedResult = (
  answers: QuizAnswer[],
  resultTemplates: ResultTemplate[]
): ResultTemplate => {
  // If no templates, return a default
  if (resultTemplates.length === 0) {
    return {
      id: "default",
      title: "Thank you for completing the quiz!",
      description: "We appreciate your participation.",
      conditions: [] // Add the missing conditions property
    };
  }
  
  // For now, we'll just return the first result template
  // In a real application, you would implement logic to determine the best result
  return resultTemplates[0];
};

export const sendDataToWebhook = async (
  webhookUrl: string,
  participant: { name: string; email: string; answers: QuizAnswer[] }
): Promise<boolean> => {
  try {
    // Only simulate sending data if we have a webhook URL
    if (!webhookUrl) {
      console.log("No webhook URL provided, skipping data submission");
      return true;
    }
    
    console.log("Sending data to webhook:", webhookUrl, participant);
    
    // In a real application, you would make an actual API call here
    // For this demo, we'll simulate a successful submission
    return true;
  } catch (error) {
    console.error("Error sending data to webhook:", error);
    return false;
  }
};
