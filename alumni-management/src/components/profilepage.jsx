import React, { useState, useEffect } from 'react';
import { User, Mail, BookOpen, Award, Code, Save, Camera } from 'lucide-react';
import './profilepage.css';
import { Link } from "react-router-dom"; 

const AlumniProfileEditor = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    graduationYear: '',
    degree: '',
    major: '',
    gpa: '',
    honors: '',
    certifications: '',
    expertise: [],
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Get username from localStorage or wherever you store it after login
  const username = localStorage.getItem('username') || 'mohit@1'; // fallback for testing

  const expertiseOptions = [
    // Programming Languages
    { category: 'Programming Languages', items: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB'] },
    
    // Web Development
    { category: 'Web Development', items: ['React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'Sass', 'Bootstrap', 'Tailwind CSS', 'jQuery', 'Webpack', 'Next.js', 'Nuxt.js'] },
    
    // Mobile Development
    { category: 'Mobile Development', items: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin', 'Ionic', 'Progressive Web Apps'] },
    
    // Databases
    { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'Microsoft SQL Server', 'Firebase', 'DynamoDB', 'Cassandra'] },
    
    // Cloud & DevOps
    { category: 'Cloud & DevOps', items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'Terraform', 'Ansible', 'Nginx', 'Apache'] },
    
    // Data Science & AI
    { category: 'Data Science & AI', items: ['Machine Learning', 'Deep Learning', 'Data Analysis', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'Natural Language Processing', 'Computer Vision'] },
    
    // Design & UI/UX
    { category: 'Design & UI/UX', items: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'Graphic Design', 'Brand Design'] },
    
    // Business & Management
    { category: 'Business & Management', items: ['Project Management', 'Agile/Scrum', 'Product Management', 'Business Analysis', 'Strategic Planning', 'Team Leadership', 'Digital Marketing', 'SEO/SEM', 'Content Strategy'] },
    
    // Other Technologies
    { category: 'Other Technologies', items: ['Blockchain', 'Cybersecurity', 'Network Administration', 'Quality Assurance', 'Game Development', 'AR/VR', 'IoT', 'Microservices', 'API Development'] }
  ];

  // Load existing profile data when component mounts
  useEffect(() => {
    if (username) {
      loadProfileData();
    }
  }, [username]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/profile/${username}`);
      const data = await response.json();
      
      if (data.success && data.profile) {
        const profile = data.profile;
        setFormData({
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          email: profile.email || '',
          bio: profile.bio || '',
          graduationYear: profile.graduation_year || '',
          degree: profile.degree || '',
          major: profile.major || '',
          gpa: profile.gpa || '',
          honors: profile.honors || '',
          certifications: profile.certifications || '',
          expertise: profile.expertise || [],
          photo: profile.photo || null
        });
        setMessage('Profile loaded successfully');
        // Clear the message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage('Error loading profile data');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExpertiseChange = (skill) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter(item => item !== skill)
        : [...prev.expertise, skill]
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result, // save image as base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/profile/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username,
          ...formData 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Profile saved successfully!');
        console.log(data);
      } else {
        setMessage(data.error || 'Error saving profile');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error occurred');
    } finally {
      setLoading(false);
    }
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  // Show loading state on initial load
  if (loading && Object.values(formData).every(value => 
    value === '' || value === null || (Array.isArray(value) && value.length === 0)
  )) {
    return (
      <div className="profile-editor">
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-title">Loading Profile...</h1>
            <p className="profile-subtitle">Please wait while we fetch your data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-editor">
      <div className="profile-container">
        {/* Status Message */}
        {message && (
          <div className={`status-message ${
            message.includes('successfully') || message.includes('loaded') 
              ? 'status-success' 
              : 'status-error'
          }`}>
            {message}
          </div>
        )}

        {/* Header */}
        <div className="profile-header">
            <Link to="/" className="home-btn">
                Home
                </Link>
          <div className="avatar-section">
            <div className="avatar-circle">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="avatar-image"
                />
              ) : (
                <User size={40} />
              )}
            </div>
              {/* Hidden input for file upload */}
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />

            <button
              className="avatar-upload-btn"
              onClick={() => document.getElementById('photoUpload').click()}
              disabled={loading}
            >
              <Camera size={16} />
              Change Photo
            </button>
            
          </div>
          <h1 className="profile-title">Edit Alumni Profile</h1>
          <p className="profile-subtitle">Keep your professional information up to date</p>
        </div>

        {/* Form Container */}
        <div className="form-container">
          {/* Personal Information */}
          <div className="form-section">
            <h2 className="section-header">
              <User size={20} />
              Personal Information
            </h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Professional Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about your professional journey, current role, and career highlights..."
                className="form-textarea"
                disabled={loading}
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="form-section">
            <h2 className="section-header">
              <BookOpen size={20} />
              Academic Background
            </h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Graduation Year *</label>
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  min="1950"
                  max="2030"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Degree *</label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                  disabled={loading}
                >
                  <option value="">Select Degree</option>
                  <option value="associate">Associate's Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">Ph.D.</option>
                  <option value="professional">Professional Degree</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Major/Field of Study *</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, Business Administration"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">GPA (Optional)</label>
                <input
                  type="number"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  max="4"
                  placeholder="3.85"
                  className="form-input"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Accomplishments */}
          <div className="form-section">
            <h2 className="section-header">
              <Award size={20} />
              Academic Accomplishments
            </h2>
            <div className="form-group">
              <label className="form-label">Honors & Awards</label>
              <textarea
                name="honors"
                value={formData.honors}
                onChange={handleInputChange}
                rows="3"
                placeholder="Dean's List, Summa Cum Laude, Academic Scholarships, etc."
                className="form-textarea"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Professional Certifications</label>
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                rows="3"
                placeholder="AWS Certified, PMP, Google Cloud Professional, etc."
                className="form-textarea"
                disabled={loading}
              />
            </div>
          </div>

          {/* Expertise */}
          <div className="form-section">
            <h2 className="section-header">
              <Code size={20} />
              Areas of Expertise
            </h2>
            <p className="section-description">
              Select all technologies, skills, and areas where you have professional experience.
            </p>
            
            {expertiseOptions.map((category, categoryIndex) => (
              <div key={categoryIndex} className="expertise-category">
                <h3 className="category-title">
                  {category.category}
                </h3>
                <div className="checkbox-grid">
                  {category.items.map((skill, skillIndex) => (
                    <label key={skillIndex} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.expertise.includes(skill)}
                        onChange={() => handleExpertiseChange(skill)}
                        className="checkbox-input"
                        disabled={loading}
                      />
                      <div className="custom-checkbox"></div>
                      <span className="checkbox-label">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              onClick={handleSubmit}
              className="save-button"
              disabled={loading}
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfileEditor;