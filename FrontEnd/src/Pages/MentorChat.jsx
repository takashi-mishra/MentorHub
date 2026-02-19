import React from 'react';
import styles from './mentorChat.module.css';

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineering at Google",
    rating: 4.9,
    reviews: 156,
    price: 120,
    status: "online",
    availability: "Available now",
    availColor: "#4ade80"
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Product Manager at Meta",
    rating: 4.8,
    reviews: 203,
    price: 150,
    status: "away",
    availability: "Available in 2 hours",
    availColor: "#fbbf24"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Data Scientist at Netflix",
    rating: 4.9,
    reviews: 187,
    price: 180,
    status: "offline",
    availability: "Available tomorrow",
    availColor: "#94a3b8"
  }
];

const MentorChat = () => {
  return (
    <div className={styles.container}>
      <p className={styles.headerText}>Choose a mentor and start your 1-on-1 session</p>
      
      {mentors.map((mentor) => (
        <div key={mentor.id} className={styles.card}>
          <div className={styles.avatarSection}>
            <div className={styles.mentorImage}></div>
            <span className={`${styles.statusDot} ${styles[mentor.status]}`}></span>
          </div>

          <div className={styles.infoSection}>
            <h3 className={styles.mentorName}>{mentor.name}</h3>
            <p className={styles.roleTitle}>{mentor.role}</p>
            <div className={styles.ratingRow}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.reviewCount}>{mentor.rating} ({mentor.reviews} reviews)</span>
            </div>
            <p className={styles.availability} style={{ color: mentor.availColor }}>
              {mentor.availability}
            </p>
          </div>

          <div className={styles.priceSection}>
            <p className={styles.price}>${mentor.price}<span>/hour</span></p>
            <button 
              className={`${styles.startBtn} ${mentor.status === 'offline' ? styles.unavailableBtn : ''}`}
              disabled={mentor.status === 'offline'}
            >
              {mentor.status === 'offline' ? 'Unavailable' : 'Start Chat'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorChat;