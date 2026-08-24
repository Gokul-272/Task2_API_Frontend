import api from './axios';
import { CreateTaskData, UpdateTaskData } from '../types/task';

export const getTasks = (page: number = 1, limit: number = 10, status: string = 'all') => {
  let url = `/tasks?page=${page}&limit=${limit}`;
  if (status !== 'all') {
    url += `&status=${status}`;
  }
  return api.get(url);
};

export const getTask = (id: string) => api.get(`/tasks/${id}`);

export const createTask = (data: CreateTaskData) => api.post('/tasks', data);

export const updateTask = (id: string, data: UpdateTaskData) => api.put(`/tasks/${id}`, data);

export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
