import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/ViewPost.css";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="view-post-container">
      <h1 className="view-post-title">{post.title}</h1>
      <div className="view-post-image-container">
        <img
          src={`http://localhost:5000/${post.images[0]}`}
          alt="Post"
          className="view-post-image"
        />
      </div>
      <div className="view-post-content-container">
        <p className="view-post-content">{post.content}</p>
      </div>
    </div>
  );
};

export default ViewPost;
