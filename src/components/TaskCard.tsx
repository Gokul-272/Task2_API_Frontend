import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="group bg-white p-7 rounded-[1.5rem] shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-gray-900 text-lg leading-tight pr-12">{task.title}</h3>
        <div className="flex items-center gap-1 absolute top-6 right-6">
          <button 
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(task)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-500 leading-relaxed flex-1 whitespace-pre-wrap text-sm">{task.description}</p>
    </div>
  );
}
