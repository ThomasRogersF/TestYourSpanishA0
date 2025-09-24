import { QuizConfig } from "@/types/quiz";

export const sampleQuiz: QuizConfig = {
  id: "spanish-knowledge-quiz",
  title: "Test Your Spanish Knowledge",
  description: "A casual and fun quiz to assess your Spanish language skills",
  logoUrl: "https://lwfiles.mycourse.app/6409eb5798e53550d7acd5f1-public/1bfa7bb23c37499f0d5908f0a004c50e.png",
  introImageUrl: "https://spanishvip.com/wp-content/uploads/2025/04/private-tutoring.jpg",
  introText: "Test your Spanish knowledge with this casual and fun quiz! We'll cover basic greetings, vocabulary, grammar, and everyday phrases. Answer the questions below and check your scoring at the end to see your approximate Spanish level. ¡Buena suerte!",
  estimatedTime: "5-7 minutes",
  primaryColor: "#FF5913",
  secondaryColor: "#1DD3B0",
  webhookUrl: "",
  incentiveEnabled: true,
  incentiveTitle: "Spanish Shortcuts Guide",
  incentiveUrl: "https://spanishvip.com/wp-content/uploads/2022/02/Easy-Spanish-Shortcuts-Updated.pdf",
  externalRedirectUrl: "https://spanishvip.com/",
  questions: [
    // ---------- Basic Vocabulary ----------
    {
      id: "q1",
      type: "mcq",
      title: "Look at the picture. Which word is correct?",
      required: true,
      imageUrl: "https://spanishvip.com/wp-content/uploads/2025/09/Depositphotos_52753403_L.jpg",
      options: [
        { id: "a1", text: "perro", value: "perro" },
        { id: "a2", text: "casa", value: "casa" },
        { id: "a3", text: "mesa", value: "mesa" },
        { id: "a4", text: "silla", value: "silla" }
      ]
    },
    {
      id: "q2",
      type: "mcq",
      title: "Look at the picture. Which word is correct?",
      required: true,
      imageUrl: "https://spanishvip.com/wp-content/uploads/2025/09/Depositphotos_141195684_L.jpg",
      options: [
        { id: "a1", text: "libro", value: "libro" },
        { id: "a2", text: "gato", value: "gato" },
        { id: "a3", text: "escuela", value: "escuela" },
        { id: "a4", text: "coche", value: "coche" }
      ]
    },
    {
      id: "q3",
      type: "mcq",
      title: "Look at the picture. Which word is correct?",
      required: true,
      imageUrl: "https://spanishvip.com/wp-content/uploads/2025/09/Depositphotos_660350964_L.jpg",
      options: [
        { id: "a1", text: "libro", value: "libro" },
        { id: "a2", text: "gato", value: "gato" },
        { id: "a3", text: "mesa", value: "mesa" },
        { id: "a4", text: "perro", value: "perro" }
      ]
    },
    {
      id: "q4",
      type: "mcq",
      title: "Look at the picture. Which word is correct?",
      required: true,
      imageUrl: "https://spanishvip.com/wp-content/uploads/2025/09/Depositphotos_83652806_L.jpg",
      options: [
        { id: "a1", text: "mesa", value: "mesa" },
        { id: "a2", text: "silla", value: "silla" },
        { id: "a3", text: "casa", value: "casa" },
        { id: "a4", text: "carro", value: "carro" }
      ]
    },

    // ---------- Translations & Greetings ----------
    {
      id: "q5",
      type: "mcq",
      title: "Translate into Spanish: 'Hello'",
      required: true,
      options: [
        { id: "a1", text: "Gracias", value: "gracias" },
        { id: "a2", text: "Hola", value: "hola" },
        { id: "a3", text: "Adiós", value: "adios" },
        { id: "a4", text: "Por favor", value: "por_favor" }
      ]
    },
    {
      id: "q6",
      type: "mcq",
      title: "Translate into Spanish: 'Goodbye'",
      required: true,
      options: [
        { id: "a1", text: "Hola", value: "hola" },
        { id: "a2", text: "Adiós", value: "adios" },
        { id: "a3", text: "Buenos días", value: "buenos_dias" },
        { id: "a4", text: "Gracias", value: "gracias" }
      ]
    },
    {
      id: "q7",
      type: "mcq",
      title: "Translate into Spanish: 'Please'",
      required: true,
      options: [
        { id: "a1", text: "Gracias", value: "gracias" },
        { id: "a2", text: "Por favor", value: "por_favor" },
        { id: "a3", text: "Hola", value: "hola" },
        { id: "a4", text: "De nada", value: "de_nada" }
      ]
    },
    {
      id: "q8",
      type: "mcq",
      title: "Translate into Spanish: 'Thank you'",
      required: true,
      options: [
        { id: "a1", text: "Hola", value: "hola" },
        { id: "a2", text: "Por favor", value: "por_favor" },
        { id: "a3", text: "Gracias", value: "gracias" },
        { id: "a4", text: "Buenos días", value: "buenos_dias" }
      ]
    },

    // ---------- Personal Information ----------
    {
      id: "q9",
      type: "fill-in-blanks",
      title: "Complete the phrase: 'Yo soy ____.' (Write your name in the blank space).",
      required: true
    },
    {
      id: "q10",
      type: "fill-in-blanks",
      title: "Complete the phrase: 'Soy de ____.' (Write your country in the blank space).",
      required: true
    },

    // ---------- Grammar Fundamentals ----------
    {
      id: "q11",
      type: "mcq",
      title: "Choose the correct article: ____ manzana",
      required: true,
      options: [
        { id: "a1", text: "el", value: "el" },
        { id: "a2", text: "la", value: "la" },
        { id: "a3", text: "los", value: "los" },
        { id: "a4", text: "las", value: "las" }
      ]
    },
    {
      id: "q12",
      type: "mcq",
      title: "Choose the correct article: ____ bananos",
      required: true,
      options: [
        { id: "a1", text: "el", value: "el" },
        { id: "a2", text: "la", value: "la" },
        { id: "a3", text: "los", value: "los" },
        { id: "a4", text: "las", value: "las" }
      ]
    },
    {
      id: "q13",
      type: "mcq",
      title: "Choose the plural form: 'el museo' →",
      required: true,
      options: [
        { id: "a1", text: "los museo", value: "los_museo" },
        { id: "a2", text: "las museos", value: "las_museos" },
        { id: "a3", text: "los museos", value: "los_museos" },
        { id: "a4", text: "el museos", value: "el_museos" }
      ]
    },
    {
      id: "q14",
      type: "mcq",
      title: "Choose the plural form: 'la biblioteca' →",
      required: true,
      options: [
        { id: "a1", text: "las bibliotecas", value: "las_bibliotecas" },
        { id: "a2", text: "los bibliotecas", value: "los_bibliotecas" },
        { id: "a3", text: "la bibliotecas", value: "la_bibliotecas" },
        { id: "a4", text: "las biblioteca", value: "las_biblioteca" }
      ]
    },
    {
      id: "q15",
      type: "mcq",
      title: "Choose the correct form of SER: Yo ____ estudiante.",
      required: true,
      options: [
        { id: "a1", text: "soy", value: "soy" },
        { id: "a2", text: "es", value: "es" },
        { id: "a3", text: "son", value: "son" },
        { id: "a4", text: "está", value: "esta" }
      ]
    },
    {
      id: "q16",
      type: "mcq",
      title: "Choose the correct form of SER: Ella ____ profesora.",
      required: true,
      options: [
        { id: "a1", text: "soy", value: "soy" },
        { id: "a2", text: "es", value: "es" },
        { id: "a3", text: "son", value: "son" },
        { id: "a4", text: "está", value: "esta" }
      ]
    },
    {
      id: "q17",
      type: "mcq",
      title: "Choose the correct form of ESTAR: María ____ en la escuela.",
      required: true,
      options: [
        { id: "a1", text: "son", value: "son" },
        { id: "a2", text: "es", value: "es" },
        { id: "a3", text: "está", value: "esta" },
        { id: "a4", text: "soy", value: "soy" }
      ]
    },
    {
      id: "q18",
      type: "mcq",
      title: "Choose the correct form of ESTAR: Nosotros ____ en casa.",
      required: true,
      options: [
        { id: "a1", text: "soy", value: "soy" },
        { id: "a2", text: "está", value: "esta" },
        { id: "a3", text: "están", value: "estan" },
        { id: "a4", text: "estamos", value: "estamos" }
      ]
    },

    // ---------- Audio Comprehension ----------
    {
      id: "q19",
      type: "audio",
      title: "Listen to the audio! What does it mean?",
      audioUrl: "/music/audioquizz/buenos dias.mp3",
      required: true,
      options: [
        { id: "a1", text: "Good afternoon", value: "good_afternoon" },
        { id: "a2", text: "Good morning", value: "good_morning" },
        { id: "a3", text: "Good night", value: "good_night" },
        { id: "a4", text: "Hello", value: "hello" }
      ]
    },
    {
      id: "q20",
      type: "audio",
      title: "Listen to the audio! What does it mean?",
      audioUrl: "/music/audioquizz/buenas noches.mp3",
      required: true,
      options: [
        { id: "a1", text: "Good morning", value: "good_morning" },
        { id: "a2", text: "Good evening / Good night", value: "good_evening_night" },
        { id: "a3", text: "Hello", value: "hello" },
        { id: "a4", text: "Goodbye", value: "goodbye" }
      ]
    },
    {
      id: "q21",
      type: "audio",
      title: "Listen to the audio! Where is Ana from?",
      audioUrl: "/music/audioquizz/me llamo Ana soy de mexico.mp3",
      required: true,
      options: [
        { id: "a1", text: "España", value: "espana" },
        { id: "a2", text: "México", value: "mexico" },
        { id: "a3", text: "Argentina", value: "argentina" },
        { id: "a4", text: "Colombia", value: "colombia" }
      ]
    },
    {
      id: "q22",
      type: "audio",
      title: "Listen to the audio! How old is Pedro?",
      audioUrl: "/music/audioquizz/soy pedro tengo 25 anos.mp3",
      required: true,
      options: [
        { id: "a1", text: "15", value: "15" },
        { id: "a2", text: "20", value: "20" },
        { id: "a3", text: "25", value: "25" },
        { id: "a4", text: "30", value: "30" }
      ]
    },
    {
      id: "q23",
      type: "audio",
      title: "Listen to the audio! What number is it?",
      audioUrl: "/music/audioquizz/diez.mp3",
      required: true,
      options: [
        { id: "a1", text: "5", value: "5" },
        { id: "a2", text: "10", value: "10" },
        { id: "a3", text: "15", value: "15" },
        { id: "a4", text: "20", value: "20" }
      ]
    },
    {
      id: "q24",
      type: "audio",
      title: "Listen to the audio! What number is it?",
      audioUrl: "/music/audioquizz/quince.mp3",
      required: true,
      options: [
        { id: "a1", text: "5", value: "5" },
        { id: "a2", text: "10", value: "10" },
        { id: "a3", text: "15", value: "15" },
        { id: "a4", text: "20", value: "20" }
      ]
    },

    // ---------- Reading Comprehension ----------
    {
      id: "q25",
      type: "mcq",
      title: "According to the following text: 'Soy Pedro, tengo 25 años y soy de España.' ¿Como se llama él?",
      required: true,
      options: [
        { id: "a1", text: "Juan", value: "juan" },
        { id: "a2", text: "Pedro", value: "pedro" },
        { id: "a3", text: "Ana", value: "ana" },
        { id: "a4", text: "José", value: "jose" }
      ]
    },
    {
      id: "q26",
      type: "mcq",
      title: "According to the following text: 'Soy Pedro, tengo 25 años y soy de España.' ¿Cuántos años tiene?",
      required: true,
      options: [
        { id: "a1", text: "15", value: "15" },
        { id: "a2", text: "20", value: "20" },
        { id: "a3", text: "25", value: "25" },
        { id: "a4", text: "30", value: "30" }
      ]
    },
    {
      id: "q27",
      type: "mcq",
      title: "According to the following text: 'Café abierto de 8 am a 7 pm.' ¿A qué hora cierra el café?",
      required: true,
      options: [
        { id: "a1", text: "8 pm", value: "8_pm" },
        { id: "a2", text: "8 am", value: "8_am" },
        { id: "a3", text: "7 am", value: "7_am" },
        { id: "a4", text: "7 pm", value: "7_pm" }
      ]
    },
    {
      id: "q28",
      type: "mcq",
      title: "According to the following text: 'Café abierto de 8 am a 7 pm.' ¿A qué hora abre el café?",
      required: true,
      options: [
        { id: "a1", text: "8 pm", value: "8_pm" },
        { id: "a2", text: "8 am", value: "8_am" },
        { id: "a3", text: "7 am", value: "7_am" },
        { id: "a4", text: "7 pm", value: "7_pm" }
      ]
    },
    {
      id: "q29",
      type: "mcq",
      title: "According to the following text: 'Clase de español: lunes y miércoles.' ¿Qué días son las clases?",
      required: true,
      options: [
        { id: "a1", text: "Monday and Wednesday", value: "monday_wednesday" },
        { id: "a2", text: "Tuesday and Thursday", value: "tuesday_thursday" },
        { id: "a3", text: "Saturday and Sunday", value: "saturday_sunday" },
        { id: "a4", text: "Friday and Monday", value: "friday_monday" }
      ]
    },
    {
      id: "q30",
      type: "mcq",
      title: "According to the following text: 'Clase de español: lunes y miércoles.' ¿Cuántos días a la semana?",
      required: true,
      options: [
        { id: "a1", text: "1", value: "1" },
        { id: "a2", text: "2", value: "2" },
        { id: "a3", text: "3", value: "3" },
        { id: "a4", text: "4", value: "4" }
      ]
    },

    // ---------- Conversation Practice ----------
    {
      id: "q31",
      type: "mcq",
      title: "Choose the correct answer: '¿Cómo estás?'",
      required: true,
      options: [
        { id: "a1", text: "Azul", value: "azul" },
        { id: "a2", text: "Gracias", value: "gracias" },
        { id: "a3", text: "Bien", value: "bien" },
        { id: "a4", text: "Veinte", value: "veinte" }
      ]
    },
    {
      id: "q32",
      type: "mcq",
      title: "Choose the correct answer: '¿De dónde eres?'",
      required: true,
      options: [
        { id: "a1", text: "Tengo 20 años", value: "tengo_20" },
        { id: "a2", text: "Soy de Colombia", value: "soy_colombia" },
        { id: "a3", text: "Azul", value: "azul" },
        { id: "a4", text: "Gracias", value: "gracias" }
      ]
    },

    // ---------- Word Classification ----------
    {
      id: "q33",
      type: "mcq",
      title: "Choose the noun in Spanish",
      required: true,
      options: [
        { id: "a1", text: "Azul", value: "azul" },
        { id: "a2", text: "Correr", value: "correr" },
        { id: "a3", text: "Mesa", value: "mesa" },
        { id: "a4", text: "Alto", value: "alto" }
      ]
    },
    {
      id: "q34",
      type: "mcq",
      title: "Choose the adjective in Spanish",
      required: true,
      options: [
        { id: "a1", text: "Hermosa", value: "hermosa" },
        { id: "a2", text: "Perro", value: "perro" },
        { id: "a3", text: "Cantar", value: "cantar" },
        { id: "a4", text: "Rápido", value: "rapido" }
      ]
    },
    {
      id: "q35",
      type: "mcq",
      title: "Choose the adverb in Spanish",
      required: true,
      options: [
        { id: "a1", text: "Casa", value: "casa" },
        { id: "a2", text: "Rápidamente", value: "rapidamente" },
        { id: "a3", text: "Azul", value: "azul" },
        { id: "a4", text: "Correr", value: "correr" }
      ]
    },
    {
      id: "q36",
      type: "mcq",
      title: "Choose the second month of the year",
      required: true,
      options: [
        { id: "a1", text: "Fébrero", value: "febrero" },
        { id: "a2", text: "Febero", value: "febero" },
        { id: "a3", text: "Fevrero", value: "fevrero" },
        { id: "a4", text: "Febrero", value: "febrero_alt" }
      ]
    },
    {
      id: "q37",
      type: "mcq",
      title: "Which of the following is the correct way to say the date in Spanish?",
      required: true,
      options: [
        { id: "a1", text: "Hoy es 15 de marzo.", value: "hoy_es_15_marzo" },
        { id: "a2", text: "Hoy son 15 de marzo.", value: "hoy_son_15_marzo" },
        { id: "a3", text: "Hoy será 15 de marzo.", value: "hoy_sera_15_marzo" },
        { id: "a4", text: "Hoy están 15 de marzo.", value: "hoy_estan_15_marzo" }
      ]
    },
    {
      id: "q38",
      type: "mcq",
      title: "¿Cuál de las siguientes palabras describe a un miembro de la familia?",
      required: true,
      options: [
        { id: "a1", text: "Amigo", value: "amigo" },
        { id: "a2", text: "Hermano", value: "hermano" },
        { id: "a3", text: "Profesor", value: "profesor" },
        { id: "a4", text: "Estudiante", value: "estudiante" }
      ]
    },
    {
      id: "q39",
      type: "order",
      title: "Order the words to form the correct sentence",
      required: true,
      orderQuestion: {
        words: ["soy", "de", "estudiante", "yo", "psicología"],
        correctAnswer: "yo soy estudiante de psicología"
      }
    },
    {
      id: "q40",
      type: "order",
      title: "Order the words to form the correct sentence",
      required: true,
      orderQuestion: {
        words: ["playa", "en", "ella", "la", "está"],
        correctAnswer: "ella está en la playa"
      }
    }
  ],
  resultTemplates: [
    {
      id: "a1",
      title: "A1 • Beginner",
      description: "Your approximate level is A1: you can communicate in very basic situations. Keep practicing!",
      conditions: [
        { questionId: "q1", value: "casa" },
        { questionId: "q2", value: "libro" },
        { questionId: "q3", value: "perro" },
        { questionId: "q4", value: "silla" },
        { questionId: "q5", value: "hola" },
        { questionId: "q6", value: "adios" },
        { questionId: "q7", value: "por_favor" },
        { questionId: "q8", value: "gracias" },
        { questionId: "q11", value: "la" },
        { questionId: "q12", value: "los" },
        { questionId: "q13", value: "los_museos" },
        { questionId: "q14", value: "las_bibliotecas" },
        { questionId: "q15", value: "soy" },
        { questionId: "q16", value: "es" },
        { questionId: "q17", value: "esta" },
        { questionId: "q18", value: "estamos" }
      ]
    },
    {
      id: "a2",
      title: "A2 • Elementary",
      description: "Your approximate level is A2: you understand frequently used phrases and expressions.",
      conditions: [
        { questionId: "q19", value: "good_morning" },
        { questionId: "q20", value: "good_evening_night" },
        { questionId: "q21", value: "mexico" },
        { questionId: "q22", value: "25" },
        { questionId: "q23", value: "10" },
        { questionId: "q24", value: "15" },
        { questionId: "q25", value: "pedro" },
        { questionId: "q26", value: "25" },
        { questionId: "q27", value: "7_pm" },
        { questionId: "q28", value: "8_am" },
        { questionId: "q29", value: "monday_wednesday" },
        { questionId: "q30", value: "2" }
      ]
    },
    {
      id: "b1",
      title: "B1 • Intermediate",
      description: "Your approximate level is B1: you can handle most travel situations.",
      conditions: [
        { questionId: "q31", value: "bien" },
        { questionId: "q32", value: "soy_colombia" },
        { questionId: "q33", value: "mesa" },
        { questionId: "q34", value: "hermosa" },
        { questionId: "q35", value: "rapidamente" },
        { questionId: "q36", value: "febrero" },
        { questionId: "q37", value: "hoy_es_15_marzo" },
        { questionId: "q38", value: "hermano" }
      ]
    },
    {
      id: "b2",
      title: "B2 • Upper-Intermediate",
      description: "Your approximate level is B2: you can interact with fluency and spontaneity with native speakers.",
      conditions: [
        { questionId: "q39", value: "yo soy estudiante de psicología" },
        { questionId: "q40", value: "ella está en la playa" }
      ]
    }
  ]
};
