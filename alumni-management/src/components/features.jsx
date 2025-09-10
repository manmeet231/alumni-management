import React from "react";
import "./Features.css";
import bgImage from "../assets/images/feaback.jpg";

const Features = () => {
  return (
    <div className="features">
        <div className="card-container">
        <div className="feature-card-1">
          <h2>Networking</h2>
          <p>Connect with alumni across the globe.</p>
        </div>
        <div className="feature-card-2">
          <h2>Opportunities</h2>
          <p>Discover jobs, internships, and mentorships.</p>
        </div>
        <div className="feature-card-3">
          <h2>Events</h2>
          <p>Stay updated with reunions and webinars.</p>
        </div>
        </div>
    </div>
  );
};

export default Features;
