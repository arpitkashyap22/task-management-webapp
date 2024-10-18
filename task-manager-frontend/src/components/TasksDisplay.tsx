import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById, updateTask } from '../services/taskApi';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskDisplay: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>(); // Specify that id can be undefined
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      if (id) { // Ensure id is defined before fetching
        try {
          const taskData = await fetchTaskById(id);
          setTask(taskData);
        } catch (err) {
          setError('Failed to fetch task details.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Invalid task ID.');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Toggle task status (completed/incomplete)
  const toggleTaskStatus = async () => {
    if (task) {
      try {
        const updatedTask = await updateTask(id!, { completed: !task.completed }); // Use non-null assertion
        setTask((prev) => (prev ? { ...prev, completed: updatedTask.completed } : prev));
      } catch (err) {
        setError('Failed to update task status.');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading task details...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!task) {
    return <div className="text-center py-20 text-gray-500">Task not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
        <p className="text-gray-600 mt-2">{task.description}</p>
        <div className="mt-4">
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
              task.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
            }`}
          >
            {task.completed ? 'Completed' : 'Incomplete'}
          </span>
        </div>

        {/* Toggle Status Button */}
        <button
          onClick={toggleTaskStatus}
          className={`mt-4 px-4 py-2 rounded-md text-white ${
            task.completed ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
        </button>

        {/* Back to Task List Button */}
        <button
          onClick={() => navigate('/tasks')}
          className="mt-4 ml-4 px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
        >
          Back to Task List
        </button>
      </div>
    </div>
  );
};

export default TaskDisplay;
