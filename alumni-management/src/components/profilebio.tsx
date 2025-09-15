import React from "react";
import { Star, Users, Calendar, ArrowLeft } from "lucide-react";
import "./ProfileBio.css"; // <-- import CSS here
import pfp2 from "../assets/images/pfp2.jpg";
import { Link } from "react-router-dom";

const ProfileBio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6" style={{width:"200%"}}>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 border-b">

        <div className="p-4">
          <Link
            to="/alumni"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-600 rounded-lg shadow hover:bg-purple-700 transition" style={{color:"white",position:"absolute",top:"90px",left:"90px"}}
          >
            <ArrowLeft size={18} />
            Back to Alumni Directory
          </Link>
        </div>

        {/* Follow Button */}
        <div className="p-4">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 rounded-lg shadow hover:bg-green-700 transition"
            style={{ color: "white", position: "absolute", top: "360px", right: "420px" }}
          >
            Follow
          </button>
        </div>

          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-md">
            <img
              src={pfp2}   // ✅ use imported image
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">Kritika Yadav</h1>
            <p className="text-gray-600">
              Senior Software Engineer @ Google • New Delhi, India
            </p>

            {/* AlumScore */}
            <div className="flex items-center justify-center md:justify-start mt-3 space-x-1 text-yellow-500">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              <span className="ml-2 text-gray-700 font-medium">5.0 AlumScore</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-around text-center p-6 border-b">
          <div>
            <Users className="mx-auto text-purple-600" size={24} />
            <p className="text-lg font-bold text-gray-800">1.2k</p>
            <p className="text-gray-600 text-sm">Followers</p>
          </div>
          <div>
            <Calendar className="mx-auto text-purple-600" size={24} />
            <p className="text-lg font-bold text-gray-800">35</p>
            <p className="text-gray-600 text-sm">Events Attended</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Biography</h2>
          <p className="text-gray-600 leading-relaxed">
            Kritika Yadav is a passionate Senior Software Engineer at Google with
            expertise in building scalable applications and cutting-edge AI/ML
            solutions. She has contributed to multiple large-scale projects and
            actively mentors upcoming developers in the tech community.
          </p>

          {/* College Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">College</h3>
            <p className="text-gray-600">Indian Institute of Technology, Delhi</p>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Expertise</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {["React", "Python", "AI/ML"].map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
