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
    <div className="bg-gray-50 min-h-screen font-inter">
      {/* Header */}
      <header className="gradient-bg text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">A</span>
              </div>
              <h1 className="text-2xl font-bold">Alumnet</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-purple-200 transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-purple-200 transition-colors">
                Directory
              </a>
              <a href="#" className="hover:text-purple-200 transition-colors">
                Events
              </a>
              <a href="#" className="hover:text-purple-200 transition-colors">
                About
              </a>
            </nav>
          </div>

          {/* Search Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              Find Your Fellow Alumni
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Connect with graduates from your institution and build meaningful
              professional relationships
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={filters.name}
                    onChange={handleChange}
                  />
                  <select
                    id="year"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={filters.year}
                    onChange={handleChange}
                  >
                    <option value="">Graduation Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                  <select
                    id="department"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={filters.department}
                    onChange={handleChange}
                  >
                    <option value="">Department</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="business">Business</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                    <option value="arts">Arts</option>
                  </select>
                  <select
                    id="location"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={filters.location}
                    onChange={handleChange}
                  >
                    <option value="">Location</option>
                    <option value="new-york">New York</option>
                    <option value="california">California</option>
                    <option value="texas">Texas</option>
                    <option value="florida">Florida</option>
                    <option value="international">International</option>
                  </select>
                </div>
                <button
                  onClick={searchAlumni}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Search Alumni
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Search Results
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {results.map((alumni) => (
              <div
                key={alumni.name}
                className="bg-white rounded-xl shadow-lg p-6 card-hover"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${alumni.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl`}
                  >
                    {alumni.initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg text-gray-800">
                      {alumni.name}
                    </h4>
                    <p className="text-gray-600">Class of {alumni.year}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Department:</span>{" "}
                    {alumni.department}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Current Role:</span>{" "}
                    {alumni.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Company:</span>{" "}
                    {alumni.company}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span>{" "}
                    {alumni.location}
                  </p>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectory;
