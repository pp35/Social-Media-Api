import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestItem from './RequestItem';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/friends/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    const token = localStorage.getItem('token');
    await axios.post(
      '/api/friends/accept-friend-request',
      { requestId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setRequests(requests.filter((req) => req._id !== requestId));
  };

  const handleReject = async (requestId) => {
    const token = localStorage.getItem('token');
    await axios.post(
      '/api/friends/reject-friend-request',
      { requestId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setRequests(requests.filter((req) => req._id !== requestId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Friend Requests</h1>
      {requests.length > 0 ? (
        requests.map((request) => (
          <RequestItem
            key={request._id}
            request={request}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))
      ) : (
        <p className="text-gray-500">No friend requests</p>
      )}
    </div>
  );
};

export default FriendRequests;
