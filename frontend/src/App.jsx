// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Users/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

