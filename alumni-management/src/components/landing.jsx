import React from "react";
import bgImage from "../assets/images/background.jpg"; // your local image
import "./Landing.css"; // import the CSS

const Landing = () => {
  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <nav className="nav">
        <button className="nav-left">Home</button>
        <div className="nav-right right">
          <button>About Us</button>
          <button>Sign Up / Login</button>
        </div>
      </nav>

      <h1 className="landing-title">Welcome to AlumNet</h1>
      <p className="landing-subtitle">
        Connect with your fellow alumni, explore events, and stay updated!
      </p>
    </div>
  );
};

export default Landing;