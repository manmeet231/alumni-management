import React, { useState, useEffect, useRef } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { Calendar, Users, Award, TrendingUp, Clock, MapPin, ChevronDown } from 'lucide-react';
import './dashboard.css';
import pfp from "../assets/images/pfp.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sample data for pie chart
  const pieData = [
    { name: 'Tech Events', value: 35, color: '#8884d8' },
    { name: 'Workshops', value: 25, color: '#82ca9d' },
    { name: 'Conferences', value: 20, color: '#ffc658' },
    { name: 'Networking', value: 15, color: '#ff7300' },
    { name: 'Others', value: 5, color: '#00C49F' }
  ];

  const timelineData = [
    { id: 1, title: "React Developer Conference", date: "2025-01-15", time: "09:00 AM", status: "completed", attendees: 450, location: "San Francisco", type: "conference" },
    { id: 2, title: "JavaScript Workshop", date: "2025-01-10", time: "02:00 PM", status: "completed", attendees: 120, location: "Online", type: "workshop" },
    { id: 3, title: "UI/UX Design Meetup", date: "2025-01-08", time: "06:30 PM", status: "completed", attendees: 80, location: "New York", type: "meetup" },
    { id: 4, title: "AI & Machine Learning Summit", date: "2025-01-05", time: "10:00 AM", status: "completed", attendees: 320, location: "Boston", type: "summit" }
  ];

  const monthlyData = [
    { month: 'Jan', events: 8 },
    { month: 'Feb', events: 12 },
    { month: 'Mar', events: 6 },
    { month: 'Apr', events: 15 },
    { month: 'May', events: 9 },
    { month: 'Jun', events: 11 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'upcoming': return 'status-upcoming';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'conference': return <Award className="w-4 h-4" />;
      case 'workshop': return <Users className="w-4 h-4" />;
      case 'meetup': return <Calendar className="w-4 h-4" />;
      case 'summit': return <TrendingUp className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>Dashboard</h1>
          <p>Welcome back mohit! Here's your activity overview</p>
        </div>
        <Link to="/alumni" className="alumni-btn">
        <Users size={16} />
        View Alumni
        </Link>

        {/* Account Button */}
        <div className="absolute top-4 right-6" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-md border hover:shadow-lg transition focus:outline-none"
            >
              <img
                src={pfp}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border z-50">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Edit Account
                </button>
              </div>
            )}
          </div>
        </div>



        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-info">
                <p className="stat-label">Total Events</p>
                <p className="stat-value purple">42</p>
                <p className="stat-change">↗ 12% vs last month</p>
              </div>
              <div className="stat-icon purple">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-info">
                <p className="stat-label">Followers</p>
                <p className="stat-value blue">2,847</p>
                <p className="stat-change">↗ 8% vs last month</p>
              </div>
              <div className="stat-icon blue">
                <Users className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-info">
                <p className="stat-label">This Week</p>
                <p className="stat-value emerald">7</p>
                <p className="stat-change">Events attended</p>
              </div>
              <div className="stat-icon emerald">
                <Award className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-info">
                <p className="stat-label">Alumscore</p>
                <p className="stat-value orange">4.8</p>
                <p className="stat-change">⭐ Event satisfaction</p>
              </div>
              <div className="stat-icon orange">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Pie Chart */}
          <div className="chart-card">
            <h3 className="chart-title">Event Categories</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              {pieData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="legend-text">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="chart-card">
            <h3 className="chart-title">Monthly Attendance</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="events" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-card">
          <h3 className="timeline-title">Recent Event Timeline</h3>
          <div className="timeline">
            {timelineData.map((event, index) => (
              <div key={event.id} className="timeline-item">
                {/* Timeline dot */}
                <div className="timeline-dot"></div>

                {/* Event card */}
                <div className="event-card">
                  <div className="event-header">
                    <div className="event-title-row">
                      <div className="event-icon">
                        {getTypeIcon(event.type)}
                      </div>
                      <h4 className="event-title">{event.title}</h4>
                      <span className={`event-status ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="event-details">
                    <div className="event-detail">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-detail">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="event-footer">
                    <div className="event-attendees">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                    <button className="event-link">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="load-more">
            <button className="btn-primary">
              Load More Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;