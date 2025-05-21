
import { QuizTemplateCollection } from "@/types/quizTemplates";

// This is a complete template sample showcasing all question types with correct answers
export const sampleTemplate: QuizTemplateCollection = {
  questions: [
    // MCQ Question
    {
      id: "q1",
      type: "mcq",
      title: "Multiple Choice: How do you say \"Hello\" in Spanish?",
      required: true,
      options: [
        { id: "a1", text: "Hola", value: "hola", isCorrect: true },
        { id: "a2", text: "Adiós", value: "adios" },
        { id: "a3", text: "Gracias", value: "gracias" },
        { id: "a4", text: "Por favor", value: "porfavor" }
      ],
      correctAnswer: "hola"
    },
    
    // Image Selection Question
    {
      id: "q2",
      type: "image-selection",
      title: "Image Selection: Which of these is an apple?",
      subtitle: "Select the correct image",
      required: true,
      imageOptions: [
        { 
          id: "a1", 
          src: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6", 
          alt: "Una manzana (Apple)", 
          value: "manzana",
          isCorrect: true
        },
        { 
          id: "a2", 
          src: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119", 
          alt: "Un perro (Dog)", 
          value: "perro" 
        },
        { 
          id: "a3", 
          src: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc", 
          alt: "Una mesa (Table)", 
          value: "mesa" 
        }
      ],
      correctAnswer: "manzana"
    },
    
    // Audio Question
    {
      id: "q3",
      type: "audio",
      title: "Audio Question: Listen and select the correct meaning",
      subtitle: "What does this Spanish phrase mean in English?",
      helpText: "Listen carefully to the audio clip",
      required: true,
      audioUrl: "https://example.com/sample-audio.mp3",
      options: [
        { id: "a1", text: "Where is the bathroom?", value: "bathroom", isCorrect: true },
        { id: "a2", text: "Where is the bank?", value: "bank" },
        { id: "a3", text: "How are you?", value: "how_are_you" },
        { id: "a4", text: "What time is it?", value: "time" }
      ],
      correctAnswer: "bathroom"
    },
    
    // Text Input Question
    {
      id: "q4",
      type: "text",
      title: "Text Input: What is the capital of Spain?",
      subtitle: "Type your answer below",
      helpText: "Enter the name of the city only",
      required: true,
      correctAnswer: "madrid"
    },
    
    // Fill in the Blanks Question
    {
      id: "q5",
      type: "fill-in-blanks",
      title: "Fill in the Blanks: Complete this Spanish sentence",
      subtitle: "Ella ___ dos hermanos. (She has two brothers.)",
      helpText: "Use the correct form of the verb 'tener' (to have)",
      required: true,
      correctAnswer: "tiene"
    }
  ],
  resultTemplates: [
    {
      id: "beginner",
      title: "Beginner Level",
      description: "You are at the beginner level (0-2 correct answers). Keep practicing!",
      conditions: [
        { questionId: "q1", value: "hola" },
        { questionId: "q5", value: "tiene" }
      ]
    },
    {
      id: "intermediate",
      title: "Intermediate Level",
      description: "You are at the intermediate level (3-4 correct answers). Good job!",
      conditions: [
        { questionId: "q2", value: "manzana" },
        { questionId: "q3", value: "bathroom" }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Level",
      description: "You are at the advanced level (all 5 correct answers). Excellent!",
      conditions: [
        { questionId: "q1", value: "hola" },
        { questionId: "q2", value: "manzana" },
        { questionId: "q3", value: "bathroom" },
        { questionId: "q4", value: "madrid" },
        { questionId: "q5", value: "tiene" }
      ]
    }
  ]
};

// JSON format example for easy copy-paste
export const sampleTemplateJSON = JSON.stringify(sampleTemplate, null, 2);
