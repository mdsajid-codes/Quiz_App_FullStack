import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface FormData {
  title: string;
  description: string;
  teacher_id: number;
}

const AddQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    teacher_id: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/dashboard/add", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response from backend: ", response.data);
      setSuccess("Quiz Added Successfully!");
      setTimeout(() => {
        navigate("/dashboard");
        setSuccess("");
      }, 1500);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Add Quiz</h1>
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-600 font-medium">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Title"
              autoComplete="off"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-600 font-medium">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="Description"
              autoComplete="off"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="teacher_id" className="block text-gray-600 font-medium">Teacher ID</label>
            <input
              type="number"
              name="teacher_id"
              onChange={handleChange}
              placeholder="Teacher ID"
              autoComplete="off"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;