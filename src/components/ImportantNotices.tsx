import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Calendar, FileText, Info, MessageCircle, Search, Star, BookOpen } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'exam' | 'syllabus' | 'general';
  priority: 'high' | 'medium' | 'low';
  date: string;
}

const notices: Notice[] = [
  {
    id: '1',
    title: 'Slip Test Instructions',
    content: `
      1. Duration: 30 minutes
      2. Focus on important topics marked with stars
      3. Questions will be from recently covered units
      4. Bring your college ID and blue/black pen
      5. No electronic devices allowed
      6. Late entry will not be permitted
    `,
    type: 'exam',
    priority: 'high',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Mid-Semester Exam Guidelines',
    content: `
      1. Duration: 90 minutes
      2. Covers Units 1-3 from all subjects
      3. Bring necessary stationary and instruments
      4. Report 15 minutes before exam time
      5. Check seating arrangement on notice board
      6. Read all instructions carefully before starting
    `,
    type: 'exam',
    priority: 'high',
    date: '2024-03-20'
  },
  {
    id: '3',
    title: 'Syllabus Update: Compiler Design',
    content: `
      Additional topics added to Unit 4:
      - Advanced Optimization Techniques
      - Code Generation for Modern Architectures
      - Performance Analysis Methods
      
      These topics will be covered in upcoming classes.
    `,
    type: 'syllabus',
    priority: 'medium',
    date: '2024-03-10'
  },
  {
    id: '4',
    title: 'AIML Project Submission Guidelines',
    content: `
      1. Project report format updated
      2. Include implementation screenshots
      3. Add GitHub repository link
      4. Prepare 10-minute presentation
      5. Demo scheduled for next week
      6. Submit both hard and soft copies
    `,
    type: 'general',
    priority: 'medium',
    date: '2024-03-18'
  }
];

export const ImportantNotices: React.FC = () => {
  const [filter, setFilter] = React.useState<'all' | 'exam' | 'syllabus' | 'general'>('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <FileText className="text-red-500" />;
      case 'syllabus':
        return <BookOpen className="text-blue-500" />;
      case 'general':
        return <Info className="text-green-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const filteredNotices = notices.filter(notice => {
    const matchesFilter = filter === 'all' || notice.type === filter;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400">
              Important Notices
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Stay updated with latest announcements and instructions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <div className="flex gap-2">
              {(['all', 'exam', 'syllabus', 'general'] as const).map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === type
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredNotices.map((notice) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getTypeIcon(notice.type)}
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold">{notice.title}</h3>
                      {getPriorityBadge(notice.priority)}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Posted on {new Date(notice.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {notice.priority === 'high' && (
                  <AlertTriangle className="text-red-500 animate-pulse" />
                )}
              </div>

              <div className="mt-4 space-y-2">
                {notice.content.split('\n').map((line, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300">
                    {line.trim()}
                  </p>
                ))}
              </div>

              {notice.type === 'exam' && (
                <div className="mt-4 flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400">
                  <Calendar size={16} />
                  <span>Mark your calendar!</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};