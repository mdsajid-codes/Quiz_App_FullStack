import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface User {
  id: number;
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and Password are required");
      setSuccess("");
      return;
    }

    // Validate Username and Password
    const user = users.find(
      (item) => item.username === username && item.password === password
    );

    if (user) {
      setSuccess("Login Successful!");
      setError("");
      localStorage.setItem("user", JSON.stringify(user));
      // Redirect to Dashboard after 1500ms
      setTimeout(()=>{
        navigate('/dashboard')
      }, 1500);
    } else {
      setError("Invalid Username or Password");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          
          <div>
            <label className="block text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="off"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="off"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
