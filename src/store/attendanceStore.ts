import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AttendanceRequest } from '../types';

interface AttendanceState {
  requests: AttendanceRequest[];
  addRequest: (request: Omit<AttendanceRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateRequest: (id: string, status: 'approved' | 'rejected', comments?: string) => void;
  deleteRequest: (id: string) => void;
}

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => ({
      requests: [],
      addRequest: (request) => {
        const newRequest: AttendanceRequest = {
          ...request,
          id: crypto.randomUUID(),
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          requests: [...state.requests, newRequest],
        }));
      },
      updateRequest: (id, status, comments) => {
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status,
                  comments,
                  updatedAt: new Date().toISOString(),
                }
              : request
          ),
        }));
      },
      deleteRequest: (id) => {
        set((state) => ({
          requests: state.requests.filter((request) => request.id !== id),
        }));
      },
    }),
    {
      name: 'attendance-storage',
    }
  )
);