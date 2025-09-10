import React, { useRef } from "react";
import bgImage from "../assets/images/background.jpg";
import Features from "./Features"; // 👈 make sure the file name matches
import "./landing.css";
import { Link } from "react-router-dom"; // ✅ correct import

const Landing = () => {
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Landing Section */}
      <div
        className="landing-container"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <nav className="nav">
          <button className="nav-left">Home</button>
          <div className="nav-right right">
            <Link to="/alumni">
              <button>About Us</button>
            </Link>
            <button>Sign Up / Login</button>
          </div>
        </nav>

        <h1 className="landing-title">Welcome to AlumNet</h1>
        <p className="landing-subtitle">
          Connect with your fellow alumni, explore events, and stay updated!
        </p>

        {/* 👇 Learn More scrolls down */}
        <button className="learn-more-btn" onClick={scrollToFeatures}>
          Learn More
        </button>
      </div>

      {/* Features Section (hidden below until scrolled) */}
      <div ref={featuresRef}>
        <Features />
      </div>
    </div>
  );
};

export default Landing;
