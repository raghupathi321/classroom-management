import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useScheduleStore } from '../store/scheduleStore';
import { useSyllabusStore } from '../store/syllabusStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Analytics = () => {
  const { schedules } = useScheduleStore();
  const { syllabi } = useSyllabusStore();
  const chartRef = useRef<ChartJS | null>(null);

  // Cleanup chart instance on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const subjectData = {
    labels: ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'History'],
    datasets: [
      {
        label: 'Classes Scheduled',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Exams Scheduled',
        data: [2, 3, 1, 4, 1, 2],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Subject-wise Distribution',
      },
    },
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Subject Analytics</h3>
        <Bar 
          options={options} 
          data={subjectData}
          ref={(reference) => {
            if (reference) {
              chartRef.current = reference.current;
            }
          }}
        />
      </motion.div>

      {/* Add more analytics components as needed */}
    </div>
  );
};