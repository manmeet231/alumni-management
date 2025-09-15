import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Calendar, Building, User, Star, Filter, ArrowRight, Users } from "lucide-react";
import "./AlumniDirectory.css";
import { Link } from "react-router-dom";

const AlumniCard = ({ alumni, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0px)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(30px)';
      cardRef.current.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`alumni-card ${alumni.featured ? 'featured' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {alumni.featured && (
        <div className="featured-badge">
          <div className="featured-badge-inner">
            <Star className="star-icon" />
          </div>
        </div>
      )}
      
      <div className="card-overlay" />
      
      <div className="card-content">
        <div className="card-header">
          <div className="profile-section">
            <div className="profile-image-container">
              <img 
                src={alumni.image || `https://randomuser.me/api/portraits/women/44.jpg`} 
                alt={alumni.name}
                className="profile-image"
              />
            </div>
            <div className="status-indicator" />
          </div>
          
          <div className="profile-info">
            <h3 className="profile-name">{alumni.name}</h3>
            <p className="profile-role">{alumni.role}</p>
            <p className="profile-company">{alumni.company}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <Calendar className="detail-icon calendar-icon" />
            <span>Class of {alumni.graduation_year || alumni.year} • {alumni.department}</span>
          </div>
          <div className="detail-item">
            <MapPin className="detail-icon location-icon" />
            <span>{alumni.location}</span>
          </div>
        </div>

        <div className="skills-section">
          <div className="skills-container">
            {(alumni.skills || []).slice(0, 3).map((skill, idx) => (
              <span key={idx} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="card-footer">
          <Link to="/profilebio" className="connect-button">
            <span>Connect</span>
            <ArrowRight className={`arrow-icon ${isHovered ? 'hovered' : ''}`} />
        </Link>
      </div>
      </div>
    </div>
  );
};

const SearchBox = ({ type, placeholder, value, onChange, options = null }) => {
  const icons = {
    text: User,
    select: Filter,
  };
  
  const Icon = icons[type] || Filter;

  return (
    <div className="search-box-container">
      <div className="search-box-icon">
        <Icon className="search-icon" />
      </div>
      
      {type === 'text' ? (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="search-input"
        />
      ) : (
        <select
          value={value}
          onChange={onChange}
          className="search-select"
        >
          <option value="">{placeholder}</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

const AlumniDirectory = () => {
  const [allAlumni, setAllAlumni] = useState([]);
  const [displayAlumni, setDisplayAlumni] = useState([]);
  const [filters, setFilters] = useState({ name: "", year: "", department: "", location: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const headerRef = useRef(null);

  // Fetch all alumni data on component mount
  useEffect(() => {
    fetchAlumni();
  }, []);

  // Header animation
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.opacity = '0';
      headerRef.current.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'translateY(0px)';
        headerRef.current.style.transition = 'all 0.8s ease';
      }, 100);
    }
  }, []);

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/alumni');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process the data to ensure it has the expected format
      const processedData = data.map(alumni => ({
        ...alumni,
        skills: alumni.skills ? (Array.isArray(alumni.skills) ? alumni.skills : alumni.skills.split(',').map(s => s.trim())) : [],
        featured: alumni.featured || false
      }));
      
      setAllAlumni(processedData);
      
      // Show featured alumni by default
      const featured = processedData.filter(alumni => alumni.featured);
      setDisplayAlumni(featured.length > 0 ? featured : processedData.slice(0, 6));
      
    } catch (err) {
      console.error('Error fetching alumni:', err);
      setError('Failed to load alumni data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFilters({ ...filters, [field]: e.target.value });
  };

  const searchAlumni = async () => {
    try {
      setIsSearching(true);
      
      // If no filters are applied, show featured alumni
      const hasFilters = Object.values(filters).some(value => value.trim() !== "");
      
      if (!hasFilters) {
        const featured = allAlumni.filter(alumni => alumni.featured);
        setDisplayAlumni(featured.length > 0 ? featured : allAlumni.slice(0, 6));
        setIsSearching(false);
        return;
      }

      // Filter alumni based on search criteria
      const filtered = allAlumni.filter((alumni) => {
        const nameMatch = filters.name === "" || 
          alumni.name?.toLowerCase().includes(filters.name.toLowerCase()) ||
          `${alumni.first_name} ${alumni.last_name}`.toLowerCase().includes(filters.name.toLowerCase());
        
        const yearMatch = filters.year === "" || 
          alumni.year === filters.year || 
          alumni.graduation_year === filters.year;
        
        const departmentMatch = filters.department === "" || 
          alumni.department?.toLowerCase().replace(/\s+/g, '-') === filters.department ||
          alumni.major?.toLowerCase().replace(/\s+/g, '-') === filters.department;
        
        const locationMatch = filters.location === "" || 
          alumni.location?.toLowerCase().includes(filters.location.toLowerCase());

        return nameMatch && yearMatch && departmentMatch && locationMatch;
      });
      
      setDisplayAlumni(filtered);
      
    } catch (err) {
      console.error('Error searching alumni:', err);
      setError('Failed to search alumni. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const clearFilters = () => {
    setFilters({ name: "", year: "", department: "", location: "" });
    // Show featured alumni when filters are cleared
    const featured = allAlumni.filter(alumni => alumni.featured);
    setDisplayAlumni(featured.length > 0 ? featured : allAlumni.slice(0, 6));
  };

  // Auto-search when filters change (optional - you can remove this if you want manual search only)
  useEffect(() => {
    if (!loading && allAlumni.length > 0) {
      const timeoutId = setTimeout(() => {
        searchAlumni();
      }, 500); // Debounce search by 500ms
      
      return () => clearTimeout(timeoutId);
    }
  }, [filters, allAlumni, loading]);

  const hasActiveFilters = Object.values(filters).some(value => value.trim() !== "");

  if (loading) {
    return (
      <div className="alumni-container">
        <div className="content-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <div style={{ textAlign: 'center' }}>
              <Users size={48} style={{ marginBottom: '16px', color: '#3b82f6' }} />
              <p>Loading alumni directory...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alumni-container">
        <div className="content-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>
              <button 
                onClick={fetchAlumni}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="alumni-container">
      {/* Animated background elements */}
      <div className="background-orbs">
        <div className="background-orb orb-1"></div>
        <div className="background-orb orb-2"></div>
        <div className="background-orb orb-3"></div>
      </div>
      <Link to="/dashboard" className="dashboard-btn">
    <Users size={16} />
        Go to Dashboard
    </Link>
      <div className="content-wrapper">
        {/* Header */}
        <header ref={headerRef} className="header">
          <div className="header-logo">
            <div className="logo-icon">
              <Users className="users-icon" />
            </div>
            <h1 className="header-title">Alumni Network</h1>
          </div>
          <p className="header-subtitle">
            Connect with exceptional graduates from our community. Discover mentors, collaborators, and lifelong connections.
          </p>
          
          <div className="filter-toggle-container">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="filter-toggle-button"
            >
              <Search className="search-icon-small" />
              <span>{showFilters ? 'Hide Filters' : 'Search Alumni'}</span>
            </button>
          </div>

          {/* Search Section */}
          <div className={`search-section ${showFilters ? 'expanded' : ''}`}>
            <div className="search-container">
              <div className="search-grid">
                <SearchBox
                  type="text"
                  placeholder="Search by name..."
                  value={filters.name}
                  onChange={handleChange('name')}
                />
                <SearchBox
                  type="select"
                  placeholder="Graduation Year"
                  value={filters.year}
                  onChange={handleChange('year')}
                  options={[
                    { value: "2023", label: "2023" },
                    { value: "2022", label: "2022" },
                    { value: "2021", label: "2021" },
                    { value: "2020", label: "2020" },
                    { value: "2019", label: "2019" },
                    { value: "2018", label: "2018" },
                    { value: "2017", label: "2017" }
                  ]}
                />
                <SearchBox
                  type="select"
                  placeholder="Department"
                  value={filters.department}
                  onChange={handleChange('department')}
                  options={[
                    { value: "computer-science", label: "Computer Science" },
                    { value: "business", label: "Business" },
                    { value: "medicine", label: "Medicine" },
                    { value: "engineering", label: "Engineering" },
                    { value: "arts", label: "Arts" }
                  ]}
                />
                <SearchBox
                  type="text"
                  placeholder="Location..."
                  value={filters.location}
                  onChange={handleChange('location')}
                />
              </div>
              
              <div className="search-actions">
                <button 
                  onClick={searchAlumni} 
                  className="search-button"
                  disabled={isSearching}
                >
                  <Search className="search-icon-small" />
                  <span>{isSearching ? 'Searching...' : 'Search'}</span>
                </button>
                <button onClick={clearFilters} className="clear-button">
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Results */}
        <main className="main-content">
          <div className="results-container">
            <div className="results-header">
              <h2 className="results-title">
                {hasActiveFilters ? (
                  <>
                    <Search className="results-icon search-results-icon" />
                    Search Results ({displayAlumni.length})
                  </>
                ) : (
                  <>
                    <Star className="results-icon featured-icon" />
                    Featured Alumni
                  </>
                )}
              </h2>
              <div className="results-count">
                {displayAlumni.length} member{displayAlumni.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="alumni-grid">
              {displayAlumni.map((alumni, index) => (
                <AlumniCard key={alumni.id || alumni.name} alumni={alumni} index={index} />
              ))}
            </div>
            
            {displayAlumni.length === 0 && hasActiveFilters && (
              <div className="default-message">
                <div className="default-message-content">
                  <Search className="default-icon" />
                  <span>No alumni found matching your criteria</span>
                  <button 
                    onClick={clearFilters}
                    style={{ 
                      marginTop: '12px',
                      padding: '6px 12px', 
                      backgroundColor: '#3b82f6', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
            
            {displayAlumni.length === 0 && !hasActiveFilters && (
              <div className="default-message">
                <div className="default-message-content">
                  <Users className="default-icon" />
                  <span>No alumni data available</span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlumniDirectory;