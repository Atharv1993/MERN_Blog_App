import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import Login from './components/Login';
import Signup from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute'; // Guarded route

const App = () => {
  const location = useLocation(); // Get current route location

  // Check if the current route is login or signup
  const excludeNavbar = ['/login', '/signup'].includes(location.pathname);

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!excludeNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
};

export default App;
