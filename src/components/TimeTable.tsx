import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const timetable: Record<
  string,
  {
    subject: string;
    startTime: string;
    endTime: string;
    type: 'class' | 'exam';
    room: string;
  }[]
> = {
  Monday: [
    {
      subject: 'CD lab (B1), AIML lab(B2), Mini project(B3)',
      startTime: '09:10',
      endTime: '11:10',
      type: 'class',
      room: 'Lab (1-3)',
    },
    {
      subject: 'P.E III',
      startTime: '11:15',
      endTime: '12:15',
      type: 'class',
      room: 'C209',
    },
    {
      subject: 'CD',
      startTime: '1:00',
      endTime: '2:00',
      type: 'class',
      room: 'C209',
    },
    {
      subject: 'AIML',
      startTime: '2:00',
      endTime: '3:00',
      type: 'class',
      room: 'C209',
    },
    {
      subject: 'Mentoring',
      startTime: '3:05',
      endTime: '4:05',
      type: 'class',
      room: '-',
    },
  ],
  Tuesday: [
    {
      subject: 'CD',
      startTime: '09:10',
      endTime: '10:10',
      type: 'class',
      room: '209',
    },
    {
      subject: 'EEA',
      startTime: '10:10',
      endTime: '11:10',
      type: 'class',
      room: '209',
    },
    {
      subject: 'P.E II',
      startTime: '11:15',
      endTime: '12:15',
      type: 'class',
      room: '209',
    },
    {
      subject: 'AIML',
      startTime: '1:00',
      endTime: '2:00',
      type: 'class',
      room: '209',
    },
    {
      subject: 'CD lab(B2), AIML lab(B3), Mini project(B1)',
      startTime: '2:00',
      endTime: '4:05',
      type: 'class',
      room: 'Labs (1-3)',
    },
  ],
  Wednesday: [
    {
      subject: 'AIML',
      startTime: '09:10',
      endTime: '10:10',
      type: 'class',
      room: '209',
    },
    {
      subject: 'FDT',
      startTime: '10:10',
      endTime: '11:10',
      type: 'class',
      room: '209',
    },
    {
      subject: 'CD',
      startTime: '11:15',
      endTime: '12:15',
      type: 'class',
      room: '209',
    },
    {
      subject: 'EEA',
      startTime: '1:00',
      endTime: '2:00',
      type: 'class',
      room: '209',
    },
    {
      subject: 'PME',
      startTime: '3:05',
      endTime: '4:05',
      type: 'class',
      room: 'C209',
    },
  ],
  Thursday: [
    {
      subject: 'CD lab (B3), AIML lab(B1), Mini project(B2)',
      startTime: '09:10',
      endTime: '11:10',
      type: 'class',
      room: 'Lab (1-3)',
    },
    {
      subject: 'P.E III',
      startTime: '11:15',
      endTime: '12:15',
      type: 'class',
      room: 'C209',
    },
    {
      subject: 'P.E II',
      startTime: '1:00',
      endTime: '2:00',
      type: 'class',
      room: 'C209',
    },
    {
      subject: 'AIML',
      startTime: '2:00',
      endTime: '3:00',
      type: 'class',
      room: 'C209',
    },
  ],
  Friday: [
    {
      subject: 'P.E III',
      startTime: '09:10',
      endTime: '10:10',
      type: 'class',
      room: 'C 209',
    },
    {
      subject: 'Mini project',
      startTime: '10:10',
      endTime: '12:15',
      type: 'class',
      room: 'Labs (1-3)',
    },
    {
      subject: 'P.E II',
      startTime: '1:00',
      endTime: '2:00',
      type: 'class',
      room: 'C209',
    },
    {
      subject: 'EEA',
      startTime: '2:00',
      endTime: '3:00',
      type: 'class',
      room: 'C209',
    },
    {
      subject: 'FDT',
      startTime: '3:05',
      endTime: '4:05',
      type: 'class',
      room: 'C209',
    },
  ],
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const TimeTable: React.FC = () => {
  const [selectedDay, setSelectedDay] = React.useState(format(new Date(), 'EEEE'));
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleDayChange = (day: string) => {
    setIsAnimating(true);
    setSelectedDay(day);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Enhanced color mapping for subjects with more vibrant colors and better text contrast
  const getSubjectColor = (subject: string) => {
    const colors = {
      'CD lab': {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        border: 'border-blue-300 dark:border-blue-700',
        text: 'text-blue-800 dark:text-blue-100',
        icon: 'text-blue-600 dark:text-blue-400'
      },
      'AIML lab': {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        border: 'border-purple-300 dark:border-purple-700',
        text: 'text-purple-800 dark:text-purple-100',
        icon: 'text-purple-600 dark:text-purple-400'
      },
      'Mini project': {
        bg: 'bg-green-100 dark:bg-green-900/30',
        border: 'border-green-300 dark:border-green-700',
        text: 'text-green-800 dark:text-green-100',
        icon: 'text-green-600 dark:text-green-400'
      },
      'P.E III': {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        border: 'border-amber-300 dark:border-amber-700',
        text: 'text-amber-800 dark:text-amber-100',
        icon: 'text-amber-600 dark:text-amber-400'
      },
      'CD': {
        bg: 'bg-indigo-100 dark:bg-indigo-900/30',
        border: 'border-indigo-300 dark:border-indigo-700',
        text: 'text-indigo-800 dark:text-indigo-100',
        icon: 'text-indigo-600 dark:text-indigo-400'
      },
      'AIML': {
        bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/30',
        border: 'border-fuchsia-300 dark:border-fuchsia-700',
        text: 'text-fuchsia-800 dark:text-fuchsia-100',
        icon: 'text-fuchsia-600 dark:text-fuchsia-400'
      },
      'Mentoring': {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        border: 'border-orange-300 dark:border-orange-700',
        text: 'text-orange-800 dark:text-orange-100',
        icon: 'text-orange-600 dark:text-orange-400'
      },
      'EEA': {
        bg: 'bg-teal-100 dark:bg-teal-900/30',
        border: 'border-teal-300 dark:border-teal-700',
        text: 'text-teal-800 dark:text-teal-100',
        icon: 'text-teal-600 dark:text-teal-400'
      },
      'P.E II': {
        bg: 'bg-rose-100 dark:bg-rose-900/30',
        border: 'border-rose-300 dark:border-rose-700',
        text: 'text-rose-800 dark:text-rose-100',
        icon: 'text-rose-600 dark:text-rose-400'
      },
      'FDT': {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        border: 'border-emerald-300 dark:border-emerald-700',
        text: 'text-emerald-800 dark:text-emerald-100',
        icon: 'text-emerald-600 dark:text-emerald-400'
      },
      'PME': {
        bg: 'bg-sky-100 dark:bg-sky-900/30',
        border: 'border-sky-300 dark:border-sky-700',
        text: 'text-sky-800 dark:text-sky-100',
        icon: 'text-sky-600 dark:text-sky-400'
      },
    };

    // Find matching subject
    for (const [key, value] of Object.entries(colors)) {
      if (subject.includes(key)) return value;
    }

    // Default color
    return {
      bg: 'bg-gray-100 dark:bg-gray-800/50',
      border: 'border-gray-300 dark:border-gray-700',
      text: 'text-gray-800 dark:text-gray-100',
      icon: 'text-gray-600 dark:text-gray-400'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-300 mb-2">Class Timetable</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">View your weekly schedule at a glance</p>
        
        {/* Day selector with improved styling */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {days.map((day) => (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDayChange(day)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedDay === day
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {day}
            </motion.button>
          ))}
        </div>

        {/* Schedule grid with enhanced card styling */}
        <motion.div
          initial={false}
          animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4"
        >
          {timetable[selectedDay as keyof typeof timetable]?.map((schedule, index) => {
            const colorScheme = getSubjectColor(schedule.subject);
            
            return (
              <motion.div
                key={`${schedule.subject}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-5 rounded-xl border ${colorScheme.border} ${colorScheme.bg} shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className={`font-semibold text-lg mb-2 ${colorScheme.text}`}>{schedule.subject}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className={`flex items-center ${colorScheme.icon}`}>
                        <Clock size={16} className="mr-1.5" />
                        <span className="text-gray-700 dark:text-gray-300">{schedule.startTime} - {schedule.endTime}</span>
                      </div>
                      {schedule.room !== '-' && (
                        <div className={`flex items-center ${colorScheme.icon}`}>
                          <MapPin size={16} className="mr-1.5" />
                          <span className="text-gray-700 dark:text-gray-300">{schedule.room}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorScheme.bg} border ${colorScheme.border} ${colorScheme.text}`}>
                      {schedule.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};