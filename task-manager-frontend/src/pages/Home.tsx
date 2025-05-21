import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, fetchTasks } from '../services/taskApi';
import Header from '../components/Header';
import TaskDisplay from '../components/TasksDisplay';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


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
      <Header></Header>
      {/* Task List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskDisplay id={task.id}></TaskDisplay>
            // <TaskCard id={task.id} title={task.title} description={task.description} handleDelete={handleDelete} navigate={navigate} ></TaskCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
