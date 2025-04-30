
import { ConditionRule, QuizAnswer, QuizConfig, QuizParticipant, ResultTemplate } from "@/types/quiz";

/**
 * Determines the next question based on conditional logic
 */
export const getNextQuestionId = (
  currentQuestionId: string,
  answers: QuizAnswer[],
  questions: QuizConfig['questions']
): string | null => {
  const currentQuestionIndex = questions.findIndex(q => q.id === currentQuestionId);
  
  if (currentQuestionIndex === -1) return null;
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Check if there's conditional logic for the current question
  if (currentQuestion.conditionalLogic && currentQuestion.conditionalLogic.length > 0) {
    const currentAnswer = answers.find(a => a.questionId === currentQuestionId);
    
    if (currentAnswer) {
      // Find matching condition
      const matchedCondition = currentQuestion.conditionalLogic.find(condition => {
        if (condition.answerId && Array.isArray(currentAnswer.value)) {
          return (currentAnswer.value as string[]).includes(condition.answerId);
        }
        
        if (condition.answerId && typeof currentAnswer.value === 'string') {
          return currentAnswer.value === condition.answerId;
        }
        
        if (condition.value && typeof currentAnswer.value === 'string') {
          return currentAnswer.value === condition.value;
        }
        
        return false;
      });
      
      if (matchedCondition) {
        return matchedCondition.nextQuestionId;
      }
    }
  }
  
  // If no conditional logic matched or exists, go to the next question
  if (currentQuestionIndex < questions.length - 1) {
    return questions[currentQuestionIndex + 1].id;
  }
  
  // If this was the last question
  return null;
};

/**
 * Calculate quiz progress percentage
 */
export const calculateProgress = (
  currentQuestionIndex: number,
  totalQuestions: number
): number => {
  return Math.round((currentQuestionIndex / totalQuestions) * 100);
};

/**
 * Send quiz data to webhook
 */
export const sendDataToWebhook = async (
  webhookUrl: string,
  participant: QuizParticipant
): Promise<boolean> => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(participant),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to send data to webhook:', error);
    return false;
  }
};

/**
 * Get personalized result based on answers
 */
export const getPersonalizedResult = (
  answers: QuizAnswer[],
  resultTemplates: ResultTemplate[]
): ResultTemplate | null => {
  // Check each result template
  for (const template of resultTemplates) {
    let allConditionsMet = true;
    
    // For each condition in the template
    for (const condition of template.conditions) {
      const answer = answers.find(a => a.questionId === condition.questionId);
      
      if (!answer) {
        allConditionsMet = false;
        break;
      }
      
      if (condition.answerId && Array.isArray(answer.value)) {
        if (!(answer.value as string[]).includes(condition.answerId)) {
          allConditionsMet = false;
          break;
        }
      } else if (condition.answerId && answer.value !== condition.answerId) {
        allConditionsMet = false;
        break;
      } else if (condition.value && answer.value !== condition.value) {
        allConditionsMet = false;
        break;
      }
    }
    
    if (allConditionsMet) {
      return template;
    }
  }
  
  return null;
};
