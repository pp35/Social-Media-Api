import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../Api/Api';

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id} className="mb-4">
            <h3 className="font-semibold text-lg">{post.content}</h3>
            <p className="text-gray-600">Posted by: {post.user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
