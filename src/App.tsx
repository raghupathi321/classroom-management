import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bell, Search, Clock, Plus, Filter, BookOpen, UserCheck, Menu, X } from 'lucide-react';
import { format, isToday, parseISO, isFuture } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { ThemeToggle } from './components/ThemeToggle';
import { ScheduleForm } from './components/ScheduleForm';
import { ScheduleCard } from './components/ScheduleCard';
import { NotificationCard } from './components/NotificationCard';
import { AttendanceRequestForm } from './components/AttendanceRequestForm';
import { AttendanceRequestCard } from './components/AttendanceRequestCard';
import { TimeTable } from './components/TimeTable';
import { SyllabusDocument } from './components/SyllabusDocument';
import { ImportantNotices } from './components/ImportantNotices';
import { useScheduleStore } from './store/scheduleStore';
import { useSyllabusStore } from './store/syllabusStore';
import { useAttendanceStore } from './store/attendanceStore';
import type { Schedule } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'class' | 'exam'>('all');
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'syllabus' | 'attendance' | 'timetable' | 'notices'>('timetable');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { schedules, notifications, addSchedule, addNotification } = useScheduleStore();
  const { syllabi } = useSyllabusStore();
  const { requests } = useAttendanceStore();

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || schedule.type === filterType;
    const matchesDate = !dateFilter || format(parseISO(schedule.date), 'yyyy-MM-dd') === format(dateFilter, 'yyyy-MM-dd');
    const matchesUpcoming = !showUpcoming || isFuture(parseISO(schedule.date));
    return matchesSearch && matchesType && matchesDate && matchesUpcoming;
  });

  const todaySchedules = schedules.filter(schedule => 
    isToday(parseISO(schedule.date))
  );

  const handleAddSchedule = async (newSchedule: Omit<Schedule, 'id'>) => {
    try {
      addSchedule(newSchedule);
      addNotification({
        title: 'New Schedule Added',
        message: `${newSchedule.subject} has been scheduled for ${format(parseISO(newSchedule.date), 'MMMM dd, yyyy')}`,
        type: 'info',
      });
      toast.success('Schedule added successfully');
      setShowScheduleForm(false);
    } catch (error) {
      toast.error('Failed to add schedule');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Toaster position="top-right" />
      
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg mr-4"
              >
                {activeTab === 'schedule' && <Calendar className="h-8 w-8 text-white" />}
                {activeTab === 'syllabus' && <BookOpen className="h-8 w-8 text-white" />}
                {activeTab === 'attendance' && <UserCheck className="h-8 w-8 text-white" />}
                {activeTab === 'timetable' && <Clock className="h-8 w-8 text-white" />}
                {activeTab === 'notices' && <Bell className="h-8 w-8 text-white" />}
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  Class Management
                </h1>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex space-x-2">
                {['schedule', 'syllabus', 'attendance', 'timetable', 'notices'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                {activeTab !== 'timetable' && activeTab !== 'syllabus' && activeTab !== 'notices' && (
                  <>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (activeTab === 'schedule') setShowScheduleForm(true);
                        if (activeTab === 'attendance') setShowAttendanceForm(true);
                      }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all flex items-center space-x-2"
                    >
                      <Plus size={20} />
                      <span>Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                    </motion.button>
                  </>
                )}
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                <div className="flex flex-col space-y-2">
                  {['schedule', 'syllabus', 'attendance', 'timetable', 'notices'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab as typeof activeTab);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {activeTab !== 'timetable' && activeTab !== 'syllabus' && activeTab !== 'notices' && (
                  <div className="mt-4 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <ThemeToggle />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (activeTab === 'schedule') setShowScheduleForm(true);
                          if (activeTab === 'attendance') setShowAttendanceForm(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 flex items-center space-x-2"
                      >
                        <Plus size={20} />
                        <span>Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'timetable' ? (
          <TimeTable />
        ) : activeTab === 'syllabus' ? (
          <SyllabusDocument />
        ) : activeTab === 'notices' ? (
          <ImportantNotices />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'schedule' && (
                <>
                  {/* Filters */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Filter size={20} className="text-gray-400" />
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value as 'all' | 'class' | 'exam')}
                          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                        >
                          <option value="all">All Types</option>
                          <option value="class">Classes Only</option>
                          <option value="exam">Exams Only</option>
                        </select>
                      </div>
                      <input
                        type="date"
                        onChange={(e) => setDateFilter(e.target.value ? new Date(e.target.value) : null)}
                        className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      />
                      <button
                        onClick={() => setShowUpcoming(!showUpcoming)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                          showUpcoming
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Clock size={16} />
                        <span>Upcoming Only</span>
                      </button>
                    </div>
                  </div>

                  {/* Today's Schedule */}
                  {todaySchedules.length > 0 && (
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Clock className="mr-2" size={24} />
                        Today's Schedule
                      </h2>
                      <div className="space-y-4">
                        {todaySchedules.map((schedule) => (
                          <ScheduleCard key={schedule.id} schedule={schedule} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Schedules */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">All Schedules</h2>
                    <div className="space-y-4">
                      {filteredSchedules.length > 0 ? (
                        filteredSchedules.map((schedule) => (
                          <ScheduleCard key={schedule.id} schedule={schedule} />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">No schedules found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'attendance' && (
                <div className="space-y-6">
                  {requests.length > 0 ? (
                    requests.map((request) => (
                      <AttendanceRequestCard key={request.id} request={request} />
                    ))
                  ) : (
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm p-6 text-center">
                      <UserCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No attendance requests</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm p-6 sticky top-28">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Bell className="mr-2" size={24} />
                  Notifications
                </h2>
                <AnimatePresence>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          </div>
        )}
      </main>

      {/* Forms */}
      <AnimatePresence>
        {showScheduleForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="max-w-md w-full">
              <ScheduleForm
                onSubmit={handleAddSchedule}
                onCancel={() => setShowScheduleForm(false)}
              />
            </div>
          </motion.div>
        )}

        {showAttendanceForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="max-w-md w-full">
              <AttendanceRequestForm
                onClose={() => setShowAttendanceForm(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;