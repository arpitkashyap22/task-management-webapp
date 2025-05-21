import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTaskById, updateTask } from '../services/taskApi';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskDisplay: React.FC<{ id: string }> = ({ id }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await fetchTaskById(id);
        setTask(taskData);
      } catch (err) {
        setError('Failed to fetch task details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Toggle task status (completed/incomplete)
  const toggleTaskStatus = async () => {
    if (task) {
      try {
        const updatedTask = await updateTask(id, { completed: !task.completed });
        setTask((prev) => (prev ? { ...prev, completed: updatedTask.completed } : prev));
      } catch (err) {
        setError('Failed to update task status.');
      }
    }
  };

  if (loading) {
    return <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="bg-white p-4 rounded-lg shadow-md text-red-500">{error}</div>;
  }

  if (!task) {
    return <div className="bg-white p-4 rounded-lg shadow-md text-gray-500">Task not found</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-4">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <span
          className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
            task.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          {task.completed ? 'Completed' : 'Incomplete'}
        </span>

        <div className="space-x-2">
          <button
            onClick={toggleTaskStatus}
            className={`px-3 py-1 rounded-md text-white text-sm ${
              task.completed ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>

          <button
            onClick={() => navigate(`/add-task?id=${id}`)}
            className="px-3 py-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDisplay;
