import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import "./GuardianModePage.css"; // Import CSS for styling
import { Link } from "react-router-dom";

const GuardianModePage = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="guardian-mode-page">
      {/* Navbar */}
      <Navbar />

      {/* Animated background elements - Same as landing page */}
      <div className="guardian-mode-deco1"></div>
      <div className="guardian-mode-deco2"></div>
      <div className="shape-triangle2"></div>
      <div className="shape-square1"></div>
      <div className="shape-square2"></div>

      {/* Floating icons - similar to landing page */}
      <div className="floating-icons">
        <div className="floating-icon icon1">🧸</div>
        <div className="floating-icon icon2">👩‍👧‍👦</div>
        <div className="floating-icon icon3">🎨</div>
        <div className="floating-icon icon4">🧩</div>
      </div>

      {/* Main Content */}
      <div className="guardian-mode-container">
        {/* Login/Signup Card - Guardian Access */}
        <div className="guardian-mode-left">
          <div className="icon-container">
            <span role="img" aria-label="teddy-bear">
              🧸
            </span>
          </div>
          <h2>Guardian Access</h2>
          <p>Already have a guardian account?</p>
          <div className="button-container">
            <button
              className="login-button"
              onClick={() => navigate("/logincopy")}
            >
              Login
            </button>
          </div>
          <p className="option-text">Access your guardian dashboard.</p>
        </div>

        {/* Guardian Mode Card */}
        <div className="guardian-mode-right">
          <div className="icon-container">
            <span role="img" aria-label="family">
              👩‍👧‍👦
            </span>
          </div>
          <h2>Guardian Mode</h2>
          <p>Monitor progress and guide learning.</p>
          <div className="button-container">
            <button
              className="guardian-mode-button"
              onClick={() => navigate("/guardian-signup")}
            >
              Get Started
            </button>
          </div>
          <p className="guardian-mode-text">
            Not a Guardian? Switch to{" "}
            <Link to="/student-mode" className="student-link">
              Student Mode
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuardianModePage;
