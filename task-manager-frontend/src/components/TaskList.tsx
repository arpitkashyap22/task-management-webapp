import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, fetchTasks } from '../services/taskApi';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const taskData = await fetchTasks();
        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllTasks();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token or any other authentication data
    navigate('/login');  // Redirect to login page
  };

  // Delete task handler
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header with Logout and Add Task buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
        <div>
          <button
            onClick={() => navigate('/add-task')}
            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/tasks/${task.id}`)}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
