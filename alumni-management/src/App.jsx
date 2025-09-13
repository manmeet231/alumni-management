import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing"; // your Landing JSX
import AlumniDirectory from "./components/AlumniDirectory"; // new page
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/dashboard"; // ✅ import Dashboard
import ProfileEditor from "./components/profilepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/alumni" element={<AlumniDirectory />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/profile" element={<ProfileEditor />} />
      </Routes>
    </Router>
  );
}

export default App;