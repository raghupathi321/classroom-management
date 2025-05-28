import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Syllabus, Topic, Unit } from '../types';

interface SyllabusState {
  syllabi: Syllabus[];
  addSyllabus: (syllabus: Omit<Syllabus, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSyllabus: (syllabus: Syllabus) => void;
  deleteSyllabus: (id: string) => void;
  generateSlipTest: (syllabusId: string) => Syllabus;
}

const calculateTotalDuration = (units: Unit[]): number => {
  return units.reduce((total, unit) => {
    return total + unit.topics.reduce((unitTotal, topic) => unitTotal + topic.duration, 0);
  }, 0);
};

const selectImportantTopics = (units: Unit[]): Unit[] => {
  return units.map(unit => ({
    ...unit,
    topics: unit.topics.filter(topic => 
      topic.isImportant || 
      (topic.weightage >= 7 && topic.difficulty !== 'hard')
    )
  })).filter(unit => unit.topics.length > 0);
};

export const useSyllabusStore = create<SyllabusState>()(
  persist(
    (set, get) => ({
      syllabi: [],
      addSyllabus: (newSyllabus) => {
        const syllabus: Syllabus = {
          ...newSyllabus,
          id: crypto.randomUUID(),
          totalDuration: calculateTotalDuration(newSyllabus.units),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          syllabi: [...state.syllabi, syllabus],
        }));
      },
      updateSyllabus: (updatedSyllabus) => {
        set((state) => ({
          syllabi: state.syllabi.map((syllabus) =>
            syllabus.id === updatedSyllabus.id
              ? {
                  ...updatedSyllabus,
                  totalDuration: calculateTotalDuration(updatedSyllabus.units),
                  updatedAt: new Date().toISOString(),
                }
              : syllabus
          ),
        }));
      },
      deleteSyllabus: (id) => {
        set((state) => ({
          syllabi: state.syllabi.filter((syllabus) => syllabus.id !== id),
        }));
      },
      generateSlipTest: (syllabusId) => {
        const originalSyllabus = get().syllabi.find((s) => s.id === syllabusId);
        if (!originalSyllabus) throw new Error('Syllabus not found');

        const slipTestUnits = selectImportantTopics(originalSyllabus.units);
        const slipTest: Syllabus = {
          id: crypto.randomUUID(),
          subject: `${originalSyllabus.subject} - Slip Test`,
          description: `Generated from ${originalSyllabus.subject} syllabus`,
          examType: 'slip',
          units: slipTestUnits,
          totalDuration: calculateTotalDuration(slipTestUnits),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          syllabi: [...state.syllabi, slipTest],
        }));

        return slipTest;
      },
    }),
    {
      name: 'syllabus-storage',
    }
  )
);