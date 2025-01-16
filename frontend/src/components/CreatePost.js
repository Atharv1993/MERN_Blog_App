import React, { useState } from "react";
import axios from "axios";
import "./styles/CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      console.log(response.data);
      alert("Post created successfully!");
      window.location = "/";
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
