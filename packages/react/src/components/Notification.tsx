import * as React from 'react';

export interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  isOpen, onClose, variant = 'info', title, message, duration = 5000,
}) => {
  React.useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`cn-notification cn-notification-${variant}`} role="alert">
      <div className="cn-notification-content">
        {title && <div className="cn-notification-title">{title}</div>}
        <div className="cn-notification-message">{message}</div>
      </div>
      <button className="cn-notification-close" onClick={onClose}>×</button>
    </div>
  );
};

Notification.displayName = 'Notification';
export default Notification;
