import React, { useState } from "react";
import "./AlumniDirectory.css"; // custom styles

const alumniDatabase = [
  {
    name: "Sarah Johnson",
    year: "2019",
    department: "computer-science",
    location: "california",
    role: "Senior Software Engineer",
    company: "Google",
    initials: "SJ",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "Michael Chen",
    year: "2020",
    department: "business",
    location: "california",
    role: "Product Manager",
    company: "Microsoft",
    initials: "MC",
    gradient: "from-green-500 to-blue-600",
  },
  {
    name: "Emily Rodriguez",
    year: "2018",
    department: "medicine",
    location: "florida",
    role: "Resident Physician",
    company: "Mayo Clinic",
    initials: "ER",
    gradient: "from-pink-500 to-red-600",
  },
  {
    name: "David Kim",
    year: "2021",
    department: "engineering",
    location: "texas",
    role: "Data Scientist",
    company: "Tesla",
    initials: "DK",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    name: "Lisa Thompson",
    year: "2017",
    department: "arts",
    location: "new-york",
    role: "Creative Director",
    company: "Adobe",
    initials: "LT",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "Alex Patel",
    year: "2022",
    department: "business",
    location: "new-york",
    role: "Investment Analyst",
    company: "Goldman Sachs",
    initials: "AP",
    gradient: "from-teal-500 to-green-600",
  },
];

const AlumniDirectory = () => {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    year: "",
    department: "",
    location: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const searchAlumni = () => {
    const filtered = alumniDatabase.filter((alumni) => {
      return (
        (filters.name === "" ||
          alumni.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.year === "" || alumni.year === filters.year) &&
        (filters.department === "" || alumni.department === filters.department) &&
        (filters.location === "" || alumni.location === filters.location)
      );
    });
    setResults(filtered);
  };

  return (
    <div className="alumni-container">
      {/* Wrapper container for easy styling */}
      <div className="alumni-wrapper">
        {/* Header */}
        <header className="alumni-header">
          <div className="header-inner">
            <div className="logo-section">
              <div className="logo-circle">A</div>
              <h1 className="logo-text">Alumnet</h1>
            </div>
            <nav className="nav-links">
              <a href="#">Home</a>
              <a href="#">Directory</a>
              <a href="#">Events</a>
              <a href="#">About</a>
            </nav>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <h2>Find Your Fellow Alumni</h2>
            <p>Connect with graduates from your institution</p>
            <div className="search-boxes">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={filters.name}
                onChange={handleChange}
              />
              <select id="year" value={filters.year} onChange={handleChange}>
                <option value="">Graduation Year</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <select id="department" value={filters.department} onChange={handleChange}>
                <option value="">Department</option>
                <option value="computer-science">Computer Science</option>
                <option value="business">Business</option>
              </select>
              <select id="location" value={filters.location} onChange={handleChange}>
                <option value="">Location</option>
                <option value="new-york">New York</option>
                <option value="california">California</option>
              </select>
            </div>
            <button onClick={searchAlumni}>Search Alumni</button>
          </div>
        </header>

        {/* Search Results */}
        {results.length > 0 && (
          <main className="results-section">
            {results.map((alumni) => (
              <div key={alumni.name} className="alumni-card">
                <div className={`alumni-avatar ${alumni.gradient}`}>{alumni.initials}</div>
                <div className="alumni-info">
                  <h4>{alumni.name}</h4>
                  <p>Class of {alumni.year}</p>
                  <p>{alumni.department}</p>
                  <p>{alumni.role}</p>
                  <p>{alumni.company}</p>
                  <p>{alumni.location}</p>
                </div>
              </div>
            ))}
          </main>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;