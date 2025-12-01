import React from "react";
import Navbar from "./Navbar";
import "./GuardianSignupPage.css";
import { SignupIcon, StudentIcon, RocketIcon } from "./components/Icons";

const GuardianSignupPage = () => {
  return (
    <div className="guardian-signup-page">
      <Navbar />

      {/* Animated Background Elements */}
      <div className="guardian-signup-deco1"></div>
      <div className="guardian-signup-deco2"></div>
      <div className="floating-icons">
        <div className="floating-icon icon1">
          <SignupIcon size={32} color="#ab47bc" />
        </div>
        <div className="floating-icon icon2">
          <StudentIcon size={32} color="#ffb74d" />
        </div>
        <div className="floating-icon icon3">
          <RocketIcon size={32} color="#ffd54f" />
        </div>
        <div className="floating-icon icon4">🧸</div>
        <div className="floating-icon icon5">👨‍👩‍👧‍👦</div>
        <div className="floating-icon icon6">🤖</div>
      </div>

      <h1 className="guardian-signup-title">
        <span className="guardian-title-orange">Welcome</span>{" "}
        <span className="guardian-title-purple">to</span>{" "}
        <span className="guardian-title-green">Guardian Signup!</span>
      </h1>

      <div className="guardian-signup-container">
        <div className="guardian-signup-card">
          <div className="icon-container">
            <span role="img" aria-label="guardian-family">
              👨‍👩‍👧‍👦
            </span>
          </div>
          <h2>Guardian Signup</h2>
          <p className="signup-description">
            Create your guardian account below!
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
                type="text"
                placeholder="Username"
                className="signup-input"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="signup-input"
              />
            </div>
            <div className="signup-row">
              <input
                type="password"
                placeholder="Password"
                className="signup-input"
              />
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
            Already have an account? <a href="/#/logincopy">Login Now</a>
          </p>
          <p className="guardian-mode-text">
            Not a Guardian? Switch to{" "}
            <a href="/#/student-mode" className="student-link">
              Student Mode
            </a>{" "}
            to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuardianSignupPage;
