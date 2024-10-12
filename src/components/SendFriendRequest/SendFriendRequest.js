import React, { useState } from 'react';
import axios from 'axios';

const SendFriendRequest = () => {
  const [userId, setUserId] = useState('');

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        '/api/friends/send-friend-request',
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);
      setUserId(''); 
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'An error occurred';
      alert(errorMessage);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="mb-4 text-2xl font-semibold">Send Friend Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={handleInputChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
          Send Request
        </button>
      </form>
    </div>
  );
};

export default SendFriendRequest;
