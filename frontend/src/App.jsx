

import React, { useState } from 'react';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import CourseApp from './components/CourseApp';
import Courses from './components/Courses';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar Component */}
        <Navbar />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/CourseApp" element={<CourseApp />} />
        </Routes>
      </div>
    </Router>





  );
}

export default App; // <-- Export App as default
