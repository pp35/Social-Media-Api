import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Social Media App</h1>
        <p className="text-lg text-gray-600 mb-6">Connect with friends, share posts, and manage your social network easily.</p>
        <div>
          <Link to="/register" className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-4">
            Register
          </Link>
          <Link to="/login" className="bg-green-500 text-white px-6 py-2 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
