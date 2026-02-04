import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; // User Auth
import MentorAuthContext from '../../context/MentorAuthContext'; // Mentor Auth
import styles from './MentorsList.module.css';

const MentorsList = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Donon contexts se tokens nikalna
  const { token } = useContext(AuthContext); 
  const { mentorToken } = useContext(MentorAuthContext);
  
  const navigate = useNavigate();

  const handleConnect = (id) => {
    // LOGIC: Agar donon mein se koi bhi login hai, toh details dikhao
    if (token || mentorToken) {
      navigate(`/mentor/${id}`);
    } else {
      // Agar koi login nahi hai, tabhi login form par bhejo
      navigate(`/userSignUp`);
    }
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        // API call ke liye current logged in person ka token use karna
        const activeToken = token || mentorToken || localStorage.getItem('token') || localStorage.getItem('mentorToken');

        const response = await axios.get('http://localhost:3000/mentors/mentorRegister/allMenotrsList', {
          headers: {
            Authorization: `Bearer ${activeToken}`
          }
        });

        if (response.data && response.data.success) {
          setMentors(response.data.mentors);
        } else if (Array.isArray(response.data)) {
          setMentors(response.data);
        } else {
          setMentors([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setLoading(false);
      }
    };

    fetchMentors();
  }, [token, mentorToken]); // Jab login status badle, tab refresh karein


  if (loading) return <div className={styles.container}>Loading mentors...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Expert Mentors</h2>
      
      <div className={styles.mentorGrid}>
        {mentors.map((mentor) => {
          const cleanSkills = mentor.skills?.map(s => s.replace(/[\[\]\\"]/g, '')) || [];

          return (
            <div key={mentor._id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img 
                  src={mentor.profileThumbnail?.url || 'https://via.placeholder.com/150'} 
                  alt={mentor.name} 
                  className={styles.profilePic} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.nameRow}>
                  <h3 className={styles.mentorName}>{mentor.name}</h3>
                </div>
                
                <p className={styles.domain}>{mentor.domain}</p>
                <p className={styles.exp}>{mentor.yearOfExperience} Years Experience</p>
                
                <div className={styles.skillsContainer}>
                  {cleanSkills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className={styles.skillBadge}>{skill}</span>
                  ))}
                </div>

                <button 
                  className={styles.connectBtn}
                  onClick={() => handleConnect(mentor._id)}
                >
                  Connect Me
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorsList;