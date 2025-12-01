import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Paths where the navbar should be hidden
  const hiddenPaths = []; // Removed "#/login" to show navbar on login page

  useEffect(() => {
    const checkPath = () => {
      const currentPath = window.location.hash; // Get the current hash route
      setIsHidden(hiddenPaths.includes(currentPath));
    };

    checkPath(); // Run on mount
    window.addEventListener("hashchange", checkPath); // Listen for hash changes

    return () => {
      window.removeEventListener("hashchange", checkPath);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Do not render the navbar if it should be hidden
  if (isHidden) return null;

  return (
    <nav className="navbar">
      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <div className={`menu-bar ${isOpen ? "open" : ""}`}></div>
        <div className={`menu-bar ${isOpen ? "open" : ""}`}></div>
        <div className={`menu-bar ${isOpen ? "open" : ""}`}></div>
      </div>

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img
          src={require("./assets/Logo-04.png")}
          alt="Logo"
          className="logo"
        />
      </Link>

      {/* <div className="navbar-logo">
        <img src={require("./assets/Logo-04.png")} alt="Logo" className="logo" />
      </div> */}

      {/* Links */}
      {/* <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><a href="#services">Services</a></li>
      </ul> */}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ✕
        </button>
        <ul>
          <li>
            <a href="#logincopy" onClick={() => setIsOpen(false)}>
              Guardian Login
            </a>
          </li>
          <li>
            <a href="#login" onClick={() => setIsOpen(false)}>
              Student Login
            </a>
          </li>
          {/* <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
