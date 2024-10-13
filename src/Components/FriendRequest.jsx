import React, { useState } from 'react';
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest } from '../Api/Api';

const FriendRequest = () => {
  const [friendId, setFriendId] = useState('');
  const [requestId, setRequestId] = useState('');

  const handleSendRequest = async () => {
    try {
      const response = await sendFriendRequest(friendId);
      alert('Friend request sent!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error sending friend request.');
    }
  };

  const handleAcceptRequest = async () => {
    try {
      const response = await acceptFriendRequest(requestId);
      alert('Friend request accepted!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error accepting friend request.');
    }
  };

  const handleRejectRequest = async () => {
    try {
      const response = await rejectFriendRequest(requestId);
      alert('Friend request rejected!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error rejecting friend request.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Friend Requests</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Friend ID"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mb-4"
        />
        <button onClick={handleSendRequest} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send Friend Request
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mb-4"
        />
        <button onClick={handleAcceptRequest} className="bg-green-500 text-white px-4 py-2 rounded mr-4">
          Accept Friend Request
        </button>
        <button onClick={handleRejectRequest} className="bg-red-500 text-white px-4 py-2 rounded">
          Reject Friend Request
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
