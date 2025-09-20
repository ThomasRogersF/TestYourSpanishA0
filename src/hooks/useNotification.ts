import { useState } from 'react';

export interface NotificationData {
  message: string;
  type: 'correct' | 'incorrect';
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  const showNotification = (message: string, type: 'correct' | 'incorrect') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const showAnswerNotification = (isCorrect: boolean) => {
    showNotification(
      isCorrect ? '¡Correcto!' : 'Incorrecto',
      isCorrect ? 'correct' : 'incorrect'
    );

    // Auto-hide after 3 seconds
    setTimeout(() => {
      hideNotification();
    }, 3000);
  };

  return {
    notification,
    showNotification,
    hideNotification,
    showAnswerNotification
  };
};