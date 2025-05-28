export interface Schedule {
  id: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'exam';
  room?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'urgent';
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  weightage: number;
  duration: number;
  isImportant: boolean;
}

export interface Unit {
  id: string;
  title: string;
  topics: Topic[];
  referenceFiles?: ReferenceFile[];
}

export interface ReferenceFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Syllabus {
  id: string;
  subject: string;
  description: string;
  examType: 'internal' | 'midterm' | 'final' | 'slip';
  units: Unit[];
  totalDuration: number;
  createdAt: string;
  updatedAt: string;
  notification?: SyllabusNotification;
}

export interface SyllabusNotification {
  id: string;
  message: string;
  scheduledFor?: string;
  sent: boolean;
}

export interface AttendanceRequest {
  id: string;
  studentName: string;
  studentId: string;
  reason: string;
  startDate: string;
  endDate: string;
  supportingDocs?: ReferenceFile[];
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

export type Theme = 'light' | 'dark';