import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import "./Home.css";

function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Function to toggle the sidebar state
  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className={`home-page ${isSidebarOpen ? "sidebar-active" : ""}`}>
      {/* Navbar with Sidebar toggle functionality */}
      <NavbarHome onSidebarToggle={handleSidebarToggle} />

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element pencil">✏️</div>
        <div className="floating-element book">📚</div>
        <div className="floating-element rocket">🚀</div>
        <div className="floating-element paint">🎨</div>
        <div className="floating-element math">🔢</div>
        <div className="floating-element globe">🌍</div>
      </div>

      {/* Main Hero */}
      <div className="main-hero">
        <div className="hero-bubbles">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
        </div>

        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1 className="main-title">
              <span className="title-word title-word-1">Learn</span>
              <span className="title-word title-word-2">Create</span>
              <span className="title-word title-word-3">Explore!</span>
            </h1>
            <p className="subtitle">
              Where education becomes an exciting adventure!
            </p>
            <div className="action-buttons">
              <button
                className="start-button"
                onClick={() => navigate("/courses")}
              >
                Start Your Adventure
              </button>
              <button
                className="explore-button"
                onClick={() => navigate("/about-us")}
              >
                Explore More
              </button>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              src={require("./assets/home-img.png")}
              alt="Happy learning kids"
              className="hero-image"
            />
            <div className="image-decoration"></div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="features-container">
        <h2 className="features-title">What Makes KinetiKids Special?</h2>

        <div className="feature-cards">
          <div className="feature-card card-1">
            <div className="card-icon">🎯</div>
            <h3>Fun Learning</h3>
            <p>Interactive lessons that make education feel like playtime</p>
          </div>

          <div className="feature-card card-2">
            <div className="card-icon">🧠</div>
            <h3>Smart Lessons</h3>
            <p>Content that adapts to your child's unique learning style</p>
          </div>

          <div className="feature-card card-3">
            <div className="card-icon">🏆</div>
            <h3>Achievement System</h3>
            <p>Rewards and badges that motivate and track progress</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make Learning Fun?</h2>
          <p>Join thousands of students who love to learn with KinetiKids</p>
          <button
            className="cta-button"
            onClick={() => navigate("/student-signup")}
          >
            Join Now
          </button>
        </div>
        <div className="cta-decoration">
          <div className="deco-shape shape-1"></div>
          <div className="deco-shape shape-2"></div>
          <div className="deco-shape shape-3"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2024 KinetiKids — Where Learning Comes Alive!</p>
      </footer>
    </div>
  );
}

export default Home;
