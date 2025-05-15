
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

export const getOptionText = (questionId: string, optionValue: string | string[], config: QuizConfig): string => {
  const question = config.questions.find(q => q.id === questionId);
  if (!question) return `Unknown Option (${optionValue})`;

  // Handle different question types
  if (question.type === 'mcq' && question.options) {
    const option = question.options.find(o => o.value === optionValue);
    return option ? option.text : `Unknown Option (${optionValue})`;
  } else if (question.type === 'image-selection' && question.imageOptions) {
    const option = question.imageOptions.find(o => o.value === optionValue);
    return option ? option.alt : `Unknown Option (${optionValue})`;
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
    
    // Determine result level
    let resultLevel = "Unknown";
    if (score <= 3) resultLevel = "Absolute Beginner";
    else if (score <= 6) resultLevel = "Beginner";
    else resultLevel = "Elementary (A2)";
    
    // Build enhanced data structure
    const enhancedAnswers = participant.answers.map(answer => {
      const questionText = getQuestionText(answer.questionId, quizConfig);
      const selectedOptionText = getOptionText(answer.questionId, answer.value, quizConfig);
      
      // Determine if the answer is correct
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
      
      const correctValue = correctAnswerMap[answer.questionId];
      const isCorrect = 
        (typeof answer.value === 'string' && answer.value === correctValue) ||
        (Array.isArray(answer.value) && Array.isArray(correctValue) && 
         JSON.stringify(answer.value.sort()) === JSON.stringify(correctValue.sort()));
      
      return {
        questionId: answer.questionId,
        questionText: questionText,
        questionType: answer.type,
        selectedValue: answer.value,
        selectedOptionText: selectedOptionText,
        isCorrect: isCorrect
      };
    });
    
    const enhancedData = {
      participant: {
        name: participant.name,
        email: participant.email,
        submittedAt: new Date().toISOString(),
        quizId: quizConfig.id,
        quizTitle: quizConfig.title,
      },
      results: {
        score: score,
        totalQuestions: quizConfig.questions.length,
        percentageCorrect: Math.round((score / quizConfig.questions.length) * 100),
        resultLevel: resultLevel
      },
      detailedAnswers: enhancedAnswers
    };
    
    console.log("Enhanced data being sent:", enhancedData);
    
    // Make the actual API call to the webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enhancedData),
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
