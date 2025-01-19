import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/EditPost.css";

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // For navigation after editing the post
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the post data
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setFormData({
          title: response.data.title,
          content: response.data.content,
          image: null, // Image remains unchanged unless the user uploads a new one
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const author = "currentUser"; // Replace with logic to get the logged-in user's username or ID
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      // data.append("author", author); // Add author for authorization
      if (formData.image) {
        data.append("image", formData.image);
      }

      // Send PUT request to update the post
      await axios.put(`http://localhost:5000/posts/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert('Post Edited successful');
      navigate(`/`); 
    } catch (err) {
      console.error(err);
      setError("Failed to update post. Please try again.");
    }
  };

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="edit-post-container">
      <h1 className="edit-post-title">Edit Post</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="title" >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="6"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">
            Update Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Update Post
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate(`/`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPost;
