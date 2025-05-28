import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Schedule, Notification } from '../types';

interface ScheduleState {
  schedules: Schedule[];
  notifications: Notification[];
  addSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  updateSchedule: (schedule: Schedule) => void;
  deleteSchedule: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'date'>) => void;
  deleteNotification: (id: string) => void;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      schedules: [],
      notifications: [],
      addSchedule: (schedule) =>
        set((state) => ({
          schedules: [
            ...state.schedules,
            { ...schedule, id: crypto.randomUUID() },
          ],
        })),
      updateSchedule: (updatedSchedule) =>
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === updatedSchedule.id ? updatedSchedule : schedule
          ),
        })),
      deleteSchedule: (id) =>
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id),
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: crypto.randomUUID(),
              date: new Date().toISOString(),
            },
          ],
        })),
      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        })),
    }),
    {
      name: 'schedule-storage',
    }
  )
);
