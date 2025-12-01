import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./StudentSignupPage.css"; // Import CSS styles
import { Link } from "react-router-dom";
import {
  PencilIcon,
  SignupIcon,
  StudentIcon,
  RocketIcon,
} from "./components/Icons";

const StudentSignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="student-signup-page">
      {/* Navbar */}
      <Navbar />

      {/* Animated Background Elements */}
      <div className="student-signup-deco1"></div>
      <div className="student-signup-deco2"></div>

      {/* Floating Emoji Icons */}
      <div className="floating-icons">
        <div className="floating-icon icon1">
          <PencilIcon size={32} color="#4158d0" />
        </div>
        <div className="floating-icon icon2">
          <SignupIcon size={32} color="#43aa8b" />
        </div>
        <div className="floating-icon icon3">
          <StudentIcon size={32} color="#ff6b6b" />
        </div>
        <div className="floating-icon icon4">
          <RocketIcon size={32} color="#ffc75f" />
        </div>
        <div className="floating-icon icon5">🚀</div>
        <div className="floating-icon icon6">🌟</div>
      </div>

      {/* Page Title */}
      <h1 className="signup-page-title">
        <span>Join</span> <span>The</span> <span>Adventure!</span>
      </h1>

      {/* Main Content */}
      <div className="student-signup-container">
        <div className="student-signup-card">
          <div className="icon-container">
            <span role="img" aria-label="student">
              👨‍🎓
            </span>
          </div>
          <h2>Student Signup</h2>
          <p className="signup-description">
            Create your student account below!
          </p>
          <form className="signup-form">
            <div className="signup-row">
              <input
                type="text"
                placeholder="First Name"
                className="signup-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="signup-input"
              />
            </div>
            <div className="signup-row">
              <input
                type="email"
                placeholder="Email Address"
                className="signup-input"
              />
              <input
                type="email"
                placeholder="Guardian Email"
                className="signup-input"
              />
            </div>
            <div className="signup-row">
              <input type="text" placeholder="Grade" className="signup-input" />
              <input
                type="password"
                placeholder="Password"
                className="signup-input"
              />
            </div>
            <div className="signup-row">
              <input
                type="password"
                placeholder="Re-enter Password"
                className="signup-input"
              />
            </div>
            <button className="signup-button" type="submit">
              Signup Now
            </button>
          </form>
          <p className="login-text">
            Already have an account? <Link to="/login">Login Now</Link>
          </p>
          <p className="student-mode-text">
            Not a Student? Switch to{" "}
            <Link to="/guardian-mode" className="guardian-link">
              Guardian Mode
            </Link>{" "}
            to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignupPage;
