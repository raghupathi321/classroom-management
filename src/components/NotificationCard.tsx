import React from 'react';
import { motion } from 'framer-motion';
import { Bell, XCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import type { Notification } from '../types';
import { useScheduleStore } from '../store/scheduleStore';

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const deleteNotification = useScheduleStore((state) => state.deleteNotification);

  const typeStyles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    urgent: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  const iconStyles = {
    info: 'text-blue-500 dark:text-blue-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    urgent: 'text-red-500 dark:text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      className={`p-4 rounded-lg ${typeStyles[notification.type]} border mb-4`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Bell className={`mt-1 ${iconStyles[notification.type]}`} size={16} />
          <div>
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {notification.message}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteNotification(notification.id)}
          className="p-1.5 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
        >
          <XCircle size={16} className="text-gray-400" />
        </motion.button>
      </div>
    </motion.div>
  );
};