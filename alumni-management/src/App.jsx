import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing"; // your Landing JSX
import AlumniDirectory from "./components/AlumniDirectory"; // new page
import LoginPage from "./components/LoginPage.tsx";
import Dashboard from "./components/dashboard"; // ✅ import Dashboard
import ProfileEditor from "./components/profilepage";
import ProfileBio from "./components/profilebio"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/alumni" element={<AlumniDirectory />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/profile" element={<ProfileEditor />} />
        <Route path="/profilebio" element={<ProfileBio />} />
      </Routes>
    </Router>
  );
}

export default App;