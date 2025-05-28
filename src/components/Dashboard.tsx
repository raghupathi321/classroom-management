import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useScheduleStore } from '../store/scheduleStore';
import { useAttendanceStore } from '../store/attendanceStore';
import { useSyllabusStore } from '../store/syllabusStore';

export const Dashboard = () => {
  const { schedules } = useScheduleStore();
  const { requests } = useAttendanceStore();
  const { syllabi } = useSyllabusStore();

  const attendanceStats = {
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
    pending: requests.filter((r) => r.status === 'pending').length,
  };

  const scheduleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Classes',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Exams',
        data: [2, 3, 1, 4, 1, 2],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Classes</p>
              <h3 className="text-2xl font-bold mt-1">{schedules.length}</h3>
            </div>
            <Calendar className="h-8 w-8 text-indigo-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Syllabi</p>
              <h3 className="text-2xl font-bold mt-1">{syllabi.length}</h3>
            </div>
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Attendance Requests</p>
              <h3 className="text-2xl font-bold mt-1">{requests.length}</h3>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
              <h3 className="text-2xl font-bold mt-1">87%</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>
      </div>

      {/* Activity Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
        <CalendarHeatmap
          startDate={new Date('2024-01-01')}
          endDate={new Date('2024-12-31')}
          values={[
            { date: '2024-01-01', count: 1 },
            { date: '2024-01-22', count: 2 },
            { date: '2024-01-30', count: 3 },
            // Add more dates as needed
          ]}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return `color-scale-${value.count}`;
          }}
        />
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Schedule Trends</h3>
          <Line data={scheduleData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={20} />
                <span>Approved</span>
              </div>
              <span className="font-semibold">{attendanceStats.approved}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <XCircle className="text-red-500" size={20} />
                <span>Rejected</span>
              </div>
              <span className="font-semibold">{attendanceStats.rejected}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="text-yellow-500" size={20} />
                <span>Pending</span>
              </div>
              <span className="font-semibold">{attendanceStats.pending}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};