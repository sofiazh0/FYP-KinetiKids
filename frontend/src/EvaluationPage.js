import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from './NavbarHome'; // Ensure correct path
import './EvaluationPage.css'; // Ensure you create this file
import quizImage from './assets/FYP-WEBSITE-ICONS (2).png'; // Replace with actual image path

const EvaluationPage = () => {
    const navigate = useNavigate();
  return (
    <div className="evaluation-page">
      {/* Navbar */}
      <NavbarHome />

      {/* Main Content */}
      <div className="evaluation-container">
        {/* Left Section: Text Content */}
        <div className="evaluation-left">
          <h1 className="evaluation-title">Ignite your curiosity!<br />Ready to shine?</h1>
          <p className="evaluation-subtitle">
            KinetiKids believes every little mind has great potential. Our evaluation mode is a 
            thrilling adventure through custom quizzes designed just for you! As you journey through 
            each test, you'll have the chance to show off what you've learned. Are you ready to make 
            your mark? Let's get started!
          </p>
          <div className="evaluation-buttons">
            <button className="evaluation-button" onClick={() => navigate('/quiz-preferences')}>
                Take a Quiz
            </button>
            <button className="instructions-button" onClick={() => navigate('/instructions')}>
                Instructions
            </button>
        </div>
          {/* <button className="evaluation-button">Take a Quiz</button> */}
        </div>

        {/* Right Section: Image */}
        <div className="evaluation-right">
          <img src={quizImage} alt="Student with 100 score" className="evaluation-image" />
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="evaluation-footer">
        <p>© 2024 KinetiKids</p>
        <div className="footer-social-icons">
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-x-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer> */}
    </div>
  );
};

export default EvaluationPage;
