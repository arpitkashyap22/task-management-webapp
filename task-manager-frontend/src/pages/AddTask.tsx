import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createTask, fetchTaskById, updateTask } from "../services/taskApi";

const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (taskId) {
        try {
          const task = await fetchTaskById(taskId);
          setTitle(task.title);
          setDescription(task.description);
        } catch (error) {
          console.error("Error loading task:", error);
          alert("Failed to load task details");
        }
      }
    };
    loadTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    setLoading(true);

    try {
      if (taskId) {
        await updateTask(taskId, { title, description });
      } else {
        await createTask(title, description);
      }
      navigate("/home");
    } catch (error) {
      console.error("Error saving task:", error);
      alert("There was an error saving the task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
      <div className="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
        <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
          {taskId ? "UPDATE TASK" : "ADD TASK"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="text-lx font-serif">
                Title:
              </label>
              <input
                type="text"
                placeholder="Enter task title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-2 text-lg font-serif">
                Description:
              </label>
              <textarea
                id="description"
                cols={30}
                rows={10}
                placeholder="Write task description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full font-serif p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
              disabled={loading}
            >
              {loading ? "Saving..." : taskId ? "UPDATE TASK" : "ADD TASK"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
