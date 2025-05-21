import React, { useEffect, useState } from 'react';
import { deleteTask, fetchTasks, sendSummaryToSlack } from '../services/taskApi';
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
  const [summaryLoading, setSummaryLoading] = useState(false);

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

  // Handle sending summary to Slack
  const handleSendSummary = async () => {
    try {
      setSummaryLoading(true);
      const result = await sendSummaryToSlack();
      alert('Summary sent to Slack successfully!');
    } catch (error) {
      console.error('Error sending summary:', error);
      alert('Failed to send summary to Slack. Please try again.');
    } finally {
      setSummaryLoading(false);
    }
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
      <Header></Header>
      
      {/* Summary Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleSendSummary}
          disabled={summaryLoading}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            summaryLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {summaryLoading ? 'Sending...' : '📋 Send Summary to Slack'}
        </button>
      </div>

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
