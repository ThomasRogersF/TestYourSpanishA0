
import { QuestionTemplate, QuizTemplateCollection } from "@/types/quizTemplates";
import { ResultTemplate } from "@/types/quiz";

/**
 * Create a multiple choice question template with correct answer indication
 */
export const createMCQTemplate = (
  id: string,
  title: string,
  options: {text: string, value: string, isCorrect?: boolean}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuestionTemplate => {
  // Find the correct option value if any is marked as correct
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

/**
 * Create an image selection question template with correct answer indication
 */
export const createImageSelectionTemplate = (
  id: string,
  title: string,
  imageOptions: {src: string, alt: string, value: string, isCorrect?: boolean}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuestionTemplate => {
  // Find the correct option value if any is marked as correct
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

/**
 * Create an audio question template with correct answer indication
 */
export const createAudioQuestionTemplate = (
  id: string,
  title: string,
  audioUrl: string,
  options: {text: string, value: string, isCorrect?: boolean}[],
  required: boolean = true,
  subtitle?: string,
  helpText?: string
): QuestionTemplate => {
  // Find the correct option value if any is marked as correct
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

/**
 * Create a text input question template with correct answer
 */
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

/**
 * Create a fill in the blanks question template with correct answer
 */
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

/**
 * Create a result template
 */
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

/**
 * Compile QuestionTemplates to regular QuizQuestions (removing correctAnswer properties)
 */
export const compileQuestionTemplates = (templates: QuestionTemplate[]): any[] => {
  return templates.map(template => {
    // Extract properties except correctAnswer
    const { correctAnswer, ...questionProps } = template;
    return questionProps;
  });
};

/**
 * Generate a complete template collection with examples of all question types
 */
export const generateCompleteTemplateExample = (): QuizTemplateCollection => {
  return {
    questions: [
      createMCQTemplate(
        'q1',
        'Multiple Choice Question Example',
        [
          { text: 'Option A', value: 'option_a', isCorrect: true },
          { text: 'Option B', value: 'option_b' },
          { text: 'Option C', value: 'option_c' },
          { text: 'Option D', value: 'option_d' }
        ],
        true,
        'Select the correct option',
        'This is a multiple choice question'
      ),
      createImageSelectionTemplate(
        'q2',
        'Image Selection Question Example',
        [
          { src: 'https://example.com/image1.jpg', alt: 'Image 1', value: 'image_1', isCorrect: true },
          { src: 'https://example.com/image2.jpg', alt: 'Image 2', value: 'image_2' }
        ],
        true,
        'Select the correct image',
        'Choose the image that best matches the description'
      ),
      createAudioQuestionTemplate(
        'q3',
        'Audio Question Example',
        'https://example.com/audio.mp3',
        [
          { text: 'Option A', value: 'option_a', isCorrect: true },
          { text: 'Option B', value: 'option_b' },
          { text: 'Option C', value: 'option_c' },
          { text: 'Option D', value: 'option_d' }
        ],
        true,
        'Listen to the audio and select the correct answer',
        'You may replay the audio as many times as needed'
      ),
      createTextQuestionTemplate(
        'q4',
        'Text Input Question Example',
        'correct_answer',
        true,
        'Type your answer in the field below',
        'Be concise in your response'
      ),
      createFillInBlanksTemplate(
        'q5',
        'Fill in the Blanks Question Example',
        'blue',
        true,
        'Complete the sentence: The sky is ___.',
        'Type a single word to complete the sentence'
      )
    ],
    resultTemplates: [
      createResultTemplate(
        'beginner',
        'Beginner Level',
        'You are at the beginner level. Keep practicing!',
        [
          { questionId: 'q1', answerId: 'a1' },
          { questionId: 'q2', answerId: 'a1' }
        ]
      ),
      createResultTemplate(
        'intermediate',
        'Intermediate Level',
        'You are at the intermediate level. Good job!',
        [
          { questionId: 'q1', answerId: 'a2' },
          { questionId: 'q3', answerId: 'a2' }
        ]
      ),
      createResultTemplate(
        'advanced',
        'Advanced Level',
        'You are at the advanced level. Excellent!',
        [
          { questionId: 'q1', answerId: 'a3' },
          { questionId: 'q4', value: 'specific_text' }
        ]
      )
    ]
  };
};

/**
 * Convert the template collection to a JSON string
 */
export const templateToJSON = (template: QuizTemplateCollection): string => {
  return JSON.stringify(template, null, 2);
};

/**
 * Parse a template collection from JSON
 */
export const parseTemplateFromJSON = (jsonString: string): QuizTemplateCollection | null => {
  try {
    return JSON.parse(jsonString) as QuizTemplateCollection;
  } catch (error) {
    console.error("Error parsing template JSON:", error);
    return null;
  }
};
