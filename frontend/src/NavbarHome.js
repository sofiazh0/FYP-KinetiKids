import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import './NavbarHome.css';

function NavbarHome({ onSidebarToggle = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  const evaluationModePages = [
    '/evaluation',
    '/quiz-preferences',
    '/quiz-start',
    '/results',
    '/instructions',
    '/quizinstructions'
  ];

  const getInitialMode = () => {
    if (evaluationModePages.includes(location.pathname)) return 'Evaluation Mode';
    return localStorage.getItem('selectedMode') || 'User Mode';
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(getInitialMode());

  useEffect(() => {
    if (evaluationModePages.includes(location.pathname)) {
      setSelectedMode('Evaluation Mode');
      localStorage.setItem('selectedMode', 'Evaluation Mode');
    } else {
      setSelectedMode('User Mode');
      localStorage.setItem('selectedMode', 'User Mode');
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    onSidebarToggle(!isSidebarOpen);
    if (!isSidebarOpen) setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      setSidebarOpen(false);
      onSidebarToggle(false);
    }
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setDropdownOpen(false);
    localStorage.setItem('selectedMode', mode);
    if (mode === 'Evaluation Mode') {
      navigate('/evaluation');
    } else {
      navigate('/home');
    }
  };

  return (
    <nav className="navbar">
      <div className={`menu-icon ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>✕</button>
        <ul>
          <li><NavLink to="/about-us" activeClassName="active">About Us</NavLink></li>
          <li><NavLink to="/guardian-mode" activeClassName="active">Guardian Mode</NavLink></li>
          <li><NavLink to="/#" activeClassName="active">Log Out</NavLink></li>
        </ul>
      </div>

      <div className="dropdown">
        <button className={`dropdown-btn ${isDropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
          {selectedMode} <span className="dropdown-arrow">&#9660;</span>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <div className="dropdown-header">Select Mode</div>
            <ul className="dropdown-menu">
              <li onClick={() => handleModeSelect('User Mode')}>
                <div className={`dropdown-item ${selectedMode === 'User Mode' ? 'selected' : ''}`}>
                  <strong>User Mode</strong>
                  <p>Learning Playground</p>
                </div>
              </li>
              <li onClick={() => handleModeSelect('Evaluation Mode')}>
                <div className={`dropdown-item ${selectedMode === 'Evaluation Mode' ? 'selected' : ''}`}>
                  <strong>Evaluation Mode</strong>
                  <p>Take a Quiz</p>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>

      <ul className="nav-links">
        <NavLink to="/" className="navbar-logo">
          <img src={require("./assets/Logo-04.png")} alt="Logo" className="logo" />
        </NavLink>

        <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/courses" activeClassName="active">Courses</NavLink></li>
        <li><NavLink to="/services" activeClassName="active">Services</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavbarHome;
