import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userApi';


const SignUp: React.FC = () => {
    const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await registerUser(name, email, password);
      navigate('/home');
    } catch (err) {
      setError('Email already exists. Please use a different email.');
      console.error('Error registering:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
	<div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Create your Account</h1>
		{error && (
			<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
				{error}
			</div>
		)}
		<form onSubmit={handleSubmit} className="login-form">
            <div className="mb-4">
				<label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
				<input type="text" id="name" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="John Doe"  onChange={(e) => setName(e.target.value)} required />
			</div>
			<div className="mb-4">
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
				<input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com"  onChange={(e) => setEmail(e.target.value)} required />
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
				<input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)} required />
				<a href="#"
					className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
					Password?</a>
			</div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					
				</div>
				<a onClick={() => navigate("/login")}
					className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">Already Have an Account? Login</a>
			</div>
			<button 
				type="submit" 
				disabled={loading}
				className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{loading ? 'Creating Account...' : 'Sign Up'}
			</button>
		</form>
	</div>
</div>
  );
};

export default SignUp;
