import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import NavbarHome from './NavbarHome'; // Import the NavbarHome component
import './ServicesPage.css'; // Import your CSS styles

const ServicesPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="services-page">
      {/* Include the NavbarHome */}
      <NavbarHome />

      {/* Main Content */}
      <div className="services-container">
        {/* Header Section */}
        <header className="services-header">
          <h1>Our Services</h1>
        </header>

        {/* Content Section */}
        <div className="services-content">
          {/* Left Section with Image */}
          <div className="services-image">
            <img src={require('./assets/services-img.jpg')} alt="Services Illustration" />
          </div>

          {/* Right Section with Service Cards */}
          <div className="services-cards">
            {/* Service Card 1: Q&A */}
            <div className="service-card" onClick={() => navigate('/qa')}>
              <img src={require('./assets/services-qa-icon.png')} alt="QA Service" />
              <h3>Q&A</h3>
              <p>Ask questions from the uploaded text or document.</p>
            </div>

            {/* Service Card 2: Video Questions */}
            <div className="service-card" onClick={() => navigate('/video-questions')}>
              <img src={require('./assets/services-visual-icon.png')} alt="Video QA Service" />
              <h3>Video Questions</h3>
              <p>Ask questions from the uploaded image or video.</p>
            </div>

            {/* Service Card 3: Evaluation Mode */}
            <div className="service-card" onClick={() => navigate('/evaluation')}>
              <img src={require('./assets/services-eval-icon.png')} alt="Evaluation Service" />
              <h3>Evaluation Mode</h3>
              <p>Enter into evaluation mode to monitor your progress.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="services-footer">
        <p>© 2024 KinetiKids</p>
      </footer> */}
    </div>
  );
};

export default ServicesPage;
