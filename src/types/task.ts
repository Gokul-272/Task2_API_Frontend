export type TaskStatus = "todo" | "inprogress" | "completed";

export interface Task {
  _id: string;
  title: string;
  description: string;
  userId: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedTasksResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
