import React, { useState , useEffect , useRef} from "react";
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
    image: "https://randomuser.me/api/portraits/women/44.jpg",
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
    image: "https://randomuser.me/api/portraits/men/32.jpg",
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
    image: "https://randomuser.me/api/portraits/women/68.jpg",
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
    image: "https://randomuser.me/api/portraits/men/76.jpg",
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
    image: "https://randomuser.me/api/portraits/women/12.jpg",
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
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
];

const AlumniCard = ({ alumni, index = 0 }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.style.animation = `slideInRight 0.8s ease-out forwards`;
      card.style.animationDelay = `${index * 0.2}s`;
    }
  }, [index]); // only on mount

  return (
    <div className="alumni-card" ref={cardRef}>
      <img src={alumni.image} alt={alumni.name} className="alumni-photo" />
      <div className="alumni-info">
        <h4>{alumni.name}</h4>
        <p>Class of {alumni.year}</p>
        <p>{alumni.department}</p>
        <p>{alumni.role}</p>
        <p>{alumni.company}</p>
        <p>{alumni.location}</p>
        <button className="connect-btn">Connect</button>
      </div>
    </div>
  );
};

const AlumniDirectory = () => {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({ name: "", year: "", department: "", location: "" });

  const handleChange = (e) => setFilters({ ...filters, [e.target.id]: e.target.value });

  const searchAlumni = () => {
    const filtered = alumniDatabase.filter((alumni) => {
      return (
        (filters.name === "" || alumni.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.year === "" || alumni.year === filters.year) &&
        (filters.department === "" || alumni.department === filters.department) &&
        (filters.location === "" || alumni.location === filters.location)
      );
    });
    setResults(filtered);
  };

  const recommendations = alumniDatabase.slice(0, 3);

  return (
    <div className="alumni-container">
      <div className="alumni-wrapper">
        {/* Header & Search */}
        <header className="alumni-header">
          <div className="header-inner">
            <div className="logo-section">
              <div className="logo-circle"></div>
            </div>
          </div>
          <div className="search-section">
            <h2>Find Your Fellow Alumni</h2>
            <p>Connect with graduates from your institution</p>
            <div className="search-boxes">
              <input type="text" id="name" placeholder="Name" value={filters.name} onChange={handleChange} />
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

        {/* Results or Recommendations */}
<main>
  {results.length > 0 ? (
    <div className="results-block">
      <h2>Search Results</h2>
      <div className="results-section">
        {results.map((alumni, index) => (
          <AlumniCard key={alumni.name} alumni={alumni} index={index} />
        ))}
      </div>
    </div>
  ) : (
    <div className="recommendation-block">
      <h2>Recommended Alumni</h2>
      <div className="recommendations">
        {recommendations.map((alumni, index) => (
          <AlumniCard key={alumni.name} alumni={alumni} index={index} />
        ))}
      </div>
    </div>
  )}
</main>

      </div>
    </div>
  );
};

export default AlumniDirectory;