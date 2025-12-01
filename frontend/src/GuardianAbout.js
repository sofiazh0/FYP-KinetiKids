import React from 'react';
import NavbarGuardian from './NavbarGuardian'; // Navbar specific to Guardian mode
import './GuardianAbout.css'; // Custom styles for Guardian About Us page

function GuardianAbout() {
  return (
    <div className="guardian-about-page">
      {/* Guardian Navbar */}
      <NavbarGuardian />

      {/* Main content */}
      <div className="about-container">
        {/* About Text Section */}
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            In today's fast-paced world, guardians often struggle to keep track of their child's
            academic progress and overall learning experience. KinetiKids aims to empower guardians
            by providing a secure and transparent platform where they can easily monitor their
            child's performance and ensure a balanced educational journey. With our progress tracking
            feature, the platform ensures that guardians are actively involved in their child's
            learning, fostering a collaborative environment for better educational outcomes.
            <br />
            <br />
            We believe education should be interactive and secure!
          </p>
        </div>

        {/* About Image Section */}
        <div className="about-image">
          <img src={require('./assets/Guardian About Us.png')} alt="About Us" />
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="about-footer">
        <p>© 2024 KinetiKids</p>
        <div className="footer-social-icons">
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer> */}
    </div>
  );
}

export default GuardianAbout;
