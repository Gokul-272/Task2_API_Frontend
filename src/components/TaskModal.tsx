import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';

interface TaskModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialTask: Task | null;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => Promise<void>;
}

export default function TaskModal({ isOpen, mode, initialTask, onClose, onSubmit }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTask?.title || '');
      setDescription(initialTask?.description || '');
      setIsSubmitting(false);
    }
  }, [isOpen, initialTask]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ title, description });
      onClose();
    } catch (error) {
      // Error handled by parent or via toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
          {mode === 'create' ? 'Create New Task' : 'Edit Task'}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none text-gray-800 placeholder-gray-400 focus:border-[#63ba54] focus:bg-white focus:ring-4 focus:ring-[#63ba54]/10 transition-all font-medium"
              placeholder="What needs to be done?"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none text-gray-800 placeholder-gray-400 focus:border-[#63ba54] focus:bg-white focus:ring-4 focus:ring-[#63ba54]/10 transition-all min-h-[140px] resize-none"
              placeholder="Add details, notes, or steps..."
              required
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl transition-colors active:scale-95 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-[2] bg-[#63ba54] hover:bg-[#54a646] text-white font-bold py-4 rounded-2xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
            >
              {isSubmitting ? 'Saving...' : (mode === 'create' ? 'Create Task' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
