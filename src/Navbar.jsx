import React, { useState } from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">TechPulse</Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="#">World</Link>
          <Link to="#">Politics</Link>
          <Link to="#">Sports</Link>
          <Link to="#">Technology</Link>
          <Link to="/bookmarks" className="bookmark-link">Bookmarks</Link> 
        </div>

        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <Link to="#">Home</Link>
          <Link to="#">World</Link>
          <Link to="#">Politics</Link>
          <Link to="#">Sports</Link>
          <Link to="#">Technology</Link>
          <Link to="/bookmarks" className="bookmark-link">Bookmarks</Link> 
        </div>
      )}
    </nav>
  );
};

export default Navbar;