import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FileText, Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { AttendanceRequest } from '../types';
import { useAttendanceStore } from '../store/attendanceStore';

interface AttendanceRequestCardProps {
  request: AttendanceRequest;
}

export const AttendanceRequestCard: React.FC<AttendanceRequestCardProps> = ({ request }) => {
  const updateRequest = useAttendanceStore((state) => state.updateRequest);
  const [comment, setComment] = React.useState('');

  const statusColors = {
    pending: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    approved: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    rejected: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  };

  const statusIcons = {
    pending: <Clock size={16} />,
    approved: <CheckCircle size={16} />,
    rejected: <XCircle size={16} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold">{request.studentName}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusColors[request.status]}`}>
              {statusIcons[request.status]}
              <span>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">ID: {request.studentId}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Reason</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{request.reason}</p>
      </div>

      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div>
          From: {format(new Date(request.startDate), 'MMM dd, yyyy')}
        </div>
        <div>
          To: {format(new Date(request.endDate), 'MMM dd, yyyy')}
        </div>
      </div>

      {request.supportingDocs && request.supportingDocs.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Supporting Documents</h4>
          <div className="space-y-2">
            {request.supportingDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-sm">{doc.name}</span>
                </div>
                <a
                  href={doc.url}
                  download={doc.name}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <Download size={16} className="text-gray-500" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {request.status === 'pending' && (
        <div className="mt-6 space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            rows={2}
          />
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateRequest(request.id, 'rejected', comment)}
              className="px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Reject
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateRequest(request.id, 'approved', comment)}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Approve
            </motion.button>
          </div>
        </div>
      )}

      {request.comments && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h4 className="font-medium mb-1">Comments</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{request.comments}</p>
        </div>
      )}
    </motion.div>
  );
};