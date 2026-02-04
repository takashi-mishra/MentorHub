import React, { useState } from 'react';
import axios from 'axios';
import styles from './MentorDetails.module.css';

const ReviewSection = ({ mentorId, existingReviews }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showInput, setShowInput] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (rating === 0 || !comment) return alert("Please provide both rating and comment!");

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      
      // Note: Make sure your backend route is actually /users or /mentors
      const response = await axios.post(
  `http://localhost:3000/users/userRegister/sendReviewData/${mentorId}`, // Corrected Path
  { 
    mentorId: mentorId, 
    comment, 
    rating 
  },
  { headers: { Authorization: `Bearer ${token}` } }
);

      if (response.status === 200) {
        alert("Review submitted successfully!");
        setShowInput(false);
        window.location.reload(); // Simple way to show the new review immediately
      }
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
      alert("Error: " + (error.response?.data?.message || "Check your backend route"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <hr className={styles.divider} />
      <h3>Mentor Reviews</h3>

      {showInput && (
        <div className={styles.reviewInputCard}>
          <h4>Share your experience</h4>
          <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  type="button"
                  key={starValue}
                  className={starValue <= (hover || rating) ? styles.starOn : styles.starOff}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className={styles.star}>&#9733;</span>
                </button>
              );
            })}
          </div>
          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.reviewTextarea}
          />
          <button 
            onClick={handleSubmitReview} 
            disabled={isSubmitting}
            className={styles.submitReviewBtn}
          >
            {isSubmitting ? "Submitting..." : "Post Review"}
          </button>
        </div>
      )}

      <div className={styles.reviewsList}>
        {/* Yahan 'mentor.review' ki jagah 'existingReviews' use karo */}
        {existingReviews && existingReviews.length > 0 ? (
          existingReviews.map((rev, index) => (
            <div key={index} className={styles.reviewItem}>
              <div className={styles.reviewUser}>
                <div className={styles.userStars}>
                  {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                </div>
                <strong>{rev.Username || "Anonymous"}</strong>
              </div>
              <p>{rev.comment}</p>
            </div>
          ))
        ) : (
          <p className={styles.noReviews}>No reviews yet!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;