import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MentorsList.module.css'; // Wahi purani CSS use kar rahe hain

const SearchResults = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // URL se query parameters nikalne ke liye
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/mentors/mentorRegister/search?q=${query}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setMentors(response.data.mentors);
        }
      } catch (error) {
        console.error("Search API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div className={styles.container}>Searching for "{query}"...</div>;

  return (
    <div className={styles.container} style={{marginTop: '80px'}}> 
      <h2 className={styles.title}>
        Search Results for "{query}"
        <span style={{display: 'block', fontSize: '1rem', fontWeight: '400', color: '#666'}}>
          Found {mentors.length} mentors matching your interest
        </span>
      </h2>

      {mentors.length > 0 ? (
        <div className={styles.mentorGrid}>
          {mentors.map((mentor) => {
            // Skills cleanup logic
            const cleanSkills = mentor.skills?.map(s => s.replace(/[\[\]\\"]/g, '')) || [];
            
            return (
              <div key={mentor._id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img 
                    src={mentor.profileThumbnail?.url || mentor.profileThumbnail} 
                    alt={mentor.name} 
                    className={styles.profilePic} 
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.mentorName}>{mentor.name}</h3>
                  <p className={styles.domain}>{mentor.domain}</p>
                  <p className={styles.exp}>{mentor.yearOfExperience} Yrs Experience</p>
                  
                  <div className={styles.skillsContainer}>
                    {cleanSkills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className={styles.skillBadge}>{skill}</span>
                    ))}
                  </div>

                  <button 
                    className={styles.connectBtn}
                    onClick={() => navigate(`/mentor/${mentor._id}`)}
                  >
                    Connect Me
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <h3>No mentors found for "{query}"</h3>
          <button onClick={() => navigate('/')} className={styles.connectBtn} style={{width: 'auto', padding: '10px 20px'}}>
            Try another search
          </button>
        </div>
      )}
    </div>

  );
};

export default SearchResults;