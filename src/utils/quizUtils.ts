
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

// New utility functions for question templates

// Create a multiple choice question template
export const createMCQTemplate = (
  id: string,
  title: string,
  options: {text: string, value: string}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuizQuestion => {
  return {
    id,
    type: 'mcq',
    title,
    subtitle,
    helpText,
    required,
    options: options.map((opt, index) => ({
      id: `a${index + 1}`,
      text: opt.text,
      value: opt.value
    }))
  };
};

// Create an image selection question template
export const createImageSelectionTemplate = (
  id: string,
  title: string,
  imageOptions: {src: string, alt: string, value: string}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuizQuestion => {
  return {
    id,
    type: 'image-selection',
    title,
    subtitle,
    helpText,
    required,
    imageOptions: imageOptions.map((opt, index) => ({
      id: `a${index + 1}`,
      src: opt.src,
      alt: opt.alt,
      value: opt.value
    }))
  };
};

// Create an audio question template
export const createAudioQuestionTemplate = (
  id: string,
  title: string,
  audioUrl: string,
  options: {text: string, value: string}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuizQuestion => {
  return {
    id,
    type: 'audio',
    title,
    subtitle,
    helpText,
    required,
    audioUrl,
    options: options.map((opt, index) => ({
      id: `a${index + 1}`,
      text: opt.text,
      value: opt.value
    }))
  };
};

// Create a text input question template
export const createTextQuestionTemplate = (
  id: string,
  title: string,
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuizQuestion => {
  return {
    id,
    type: 'text',
    title,
    subtitle,
    helpText,
    required
  };
};

// Create a fill in the blanks question template
export const createFillInBlanksTemplate = (
  id: string,
  title: string,
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuizQuestion => {
  return {
    id,
    type: 'fill-in-blanks',
    title,
    subtitle,
    helpText,
    required
  };
};

// Create a result template
export const createResultTemplate = (
  id: string,
  title: string,
  description: string,
  conditions: {questionId: string, answerId?: string, value?: string}[]
): ResultTemplate => {
  return {
    id,
    title,
    description,
    conditions
  };
};

// Create a complete quiz config template
export const createQuizConfigTemplate = (
  id: string,
  title: string,
  questions: QuizQuestion[],
  resultTemplates: ResultTemplate[],
  webhookUrl: string,
  options?: {
    description?: string,
    logoUrl?: string,
    introImageUrl?: string,
    introText?: string,
    estimatedTime?: string,
    primaryColor?: string,
    secondaryColor?: string,
    incentiveEnabled?: boolean,
    incentiveTitle?: string,
    incentiveUrl?: string,
    externalRedirectUrl?: string
  }
): QuizConfig => {
  return {
    id,
    title,
    description: options?.description,
    logoUrl: options?.logoUrl,
    introImageUrl: options?.introImageUrl,
    introText: options?.introText,
    estimatedTime: options?.estimatedTime,
    primaryColor: options?.primaryColor || "#FF5913",
    secondaryColor: options?.secondaryColor || "#1DD3B0",
    webhookUrl,
    questions,
    resultTemplates,
    incentiveEnabled: options?.incentiveEnabled || false,
    incentiveTitle: options?.incentiveTitle,
    incentiveUrl: options?.incentiveUrl,
    externalRedirectUrl: options?.externalRedirectUrl
  };
};

// Parse a JSON quiz config and validate its structure
export const parseQuizConfigFromJSON = (jsonString: string): QuizConfig | null => {
  try {
    const parsedConfig = JSON.parse(jsonString);
    
    // Validate the basic structure
    if (!parsedConfig.id || !parsedConfig.title || !Array.isArray(parsedConfig.questions)) {
      console.error("Invalid quiz config: missing required fields");
      return null;
    }
    
    // Validate questions
    for (const question of parsedConfig.questions) {
      if (!question.id || !question.type || !question.title) {
        console.error("Invalid question format:", question);
        return null;
      }
    }
    
    return parsedConfig as QuizConfig;
  } catch (error) {
    console.error("Error parsing quiz config JSON:", error);
    return null;
  }
};

// Example of quiz template for easy copy-paste
export const quizTemplateExample = {
  "id": "quiz-template",
  "title": "Quiz Template",
  "description": "A template for creating quizzes",
  "logoUrl": "https://example.com/logo.png",
  "introImageUrl": "https://example.com/intro.jpg",
  "introText": "Welcome to the quiz template!",
  "estimatedTime": "5-10 minutes",
  "primaryColor": "#FF5913",
  "secondaryColor": "#1DD3B0",
  "webhookUrl": "https://your-webhook-url.com",
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "title": "Multiple Choice Question Example",
      "subtitle": "Select the correct option",
      "required": true,
      "options": [
        { "id": "a1", "text": "Option A", "value": "option_a" },
        { "id": "a2", "text": "Option B", "value": "option_b" },
        { "id": "a3", "text": "Option C", "value": "option_c" },
        { "id": "a4", "text": "Option D", "value": "option_d" }
      ]
    },
    {
      "id": "q2",
      "type": "image-selection",
      "title": "Image Selection Question Example",
      "subtitle": "Select the correct image",
      "required": true,
      "imageOptions": [
        { 
          "id": "a1", 
          "src": "https://example.com/image1.jpg", 
          "alt": "Image 1", 
          "value": "image_1" 
        },
        { 
          "id": "a2", 
          "src": "https://example.com/image2.jpg", 
          "alt": "Image 2", 
          "value": "image_2" 
        }
      ]
    },
    {
      "id": "q3",
      "type": "audio",
      "title": "Audio Question Example",
      "subtitle": "Listen to the audio and select the correct answer",
      "helpText": "You may replay the audio as many times as needed",
      "required": true,
      "audioUrl": "https://example.com/audio.mp3",
      "options": [
        { "id": "a1", "text": "Option A", "value": "option_a" },
        { "id": "a2", "text": "Option B", "value": "option_b" },
        { "id": "a3", "text": "Option C", "value": "option_c" },
        { "id": "a4", "text": "Option D", "value": "option_d" }
      ]
    },
    {
      "id": "q4",
      "type": "text",
      "title": "Text Input Question Example",
      "subtitle": "Type your answer in the field below",
      "helpText": "Be concise in your response",
      "required": true
    },
    {
      "id": "q5",
      "type": "fill-in-blanks",
      "title": "Fill in the Blanks Question Example",
      "subtitle": "Complete the sentence: The sky is ___.",
      "helpText": "Type a single word to complete the sentence",
      "required": true
    }
  ],
  "resultTemplates": [
    {
      "id": "beginner",
      "title": "Beginner Level",
      "description": "You are at the beginner level. Keep practicing!",
      "conditions": [
        { "questionId": "q1", "answerId": "a1" },
        { "questionId": "q2", "answerId": "a1" }
      ]
    },
    {
      "id": "intermediate",
      "title": "Intermediate Level",
      "description": "You are at the intermediate level. Good job!",
      "conditions": [
        { "questionId": "q1", "answerId": "a2" },
        { "questionId": "q3", "answerId": "a2" }
      ]
    },
    {
      "id": "advanced",
      "title": "Advanced Level",
      "description": "You are at the advanced level. Excellent!",
      "conditions": [
        { "questionId": "q1", "answerId": "a3" },
        { "questionId": "q4", "value": "specific_text" }
      ]
    }
  ],
  "incentiveEnabled": true,
  "incentiveTitle": "Free Resource Guide",
  "incentiveUrl": "https://example.com/resource.pdf",
  "externalRedirectUrl": "https://example.com/thankyou"
};
