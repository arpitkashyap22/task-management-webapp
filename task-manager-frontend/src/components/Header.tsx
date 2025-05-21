import { useNavigate } from "react-router-dom";

const Header: React.FC=() => {
    const navigate = useNavigate();

      // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token or any other authentication data
    navigate('/login');  // Redirect to login page
  };
    
    return <>
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
        </>
}

export default Header;