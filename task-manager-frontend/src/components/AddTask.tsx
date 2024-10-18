import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskApi"; // Assuming createTask is the API function to add tasks

const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    setLoading(true);

    try {
      await createTask(title, description );
      navigate("/tasks"); // Redirect to task list after adding the task
    } catch (error) {
      console.error("Error creating task:", error);
      alert("There was an error adding the task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
      <div className="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
        <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">ADD TASK</h1>
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
              {loading ? "Adding Task..." : "ADD TASK"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
