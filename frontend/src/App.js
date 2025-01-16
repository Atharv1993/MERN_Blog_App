import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<ViewPost />} />
      </Routes>
    </div>
  );
};

export default App;
