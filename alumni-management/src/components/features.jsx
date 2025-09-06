import React from "react";
import "./Features.css";


const Features = () => {
  return (
    <div className="features"
        style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
      <div className="feature-card">
        <p>
          Feature 1: Our platform helps alumni stay connected with their
          community.
        </p>
      </div>

      <div className="feature-card">
        <p>
          Feature 2: Share updates, achievements, and opportunities easily.
        </p>
      </div>

      <div className="feature-card">
        <p>
          Feature 3: Access exclusive events, mentorship, and career support.
        </p>
      </div>
    </div>
  );
};

export default Features;
