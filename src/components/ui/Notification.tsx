import { NotificationData } from '@/hooks/useNotification';

interface NotificationProps {
  notification: NotificationData | null;
}

export const Notification = ({ notification }: NotificationProps) => {
  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`px-4 py-2 rounded-lg shadow-lg border font-semibold text-sm ${
        notification.type === 'correct'
          ? "bg-green-500 text-white border-green-600"
          : "bg-red-500 text-white border-red-600"
      }`}>
        {notification.message}
      </div>
    </div>
  );
};