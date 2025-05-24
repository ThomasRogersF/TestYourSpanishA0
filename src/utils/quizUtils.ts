import { QuizAnswer, QuizQuestion, ResultTemplate, QuizConfig } from "@/types/quiz";
import { QuestionTemplate, QuizTemplateCollection } from "@/types/quizTemplates";

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
  
  // Calculate score for each level
  const levelScores = {
    a1: calculateLevelScore(answers, "a1"),
    a2: calculateLevelScore(answers, "a2"),
    b1: calculateLevelScore(answers, "b1"),
    b2: calculateLevelScore(answers, "b2")
  };
  
  console.log("Level scores:", levelScores);
  
  // Determine the highest level with at least 2 correct answers
  if (levelScores.b2 >= 2) {
    return resultTemplates.find(t => t.id === "b2") || resultTemplates[0];
  } else if (levelScores.b1 >= 2) {
    return resultTemplates.find(t => t.id === "b1") || resultTemplates[0];
  } else if (levelScores.a2 >= 2) {
    return resultTemplates.find(t => t.id === "a2") || resultTemplates[0];
  } else {
    return resultTemplates.find(t => t.id === "a1") || resultTemplates[0];
  }
};

// Helper function to calculate score for a specific level
const calculateLevelScore = (answers: QuizAnswer[], level: string): number => {
  // Map of question IDs to their correct answers for each level
  const correctAnswerMap: Record<string, Record<string, string | string[]>> = {
    a1: {
      "q1": "me_llamo_sebastian",
      "q2": "estoy_bien_tambien",
      "q3": "tiene",
      "q4": "manzanas",
      "q5": "oracion_d",
      "q6": "banarse"
    },
    a2: {
      "q7": "corrio",
      "q8": "para",
      "q9": "iba",
      "q10": "licuadora",
      "q11": "oracion_c",
      "q12": "ha_trabajado"
    },
    b1: {
      "q13": "llevamos",
      "q14": "podre_descansar",
      "q15": "sepas",
      "q16": "cambio_climatico",
      "q17": "ojala_bien",
      "q18": "tengas_buen_dia"
    },
    b2: {
      "q19": "se_me_cayo",
      "q20": "habria_llamado",
      "q21": "hayas_venido",
      "q22": "angry",
      "q23": "deje_ver",
      "q24": "lo_esperara",
      "q25": "se_la_dijo"
    }
  };

  const levelQuestions = correctAnswerMap[level];
  if (!levelQuestions) return 0;
  
  let score = 0;
  
  answers.forEach(answer => {
    const questionId = answer.questionId;
    if (levelQuestions[questionId] && answer.value === levelQuestions[questionId]) {
      score++;
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
    
    // Calculate score by counting the number of correct answers
    const correctAnswers = countCorrectAnswers(participant.answers);
    
    // Build simplified data structure
    const simplifiedData = {
      name: participant.name,
      email: participant.email,
      score: correctAnswers
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

// Function to count the number of correct answers (to replace calculateScore)
const countCorrectAnswers = (answers: QuizAnswer[]): number => {
  // Map of all question IDs to their correct answers
  const correctAnswerMap: Record<string, string | string[]> = {
    "q1": "me_llamo_sebastian",
    "q2": "estoy_bien_tambien",
    "q3": "tiene",
    "q4": "manzanas",
    "q5": "oracion_d",
    "q6": "banarse",
    "q7": "corrio",
    "q8": "para",
    "q9": "iba",
    "q10": "licuadora",
    "q11": "oracion_c",
    "q12": "ha_trabajado",
    "q13": "llevamos",
    "q14": "podre_descansar",
    "q15": "sepas",
    "q16": "cambio_climatico",
    "q17": "ojala_bien",
    "q18": "tengas_buen_dia",
    "q19": "se_me_cayo",
    "q20": "habria_llamado",
    "q21": "hayas_venido",
    "q22": "angry",
    "q23": "deje_ver",
    "q24": "lo_esperara",
    "q25": "se_la_dijo"
  };
  
  let correctCount = 0;
  
  answers.forEach(answer => {
    const questionId = answer.questionId;
    if (correctAnswerMap[questionId] && answer.value === correctAnswerMap[questionId]) {
      correctCount++;
    }
  });
  
  return correctCount;
};

// New utility functions for question templates

// Create a multiple choice question template
export const createMCQTemplate = (
  id: string,
  title: string,
  options: {text: string, value: string, isCorrect?: boolean}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuestionTemplate => {
  const correctOption = options.find(opt => opt.isCorrect);
  
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
      value: opt.value,
      isCorrect: opt.isCorrect
    })),
    correctAnswer: correctOption?.value
  };
};

// Create an image selection question template
export const createImageSelectionTemplate = (
  id: string,
  title: string,
  imageOptions: {src: string, alt: string, value: string, isCorrect?: boolean}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuestionTemplate => {
  const correctOption = imageOptions.find(opt => opt.isCorrect);
  
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
      value: opt.value,
      isCorrect: opt.isCorrect
    })),
    correctAnswer: correctOption?.value
  };
};

// Create an audio question template
export const createAudioQuestionTemplate = (
  id: string,
  title: string,
  audioUrl: string,
  options: {text: string, value: string, isCorrect?: boolean}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuestionTemplate => {
  const correctOption = options.find(opt => opt.isCorrect);
  
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
      value: opt.value,
      isCorrect: opt.isCorrect
    })),
    correctAnswer: correctOption?.value
  };
};

// Create a text input question template
export const createTextQuestionTemplate = (
  id: string,
  title: string,
  correctAnswer: string,
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuestionTemplate => {
  return {
    id,
    type: 'text',
    title,
    subtitle,
    helpText,
    required,
    correctAnswer
  };
};

// Create a fill in the blanks question template
export const createFillInBlanksTemplate = (
  id: string,
  title: string,
  correctAnswer: string,
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuestionTemplate => {
  return {
    id,
    type: 'fill-in-blanks',
    title,
    subtitle,
    helpText,
    required,
    correctAnswer
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
  questions: QuestionTemplate[],
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
  "id": "spanish-level-quiz",
  "title": "Spanish Level Assessment",
  "description": "Find out your Spanish proficiency level",
  "logoUrl": "https://example.com/logo.png",
  "introImageUrl": "https://spanishvip.com/wp-content/uploads/2025/04/private-tutoring.jpg",
  "introText": "Welcome to the Spanish level assessment!",
  "estimatedTime": "10-15 minutes",
  "primaryColor": "#FF5913",
  "secondaryColor": "#1DD3B0",
  "webhookUrl": "https://your-webhook-url.com",
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "title": "¿Cómo te llamas?",
      "required": true,
      "options": [
        { "id": "a1", "text": "Tengo 20 años", "value": "tengo_20" },
        { "id": "a2", "text": "Me llamo Juan", "value": "me_llamo_juan", "isCorrect": true },
        { "id": "a3", "text": "Estoy cansado", "value": "estoy_cansado" },
        { "id": "a4", "text": "Soy de Colombia", "value": "soy_de_colombia" }
      ],
      "correctAnswer": "me_llamo_juan"
    },
    // Other questions would follow...
  ],
  "resultTemplates": [
    {
      "id": "a1",
      "title": "A1 • Beginner",
      "description": "Tu nivel aproximado es A1: puedes comunicarte en situaciones muy básicas.",
      "conditions": [
        { "questionId": "q1", "value": "me_llamo_juan" },
        // Other conditions...
      ]
    }
    // Other result templates would follow...
  ]
};

// Format quiz template as JSON for copy-paste
export const quizTemplateJSON = JSON.stringify(quizTemplateExample, null, 2);

// Compile a quiz template into a quiz config
export const compileQuizTemplate = (template: QuizTemplateCollection): QuizConfig => {
  // Convert template questions to quiz questions
  const questions = template.questions.map(q => {
    // Remove isCorrect from options for the actual quiz
    const questionConfig: QuizQuestion = {
      ...q,
      options: q.options?.map(o => ({
        id: o.id,
        text: o.text,
        value: o.value
      })),
      imageOptions: q.imageOptions?.map(o => ({
        id: o.id,
        src: o.src,
        alt: o.alt,
        value: o.value
      }))
    };
    
    return questionConfig;
  });
  
  // For simplicity, we'll just pass through the result templates
  return {
    id: `quiz-${Date.now()}`, // Generate a unique ID
    title: "Quiz from Template",
    questions,
    resultTemplates: template.resultTemplates,
    webhookUrl: "", // This would need to be set
    incentiveEnabled: false
  };
};
