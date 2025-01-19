import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthContext';
import './styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('You have logged out successfully');
    navigate('/'); // Redirect to Home page
  };

  return (
    <nav className="navbar">
      {/* Left Section: Home Icon and App Name */}
      <div className="navbar-left">
        <Link to="/" className="navbar-home">
          <FontAwesomeIcon icon={faHome} className="home-icon" />
          <span className="app-name">Blog App</span>
        </Link>
      </div>

      {/* Right Section: Links */}
      <div className="navbar-links">
        <Link to="/create" className="navbar-link">
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Create Post
        </Link>

        {/* Conditionally render the Logout button if user is logged in */}
        {user && (
          <button onClick={handleLogout} className="navbar-logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
