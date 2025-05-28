import React from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Clock, MapPin, BookOpen, Calendar } from 'lucide-react';
import type { Schedule } from '../types';

interface ScheduleFormProps {
  onSubmit: (schedule: Omit<Schedule, 'id'>) => void;
  onCancel: () => void;
}

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

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [date, setDate] = React.useState(new Date());
  const [subject, setSubject] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [type, setType] = React.useState<'class' | 'exam'>('class');
  const [room, setRoom] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [isViewMode, setIsViewMode] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState<(typeof timetable)[keyof typeof timetable]>([]);

  React.useEffect(() => {
    const dayOfWeek = format(date, 'EEEE');
    setSelectedSchedule(timetable[dayOfWeek as keyof typeof timetable] || []);
  }, [date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      subject,
      date: format(date, 'yyyy-MM-dd'),
      startTime,
      endTime,
      type,
      room,
      notes,
    });
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'CD lab': 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      'AIML lab': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      'Mini project': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      'P.E': 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      'CD': 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
      'AIML': 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
      'Mentoring': 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      'EEA': 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
      'FDT': 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
      'PME': 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
    };

    for (const [key, value] of Object.entries(colors)) {
      if (subject.includes(key)) return value;
    }

    return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {isViewMode ? 'View Schedule' : 'Add New Schedule'}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsViewMode(!isViewMode)}
          className="px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center space-x-2"
        >
          {isViewMode ? (
            <>
              <Calendar size={18} />
              <span>Add Schedule</span>
            </>
          ) : (
            <>
              <Clock size={18} />
              <span>View Schedule</span>
            </>
          )}
        </motion.button>
      </div>

      {isViewMode ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date || new Date())}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium flex items-center space-x-2 mb-4">
              <Calendar size={20} className="text-indigo-500" />
              <span>Schedule for {format(date, 'EEEE')}</span>
            </h3>
            
            {selectedSchedule.length > 0 ? (
              <div className="space-y-3">
                {selectedSchedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border rounded-lg ${getSubjectColor(item.subject)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-lg mb-2">{item.subject}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {item.startTime} - {item.endTime}
                          </div>
                          {item.room !== '-' && (
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1" />
                              {item.room}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
                        {item.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No schedule available for this day.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date || new Date())}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'class' | 'exam')}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            >
              <option value="class">Class</option>
              <option value="exam">Exam</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Room</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Schedule
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};