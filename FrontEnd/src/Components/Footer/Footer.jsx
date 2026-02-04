import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Brand & Mission Section */}
        <div className={styles.brandSection}>
          <h2 className={styles.logo}>Mentor <span>Hub</span></h2>
          <p className={styles.description}>
            Empowering the next generation of tech leaders through 1-on-1 personalized mentorship. 
            Your growth is our priority.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.icon}>LinkedIn</a>
            <a href="#" className={styles.icon}>Twitter</a>
            <a href="#" className={styles.icon}>Instagram</a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className={styles.linkColumn}>
          <h4>Platform</h4>
          <ul className={styles.list}>
            <li onClick={() => navigate('/')}>Browse Mentors</li>
            <li>How it works</li>
            <li>Success Stories</li>
            <li>Become a Mentor</li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className={styles.linkColumn}>
          <h4>Support</h4>
          <ul className={styles.list}>
            <li>Help Center</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <h4>Join our Newsletter</h4>
          <p>Get career tips and updates directly in your inbox.</p>
          <div className={styles.inputBox}>
            <input type="email" placeholder="Email Address" />
            <button>Join</button>
          </div>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <p>&copy; 2026 Mentor Hub. Built with ❤️ for Future Leaders.</p>
      </div>
    </footer>
  );
};

export default Footer;