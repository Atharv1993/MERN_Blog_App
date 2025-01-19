import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./styles/ViewPost.css";

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext); // Access the logged-in user's info

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-post/${id}`); // Redirect to the edit post page
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      alert("Post deleted successfully!");
      navigate("/"); // Redirect to the homepage after deletion
    } catch (error) {
      console.error(error);
      alert("Failed to delete the post");
    }
  };

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="view-post-container">
      <h1 className="view-post-title">{post.title}</h1>
      <div className="view-post-author">
        <strong>Author:</strong> {post.author}
      </div>
      <div className="view-post-image-container">
        {post.images && post.images.length > 0 && (
          <img
            src={`http://localhost:5000/${post.images[0]}`}
            alt="Post"
            className="view-post-image"
          />
        )}
      </div>
      <div className="view-post-content-container">
        <p className="view-post-content">{post.content}</p>
      </div>
      {user && user.username === post.author && ( // Show buttons only for the author
        <div className="view-post-actions">
          <button onClick={handleEdit} className="edit-button">
            Edit
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
