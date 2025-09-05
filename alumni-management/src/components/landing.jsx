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
        <div className="nav-right">
          <button>About Us</button>
          <button>Sign In</button>
          <button>Sign Up</button>
        </div>
      </nav>
      
      <h1>Welcome to Alumni Management</h1>
      <p>Connect with your fellow alumni, explore events, and stay updated!</p>
    </div>
  );
};

export default Landing;