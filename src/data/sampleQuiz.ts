import { QuizConfig } from "@/types/quiz";

export const sampleQuiz: QuizConfig = {
  id: "education-assessment",
  title: "Learning Style Assessment",
  description: "Discover your ideal learning style and get personalized recommendations",
  logoUrl: "https://lwfiles.mycourse.app/6409eb5798e53550d7acd5f1-public/1bfa7bb23c37499f0d5908f0a004c50e.png",
  introImageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  introText: "This quiz will help you discover your learning style and provide personalized recommendations to enhance your educational journey. Take a few minutes to answer these simple questions and get insights tailored just for you.",
  estimatedTime: "2-3 minutes",
  primaryColor: "#FF5913",
  secondaryColor: "#1DD3B0",
  webhookUrl: "https://webhook.site/your-unique-id",
  incentiveEnabled: true,
  incentiveTitle: "Spanish Shortcuts Guide",
  incentiveUrl: "https://spanishvip.com/wp-content/uploads/2022/02/Easy-Spanish-Shortcuts-Updated.pdf",
  externalRedirectUrl: "https://spanishvip.com/",
  questions: [
    {
      id: "q1",
      type: "mcq",
      title: "What's your primary goal for learning?",
      subtitle: "Choose the option that best describes your needs",
      required: true,
      options: [
        { id: "a1", text: "Career advancement", value: "career" },
        { id: "a2", text: "Personal growth", value: "personal" },
        { id: "a3", text: "Academic success", value: "academic" },
        { id: "a4", text: "Learning specific skills", value: "skills" }
      ],
      conditionalLogic: [
        { questionId: "q1", answerId: "a1", nextQuestionId: "q2" },
        { questionId: "q1", answerId: "a2", nextQuestionId: "q3" },
        { questionId: "q1", answerId: "a3", nextQuestionId: "q2" },
        { questionId: "q1", answerId: "a4", nextQuestionId: "q2" }
      ]
    },
    {
      id: "q2",
      type: "mcq",
      title: "How much time can you dedicate to learning each week?",
      required: true,
      options: [
        { id: "a1", text: "Less than 1 hour", value: "very_low" },
        { id: "a2", text: "1-3 hours", value: "low" },
        { id: "a3", text: "4-7 hours", value: "medium" },
        { id: "a4", text: "8+ hours", value: "high" }
      ]
    },
    {
      id: "q3",
      type: "image-selection",
      title: "Which learning environment appeals to you most?",
      subtitle: "Select the image that resonates with your ideal setting",
      helpText: "This helps us understand your preferred learning atmosphere",
      required: true,
      imageOptions: [
        { 
          id: "a1", 
          src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", 
          alt: "Casual home environment", 
          value: "home" 
        },
        { 
          id: "a2", 
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", 
          alt: "Collaborative setting", 
          value: "collaborative" 
        },
        { 
          id: "a3", 
          src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952", 
          alt: "Formal study environment", 
          value: "formal" 
        },
        { 
          id: "a4", 
          src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", 
          alt: "Technology-focused setting", 
          value: "tech" 
        }
      ]
    },
    {
      id: "q4",
      type: "text",
      title: "What specific topic or skill are you most interested in learning?",
      subtitle: "Your answer helps us provide more relevant recommendations",
      required: true
    },
    {
      id: "q5",
      type: "audio",
      title: "Listen to the pronunciation and select the correct word",
      subtitle: "Play the audio and choose the word you hear",
      helpText: "Listen carefully to the pronunciation before selecting your answer",
      required: true,
      audioUrl: "https://assets.mixkit.co/active_storage/sfx/2568/2568.wav",
      options: [
        { id: "a1", text: "Pronunciation", value: "pronunciation" },
        { id: "a2", text: "Enunciation", value: "enunciation" },
        { id: "a3", text: "Articulation", value: "articulation" },
        { id: "a4", text: "Phonetics", value: "phonetics" }
      ]
    }
  ],
  resultTemplates: [
    {
      id: "visual-learner",
      title: "Visual Learner",
      description: "You learn best through visual elements like charts, graphs, and images. We recommend video-based courses with strong visual components and mind mapping tools.",
      conditions: [
        { questionId: "q3", answerId: "a2" }
      ]
    },
    {
      id: "auditory-learner",
      title: "Auditory Learner",
      description: "You learn best by listening and discussing. We recommend podcasts, audio books, and interactive discussion-based courses.",
      conditions: [
        { questionId: "q3", answerId: "a1" }
      ]
    },
    {
      id: "kinesthetic-learner",
      title: "Practical Learner",
      description: "You learn best through hands-on experiences. We recommend project-based courses with practical exercises and simulations.",
      conditions: [
        { questionId: "q3", answerId: "a4" }
      ]
    },
    {
      id: "reading-writing-learner",
      title: "Reading/Writing Learner",
      description: "You learn best through reading and writing activities. We recommend text-based courses with comprehensive reading materials and written assignments.",
      conditions: [
        { questionId: "q3", answerId: "a3" }
      ]
    }
  ]
};
