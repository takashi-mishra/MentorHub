import React from "react";
import { motion } from "framer-motion";
import "./ProfileSkeleton.css";

const ProfileSkeleton = () => {
  const shimmer = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  return (
    <div className="profile-container">
      <motion.div className="profile-wrapper">
        {/* Header Skeleton */}
        <motion.div className="profile-header skeleton-header" {...shimmer}>
          <div className="skeleton skeleton-avatar"></div>
          <div className="skeleton-header-info">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </motion.div>

        {/* Details Card Skeleton */}
        <motion.div className="profile-details-card skeleton-card" {...shimmer}>
          <div className="skeleton skeleton-section-title"></div>
          <div className="skeleton-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-item">
                <div className="skeleton skeleton-label"></div>
                <div className="skeleton skeleton-value"></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Buttons Skeleton */}
        <motion.div className="action-buttons" {...shimmer}>
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileSkeleton;
