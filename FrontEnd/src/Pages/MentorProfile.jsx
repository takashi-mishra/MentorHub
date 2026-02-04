import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "./Profile.css";

const MentorProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Get mentor token from localStorage
  const mentorToken = localStorage.getItem("mentorToken");
  const mentorEmail = localStorage.getItem("mentorEmail");

  // Redirect if not authenticated as mentor
  useEffect(() => {
    if (!mentorToken) {
      navigate("/mentorloginform");
      toast.error("Please login as mentor first");
      return;
    }
    fetchMentorProfile();
  }, [mentorToken, navigate]);

  // Fetch mentor profile data
  const fetchMentorProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/mentors/mentorRegister/mentorProfile",
        {
          headers: {
            Authorization: `Bearer ${mentorToken}`,
          },
        }
      );
      console.log("Mentor Profile Response:", response.data);
      const data = response.data.mentor || response.data.data || response.data;
      console.log("Profile Data:", data);
      setProfileData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load mentor profile data: " + error.message);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mentorToken");
    localStorage.removeItem("mentorEmail");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-wrapper">
          <p style={{ fontSize: "18px", textAlign: "center", marginTop: "50px" }}>
            Loading mentor profile... 
          </p>
          <p style={{ fontSize: "12px", textAlign: "center", marginTop: "10px", color: "#666" }}>
            Token: {mentorToken ? "✓ Found" : "✗ Not found"}
          </p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-container">
        <div className="profile-wrapper">
          <p>Unable to load mentor profile data. Please try again.</p>
          <p style={{ fontSize: "12px", marginTop: "10px", color: "#666" }}>
            Check browser console for errors
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <motion.div
        className="profile-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header Section */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="profile-image-container">
            <img
              src={
                profileData.profileThumbnail || 
                profileData.profileImage || 
                "/default-profile-icon.svg"
              }
              alt={profileData.name}
              className="profile-image"
            />
            {profileData.isVerified && (
              <div className="verified-badge">
                <span className="verified-icon">✓</span>
              </div>
            )}
          </div>

          <div className="profile-header-info">
            <h1 className="profile-name">{profileData.name}</h1>
            {profileData.isVerified && (
              <div className="verified-status">
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Verified Mentor</span>
              </div>
            )}
            <p className="profile-email">{profileData.email}</p>
            <p className="profile-domain" style={{ color: "#666", marginTop: "8px" }}>
              {profileData.domain}
            </p>
          </div>
        </motion.div>

        {/* Mentor Professional Details Card */}
        <motion.div
          className="profile-details-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="section-title">Professional Information</h2>

          <div className="details-grid">
            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Full Name</label>
              <p>{profileData.name}</p>
            </motion.div>

            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Email Address</label>
              <p>{profileData.email}</p>
            </motion.div>

            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Phone Number</label>
              <p>{profileData.number || "Not provided"}</p>
            </motion.div>

            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Address</label>
              <p>{profileData.address || "Not provided"}</p>
            </motion.div>

            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Specialization</label>
              <p>{profileData.domain || "Not provided"}</p>
            </motion.div>

            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Years of Experience</label>
              <p>{profileData.yearOfExperience || "Not provided"} years</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section */}
        {profileData.skills && profileData.skills.length > 0 && (
          <motion.div
            className="profile-details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="section-title">Skills</h2>
            <div className="skills-container">
              {Array.isArray(profileData.skills) 
                ? profileData.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {typeof skill === 'string' ? skill : skill.name || skill}
                    </span>
                  ))
                : typeof profileData.skills === 'string'
                ? JSON.parse(profileData.skills).map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))
                : null
              }
            </div>
          </motion.div>
        )}

        {/* About Section */}
        {profileData.aboutYourself && (
          <motion.div
            className="profile-details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">About</h2>
            <p className="about-text">{profileData.aboutYourself}</p>
          </motion.div>
        )}

        {/* Certificates Section */}
        {profileData.certificate && (
          <motion.div
            className="profile-details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="section-title">Qualifications</h2>
            <div className="document-preview">
              <img
                src={profileData.certificate}
                alt="Certificate"
                className="certificate-image"
              />
              <a
                href={profileData.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="view-link"
              >
                View Full Certificate
              </a>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="action-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="btn btn-primary"
            onClick={() => navigate("/mentor-dashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-2h2v20h-2zm4 4h2v16h-2z" />
            </svg>
            Dashboard
          </motion.button>

          <motion.button
            className="btn btn-danger"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            Logout
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MentorProfile;
