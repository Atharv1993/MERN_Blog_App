import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser(decodedToken);
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('token'); // Optionally clear invalid token
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const user = JSON.parse(atob(token.split('.')[1]));
      setUser(user);
    } catch (error) {
      console.error('Failed to decode token on login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
