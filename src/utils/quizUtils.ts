import { QuizAnswer, QuizQuestion, ResultTemplate, QuizConfig } from "@/types/quiz";

export const getNextQuestionId = (
  currentQuestionId: string,
  answers: QuizAnswer[],
  questions: QuizQuestion[]
): string | null => {
  console.log(`Finding next question after ${currentQuestionId}`);
  
  // Find the current question's index
  const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
  
  if (currentIndex === -1) {
    console.error("Current question not found in questions array");
    return null;
  }
  
  console.log(`Current question index: ${currentIndex}, total questions: ${questions.length}`);
  
  // Check if this is the last question
  if (currentIndex >= questions.length - 1) {
    console.log("This is the last question. Quiz completed.");
    return null;
  }
  
  // Return next question ID
  const nextQuestionId = questions[currentIndex + 1].id;
  console.log(`Next question will be: ${nextQuestionId}`);
  return nextQuestionId;
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
      conditions: [] // Required by the ResultTemplate interface
    };
  }
  
  // Calculate the score
  const score = calculateScore(answers);
  console.log(`Calculated score: ${score}`);
  
  // Find appropriate result template based on score
  if (score <= 3) {
    const beginnerTemplate = resultTemplates.find(t => t.id === "absolute-beginner");
    return beginnerTemplate || resultTemplates[0];
  } else if (score <= 6) {
    const intermediateTemplate = resultTemplates.find(t => t.id === "beginner");
    return intermediateTemplate || resultTemplates[0];
  } else {
    const advancedTemplate = resultTemplates.find(t => t.id === "elementary");
    return advancedTemplate || resultTemplates[0];
  }
};

// Helper function to calculate score based on correct answers
export const calculateScore = (answers: QuizAnswer[]): number => {
  // For this implementation, we'll count answers that match correct values
  // This is a simple implementation - in a real app, you'd have a more sophisticated scoring system
  const correctAnswerMap: Record<string, string | string[]> = {
    "q1": "hola",
    "q2": "me_llamo",
    "q3": "cuatro",
    "q4": "manzana",
    "q5": "estoy",
    "q6": "vamos",
    "q7": "bathroom",
    "q8": "hungry",
    "q9": "coffee",
    "q10": "el_gato_negro"
  };

  let score = 0;
  
  answers.forEach(answer => {
    const correctAnswer = correctAnswerMap[answer.questionId];
    if (correctAnswer) {
      if (
        (typeof answer.value === 'string' && answer.value === correctAnswer) ||
        (Array.isArray(answer.value) && Array.isArray(correctAnswer) && 
         JSON.stringify(answer.value.sort()) === JSON.stringify(correctAnswer.sort()))
      ) {
        score++;
      }
    }
  });
  
  return score;
};

// Get the question and option text by their IDs
export const getQuestionText = (questionId: string, config: QuizConfig): string => {
  const question = config.questions.find(q => q.id === questionId);
  return question ? question.title : `Unknown Question (${questionId})`;
};

export const getOptionText = (questionId: string, optionValue: string | string[] | File | null, config: QuizConfig): string => {
  // Handle null values
  if (optionValue === null) return "No answer provided";
  
  // Handle File type
  if (optionValue instanceof File) {
    return optionValue.name;
  }
  
  const question = config.questions.find(q => q.id === questionId);
  if (!question) return `Unknown Option (${String(optionValue)})`;

  // Handle different question types
  if (question.type === 'mcq' && question.options) {
    const option = question.options.find(o => o.value === optionValue);
    return option ? option.text : `Unknown Option (${String(optionValue)})`;
  } else if (question.type === 'image-selection' && question.imageOptions) {
    const option = question.imageOptions.find(o => o.value === optionValue);
    return option ? option.alt : `Unknown Option (${String(optionValue)})`;
  }
  
  // Return the raw value if no match is found
  return Array.isArray(optionValue) ? optionValue.join(', ') : String(optionValue);
};

export const sendDataToWebhook = async (
  webhookUrl: string,
  participant: { name: string; email: string; answers: QuizAnswer[] },
  quizConfig: QuizConfig
): Promise<boolean> => {
  try {
    console.log("Attempting to send data to webhook:", webhookUrl);
    
    // Only attempt to send data if we have a webhook URL
    if (!webhookUrl) {
      console.log("No webhook URL provided, skipping data submission");
      return true;
    }
    
    // Calculate score
    const score = calculateScore(participant.answers);
    
    // Build simplified data structure
    const simplifiedData = {
      name: participant.name,
      email: participant.email,
      score: score
    };
    
    console.log("Simplified data being sent:", simplifiedData);
    
    // Make the actual API call to the webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simplifiedData),
    });
    
    if (!response.ok) {
      console.error("Webhook response not OK:", response.status);
      return false;
    }
    
    console.log("Data sent successfully to webhook");
    return true;
  } catch (error) {
    console.error("Error sending data to webhook:", error);
    return false;
  }
};
