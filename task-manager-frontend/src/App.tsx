import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddTask from './pages/AddTask.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import TaskDisplay from './components/TasksDisplay.tsx';
import Home from './pages/Home.tsx';

const App: React.FC = () => {
  const token = localStorage.getItem('token'); // Check for authentication token

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Redirect root route to /tasks if logged in */}
       
        
        <Route 
          path="/home" 
          element={<Home></Home>}
        />
        <Route 
          path="/add-task" 
          element={<AddTask />} 
        />
         <Route 
          path="/" 
          element={token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
