
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
  webhookUrl: "https://hook.us2.make.com/09duputr8qoda8dmirdsmcw1gy82ayil",
  incentiveEnabled: true,
  incentiveTitle: "Spanish Shortcuts Guide",
  incentiveUrl: "https://spanishvip.com/wp-content/uploads/2022/02/Easy-Spanish-Shortcuts-Updated.pdf",
  externalRedirectUrl: "https://spanishvip.com/",
  questions: [
    // ---------- A1 ----------
    {
      id: "q1",
      type: "mcq",
      title: "¿Cómo te llamas?",
      required: true,
      options: [
        { id: "a1", text: "Tengo 20 años", value: "tengo_20" },
        { id: "a2", text: "Me llamo Juan", value: "me_llamo_juan" },
        { id: "a3", text: "Estoy cansado", value: "estoy_cansado" },
        { id: "a4", text: "Soy de Colombia", value: "soy_de_colombia" }
      ]
    },
    {
      id: "q2",
      type: "mcq",
      title: "Completa la conversación: ¿Cómo estás? — Muy bien, ¿Y tú? —",
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
      title: "Ella ___ dos hermanos. (She has two brothers.)",
      subtitle: "Usa la forma correcta de 'tener'",
      helpText: "Enter the correct form of the verb 'tener' (to have)",
      required: true
    },
    {
      id: "q4",
      type: "image-selection",
      title: ""Juan come una fruta verde". ¿Qué imagen corresponde?",
      required: true,
      imageOptions: [
        { id: "a1", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_389807556_S.jpg", alt: "Manzanas", value: "manzanas" },
        { id: "a2", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_58314223_S.jpg", alt: "Bananos", value: "bananos" },
        { id: "a3", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_9122791_S.jpg", alt: "Uvas", value: "uvas" },
        { id: "a4", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_6092650_S.jpg", alt: "Naranjas", value: "naranjas" }
      ]
    },
    {
      id: "q5",
      type: "mcq",
      title: "¿Cuál de las siguientes oraciones es incorrecta?",
      required: true,
      options: [
        { id: "a1", text: "Pablo comprará leche en el supermercado", value: "oracion_a" },
        { id: "a2", text: "¿Tú vas a ir a la casa de María mañana?", value: "oracion_b" },
        { id: "a3", text: "Ella va a ir al supermercado", value: "oracion_c" },
        { id: "a4", text: "Pedro va a leerla un libro mañana", value: "oracion_d" }
      ]
    },
    {
      id: "q6",
      type: "audio",
      title: "Escucha y selecciona parte de la rutina matutina.",
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/05/1-En-las-mananas-me-despierto.mp3",
      required: true,
      options: [
        { id: "a1", text: "Almuerzo", value: "almuerzo" },
        { id: "a2", text: "Me duermo", value: "me_duermo" },
        { id: "a3", text: "Me baño", value: "me_bano" },
        { id: "a4", text: "Corro", value: "corro" }
      ]
    },

    // ---------- A2 ----------
    {
      id: "q7",
      type: "mcq",
      title: "Ayer en la mañana Juan ______ por todo el parque.",
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
      title: "Completa la oración: Este regalo es ___ ti.",
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
      title: "Yo ___ a la playa todos los veranos. (pretérito imperfecto de 'ir')",
      helpText: "Enter the correct form of 'ir' in the imperfect tense",
      required: true
    },
    {
      id: "q10",
      type: "image-selection",
      title: "¿Cuál imagen corresponde a la palabra \"licuadora\"?",
      required: true,
      imageOptions: [
        { id: "a1", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_204337134_S.jpg", alt: "Licuadora", value: "licuadora" },
        { id: "a2", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_767288152_S.jpg", alt: "Nevera", value: "nevera" },
        { id: "a3", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_19669021_S.jpg", alt: "Lavamano", value: "lavamano" },
        { id: "a4", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_139874794_S.jpg", alt: "Aspiradora", value: "aspiradora" }
      ]
    },
    {
      id: "q11",
      type: "mcq",
      title: "¿Cuál oración es incorrecta?",
      required: true,
      options: [
        { id: "a1", text: "¿Podría darme un vaso de agua, por favor?", value: "oracion_a" },
        { id: "a2", text: "Me gustaría ser millonario.", value: "oracion_b" },
        { id: "a3", text: "Cuando era niño viviría con mi madre.", value: "oracion_c" },
        { id: "a4", text: "¿Te gustaría salir conmigo?", value: "oracion_d" }
      ]
    },
    {
      id: "q12",
      type: "audio",
      title: "Escucha y selecciona algo que la persona ha hecho hoy.",
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/05/2-He-comido-he-trabajado-he-respondido-correos.mp3",
      required: true,
      options: [
        { id: "a1", text: "He hablado", value: "he_hablado" },
        { id: "a2", text: "He desayunado", value: "he_desayunado" },
        { id: "a3", text: "He dormido", value: "he_dormido" },
        { id: "a4", text: "He trabajado", value: "he_trabajado" }
      ]
    },

    // ---------- B1 ----------
    {
      id: "q13",
      type: "mcq",
      title: "Nosotros ______ soportando su mal humor mucho tiempo.",
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
      title: "Completa: "Mañana habré terminado mi trabajo y..."",
      required: true,
      options: [
        { id: "a1", text: "Bebí una lata de gaseosa.", value: "bebi" },
        { id: "a2", text: "Iría de vacaciones a Perú.", value: "iria" },
        { id: "a3", text: "Podré descansar.", value: "podre_descansar" },
        { id: "a4", text: "Habría comido papas fritas.", value: "habria_comido" }
      ]
    },
    {
      id: "q15",
      type: "fill-in-blanks",
      title: "No creo que ______ más tareas hoy, estoy cansado. (presente de subjuntivo de 'tener')",
      helpText: "Enter the present subjunctive form of 'tener'",
      required: true
    },
    {
      id: "q16",
      type: "image-selection",
      title: "¿Qué imagen representa "cambio climático"?",
      required: true,
      imageOptions: [
        { id: "a1", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_250472176_S.jpg", alt: "Ecología", value: "ecologia" },
        { id: "a2", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_723127684_S.jpg", alt: "Reciclaje", value: "reciclaje" },
        { id: "a3", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_30828375_S.jpg", alt: "Cambio climático", value: "cambio_climatico" },
        { id: "a4", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_218052334_S.jpg", alt: "Plantar árboles", value: "plantar_arboles" }
      ]
    },
    {
      id: "q17",
      type: "mcq",
      title: "¿Cuál oración es incorrecta?",
      required: true,
      options: [
        { id: "a1", text: "Quisiera un poco de helado, por favor.", value: "oracion_a" },
        { id: "a2", text: "Ojalá que te vaya bien en el examen.", value: "oracion_b" },
        { id: "a3", text: "No creo que tuvieran miedo.", value: "oracion_c" },
        { id: "a4", text: "Espero que llueve mañana.", value: "oracion_d" }
      ]
    },
    {
      id: "q18",
      type: "audio",
      title: "Escucha y selecciona uno de los deseos de la persona.",
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/05/3-Espero-que-tengas-un-buen-dia.mp3",
      required: true,
      options: [
        { id: "a1", text: "Espero que haya mucho tráfico.", value: "mucho_trafico" },
        { id: "a2", text: "Espero que llegues a tu trabajo.", value: "llegues_trabajo" },
        { id: "a3", text: "Espero que tengas un buen día.", value: "tengas_un_buen_dia" },
        { id: "a4", text: "Espero que almuerces algo rico.", value: "almuerces_rico" }
      ]
    },

    // ---------- B2 ----------
    {
      id: "q19",
      type: "mcq",
      title: "¿Cuál oración expresa una acción involuntaria?",
      required: true,
      options: [
        { id: "a1", text: "¿Perdiste el control remoto?", value: "perdiste_control" },
        { id: "a2", text: "Se me cayó el plato", value: "se_me_cayo_el_plato" },
        { id: "a3", text: "Me hablé con el profesor ayer", value: "me_hable" },
        { id: "a4", text: "Mira, él tropezó con la alfombra", value: "tropezo_alfombra" }
      ]
    },
    {
      id: "q20",
      type: "mcq",
      title: "Completa: "Si hubiera tenido tu número…"",
      required: true,
      options: [
        { id: "a1", text: "Te había llamado", value: "te_habia_llamado" },
        { id: "a2", text: "Te hubiera llamado", value: "te_hubiera_llamado" },
        { id: "a3", text: "Te llamaba", value: "te_llamaba" }
      ]
    },
    {
      id: "q21",
      type: "fill-in-blanks",
      title: "Me alegra que ______ (venir). (presente perfecto de subjuntivo)",
      helpText: "Enter the present perfect subjunctive form of 'venir'",
      required: true
    },
    {
      id: "q22",
      type: "image-selection",
      title: ""Estoy echando chispas". ¿Qué imagen corresponde?",
      required: true,
      imageOptions: [
        { id: "a1", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_186791150_S.jpg", alt: "Persona enojada", value: "angry" },
        { id: "a2", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_12800902_S.jpg", alt: "Mujer feliz", value: "happy" },
        { id: "a3", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_451035886_S.jpg", alt: "Mujer triste", value: "sad" },
        { id: "a4", src: "https://spanishvip.com/wp-content/uploads/2025/05/Depositphotos_495920154_S.jpg", alt: "Hombre asustado", value: "scared" }
      ]
    },
    {
      id: "q23",
      type: "mcq",
      title: "¿Cuál oración es incorrecta?",
      required: true,
      options: [
        { id: "a1", text: "Acabo de terminar la película", value: "acabo_pelicula" },
        { id: "a2", text: "Pude de acabar la tarea", value: "pude_de_acabar_tarea" },
        { id: "a3", text: "Dejé de ver la serie", value: "deje_ver" },
        { id: "a4", text: "Terminé de estudiar", value: "termine_estudiar" }
      ]
    },
    {
      id: "q24",
      type: "audio",
      title: "Escucha y selecciona parte de lo que dijo Juan.",
      audioUrl: "https://spanishvip.com/wp-content/uploads/2025/05/4-Juan-me-dijo-que-iba-a-llegar-tarde.mp3",
      required: true,
      options: [
        { id: "a1", text: "Me dijo que lo esperara", value: "lo_esperara" },
        { id: "a2", text: "Me dijo que ya llegaría temprano", value: "llegaria_temprano" },
        { id: "a3", text: "Me dijo que Andrea me llamaría", value: "andrea_llamaria" },
        { id: "a4", text: "Me dijo que estuviera lista", value: "estuviera_lista" }
      ]
    },
    {
      id: "q25",
      type: "mcq",
      title: "Reemplaza los pronombres: "Ella dijo una mentira a su cuñada."",
      required: true,
      options: [
        { id: "a1", text: "Ella le la dijo", value: "le_la_dijo" },
        { id: "a2", text: "Ella se la dijo", value: "se_la_dijo" },
        { id: "a3", text: "Ella ha dicho a ella", value: "ha_dicho_a_ella" },
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
        { questionId: "q1", value: "me_llamo_juan" },
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
        { questionId: "q15", value: "tenga" }
      ]
    },
    {
      id: "b2",
      title: "B2 • Upper-Intermediate",
      description: "Tu nivel aproximado es B2: puedes interactuar con fluidez y espontaneidad con hablantes nativos.",
      conditions: [
        { questionId: "q19", value: "se_me_cayo_el_plato" },
        { questionId: "q20", value: "te_hubiera_llamado" },
        { questionId: "q21", value: "haya_venido" }
      ]
    }
  ]
};
