import { updateTask } from "../services/taskApi";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  handleDelete: (id: string) => void;
  navigate: (path: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  id, 
  title, 
  description, 
  completed,
  handleDelete, 
  navigate 
}) => {
  const handleStatusUpdate = async () => {
    try {
      await updateTask(id, { completed: !completed });
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  return (
    <div
      key={id}
      className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span
          className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
            completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          {completed ? 'Completed' : 'Incomplete'}
        </span>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => handleDelete(id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
          <button
            onClick={handleStatusUpdate}
            className={`px-3 py-1 rounded-md text-white ${
              completed ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {completed ? 'Mark as Incomplete' : 'Mark as Completed'}
          </button>
        </div>
        <button
          onClick={() => navigate(`/tasks/${id}`)}
          className="text-blue-500 hover:underline"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;