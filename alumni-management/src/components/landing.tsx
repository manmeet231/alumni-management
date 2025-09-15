import React, { useRef } from "react";
import bgImage from "../assets/images/background.jpg";
import Features from "./features"; // 👈 make sure the file name matches
import "./landing.css";
import { Link } from "react-router-dom"; // ✅ correct import
import LiquidChrome from './LiquidChrome';
import TextType from './TextType';

const Landing = () => {
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Landing Section */}
      <div
        className="landing-container"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
      <nav className="nav">
    <Link to="/landing">
    <button className="nav-left">Home</button>
    </Link>

    <div className="nav-right right">
    <Link to="/alumni">
      <button>About Us</button>
    </Link>
    <Link to="/login">
      <button>Sign Up / Login</button>
    </Link>
    </div>
    </nav>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        
        <h1 className="landing-title"><TextType  className="landing-title__typed" text="Welcome to AlumNet" typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|" /></h1>
        <p className="landing-subtitle">
          Connect with your fellow alumni, explore events, and stay updated!
        </p>
        {/* 👇 Learn More scrolls down */}
        <button className="learn-more-btn" onClick={scrollToFeatures}>
          Learn More
        </button>
        </div>
      <div style={{ width: '100%', height: '100vh', position: 'absolute' }}>
    <LiquidChrome
      baseColor={[0.6, 0.95, .9]} // light grey-white
      speed={0.5}
      amplitude={0.6}
      interactive={true}
    />

    </div>
       </div>
      {/* Features Section (hidden below until scrolled) */}
      <div ref={featuresRef}>
        <Features />
      </div>
    </div>
  );
};

export default Landing;
