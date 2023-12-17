import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Search from './components/Search';
import About from './components/About';
import Play from './components/Play';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about/:platform/:game" element={<About />} />
        <Route path="/play/:platform/:game" element={<Play />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
