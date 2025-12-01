import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './NavbarGuardian.css';

function NavbarGuardian() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="guardian-navbar">
      {/* Hamburger Menu Icon */}
      <div className="guardian-menu-icon" onClick={toggleSidebar}>
        <div className={`guardian-menu-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`guardian-menu-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`guardian-menu-bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      {/* Logo */}
      <Link to="/guardian" className="guardian-navbar-logo">
        <img src={require("./assets/Logo-04.png")} alt="Logo" className="guardian-logo" />
      </Link>

      {/* Navigation Links */}
      <ul className="guardian-nav-links">
        <li><Link to="/guardian">Home</Link></li>
        <li><Link to="/students-guardian">Students</Link></li>
      </ul>

      {/* Sidebar */}
      <div className={`guardian-sidebar ${isOpen ? 'active' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>✕</button>
        <ul>
          <li><Link to="/guardian-about" onClick={toggleSidebar}>About Us</Link></li>
          <li><Link to="/student-mode" onClick={toggleSidebar}>Student Mode</Link></li>
          <li><Link to="/#" onClick={toggleSidebar}>Log Out</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarGuardian;
