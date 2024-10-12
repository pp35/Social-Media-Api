import React from 'react';

const RequestItem = ({ request, onAccept, onReject }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center">
      <p>{request.sender.username}</p>
      <div>
        <button
          onClick={() => onAccept(request._id)}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request._id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition ml-2"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestItem;
