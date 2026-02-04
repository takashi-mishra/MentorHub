import React, { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import UpdateProfileForm from "../Components/Profile/UpdateProfileForm";
import DeleteConfirmationModal from "../Components/Profile/DeleteConfirmationModal";
import ProfileSkeleton from "../Components/Profile/ProfileSkeleton";
import "./Profile.css";

const Profile = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/userloginform");
      toast.error("Please login first");
      return;
    }
    fetchUserProfile();
  }, [token, navigate]);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/users/userRegister/user-Profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileData(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
      setLoading(false);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (updatedData) => {
    try {
      await axios.put(
        "http://localhost:3000/users/userRegister/update-profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(
        "http://localhost:3000/users/userRegister/delete-account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Account deleted successfully");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error.response?.data?.message || "Failed to delete account");
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profileData) {
    return (
      <div className="profile-error">
        <p>Unable to load profile data. Please try again.</p>
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
                profileData.profileImage || "/default-profile-icon.svg"
              }
              alt={profileData.FullName}
              className="profile-image"
            />
            {profileData.isVerified && (
              <div className="verified-badge">
                <span className="verified-icon">✓</span>
              </div>
            )}
          </div>

          <div className="profile-header-info">
            <h1 className="profile-name">{profileData.FullName}</h1>
            {profileData.isVerified && (
              <div className="verified-status">
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Verified Account</span>
              </div>
            )}
            <p className="profile-email">{profileData.email}</p>
          </div>
        </motion.div>

        {/* User Details Card */}
        <motion.div
          className="profile-details-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="section-title">Account Details</h2>

          <div className="details-grid">
            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Full Name</label>
              <p>{profileData.FullName}</p>
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
              <label>Mobile Number</label>
              <p>{profileData.number || "Not provided"}</p>
            </motion.div>

            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Address</label>
              <p>{profileData.address || "Not provided"}</p>
            </motion.div>

            {profileData.id && (
              <motion.div
                className="detail-item"
                whileHover={{ translateY: -2 }}
              >
                <label>User ID</label>
                <p className="user-id">{profileData.id}</p>
              </motion.div>
            )}

            <motion.div
              className="detail-item"
              whileHover={{ translateY: -2 }}
            >
              <label>Account Status</label>
              <p className="status-badge">
                {profileData.isVerified ? "Active" : "Not Verified"}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="action-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="btn btn-primary"
            onClick={() => setIsEditModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
              <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            Update Profile
          </motion.button>

          <motion.button
            className="btn btn-danger"
            onClick={() => setIsDeleteModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" />
            </svg>
            Delete Account
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Update Profile Modal */}
      {isEditModalOpen && (
        <UpdateProfileForm
          initialData={profileData}
          onSubmit={handleProfileUpdate}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setIsDeleteModalOpen(false)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Profile;
