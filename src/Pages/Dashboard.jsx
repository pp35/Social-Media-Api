import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, createPost, likePost, fetchUserInfo, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } from '../Api/Api'; 
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserInfo(token);
      fetchAllPosts(token);
      fetchFriendRequests(token); 
      fetchFriends(token); 
    }
  }, [navigate]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(`https://social-media-backend-api-npkw.onrender.com/api/users/me`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch user info');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPosts = async (token) => {
    try {
      const response = await fetch(`https://social-media-backend-api-npkw.onrender.com/api/posts`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error('Failed to fetch posts');
      const postsData = await response.json();
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createNewPost = async (token) => {
    try {
      const response = await createPost({ content: newPostContent }, token);
      if (response.status === 201) {
        setPosts([response.data, ...posts]); 
        setNewPostContent(''); 
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const likeUserPost = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      await likePost(postId, token);
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const fetchFriendRequests = async (token) => {
    try {
      const response = await fetch(`https://social-media-backend-api-npkw.onrender.com/api/friends/requests`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch friend requests');
      const requestsData = await response.json();
      setFriendRequests(requestsData);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const fetchFriends = async (token) => {
    try {
      const response = await fetch(`https://social-media-backend-api-npkw.onrender.com/api/friends`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch friends');
      const friendsData = await response.json();
      setFriendsList(friendsData);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleSendFriendRequest = async (friendId) => {
    const token = localStorage.getItem('token');
    try {
      await sendFriendRequest(friendId, token);
      alert(`Friend request sent to user with ID: ${friendId}`);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleAcceptFriendRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    try {
      await acceptFriendRequest(requestId, token);
      setFriendRequests(friendRequests.filter(req => req._id !== requestId));
      alert('Friend request accepted');
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectFriendRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    try {
      await rejectFriendRequest(requestId, token);
      setFriendRequests(friendRequests.filter(req => req._id !== requestId));
      alert('Friend request rejected');
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      
      {loading ? (
        <p>Loading user information...</p>
      ) : user ? (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>
          <p className="text-gray-600">Here’s an overview of your activity:</p>
        </div>
      ) : (
        <p>No user information available.</p>
      )}

    
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="What's on your mind?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button
          onClick={() => createNewPost(localStorage.getItem('token'))}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </div>

    
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      {posts.length ? (
        posts.map(post => (
          <div key={post._id} className="mb-4 p-4 bg-white rounded shadow">
            <p>{post.content}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => likeUserPost(post._id)}
                className="text-blue-500 hover:underline"
              >
                Like ({post.likes})
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}

      <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
      {friendRequests.length ? (
        friendRequests.map(request => (
          <div key={request._id} className="flex justify-between p-2 bg-white rounded shadow mb-2">
            <span>{request.sender.name}</span>
            <div>
              <button
                onClick={() => handleAcceptFriendRequest(request._id)}
                className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 mr-2"
              >
                Accept
              </button>
              <button
                onClick={() => handleRejectFriendRequest(request._id)}
                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No friend requests available.</p>
      )}

      
      <h2 className="text-xl font-semibold mb-4">Friends</h2>
      {friendsList.length ? (
        friendsList.map(friend => (
          <div key={friend._id} className="flex justify-between p-2 bg-white rounded shadow mb-2">
            <span>{friend.name}</span>
            <button
              onClick={() => handleSendFriendRequest(friend._id)}
              className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Send Request
            </button>
          </div>
        ))
      ) : (
        <p>No friends available.</p>
      )}

      
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
