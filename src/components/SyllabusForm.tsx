import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, GripVertical, Star } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { Topic, Unit } from '../types';

interface SyllabusFormProps {
  onSubmit: (data: {
    subject: string;
    description: string;
    examType: 'midterm' | 'final';
    units: Unit[];
  }) => void;
  onCancel: () => void;
}

export const SyllabusForm: React.FC<SyllabusFormProps> = ({ onSubmit, onCancel }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [examType, setExamType] = useState<'midterm' | 'final'>('midterm');
  const [units, setUnits] = useState<Unit[]>([]);

  const handleAddUnit = () => {
    setUnits([
      ...units,
      {
        id: crypto.randomUUID(),
        title: '',
        topics: [],
      },
    ]);
  };

  const handleAddTopic = (unitId: string) => {
    setUnits(
      units.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              topics: [
                ...unit.topics,
                {
                  id: crypto.randomUUID(),
                  title: '',
                  description: '',
                  difficulty: 'medium',
                  weightage: 5,
                  duration: 30,
                  isImportant: false,
                },
              ],
            }
          : unit
      )
    );
  };

  const handleRemoveUnit = (unitId: string) => {
    setUnits(units.filter((unit) => unit.id !== unitId));
  };

  const handleRemoveTopic = (unitId: string, topicId: string) => {
    setUnits(
      units.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              topics: unit.topics.filter((topic) => topic.id !== topicId),
            }
          : unit
      )
    );
  };

  const handleUnitDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(units);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setUnits(items);
  };

  const handleTopicDragEnd = (unitId: string, result: any) => {
    if (!result.destination) return;

    setUnits(
      units.map((unit) => {
        if (unit.id !== unitId) return unit;

        const topics = Array.from(unit.topics);
        const [reorderedItem] = topics.splice(result.source.index, 1);
        topics.splice(result.destination.index, 0, reorderedItem);

        return { ...unit, topics };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      subject,
      description,
      examType,
      units,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 max-h-[90vh] overflow-y-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4">Create New Syllabus</h2>

      <div className="space-y-4">
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Exam Type</label>
          <select
  value={examType}
  onChange={(e) => setExamType(e.target.value as 'midterm' | 'final' | 'sliptest')}
  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
>
  <option value="midterm">Midterm</option>
  <option value="final">Final</option>
  <option value="sliptest">Slip Test</option>
</select>

        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Units</h3>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddUnit}
              className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center space-x-1"
            >
              <Plus size={16} />
              <span>Add Unit</span>
            </motion.button>
          </div>

          <DragDropContext onDragEnd={handleUnitDragEnd}>
            <Droppable droppableId="units">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {units.map((unit, index) => (
                    <Draggable key={unit.id} draggableId={unit.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="mb-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-start space-x-3">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="text-gray-400" size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <input
                                  type="text"
                                  value={unit.title}
                                  onChange={(e) =>
                                    setUnits(
                                      units.map((u) =>
                                        u.id === unit.id ? { ...u, title: e.target.value } : u
                                      )
                                    )
                                  }
                                  placeholder="Unit Title"
                                  className="flex-1 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                                />
                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleRemoveUnit(unit.id)}
                                  className="ml-2 p-1 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                                >
                                  <Minus size={16} />
                                </motion.button>
                              </div>

                              <DragDropContext onDragEnd={(result) => handleTopicDragEnd(unit.id, result)}>
                                <Droppable droppableId={`topics-${unit.id}`}>
                                  {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                      {unit.topics.map((topic, topicIndex) => (
                                        <Draggable
                                          key={topic.id}
                                          draggableId={topic.id}
                                          index={topicIndex}
                                        >
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              className="mb-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                                            >
                                              <div className="flex items-start space-x-3">
                                                <div {...provided.dragHandleProps}>
                                                  <GripVertical
                                                    className="text-gray-400"
                                                    size={16}
                                                  />
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                  <input
                                                    type="text"
                                                    value={topic.title}
                                                    onChange={(e) =>
                                                      setUnits(
                                                        units.map((u) =>
                                                          u.id === unit.id
                                                            ? {
                                                                ...u,
                                                                topics: u.topics.map((t) =>
                                                                  t.id === topic.id
                                                                    ? { ...t, title: e.target.value }
                                                                    : t
                                                                ),
                                                              }
                                                            : u
                                                        )
                                                      )
                                                    }
                                                    placeholder="Topic Title"
                                                    className="w-full px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                  <div className="flex space-x-2">
                                                    <select
                                                      value={topic.difficulty}
                                                      onChange={(e) =>
                                                        setUnits(
                                                          units.map((u) =>
                                                            u.id === unit.id
                                                              ? {
                                                                  ...u,
                                                                  topics: u.topics.map((t) =>
                                                                    t.id === topic.id
                                                                      ? {
                                                                          ...t,
                                                                          difficulty: e.target
                                                                            .value as 'easy' | 'medium' | 'hard',
                                                                        }
                                                                      : t
                                                                  ),
                                                                }
                                                              : u
                                                          )
                                                        )
                                                      }
                                                      className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                                                    >
                                                      <option value="easy">Easy</option>
                                                      <option value="medium">Medium</option>
                                                      <option value="hard">Hard</option>
                                                    </select>
                                                    <input
                                                      type="number"
                                                      value={topic.weightage}
                                                      onChange={(e) =>
                                                        setUnits(
                                                          units.map((u) =>
                                                            u.id === unit.id
                                                              ? {
                                                                  ...u,
                                                                  topics: u.topics.map((t) =>
                                                                    t.id === topic.id
                                                                      ? {
                                                                          ...t,
                                                                          weightage: parseInt(
                                                                            e.target.value
                                                                          ),
                                                                        }
                                                                      : t
                                                                  ),
                                                                }
                                                              : u
                                                          )
                                                        )
                                                      }
                                                      min="1"
                                                      max="10"
                                                      className="w-20 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                                                      placeholder="Weight"
                                                    />
                                                    <input
                                                      type="number"
                                                      value={topic.duration}
                                                      onChange={(e) =>
                                                        setUnits(
                                                          units.map((u) =>
                                                            u.id === unit.id
                                                              ? {
                                                                  ...u,
                                                                  topics: u.topics.map((t) =>
                                                                    t.id === topic.id
                                                                      ? {
                                                                          ...t,
                                                                          duration: parseInt(
                                                                            e.target.value
                                                                          ),
                                                                        }
                                                                      : t
                                                                  ),
                                                                }
                                                              : u
                                                          )
                                                        )
                                                      }
                                                      min="5"
                                                      step="5"
                                                      className="w-20 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                                                      placeholder="Minutes"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="flex space-x-2">
                                                  <motion.button
                                                    type="button"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() =>
                                                      setUnits(
                                                        units.map((u) =>
                                                          u.id === unit.id
                                                            ? {
                                                                ...u,
                                                                topics: u.topics.map((t) =>
                                                                  t.id === topic.id
                                                                    ? {
                                                                        ...t,
                                                                        isImportant: !t.isImportant,
                                                                      }
                                                                    : t
                                                                ),
                                                              }
                                                            : u
                                                        )
                                                      )
                                                    }
                                                    className={`p-1 rounded-lg ${
                                                      topic.isImportant
                                                        ? 'text-yellow-500'
                                                        : 'text-gray-400'
                                                    }`}
                                                  >
                                                    <Star size={16} />
                                                  </motion.button>
                                                  <motion.button
                                                    type="button"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() =>
                                                      handleRemoveTopic(unit.id, topic.id)
                                                    }
                                                    className="p-1 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                                                  >
                                                    <Minus size={16} />
                                                  </motion.button>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                              </DragDropContext>

                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleAddTopic(unit.id)}
                                className="mt-2 px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center space-x-1"
                              >
                                <Plus size={14} />
                                <span>Add Topic</span>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
            Create Syllabus
          </button>
        </div>
      </div>
    </motion.form>
  );
};