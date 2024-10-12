import React from 'react';
import SendFriendRequest from '../SendFriendRequest/SendFriendRequest';
import FriendRequests from '../FriendRequest/FriendRequests';

const FriendsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      <SendFriendRequest/>
<FriendRequests/>
    </div>
  );
};

export default FriendsPage;
