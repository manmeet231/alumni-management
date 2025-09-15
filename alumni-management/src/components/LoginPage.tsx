import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, ArrowLeft, AlertCircle,GraduationCap, 
  Users, 
  Sparkles } from "lucide-react";
import './LoginPage.css';
import Iridescence from './Iridescence';
import Magnet from './Magnet';
import MetaBalls from './MetaBalls';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
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
    
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden" style={{width:'210vb',}}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          ></div>
        ))}
      </div>
      <div style={{position:"absolute" ,width:"200vb",height:"120vh"}}>
        <MetaBalls
          color="#7a13baff"
          cursorBallColor="#ffffff"
          cursorBallSize={2}
          ballCount={20}
          animationSize={10}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={1}
          speed={0.3}
            />
            </div>
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-all duration-300 hover:-translate-x-1"
            >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Landing</span>
          </button>
          {/* Login Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-lg opacity-30 hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Tab Navigation */}
              <div className="relative p-1 m-6 bg-white/5 rounded-xl">
                <div className="relative flex">
                  {/* Sliding Background */}
                  <div
                    className={`absolute inset-y-0 w-1/2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg transition-all duration-300 ease-out ${
                      activeTab === "alumni" ? "translate-x-full" : "translate-x-0"
                    }`}
                  ></div>
                  
                  {/* Tab Buttons */}
                  <button
                    onClick={() => setActiveTab("student")}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === "student"
                        ? "text-white"
                        : "text-white/60 hover:text-white/80"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Student</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("alumni")}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === "alumni"
                        ? "text-white"
                        : "text-white/60 hover:text-white/80"
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Alumni</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 pt-0">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mb-4 shadow-lg animate-float">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {activeTab === "student" ? "Student Portal" : "Alumni Portal"}
                  </h2>
                  <p className="text-white/60 text-sm">
                    Welcome back! Please sign in to continue
                  </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  {/* Username Field */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Username
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                        className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300 hover:bg-white/15"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}

                        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300 hover:bg-white/15"
                        placeholder="Enter your password"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white/60 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer hover:text-white/80 transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-purple-500"
                      />
                      <span>Remember me</span>
                    </label>
                    <button
                      onClick={() => console.log("Forgot password")}
                      className="text-purple-400 text-sm hover:text-purple-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 animate-shake">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="relative w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none overflow-hidden group"
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                    
                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Sign in as {activeTab === "student" ? "Student" : "Alumni"}</span>
                        </>
                      )}
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-white/40">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login Options */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => console.log("Google login")}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Google</span>
                    </button>
                    <button
                      onClick={() => console.log("Microsoft login")}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                      </svg>
                      <span>Microsoft</span>
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center text-sm text-white/60">
                    Don't have an account?{" "}
                    <button
                      onClick={() => console.log("Navigate to signup")}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Sign up here
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2025 Educational Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
