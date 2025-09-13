import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Eye, EyeOff, User, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to profile page after successful login
        navigate("/profile", { state: { username } });
      } else {
        setError(data.message || "Invalid username or password.");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="background-elements">
          <div className="bg-element bg-element-1"></div>
          <div className="bg-element bg-element-2"></div>
          <div className="bg-element bg-element-3"></div>
        </div>

        <Link to="/" className="back-button">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Landing</span>
        </Link>

        <div className="login-form-container">
          <div className="login-form-card">
            <div className="login-tabs">
              <div className="login-tabs-inner">
                <button
                  className={`tab-button ${activeTab === "student" ? "active" : ""}`}
                  onClick={() => setActiveTab("student")}
                >
                  Student Login
                </button>
                <button
                  className={`tab-button ${activeTab === "alumni" ? "active" : ""}`}
                  onClick={() => setActiveTab("alumni")}
                >
                  Alumni Login
                </button>
              </div>
            </div>

            <div className="form-content">
              <div className="form-header">
                <div className="form-icon">
                  <User className="w-8 h-8" />
                </div>
                <h2 className="form-title">
                  {activeTab === "student" ? "Student Portal" : "Alumni Portal"}
                </h2>
                <p className="form-subtitle">
                  Welcome back! Please sign in to your account
                </p>
              </div>

              <div className="form-fields">
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="error-message">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="submit-button"
                >
                  {isLoading ? (
                    <div className="loading-content">
                      <div className="loading-spinner"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    `Sign in as ${activeTab === "student" ? "Student" : "Alumni"}`
                  )}
                </button>
              </div>

              <div className="form-footer">
                <p className="footer-text">
                  Don't have an account?{" "}
                  <a href="#" className="footer-link">
                    Contact Administrator
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="login-footer">
            <p>&copy; 2025 Educational Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
