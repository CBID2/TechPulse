import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">TechPulse</Link>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="#" onClick={() => setIsOpen(false)}>World</Link>
          <Link to="#" onClick={() => setIsOpen(false)}>Politics</Link>
          <Link to="#" onClick={() => setIsOpen(false)}>Sports</Link>
          <Link to="#" onClick={() => setIsOpen(false)}>Technology</Link>
          <Link to="/bookmarks" className="bookmark-link" onClick={() => setIsOpen(false)}>Bookmarks</Link> 
        </div>

        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
