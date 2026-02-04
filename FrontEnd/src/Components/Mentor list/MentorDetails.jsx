import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MentorDetails.module.css';
import ReviewSection from './ReviewSection';

const MentorDetails = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecificMentor = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/mentors/mentorRegister/specificmentor/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setMentor(response.data.mentor);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mentor details:", error);
        setLoading(false);
      }
    };
    fetchSpecificMentor();
  }, [id]);

  if (loading) return <div className={styles.loading}>Shaping the mentorship experience...</div>;
  if (!mentor) return <div className={styles.error}>Mentor details not found!</div>;

  // Skills clean-up logic
  const cleanSkills = mentor.skills?.map(s => s.replace(/[\[\]\\"]/g, '')) || [];

 // ... (imports remain same)

return (
  <div className={styles.wrapper}>
    <div className={styles.glassCard}>
      
      {/* Profile Section */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <img 
            src={mentor.profileThumbnail?.url} 
            alt={mentor.name} 
            className={styles.profileImg} 
          />
          <div className={styles.badge}>🌟 TOP MENTOR</div>
        </div>
        
        <div className={styles.introText}>
          <h1>{mentor.name}</h1>
          <p className={styles.tagline}>{mentor.domain} — {mentor.yearOfExperience} Years Experience</p>
          <div className={styles.location}>
            <span>📍</span> {mentor.address}
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className={styles.actionGrid}>
        <button className={`${styles.actionBtn} ${styles.videoBtn}`}>
           🎥 Video Call
        </button>
        <button className={`${styles.actionBtn} ${styles.voiceBtn}`}>
           📞 Voice Call
        </button>
        <button className={`${styles.actionBtn} ${styles.chatBtn}`}>
           💬 Quick Chat
        </button>
      </div>

      {/* Detailed Info */}
      <div className={styles.contentGrid}>
        <div className={styles.mainBio}>
          <h3>About Mentor</h3>
          <p>{mentor.aboutYourself}</p>
        </div>

        <div className={styles.sideInfo}>
          <h3>Core Expertise</h3>
          <div className={styles.skillCloud}>
            {cleanSkills.map((skill, index) => (
              <span key={index} className={styles.skillPill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
       <ReviewSection 
   mentorId={id} 
   existingReviews={mentor.review} // Yahan backend se aaya array pass karein
/>
    </div>
  </div>
);
};

export default MentorDetails;