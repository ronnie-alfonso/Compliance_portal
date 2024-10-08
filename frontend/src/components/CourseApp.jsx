import React from 'react';
import { Link } from 'react-router-dom';


function CourseApp() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-link">CourseApp</Link>
      </div>
      <nav className="navbar-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/courses" className="nav-link">Courses</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <span className="profile-icon">P</span>
      </nav>
    </header>
  );
}

export default CourseApp;
