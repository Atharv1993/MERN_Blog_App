import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Signup.css'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:5000/auth/signup', {
        username,
        email,
        password,
      });
      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        

        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn-signup">
            Sign Up
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="login-link">
          Already have an account?{' '}
          <Link to="/login" className="login-link-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
