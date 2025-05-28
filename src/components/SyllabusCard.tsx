import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Clock, Star, Trash2, Copy } from 'lucide-react';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { Syllabus } from '../types';
import { useSyllabusStore } from '../store/syllabusStore';

interface SyllabusCardProps {
  syllabus: Syllabus;
}

export const SyllabusCard: React.FC<SyllabusCardProps> = ({ syllabus }) => {
  const { deleteSyllabus, generateSlipTest } = useSyllabusStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const handleExportPDF = async () => {
    const element = document.getElementById(`syllabus-${syllabus.id}`);
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${syllabus.subject}-syllabus.pdf`);
  };

  const handleGenerateSlipTest = () => {
    generateSlipTest(syllabus.id);
  };

  const handleDelete = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    deleteSyllabus(syllabus.id);
  };

  const examTypeColors = {
    midterm: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    final: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    slip: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  };

  return (
    <motion.div
      id={`syllabus-${syllabus.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold">{syllabus.subject}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                examTypeColors[syllabus.examType]
              }`}
            >
              {syllabus.examType.charAt(0).toUpperCase() + syllabus.examType.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {syllabus.description}
          </p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleExportPDF}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Download size={18} />
          </motion.button>
          {syllabus.examType !== 'slip' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleGenerateSlipTest}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Copy size={18} />
            </motion.button>
          )}
          {showDeleteConfirm ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <Trash2 size={18} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Trash2 size={18} />
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          {syllabus.totalDuration} minutes
        </div>
        <div>
          Updated {format(new Date(syllabus.updatedAt), 'MMM dd, yyyy')}
        </div>
      </div>

      <div className="space-y-4">
        {syllabus.units.map((unit) => (
          <div key={unit.id} className="border-t dark:border-gray-700 pt-4">
            <h4 className="font-medium mb-2">{unit.title}</h4>
            <div className="space-y-2">
              {unit.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-start space-x-2 text-sm"
                >
                  <FileText size={14} className="mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span>{topic.title}</span>
                      {topic.isImportant && (
                        <Star size={14} className="text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span
                        className={`${
                          topic.difficulty === 'easy'
                            ? 'text-green-500'
                            : topic.difficulty === 'medium'
                            ? 'text-yellow-500'
                            : 'text-red-500'
                        }`}
                      >
                        {topic.difficulty}
                      </span>
                      <span>•</span>
                      <span>Weight: {topic.weightage}</span>
                      <span>•</span>
                      <span>{topic.duration} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};