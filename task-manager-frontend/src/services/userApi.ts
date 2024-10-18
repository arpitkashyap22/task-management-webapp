import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, 
});

export const loginUser = async (email: string, password: string) => {
    try {
      console.log('Logging in with:', { email}); // Log request data
      const response = await apiClient.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save token to local storage
      return response.data;
    } catch (error : any) {
      console.error('Login failed:', error.response?.data || error.message);
      throw new Error('Login failed. Please check your credentials.');
    }
  };
  

export const registerUser = async (name: string ,email: string, password: string) => {
  try {
    
    const response = await apiClient.post('/api/auth/register', {name, email, password });
    localStorage.setItem('token', response.data.token); // Save token to local storage
    
  } catch (error : any) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw new Error('Registration failed. Please try again.');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove token from local storage
};

