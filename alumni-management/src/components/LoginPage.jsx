import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import './LoginPage.css';

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

  if (activeTab === "student") {
    setError("Student login is not available yet. Please use Alumni login.");
    return;
  }

  try {
    setIsLoading(true);
    setError("");

    // ✅ Call backend login only for Alumni
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      // ✅ Check profile
      const profileRes = await fetch(
        `http://localhost:5000/api/profile/${username}`
      );
      const profileData = await profileRes.json();

      if (profileData.profile && profileData.profile.first_name) {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
    } else {
      setError("Invalid username or password");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Server error, please try again later.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Animated Background Elements */}
        <div className="background-elements">
          <div className="bg-element bg-element-1"></div>
          <div className="bg-element bg-element-2"></div>
          <div className="bg-element bg-element-3"></div>
        </div>

        {/* Back Button using Link */}
        <Link to="/" className="back-button">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Landing</span>
        </Link>

        {/* Login Form Container */}
        <div className="login-form-container">
          <div className="login-form-card">
            {/* Tab Navigation */}
            <div className="login-tabs">
              <div className="login-tabs-inner">
                <button
                  type="button"
                  className={`tab-button ${activeTab === "student" ? "active" : ""}`}
                  onClick={() => setActiveTab("student")}
                >
                  Student Login
                </button>
                <button
                  type="button"
                  className={`tab-button ${activeTab === "alumni" ? "active" : ""}`}
                  onClick={() => setActiveTab("alumni")}
                >
                  Alumni Login
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form className="form-content" onSubmit={handleSubmit}>
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
                {/* Username Field */}
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

                {/* Password Field */}
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

                {/* Error Message */}
                {error && (
                  <div className="error-message">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
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
            </form>
          </div>

          {/* Footer */}
          <div className="login-footer">
            <p>&copy; 2025 Educational Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
