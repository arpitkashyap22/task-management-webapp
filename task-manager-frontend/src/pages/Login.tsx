import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userApi';


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('your@email.com');
  const [password, setPassword] = useState<string>('your@email.com');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await loginUser(email, password);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
	<div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
		
		{/* Demo Credentials Message */}
		<div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded">
			<p className="text-sm font-medium">Demo Credentials:</p>
			<p className="text-sm">Email: your@email.com</p>
			<p className="text-sm">Password: your@email.com</p>
			<p className="text-xs mt-1 text-blue-600">Note: For Slack integration, update the webhook URL in backend .env file</p>
		</div>

		{error && (
			<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
				{error}
			</div>
		)}
		<form onSubmit={handleSubmit} className="login-form">
			<div className="mb-4">
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
				<input 
					type="email" 
					id="email" 
					className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
					placeholder="Enter your email" 
					value={email}
					onChange={(e) => setEmail(e.target.value)} 
					required 
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
				<input 
					type="password" 
					id="password" 
					className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
					placeholder="Enter your password" 
					value={password}
					onChange={(e) => setPassword(e.target.value)} 
					required 
				/>
				<a href="#"
					className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
					Password?</a>
			</div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					<input 
						type="checkbox" 
						id="remember" 
						className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none cursor-pointer" 
						checked={rememberMe}
						onChange={toggleRememberMe}
					/>
					<label 
						htmlFor="remember" 
						className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
						onClick={toggleRememberMe}
					>
						Remember me
					</label>
				</div>
				<a onClick={() => navigate("/signup")}
					className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">Create
					Account</a>
			</div>
			<button 
				type="submit" 
				disabled={loading}
				className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{loading ? 'Logging in...' : 'Login'}
			</button>
		</form>
	</div>
</div>
  );
};

export default Login;
