import React from 'react';
import { motion } from 'framer-motion';
import { Download, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Schedule } from '../types';
import { generatePDF } from '../lib/pdfGenerator';
import { useScheduleStore } from '../store/scheduleStore';

interface ScheduleCardProps {
  schedule: Schedule;
  onEdit?: () => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule, onEdit }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const deleteSchedule = useScheduleStore((state) => state.deleteSchedule);

  const handleDownload = () => {
    generatePDF(schedule);
  };

  const handleDelete = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    deleteSchedule(schedule.id);
  };

  const cardColors = {
    class: 'bg-blue-50 dark:bg-blue-900/20',
    exam: 'bg-purple-50 dark:bg-purple-900/20',
  };

  const tagColors = {
    class: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    exam: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-4 rounded-lg ${cardColors[schedule.type]} mb-4 border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-lg">{schedule.subject}</h3>
            <span
              className={`px-2 py-1 text-xs rounded-full ${tagColors[schedule.type]}`}
            >
              {schedule.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {format(new Date(schedule.date), 'EEEE, MMMM dd, yyyy')}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {schedule.startTime} - {schedule.endTime}
          </p>
          {schedule.room && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Room: {schedule.room}
            </p>
          )}
          {schedule.notes && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
              "{schedule.notes}"
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            {onEdit && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onEdit}
                className="p-1.5 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <Edit size={16} />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className="p-1.5 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
            >
              <Download size={16} />
            </motion.button>
            {showDeleteConfirm ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                  className="p-1.5 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-full text-green-600 dark:text-green-400 transition-colors"
                >
                  <CheckCircle size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full text-red-600 dark:text-red-400 transition-colors"
                >
                  <XCircle size={16} />
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full text-red-600 dark:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};