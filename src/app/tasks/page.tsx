'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../../api/tasks.api';
import { Task } from '../../types/task';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, CheckCircle2 } from 'lucide-react';
import TaskCard from '../../components/TaskCard';
import TaskModal from '../../components/TaskModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';

export default function TasksDashboard() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    setLoadingTasks(true);
    setError('');
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err: any) {
      setError('Unable to load your tasks. Please try again.');
    } finally {
      setLoadingTasks(false);
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setModalMode('edit');
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const confirmDelete = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleModalSubmit = async (taskData: { title: string; description: string }) => {
    setError('');
    setMessage('');
    try {
      if (modalMode === 'create') {
        const res = await createTask(taskData);
        setTasks([...tasks, res.data]);
        setMessage('Task created successfully.');
      } else if (modalMode === 'edit' && currentTask) {
        const res = await updateTask(currentTask._id, taskData);
        setTasks(tasks.map(t => t._id === currentTask._id ? res.data : t));
        setMessage('Task updated successfully.');
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save task.');
      throw err; // So modal knows it failed
    }
  };

  const handleDelete = async (task: Task) => {
    setError('');
    setMessage('');
    try {
      await deleteTask(task._id);
      setTasks(tasks.filter(t => t._id !== task._id));
      setMessage('Task deleted successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task.');
      throw err;
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading workspace...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Premium Header */}
      <header className="bg-white sticky top-0 z-10 border-b border-gray-100/80 shadow-sm/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Tasky Logo" width={32} height={32} className="object-contain shadow-sm" priority />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Tasky</h1>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/settings" className="text-gray-500 hover:text-gray-900 font-medium transition-colors text-base">
              Settings
            </Link>
            <button 
              onClick={logout}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors text-base"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10">
        
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Your Tasks</h2>
            <p className="text-gray-500 mt-1">Manage and organize your day.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="group flex items-center gap-2 bg-[#63ba54] hover:bg-[#54a646] text-white px-6 py-3 rounded-full font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <Plus size={20} className="transition-transform group-hover:rotate-90" />
            Create Task
          </button>
        </div>

        {/* Global Error/Success States */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 text-center text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-50 text-green-700 p-4 rounded-2xl mb-8 text-center text-sm font-medium border border-green-100 flex justify-center items-center gap-2">
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}

        {/* Content Area */}
        {loadingTasks ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#63ba54] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Loading your tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-[2rem] shadow-sm p-16 flex flex-col items-center text-center border border-gray-100/50 max-w-2xl mx-auto mt-12">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-gray-300" size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl text-gray-900 font-bold mb-2">You're all caught up!</h3>
            <p className="text-gray-500 mb-8 max-w-sm">You have no pending tasks. Enjoy your day or create a new task to get started.</p>
            <button 
              onClick={openCreateModal}
              className="text-[#63ba54] font-bold border-2 border-[#63ba54]/20 rounded-full px-8 py-3 hover:bg-[#63ba54] hover:text-white transition-all hover:shadow-lg hover:shadow-[#63ba54]/20"
            >
              Create your first task
            </button>
          </div>
        ) : (
          /* Task Grid/List */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={openEditModal} 
                onDelete={confirmDelete} 
              />
            ))}
          </div>
        )}

      </main>

      <TaskModal 
        isOpen={isModalOpen}
        mode={modalMode}
        initialTask={currentTask}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      <DeleteConfirmModal 
        task={taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />

    </div>
  );
}
