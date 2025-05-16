
import { QuizConfig } from "@/types/quiz";

export const sampleQuiz: QuizConfig = {
  id: "spanish-knowledge-quiz",
  title: "Test Your Spanish Knowledge",
  description: "A casual and fun quiz to assess your Spanish language skills",
  logoUrl: "https://lwfiles.mycourse.app/6409eb5798e53550d7acd5f1-public/1bfa7bb23c37499f0d5908f0a004c50e.png",
  introImageUrl: "https://spanishvip.com/wp-content/uploads/2025/04/private-tutoring.jpg",
  introText: "Test your Spanish knowledge with this casual and fun quiz! We'll cover basic greetings, vocabulary, grammar, and everyday phrases. Answer the 10 questions below and check your scoring at the end to see if you're an Absolute Beginner, Beginner, or Elementary (A2). ¡Buena suerte!",
  estimatedTime: "5-7 minutes",
  primaryColor: "#FF5913",
  secondaryColor: "#1DD3B0",
  webhookUrl: "https://hook.us2.make.com/09duputr8qoda8dmirdsmcw1gy82ayil",
  incentiveEnabled: true,
  incentiveTitle: "Spanish Shortcuts Guide",
  incentiveUrl: "https://spanishvip.com/wp-content/uploads/2022/02/Easy-Spanish-Shortcuts-Updated.pdf",
  externalRedirectUrl: "https://spanishvip.com/",
  questions: [
    {
      id: "q1",
      type: "mcq",
      title: "Greetings: You're learning to greet people. How do you say \"Hello\" in Spanish?",
      required: true,
      options: [
        { id: "a1", text: "A) Hola", value: "hola" },
        { id: "a2", text: "B) Adiós", value: "adios" },
        { id: "a3", text: "C) Gracias", value: "gracias" },
        { id: "a4", text: "D) Por favor", value: "porfavor" }
      ]
    },
    {
      id: "q2",
      type: "mcq",
      title: "Introductions: You meet someone new and they ask, \"¿Cómo te llamas?\" How do you respond?",
      required: true,
      options: [
        { id: "a1", text: "A) Me llamo Carlos. (My name is Carlos.)", value: "me_llamo" },
        { id: "a2", text: "B) Estoy bien, gracias. (I'm fine, thanks.)", value: "estoy_bien" },
        { id: "a3", text: "C) Buenos días. (Good morning.)", value: "buenos_dias" },
        { id: "a4", text: "D) Tengo 20 años. (I am 20 years old.)", value: "tengo_anos" }
      ]
    },
    {
      id: "q3",
      type: "mcq",
      title: "Numbers: What number comes next in this Spanish sequence: uno, dos, tres, ...?",
      required: true,
      options: [
        { id: "a1", text: "A) cinco", value: "cinco" },
        { id: "a2", text: "B) cuatro", value: "cuatro" },
        { id: "a3", text: "C) seis", value: "seis" },
        { id: "a4", text: "D) tres", value: "tres" }
      ]
    },
    {
      id: "q4",
      type: "image-selection",
      title: "Vocabulary (Image): Look at the image below. Which Spanish word matches the picture?",
      subtitle: "Select the correct Spanish word for the image",
      required: true,
      imageOptions: [
        { 
          id: "a1", 
          src: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6", 
          alt: "Una manzana (Apple)", 
          value: "manzana" 
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
        },
        { 
          id: "a4", 
          src: "https://spanishvip.com/wp-content/uploads/2025/05/eric-rothermel-FoKO4DpXamQ-unsplash.jpg", 
          alt: "Un calendario - Lunes (Monday)", 
          value: "lunes" 
        }
      ]
    },
    {
      id: "q5",
      type: "mcq",
      title: "Basic Grammar: Complete the sentence with the correct form of \"to be\": Yo ___ en casa. (I am at home.)",
      required: true,
      options: [
        { id: "a1", text: "A) soy", value: "soy" },
        { id: "a2", text: "B) estoy", value: "estoy" },
        { id: "a3", text: "C) es", value: "es" },
        { id: "a4", text: "D) tengo", value: "tengo" }
      ]
    },
    {
      id: "q6",
      type: "fill-in-blanks",
      title: "Basic Grammar: Choose the correct form of the verb \"tener\" (to have):",
      subtitle: "Ella ___ dos hermanos. (She has two brothers.)",
      helpText: "Enter the correct form of the verb \"tener\" in the blank space.",
      required: true
    },
    {
      id: "q7",
      type: "mcq",
      title: "Common Verb: Let's go to the park! Complete the sentence: Nosotros ___ al parque todos los días. (We go to the park every day.)",
      required: true,
      options: [
        { id: "a1", text: "A) vamos", value: "vamos" },
        { id: "a2", text: "B) somos", value: "somos" },
        { id: "a3", text: "C) tenemos", value: "tenemos" },
        { id: "a4", text: "D) estamos", value: "estamos" }
      ]
    },
    {
      id: "q8",
      type: "audio",
      title: "Listening (Audio): Listen to the audio and choose the correct meaning.",
      subtitle: "What does this Spanish phrase mean in English?",
      helpText: "Listen carefully to the Spanish phrase in the audio clip",
      required: true,
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/05/quizz-test.mp3",
      options: [
        { id: "a1", text: "A) Where is the bathroom?", value: "bathroom" },
        { id: "a2", text: "B) Where is the bank?", value: "bank" },
        { id: "a3", text: "C) How are you?", value: "how_are_you" },
        { id: "a4", text: "D) What time is it?", value: "time" }
      ]
    },
    {
      id: "q9",
      type: "mcq",
      title: "Everyday Phrase: You hear someone say, \"Tengo hambre.\" What does this mean?",
      required: true,
      options: [
        { id: "a1", text: "A) I'm hungry.", value: "hungry" },
        { id: "a2", text: "B) I'm thirsty.", value: "thirsty" },
        { id: "a3", text: "C) I'm sleepy.", value: "sleepy" },
        { id: "a4", text: "D) I'm angry.", value: "angry" }
      ]
    },
    {
      id: "q10",
      type: "mcq",
      title: "Reading Comprehension: Read the short dialogue and answer the question.",
      subtitle: "Carlos: Buenos días. ¿Tiene café?\nMesero: Sí, tenemos café. ¿Desea una taza?\nCarlos: Sí, por favor.\nQuestion: What is Carlos asking for?",
      required: true,
      options: [
        { id: "a1", text: "A) Coffee", value: "coffee" },
        { id: "a2", text: "B) Tea", value: "tea" },
        { id: "a3", text: "C) Water", value: "water" },
        { id: "a4", text: "D) The check (bill)", value: "check" }
      ]
    },
    {
      id: "q11",
      type: "mcq",
      title: "Sentence Structure: Which of the following sentences is grammatically correct in Spanish?",
      required: true,
      options: [
        { id: "a1", text: "A) La gato negra.", value: "la_gato_negra" },
        { id: "a2", text: "B) El gato negro.", value: "el_gato_negro" },
        { id: "a3", text: "C) El negro gato.", value: "el_negro_gato" },
        { id: "a4", text: "D) Gato el negro.", value: "gato_el_negro" }
      ]
    }
  ],
  resultTemplates: [
    {
      id: "absolute-beginner",
      title: "Absolute Beginner",
      description: "You scored 0-3 correct answers. You're just starting out (or refreshing the very basics). Don't worry! Everyone starts somewhere. Our Spanish Shortcuts Guide will help you build a solid foundation.",
      conditions: [
        { questionId: "q1", answerId: "a2" },
        { questionId: "q2", answerId: "a2" },
        { questionId: "q3", answerId: "a1" },
        { questionId: "q4", answerId: "a2" },
        { questionId: "q5", answerId: "a1" },
        { questionId: "q6", value: "tiene" },
        { questionId: "q7", answerId: "a2" },
        { questionId: "q8", answerId: "a2" },
        { questionId: "q9", answerId: "a2" },
        { questionId: "q10", answerId: "a2" },
        { questionId: "q11", answerId: "a1" }
      ]
    },
    {
      id: "beginner",
      title: "Beginner",
      description: "You scored 4-6 correct answers. You have basic Spanish knowledge and can handle simple conversations. Keep practicing with our Spanish Shortcuts Guide to improve your skills!",
      conditions: [
        { questionId: "q1", answerId: "a1" },
        { questionId: "q5", answerId: "a2" },
        { questionId: "q6", value: "tiene" },
        { questionId: "q11", answerId: "a2" }
      ]
    },
    {
      id: "elementary",
      title: "Elementary (A2)",
      description: "Congratulations! You scored 7-10 correct answers. You can understand and use familiar Spanish in everyday situations. Our Spanish Shortcuts Guide will help you advance to the next level!",
      conditions: [
        { questionId: "q1", answerId: "a1" },
        { questionId: "q2", answerId: "a1" },
        { questionId: "q3", answerId: "a2" },
        { questionId: "q4", answerId: "a1" },
        { questionId: "q5", answerId: "a2" },
        { questionId: "q6", value: "tiene" },
        { questionId: "q7", answerId: "a1" },
        { questionId: "q8", answerId: "a1" },
        { questionId: "q9", answerId: "a1" },
        { questionId: "q10", answerId: "a1" },
        { questionId: "q11", answerId: "a2" }
      ]
    }
  ]
};
