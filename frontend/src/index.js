import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you are importing from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a React root
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
