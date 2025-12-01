import React, { useState } from "react";
import axios from "axios"; // Import axios
import Navbar from "./Navbar"; // Import Navbar
import "./Logincopy.css"; // Ensure Login CSS is applied
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Logincopy() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGuardian, setIsGuardian] = useState(true); // Set to true for guardian login
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password,
        is_guardian: isGuardian,
      });

      alert("Login successful!");
      if (response.data.role === "student") {
        sessionStorage.setItem("student", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        sessionStorage.setItem("guardian", JSON.stringify(response.data.user));
        navigate("/guardian");
      }
    } catch (err) {
      console.error("Login Failed:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      {/* Background Animation Elements with new class names */}
      <div className="logincopy-animated-bg">
        <div className="logincopy-bg-circle1"></div>
        <div className="logincopy-bg-circle2"></div>
        <div className="logincopy-bg-circle3"></div>
        {/* Added divs for triangles and squares with new class names */}
        <div className="logincopy-bg-triangle1"></div>
        <div className="logincopy-bg-triangle2"></div>
        <div className="logincopy-bg-square1"></div>
        <div className="logincopy-bg-square2"></div>
      </div>
      {/* Floating Icons with new class names */}
      <div className="logincopy-floating-icons">
        <span
          className="logincopy-floating-icon logincopy-icon1"
          role="img"
          aria-label="icon1"
        >
          🧩
        </span>
        <span
          className="logincopy-floating-icon logincopy-icon2"
          role="img"
          aria-label="icon2"
        >
          🚀
        </span>
        <span
          className="logincopy-floating-icon logincopy-icon3"
          role="img"
          aria-label="icon3"
        >
          💡
        </span>
        <span
          className="logincopy-floating-icon logincopy-icon4"
          role="img"
          aria-label="icon4"
        >
          ⭐
        </span>
        <span
          className="logincopy-floating-icon logincopy-icon5"
          role="img"
          aria-label="icon5"
        >
          🎈
        </span>
        <span
          className="logincopy-floating-icon logincopy-icon6"
          role="img"
          aria-label="icon6"
        >
          🎉
        </span>
      </div>
      <div className="login-container">
        <div className="login-card">
          <div className="icon-container">
            <span role="img" aria-label="guardian-family">
              👨‍👩‍👧‍👦
            </span>
          </div>
          <h1 className="login-title">
            <span className="guardian-title-orange">Welcome</span>{" "}
            <span className="guardian-title-purple">Back</span>{" "}
            <span className="guardian-title-green">!</span>
          </h1>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-row">
              <input
                type="email"
                placeholder="Email Address"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-row">
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="guardian-checkbox">
              <input
                type="checkbox"
                checked={isGuardian}
                onChange={(e) => setIsGuardian(e.target.checked)}
              />
              <label>Are you a guardian?</label>
            </div>
            <button type="submit" className="login-button">
              {loading ? "Logging in..." : "Login Now"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <p className="login-text">
            Not a user?{" "}
            <Link to="/guardian-signup" className="student-link">
              Signup Now
            </Link>
          </p>
          <p className="guardian-mode-text">
            Not a Guardian? Switch to{" "}
            <Link to="/student-mode" className="student-link">
              Student Mode
            </Link>{" "}
            to continue
          </p>
        </div>
      </div>
    </div>
  );
}

export default Logincopy;
