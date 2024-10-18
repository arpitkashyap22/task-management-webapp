import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, 
});

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await apiClient.get(`/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch tasks:', error.response?.data || error.message);
    throw new Error('Failed to fetch tasks. Please try again.');
  }
};

// Delete a task
export const deleteTask = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    await apiClient.delete(`/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    console.error('Failed to delete task:', error.response?.data || error.message);
    throw new Error('Failed to delete task. Please try again.');
  }
};

// Create a new task
export const createTask = async (title: string, description: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await apiClient.post(`/api/tasks`, { title, description }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to create task:', error.response?.data || error.message);
    throw new Error('Failed to create task. Please try again.');
  }
};

// Fetch a task by its ID
export const fetchTaskById = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await apiClient.get(`/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch task:', error.response?.data || error.message);
    throw new Error('Failed to fetch task. Please try again.');
  }
};

// Update a task (status, title, or description)
export const updateTask = async (id: string, { title, description, completed }: { title?: string, description?: string, completed?: boolean }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await apiClient.put(`/api/tasks/${id}`, { title, description, completed }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to update task:', error.response?.data || error.message);
    throw new Error('Failed to update task. Please try again.');
  }
};
