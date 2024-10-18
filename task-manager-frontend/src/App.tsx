import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList.tsx';
import AddTask from './components/AddTask.tsx';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import TaskDisplay from './components/TasksDisplay.tsx';

const App: React.FC = () => {
  const token = localStorage.getItem('token'); // Check for authentication token

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Redirect root route to /tasks if logged in */}
        <Route 
          path="/" 
          element={token ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />} 
        />
        
        <Route 
          path="/tasks" 
          element={token ? <TaskList /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/add-task" 
          element={token ? <AddTask /> : <Navigate to="/login" replace />} 
        />
        <Route path="/tasks/:id"  element={token ? <TaskDisplay/> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
