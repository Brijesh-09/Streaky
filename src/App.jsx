import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import Profile from './components/profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
