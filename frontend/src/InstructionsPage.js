import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from './NavbarHome';
import './InstructionsPage.css';

const InstructionsPage = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false); // ✅ Checkbox state

  return (
    <div className="instructions-page">
      <NavbarHome />

      <div className="instructions-container">
        <h1 className="instructions-title">Instructions</h1>

        {/* ✅ Instructions List */}
        <ul className="instructions-list">
          <li>
            <span className="icon">👨‍👩‍👧</span>
            <div>
              <strong>Parental Guidance:</strong>
              <ul>
                <li>This AI agent does its best but can sometimes make mistakes. Parents should supervise.</li>
                <li>You and your parent must agree to our Terms and Conditions before starting the quiz.</li>
              </ul>
            </div>
          </li>

          <li>
            <span className="icon">📖</span>
            <div>
              <strong>Understanding the Quiz Format:</strong>
              <ul>
                <li>Questions are multiple-choice (MCQs) generated from the document you provided.</li>
                <li>Each question has four options to choose from.</li>
              </ul>
            </div>
          </li>

          <li>
            <span className="icon">⏰</span>
            <div>
              <strong>Time Restrictions:</strong>
              <ul>
                <li>Keep an eye on the clock! Each quiz has a time limit.</li>
                <li>The quiz will end automatically when the time is up.</li>
              </ul>
            </div>
          </li>

          <li>
            <span className="icon">❓</span>
            <div>
              <strong>Choosing Your Answers:</strong>
              <ul>
                <li>Select the option that you think is correct.</li>
                <li>If unsure, take your best guess. It’s about learning!</li>
              </ul>
            </div>
          </li>

          <li>
            <span className="icon">🔀</span>
            <div>
              <strong>Navigating Through the Quiz:</strong>
              <ul>
                <li>Use the ‘Next’ button to proceed to the next question.</li>
                <li>Click ‘Back’ to review any answers.</li>
              </ul>
            </div>
          </li>

          <li>
            <span className="icon">✅</span>
            <div>
              <strong>Completing the Quiz:</strong>
              <ul>
                <li>You can only submit once all questions have been answered.</li>
                <li>Press 'Submit' to finalize your answers and end the quiz.</li>
              </ul>
            </div>
          </li>

          <li>
            <span className="icon">🆘</span>
            <div>
              <strong>Asking for Help:</strong>
              <ul>
                <li>If stuck, ask a grown-up for help.</li>
                <li>It’s a great way to learn together!</li>
              </ul>
            </div>
          </li>
        </ul>

        {/* ✅ Checkbox for Terms & Conditions */}
        <div className="terms-container">
          <input 
            type="checkbox" 
            id="terms-checkbox" 
            checked={isChecked} 
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="terms-checkbox" className="terms-label">
            I agree to the <span className="highlight">terms and conditions</span>
          </label>
        </div>

        {/* ✅ Updated Buttons */}
        <div className="instructions-buttons">
          <button className="instructions-back-button" onClick={() => navigate('/evaluation')}>Go Back</button>
          <button 
            className="instructions-start-button" 
            onClick={() => navigate('/quiz-start')} 
            disabled={!isChecked}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
