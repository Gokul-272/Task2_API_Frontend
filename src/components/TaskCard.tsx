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
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight pr-12">{task.title}</h3>
          <span className={`inline-block mt-2 px-2.5 py-1 text-xs font-semibold rounded-full ${
            task.status === 'completed' ? 'bg-green-100 text-green-800' :
            task.status === 'inprogress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {task.status === 'completed' ? 'Completed' : task.status === 'inprogress' ? 'In Progress' : 'To Do'}
          </span>
        </div>
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
