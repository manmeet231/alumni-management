import React from "react";
import "./Features.css";
import bgImage from "../assets/images/feaback.jpg";
import logo from "../assets/images/logo.jpg"; // import logo
import { motion } from "framer-motion";
import "./Features.css";
import CardSwap, { Card } from './CardSwap';
import Waves from './Waves';

const Features = () => {
  return (
    <div className="features">
      {/* Logo Section */}

    <div className="left-heading-container flex flex-col justify-start items-start h-screen px-6 bg-gray-100">
  <div>
    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
    AlumNet provides
  </h1>
  <h1 className="text-xl md:text-xl font-extrabold text-gray-900 leading-snug">
    unique solutions
  </h1>
    </div>

<div className="waves-background">
    <Waves
      lineColor="#fff"
      backgroundColor="rgba(255, 255, 255, 0.2)"
      waveSpeedX={0.02}
      waveSpeedY={0.01}
      waveAmpX={40}
      waveAmpY={20}
      friction={0.9}
      tension={0.01}
      maxCursorMove={120}
      xGap={12}
      yGap={36}
    />
  </div>

  {/* Optional right side for image or empty space */}
  <div className="flex-1"></div>
  </div>
      <div style={{ height: '600px', position: 'absolute' , left:'900px' , top:'160px',}}>
  <CardSwap
    cardDistance={50}
    verticalDistance={30}
    delay={2000}       // time between swaps
    pauseOnHover={false}
  >
    {/* Feature 1 */}
    <Card>
      <h3>Networking</h3>
      <p>Connect with alumni across the globe.</p>
    </Card>

    {/* Feature 2 */}
    <Card>
      <h2>Opportunities</h2>
      <p>Discover jobs, internships, and mentorships.</p>
    </Card>

    {/* Feature 3 */}
    <Card>
      <h2>Events</h2>
      <p>Stay updated with reunions and webinars.</p>
    </Card>
  </CardSwap>
</div>
</div>
  );
};

export default Features;
