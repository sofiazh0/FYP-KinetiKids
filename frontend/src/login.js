import React, { useState } from "react";
import axios from "axios"; // Import axios
import Navbar from "./Navbar"; // Import Navbar
import "./Login.css"; // Ensure Login CSS is applied
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  StudentIcon,
  BookIcon,
  LoginIcon,
  MailIcon,
  LockIcon,
} from "./components/Icons";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGuardian, setIsGuardian] = useState(false);
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
    <div className="login-container">
      <Navbar />

      {/* Decorative elements */}
      <div className="login-deco1"></div>
      <div className="login-deco2"></div>
      <div className="login-deco3"></div>

      {/* Floating Emoji Icons */}
      <div className="login-floating-icons">
        <div className="login-floating-icon login-icon1">🔐</div>
        <div className="login-floating-icon login-icon2">👋</div>
        <div className="login-floating-icon login-icon3">🎯</div>
        <div className="login-floating-icon login-icon4">✨</div>
        <div className="login-floating-icon login-icon5">🚀</div>
        <div className="login-floating-icon login-icon6">🌟</div>
      </div>

      {/* Left Side - Login Form */}
      <div className="login-left">
        {/* Login Form */}
        <div className="login-box">
          <div className="icon-container login-icon">
            <LoginIcon size={40} color="var(--primary-orange)" />
          </div>
          <h2>Welcome Back!</h2>

          <form
            className="login-form login-form-override-215418"
            onSubmit={handleLogin}
          >
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Guardian Checkbox */}
            <div className="guardian-checkbox">
              <input
                type="checkbox"
                checked={isGuardian}
                onChange={(e) => setIsGuardian(e.target.checked)}
                id="guardian-check"
              />
              <label htmlFor="guardian-check">Are you a guardian?</label>
            </div>

            <button type="submit" className="login-button">
              {loading ? "Logging in..." : "Login Now"}
            </button>

            <p className="login-text-next">
              Not a user?{" "}
              <Link to="/student-signup" className="guardian-link-next">
                Signup Now
              </Link>
            </p>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="signup-left">
        <div className="icon-container signup-icon">
          <StudentIcon size={40} color="var(--primary-green)" />
        </div>
        <h2 className="signup-title">Login Portal</h2>
        <h1 className="guardian-title">Student</h1>
        <h1 className="mode-title">Mode</h1>
        <p className="signup-text">
          Not a Student? Switch to{" "}
          <Link to="/guardian-mode" className="guardian-link">
            Guardian Mode
          </Link>{" "}
          to continue
        </p>
      </div>
    </div>
  );
}

export default Login;
