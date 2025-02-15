import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

interface FormData {
    title: string;
    description: string;
    teacher_id: number;
}

const UpdateQuiz: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<FormData>({ title: "", description: "", teacher_id: 0 });
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:4000/dashboard/${id}`)
            .then(response => {
                setFormData(response.data.quiz[0]);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching Quiz", err));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post(`http://localhost:4000/dashboard/update/${id}`, formData, {
            headers: { "Content-Type": "application/json" }
        })
            .then(() => {
                setSuccess("Quiz Updated Successfully!");
                setTimeout(() => {
                    navigate('/dashboard');
                    setSuccess("");
                }, 1500);
            })
            .catch(error => console.error("Error updating quiz:", error));
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-gray-600">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Update Quiz</h2>
                
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
                
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-gray-600" htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            autoComplete="off"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600" htmlFor="description">Description</label>
                        <input 
                            type="text" 
                            name="description" 
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            autoComplete="off"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600" htmlFor="teacher_id">Teacher Id</label>
                        <input 
                            type="number" 
                            name="teacher_id" 
                            value={formData.teacher_id}
                            onChange={handleChange}
                            placeholder="Teacher ID"
                            autoComplete="off"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateQuiz;
