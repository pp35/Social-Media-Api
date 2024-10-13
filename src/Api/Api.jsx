import axios from 'axios';

// Set the base URL to your backend (use the deployed URL if using Render)
const API = axios.create({ baseURL: 'https://social-media-backend-api-npkw.onrender.com/api' });

// Register User
export const registerUser = (userData) => API.post('/users/register', userData);

// Login User
export const loginUser = (loginData) => API.post('/users/login', loginData);

// Fetch Posts
export const fetchPosts = () => API.get('/posts');

// Create Post
export const createPost = (postData, token) => {
  return API.post('/posts', postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Like Post
export const likePost = (postId, token) => {
  return API.post(`/posts/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Send Friend Request
export const sendFriendRequest = (friendId) => API.post('/friends/send-friend-request', { friendId });

// Accept Friend Request
export const acceptFriendRequest = (requestId) => API.post('/friends/accept', { requestId });

// Reject Friend Request
export const rejectFriendRequest = (requestId) => API.post('/friends/reject', { requestId });

export default API;
