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
  webhookUrl: "https://hook.us2.make.com/x9laeetkiiumljb0qi3yo2c7rx3oxafr",
  incentiveEnabled: true,
  incentiveTitle: "Spanish Shortcuts Guide",
  incentiveUrl: "https://spanishvip.com/wp-content/uploads/2022/02/Easy-Spanish-Shortcuts-Updated.pdf",
  externalRedirectUrl: "https://spanishvip.com/",
  questions: [
    // ---------- A1 ----------
    {
      id: "q1",
      type: "mcq",
      title: "Choose the correct response to: ¿Cómo te llamas?",
      required: true,
      options: [
        { id: "a1", text: "Me llama Juan", value: "me_llama_juan" },
        { id: "a2", text: "Se llamo Juan", value: "se_llamo_juan" },
        { id: "a3", text: "Me llamo Sebastian", value: "me_llamo_sebastian" },
        { id: "a4", text: "Soy de Colombia", value: "soy_de_colombia" }
      ]
    },
    {
      id: "q2",
      type: "mcq",
      title: "Complete the following conversation:\n\nA: ¿Cómo estás?\nB: Muy bien. ¿Y tú?\nA: _____",
      required: true,
      options: [
        { id: "a1", text: "Soy estudiante", value: "soy_estudiante" },
        { id: "a2", text: "Estoy bien también", value: "estoy_bien_tambien" },
        { id: "a3", text: "Buenos días", value: "buenos_dias" },
        { id: "a4", text: "Me gusta", value: "me_gusta" }
      ]
    },
    {
      id: "q3",
      type: "fill-in-blanks",
      title: "Complete the sentence with the correct form of the verb tener (to have): Ella ______ dos hermanos.",
      required: true
    },
    {
      id: "q4",
      type: "image-selection",
      title: "Which picture matches the description: 'Juan come una fruta verde'?",
      required: true,
      imageOptions: [
        { id: "img1", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_389807556_S.jpg", alt: "Option A", value: "manzanas" },
        { id: "img2", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_58314223_S.jpg", alt: "Option B", value: "bananos" },
        { id: "img3", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_9122791_S.jpg", alt: "Option C", value: "uvas" },
        { id: "img4", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_6092650_S.jpg", alt: "Option D", value: "naranjas" }
      ]
    },
    {
      id: "q5",
      type: "mcq",
      title: "Which one of the following sentences is incorrect?",
      required: true,
      options: [
        { id: "a1", text: "Pablo comprará leche en el supermercado", value: "oracion_a" },
        { id: "a2", text: "¿Tú vas a ir a la casa de María mañana?", value: "oracion_b" },
        { id: "a3", text: "Ella va a ir al supermercado", value: "oracion_c" },
        { id: "a4", text: "Pedro va a leerá un libro mañana", value: "oracion_d" }
      ]
    },
    {
      id: "q6",
      type: "audio",
      title: "Which one of the following options is part of Juan's morning routine?",
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/07/1-En-las-mananas-me-despierto.mp3",
      required: true,
      options: [
        { id: "a1", text: "Almorzar", value: "almorzar" },
        { id: "a2", text: "Cocinar", value: "cocinar" },
        { id: "a3", text: "Bañarse", value: "banarse" },
        { id: "a4", text: "Correr", value: "correr" }
      ]
    },

    // ---------- A2 ----------
    {
      id: "q7",
      type: "mcq",
      title: "Complete the following sentence: Ayer en la mañana Luisa _________ por todo el parque.",
      required: true,
      options: [
        { id: "a1", text: "Corrió", value: "corrio" },
        { id: "a2", text: "Correría", value: "correria" },
        { id: "a3", text: "Corró", value: "corro" },
        { id: "a4", text: "Correrá", value: "correra" }
      ]
    },
    {
      id: "q8",
      type: "mcq",
      title: "Complete the sentence by choosing the correct preposition: Este regalo es ___ ti.",
      required: true,
      options: [
        { id: "a1", text: "para", value: "para" },
        { id: "a2", text: "por", value: "por" },
        { id: "a3", text: "con", value: "con" },
        { id: "a4", text: "sin", value: "sin" }
      ]
    },
    {
      id: "q9",
      type: "fill-in-blanks",
      title: "Yo ______ a la playa todos los veranos. (pretérito imperfecto de 'ir')",
      required: true
    },
    {
      id: "q10",
      type: "image-selection",
      title: "Which of the following pictures matches the word 'licuadora'?",
      required: true,
      imageOptions: [
        { id: "img1", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_204337134_S.jpg", alt: "Option A", value: "licuadora" },
        { id: "img2", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_767288152_S.jpg", alt: "Option B", value: "nevera" },
        { id: "img3", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_19669021_S.jpg", alt: "Option C", value: "lavamano" },
        { id: "img4", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_139874794_S.jpg", alt: "Option D", value: "aspiradora" }
      ]
    },
    {
      id: "q11",
      type: "mcq",
      title: "Which of the following sentences is incorrect?",
      required: true,
      options: [
        { id: "a1", text: "¿Podría darme un vaso de agua, por favor?", value: "oracion_a" },
        { id: "a2", text: "Me gustaría ser millonario", value: "oracion_b" },
        { id: "a3", text: "Cuando era niño viviría con mi madre", value: "oracion_c" },
        { id: "a4", text: "¿Te gustaría salir conmigo?", value: "oracion_d" }
      ]
    },
    {
      id: "q12",
      type: "audio",
      title: "What has Andrea done today?",
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/07/2-He-comido-he-trabajado-he-respondido-correos.mp3",
      required: true,
      options: [
        { id: "a1", text: "Ha hablado", value: "ha_hablado" },
        { id: "a2", text: "Ha desayunado", value: "ha_desayunado" },
        { id: "a3", text: "Ha dormido", value: "ha_dormido" },
        { id: "a4", text: "Ha trabajado", value: "ha_trabajado" }
      ]
    },

    // ---------- B1 ----------
    {
      id: "q13",
      type: "mcq",
      title: "Nosotros _____ soportando su mal humor mucho tiempo.",
      required: true,
      options: [
        { id: "a1", text: "vamos", value: "vamos" },
        { id: "a2", text: "llevamos", value: "llevamos" },
        { id: "a3", text: "quedamos", value: "quedamos" },
        { id: "a4", text: "dejamos", value: "dejamos" }
      ]
    },
    {
      id: "q14",
      type: "mcq",
      title: "Complete the sentence: 'Mañana habré terminado mi trabajo y…'",
      required: true,
      options: [
        { id: "a1", text: "Bebí una lata de gaseosa.", value: "bebi_gaseosa" },
        { id: "a2", text: "Iré de vacaciones a Perú.", value: "ire_peru" },
        { id: "a3", text: "Podré descansar.", value: "podre_descansar" },
        { id: "a4", text: "Habría comido papas fritas.", value: "habria_papas" }
      ]
    },
    {
      id: "q15",
      type: "fill-in-blanks",
      title: "No creo que ______ lo que le pasó a mi mamá ayer en el supermercado. (presente de subjuntivo de 'saber', tú)",
      required: true
    },
    {
      id: "q16",
      type: "image-selection",
      title: "Which image corresponds to the word 'cambio climático'?",
      required: true,
      imageOptions: [
        { id: "img1", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_250472176_S.jpg", alt: "Option A", value: "ecologia" },
        { id: "img2", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_723127684_S.jpg", alt: "Option B", value: "reciclaje" },
        { id: "img3", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_30828375_S.jpg", alt: "Option C", value: "cambio_climatico" },
        { id: "img4", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_218052334_S.jpg", alt: "Option D", value: "plantar_arboles" }
      ]
    },
    {
      id: "q17",
      type: "mcq",
      title: "Which of the following sentences is correct?",
      required: true,
      options: [
        { id: "a1", text: "Quisiera un poca de helado, por favor", value: "poca_helado" },
        { id: "a2", text: "Ojalá que te vaya bien en el examen", value: "ojala_bien" },
        { id: "a3", text: "No creo que tienen miedo", value: "tienen_miedo" },
        { id: "a4", text: "Espero que llueve mañana", value: "llueve_manana" }
      ]
    },
    {
      id: "q18",
      type: "audio",
      title: "Listen and select one of Roberto's wishes.",
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/07/3-Espero-que-tengas-un-buen-dia.mp3",
      required: true,
      options: [
        { id: "a1", text: "Espero que haya mucho tráfico", value: "mucho_trafico" },
        { id: "a2", text: "Espero que llegues a tu trabajo", value: "llegues_trabajo" },
        { id: "a3", text: "Espero que tengas un buen día", value: "tengas_buen_dia" },
        { id: "a4", text: "Espero que almuerces algo rico", value: "almuerces_rico" }
      ]
    },

    // ---------- B2 ----------
    {
      id: "q19",
      type: "mcq",
      title: "Which one of the following sentences would express an involuntary or unintentional action?",
      required: true,
      options: [
        { id: "a1", text: "¿Perdiste el control remoto?", value: "perdiste_control" },
        { id: "a2", text: "Se me cayó el plato", value: "se_me_cayo" },
        { id: "a3", text: "No quería hablar con el profesor", value: "no_queria_hablar" },
        { id: "a4", text: "Mira, él no quiso limpiar la alfombra", value: "no_quiso_limpiar" }
      ]
    },
    {
      id: "q20",
      type: "mcq",
      title: "Complete the conditional sentence: 'Si hubiera tenido tu número…'",
      required: true,
      options: [
        { id: "a1", text: "Te habré llamado", value: "habre_llamado" },
        { id: "a2", text: "Te he llamado", value: "he_llamado" },
        { id: "a3", text: "Te llamaría", value: "te_llamaria" },
        { id: "a4", text: "Te habría llamado", value: "habria_llamado" }
      ]
    },
    {
      id: "q21",
      type: "fill-in-blanks",
      title: "Me alegra que _________ (venir, tú). (presente perfecto de subjuntivo)",
      required: true
    },
    {
      id: "q22",
      type: "image-selection",
      title: "Which image matches the expression 'Estoy echando chispas'?",
      required: true,
      imageOptions: [
        { id: "img1", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_186791150_S.jpg", alt: "Option A", value: "angry" },
        { id: "img2", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_12800902_S.jpg", alt: "Option B", value: "happy" },
        { id: "img3", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_451035886_S.jpg", alt: "Option C", value: "sad" },
        { id: "img4", src: "https://spanishvip.com/wp-content/uploads/2025/07/Depositphotos_495920154_S.jpg", alt: "Option D", value: "scared" }
      ]
    },
    {
      id: "q23",
      type: "mcq",
      title: "Which one of the following sentences is correct?",
      required: true,
      options: [
        { id: "a1", text: "Acabo de terminó la película", value: "acabo_termino" },
        { id: "a2", text: "Fui de acabar la tarea", value: "fui_acabar" },
        { id: "a3", text: "Dejé de ver la serie", value: "deje_ver" },
        { id: "a4", text: "Acabé de terminé de estudiar", value: "acabe_termine" }
      ]
    },
    {
      id: "q24",
      type: "audio",
      title: "Listen and select part of what Juan said.",
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/07/4-Juan-me-dijo-que-iba-a-llegar-tarde.mp3",
      required: true,
      options: [
        { id: "a1", text: "Que lo esperara", value: "lo_esperara" },
        { id: "a2", text: "Que llegara tarde", value: "llegara_tarde" },
        { id: "a3", text: "Que lo llamará", value: "lo_llamara" },
        { id: "a4", text: "Que estuviera preocupado", value: "estuviera_preocupado" }
      ]
    },
    {
      id: "q25",
      type: "mcq",
      title: "Replace the indirect and direct object in the sentence: 'Ella dijo una mentira a su cuñada'.",
      required: true,
      options: [
        { id: "a1", text: "Ella le la dijo", value: "le_la_dijo" },
        { id: "a2", text: "Ella se la dijo", value: "se_la_dijo" },
        { id: "a3", text: "Ella la dijo a ella", value: "la_dijo_a_ella" },
        { id: "a4", text: "Ella se le dijo", value: "se_le_dijo" }
      ]
    }
  ],
  resultTemplates: [
    {
      id: "a1",
      title: "A1 • Beginner",
      description: "Tu nivel aproximado es A1: puedes comunicarte en situaciones muy básicas. ¡Sigue practicando!",
      conditions: [
        { questionId: "q1", value: "me_llamo_sebastian" },
        { questionId: "q2", value: "estoy_bien_tambien" },
        { questionId: "q3", value: "tiene" }
      ]
    },
    {
      id: "a2",
      title: "A2 • Elementary",
      description: "Tu nivel aproximado es A2: entiendes frases y expresiones de uso frecuente.",
      conditions: [
        { questionId: "q7", value: "corrio" },
        { questionId: "q8", value: "para" },
        { questionId: "q9", value: "iba" }
      ]
    },
    {
      id: "b1",
      title: "B1 • Intermediate",
      description: "Tu nivel aproximado es B1: puedes desenvolverte en la mayoría de las situaciones de viaje.",
      conditions: [
        { questionId: "q13", value: "llevamos" },
        { questionId: "q14", value: "podre_descansar" },
        { questionId: "q15", value: "sepas" }
      ]
    },
    {
      id: "b2",
      title: "B2 • Upper-Intermediate",
      description: "Tu nivel aproximado es B2: puedes interactuar con fluidez y espontaneidad con hablantes nativos.",
      conditions: [
        { questionId: "q19", value: "se_me_cayo" },
        { questionId: "q20", value: "habria_llamado" },
        { questionId: "q21", value: "hayas_venido" }
      ]
    }
  ]
};
