// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import User from './pages/User';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" component={<Admin/>} />
          <Route path="/user" component={<User/>} />
        </Routes>
    </Router>
  );
}

export default App;
