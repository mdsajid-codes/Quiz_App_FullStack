import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Quiz {
    id: number;
    title: string;
    description: string;
    teacher_id: number;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [quizList, setQuizList] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const URL = "http://localhost:4000/dashboard";

    useEffect(() => {
        // Get logged-in user
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/"); // Redirect if not logged in
            return;
        }

        // Fetch quizzes created by teacher    
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setQuizList(data.datas);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error Fetching quizzes: ", err);
                setIsLoading(false);
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleAdd = () => {
        navigate('/dashboard/addquiz');
    };

    const handleEdit = (id: number) => {
        navigate(`/dashboard/update/${id}`)
    };

    const handleDelete = async (id: number) => {
        try{
            const response = await fetch(`${URL}/delete/${id}`, {
                method: "DELETE",   
            });
            if(response.ok){
                setQuizList(quizList.filter((quiz)=> quiz.id !== id));
                alert("Quiz deleted Successfully!")
            } else {
                alert("Failed to delete the quiz. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting quiz:", error);
            alert("Error deleting quiz. Please check the console for details.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-center sm:text-left">Teacher Dashboard</h1>
                    <div className="mt-2 sm:mt-0 space-x-2 flex">
                        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full sm:w-auto">Add Quiz</button>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full sm:w-auto">Logout</button>
                    </div>
                </div>
                <h2 className="text-lg font-semibold mb-2 text-center sm:text-left">Your Quizzes</h2>
                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : quizList.length === 0 ? (
                    <p className="text-gray-500 text-center">No quizzes created yet.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {quizList.map((item) => (
                            <li key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col">
                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <button onClick={() => handleEdit(item.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
