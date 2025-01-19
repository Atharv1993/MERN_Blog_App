import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthContext';
import './styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      login(response.data.token);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Back Button */}
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" /> Back to Home
        </button>
        
        <h2>Login</h2>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-link">
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link-text">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
