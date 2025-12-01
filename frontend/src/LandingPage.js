import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "./Navbar"; // Import the reusable Navbar component
import "./LandingPage.css"; // Import a CSS file for styling the landing page

const LandingPage = () => {
  console.log("🔴 OLD LandingPage is loading");
  const navigate = useNavigate(); // Initialize the navigate hook
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      {/* Reusing the Navbar component */}
      <Navbar />

      {/* Background Animation Elements */}
      <div className="animated-background">
        <div className="shape circle1"></div>
        <div className="shape circle2"></div>
        <div className="shape circle3"></div>
        <div className="shape triangle1"></div>
        <div className="shape triangle2"></div>
        <div className="shape square1"></div>
        <div className="shape square2"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-icons">
        <div className="floating-icon icon1">✏️</div>
        <div className="floating-icon icon2">📚</div>
        <div className="floating-icon icon3">🎨</div>
        <div className="floating-icon icon4">🔢</div>
        <div className="floating-icon icon5">🚀</div>
        <div className="floating-icon icon6">🌟</div>
      </div>

      <main className="landing-content">
        <div className="landing-text">
          {/* Animated Dots */}
          <div className="title-dot dot1"></div>
          <div className="title-dot dot2"></div>
          <div className="title-dot dot3"></div>
          <div className="title-dot dot4"></div>
          <div className="title-dot dot5"></div>
          <div className="title-dot dot6"></div>
          <div className="title-dot dot7"></div>
          <div className="title-dot dot8"></div>
          <div className="title-dot dot9"></div>
          <div className="title-dot dot10"></div>

          <h1 className="landing-title">
            <span className="title-part-kineti">
              <span>K</span>
              <span>i</span>
              <span>n</span>
              <span>e</span>
              <span>t</span>
              <span>i</span>
            </span>
            <span className="title-part-kids">
              <span>K</span>
              <span>i</span>
              <span>d</span>
              <span>s</span>
            </span>
          </h1>

          <p className="landing-tagline">
            Where Young Minds and Smart Tech Meet.
          </p>
        </div>

        <div className={`mode-selection ${animationComplete ? "visible" : ""}`}>
          <div
            className="mode-card student-card"
            onClick={() => navigate("/student-mode")}
          >
            <div className="card-icon">👨‍🎓</div>
            <h2>Student Mode</h2>
            <p>Fun learning adventures await!</p>
            <div className="shine"></div>
          </div>

          <div
            className="mode-card guardian-card"
            onClick={() => navigate("/guardian-mode")}
          >
            <div className="card-icon">👨‍👩‍👧‍👦</div>
            <h2>Guardian Mode</h2>
            <p>Monitor progress and help guide learning</p>
            <div className="shine"></div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>© 2024 KinetiKids</p>
      </footer>
    </div>
  );
};

export default LandingPage;
