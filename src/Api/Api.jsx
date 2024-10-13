import axios from 'axios';


const API = axios.create({ baseURL: 'https://social-media-backend-api-npkw.onrender.com/api' });


export const registerUser = (userData) => API.post('/users/register', userData);


export const loginUser = (loginData) => API.post('/users/login', loginData);


export const fetchPosts = () => API.get('/posts');


export const createPost = (postData, token) => {
  return API.post('/posts', postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const likePost = (postId, token) => {
  return API.post(`/posts/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const sendFriendRequest = (friendId) => API.post('/friends/send-friend-request', { friendId });


export const acceptFriendRequest = (requestId) => API.post('/friends/accept', { requestId });


export const rejectFriendRequest = (requestId) => API.post('/friends/reject', { requestId });

export default API;
