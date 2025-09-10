import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing"; // your Landing JSX
import AlumniDirectory from "./components/AlumniDirectory"; // new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/alumni" element={<AlumniDirectory />} />
      </Routes>
    </Router>
  );
}

export default App;
