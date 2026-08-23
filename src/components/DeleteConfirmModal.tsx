import React, { useState } from 'react';
import { Task } from '../types/task';

interface DeleteConfirmModalProps {
  task: Task | null;
  onClose: () => void;
  onConfirm: (task: Task) => Promise<void>;
}

export default function DeleteConfirmModal({ task, onClose, onConfirm }: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!task) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(task);
      onClose();
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl animate-in zoom-in-95 duration-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Task</h3>
        <p className="text-gray-500 mb-6 text-sm">
          Delete "{task.title}"? This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-70"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
