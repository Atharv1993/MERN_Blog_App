import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./styles/Home.css";

const Home = () => {
  const { user } = useContext(AuthContext); // Use AuthContext for authentication
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showUserPosts, setShowUserPosts] = useState(false); // Slider state

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

  // Filter posts based on slider toggle
  useEffect(() => {
    if (showUserPosts && user) {
      setFilteredPosts(posts.filter((post) => post.author === user.username));
    } else {
      setFilteredPosts(posts);
    }
  }, [showUserPosts, posts, user]);

  return (
    <div className="home-container">
      {user && (
  <div className="toggle-container">
    <label htmlFor="post-toggle" className="custom-toggle-label">
      <input
        type="checkbox"
        id="post-toggle"
        className="custom-post-toggle"
        checked={showUserPosts}
        onChange={() => setShowUserPosts((prev) => !prev)}
      />
      <span className="custom-slider">
        <span className="custom-text">
          {showUserPosts ? "My Posts" : "All Posts"}
        </span>
      </span>
    </label>
  </div>
)}


      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post._id} className="post-card">
              {Array.isArray(post.images) && post.images.length > 0 && (
                <img
                  src={`http://localhost:5000/${post.images[0]}`}
                  alt="Post"
                  className="post-image"
                />
              )}
              <div className="post-details">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">{post.content}</p>
                {post.author && (
                  <p className="post-author">
                    <strong>Author:</strong> {post.author}
                  </p>
                )}
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
