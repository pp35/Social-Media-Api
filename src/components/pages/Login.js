import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://social-media-backend-api-npkw.onrender.com/api/users/login', formData); 
      alert(res.data.message);
      localStorage.setItem('token', res.data.token); 
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'An error occurred';
      alert(errorMessage); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
          Login
        </button>
      </form>
      <Link to="/register" className="mt-4 text-blue-600 hover:underline">
        Don't have an account? Register here.
      </Link>
    </div>
  );
};

export default Login;
