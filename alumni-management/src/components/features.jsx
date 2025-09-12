import React from "react";
import "./Features.css";
import bgImage from "../assets/images/feaback.jpg";
import logo from "../assets/images/logo.jpg"; // import logo
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="features">
      {/* Logo Section */}
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <div className="card-container">
        {/* Feature 1 - comes from right */}
        <motion.div
          className="feature-card-1"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Networking</h2>
          <p>Connect with alumni across the globe.</p>
        </motion.div>

        {/* Feature 2 - comes from left */}
        <motion.div
          className="feature-card-2"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Opportunities</h2>
          <p>Discover jobs, internships, and mentorships.</p>
        </motion.div>

        {/* Feature 3 - comes from right */}
        <motion.div
          className="feature-card-3"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Events</h2>
          <p>Stay updated with reunions and webinars.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
