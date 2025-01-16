import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Blog</h1>
        <Link to="/create" className="home-create-button">
          Create New Post
        </Link>
      </header>
      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              {Array.isArray(post.images) && post.images.length > 0 ? (
                <img
                  src={`http://localhost:5000/${post.images[0]}`}
                  alt="Post"
                  className="post-image"
                />
              ) : (
                <div className="post-placeholder">No Image Available</div>
              )}
              <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <Link to={`/post/${post._id}`} className="view-post-button">
                  View Post
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts-message">
            No posts available. Create a new one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
