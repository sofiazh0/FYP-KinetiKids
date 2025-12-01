import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavbarGuardian from './NavbarGuardian'; // Import the Guardian-specific Navbar
import Footer from './Footer'; // Import the Footer component
import './GuardianHome.css'; // Custom styles

function GuardianHome() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // React Router navigation hook

  // Function to toggle the sidebar state
  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className={`guardian-home ${isSidebarOpen ? 'sidebar-active' : ''}`}>
      {/* Navbar with Sidebar toggle functionality */}
      <NavbarGuardian onSidebarToggle={handleSidebarToggle} />

      {/* Main Section for the Guardian homepage content */}
      <div className="guardian-container">
        <div className="guardian-left">
          <h1 className="guardian-title" style={{ fontFamily: 'Montserrat, sans-serif', color: '#2b6599', fontSize: '50px', fontWeight: '5000' }}>Ensuring Secure 
            Learning</h1>
          <p className="guardian-subtitle" style={{ fontFamily: 'Montserrat, sans-serif',color: '#388e3c', fontSize: '15px' }}>
            We aim to create a safe learning environment for guardians to track and support student progress.
          </p>
          {/* Updated Button to Navigate to About Us Page */}
          <button className="guardian-button" style={{ backgroundColor: '#388e3c' }} onClick={() => navigate('/guardian-about')}>
            About Us
          </button>
        </div>
        <div className="guardian-right">
          <img src={require('./assets/guardian-home.png')} alt="Guardian" className="guardian-image" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GuardianHome;
