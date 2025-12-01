import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import "./StudentModePage.css"; // Import CSS for styling
import { Link } from "react-router-dom";

const StudentModePage = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="student-mode-page">
      {/* Navbar */}
      <Navbar />

      {/* Animated background elements - Same as landing page */}
      <div className="student-mode-deco1"></div>
      <div className="student-mode-deco2"></div>
      <div className="shape-triangle2"></div>
      <div className="shape-square1"></div>
      <div className="shape-square2"></div>

      {/* Floating icons - similar to landing page */}
      <div className="floating-icons">
        <div className="floating-icon icon1">👨‍🎓</div>
        <div className="floating-icon icon2">🎒</div>
        <div className="floating-icon icon3">📚</div>
        <div className="floating-icon icon4">✏️</div>
      </div>

      {/* Main Content */}
      <div className="student-mode-container">
        {/* Student Mode Card - Landing page style */}
        <div className="student-mode-left">
          <div className="icon-container">
            <span role="img" aria-label="student">
              👨‍🎓
            </span>
          </div>
          <h2>Student Mode</h2>
          <p>Fun learning adventures await!</p>
          <div className="button-container">
            <button
              className="student-mode-button"
              onClick={() => navigate("/student-signup")}
            >
              Get Started
            </button>
          </div>
          <p className="student-mode-text">
            Not a Student? Switch to{" "}
            <Link to="/guardian-mode" className="guardian-link">
              Guardian Mode
            </Link>{" "}
            to continue
          </p>
        </div>

        {/* Login/Signup Card - Landing page style */}
        <div className="student-mode-right">
          <div className="icon-container">
            <span role="img" aria-label="backpack">
              🎒
            </span>
          </div>
          <h2>Student Access</h2>
          <p>Already have a student account?</p>

          <div className="button-container">
            <button
              className="student-access-signup-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          <p className="option-text">Access your student dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentModePage;
