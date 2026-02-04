import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mentorToken, setMentorToken] = useState(null);
  const [mentorEmail, setMentorEmail] = useState(null);
  const { user, token, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check for mentor authentication on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem("mentorToken");
    const email = localStorage.getItem("mentorEmail");
    setMentorToken(token);
    setMentorEmail(email);
  }, [location]);

  const isUserLoggedIn = token && user;
  const isMentorLoggedIn = mentorToken;

  const handleUserLogout = async () => {
  try {
    await axios.get(
      "http://localhost:3000/users/userRegister/user-Logout",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    logout(); // context logout
    navigate("/");
  } catch (error) {
    console.error("User logout error:", error);
  }
};


  const handleMentorLogout = async () => {
  try {
    await axios.get(
      "http://localhost:3000/mentors/mentorRegister/mentorLogout",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${mentorToken}`,
        },
      }
    );

    localStorage.removeItem("mentorToken");
    localStorage.removeItem("mentorEmail");
    setMentorToken(null);
    setMentorEmail(null);
    navigate("/");
  } catch (error) {
    console.error("Mentor logout error:", error);
  }
};


  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          Mentor<span>Hub</span>
        </div>

        {/* Desktop Menu */}
        <ul className={styles.menu}>
          <li><Link to="/" className={styles.link}>Home</Link></li>
          <li>Chat</li>
          <li>Courses</li>

          {!isUserLoggedIn && !isMentorLoggedIn ? (
            <li><Link to="/userSignUp" className={`${styles.link} ${styles.signupButton}`}>Sign Up</Link></li>
          ) : isUserLoggedIn ? (
            // User Avatar Menu
            <li className={styles.avatarWrap}>
              {loading ? (
                <div className={styles.avatarPlaceholder}>Loading...</div>
              ) : (
                <>
                  <img
                    src={user?.profileImage || "/default-avatar.png"}
                    alt={user?.FullName || "User"}
                    className={styles.avatar}
                    onClick={() => setAvatarOpen((s) => !s)}
                  />
                  {avatarOpen && (
                    <div className={styles.avatarMenu} onMouseLeave={() => setAvatarOpen(false)}>
                      <button className={styles.menuItem} onClick={() => { setAvatarOpen(false); navigate('/profile'); }}>Profile</button>
                      <button className={styles.menuItem} onClick={() => { setAvatarOpen(false); handleUserLogout(); }}>Logout</button>
                    </div>
                  )}
                </>
              )}
            </li>
          ) : (
            // Mentor Avatar Menu
            <li className={styles.avatarWrap}>
              <div className={styles.avatarPlaceholder} onClick={() => setAvatarOpen((s) => !s)}>
                {mentorEmail?.charAt(0).toUpperCase() || "M"}
              </div>
              {avatarOpen && (
                <div className={styles.avatarMenu} onMouseLeave={() => setAvatarOpen(false)}>
                  <p className={styles.mentorEmail}>{mentorEmail}</p>
                  <button className={styles.menuItem} onClick={() => { setAvatarOpen(false); navigate('/mentor-profile'); }}>Profile</button>
                  <button className={styles.menuItem} onClick={() => { setAvatarOpen(false); navigate('/mentor-dashboard'); }}>Dashboard</button>
                  <button className={styles.menuItem} onClick={() => { setAvatarOpen(false); handleMentorLogout(); }}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div
          className={`${styles.hamburger} ${open ? styles.active : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.show : ""}`}>
        <li onClick={() => setOpen(false)}><Link to="/">Home</Link></li>
        <li onClick={() => setOpen(false)}>Chat</li>
        <li onClick={() => setOpen(false)}>Courses</li>
        <li onClick={() => setOpen(false)}>Contact</li>
        {!isUserLoggedIn && !isMentorLoggedIn ? (
          <li onClick={() => setOpen(false)}><Link to="/userSignUp">Sign Up</Link></li>
        ) : isUserLoggedIn ? (
          <>
            <li onClick={() => { setOpen(false); navigate('/profile'); }}>Profile</li>
            <li onClick={() => { setOpen(false); handleUserLogout(); }}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => { setOpen(false); navigate('/mentor-profile'); }}>Profile</li>
            <li onClick={() => { setOpen(false); navigate('/mentor-dashboard'); }}>Dashboard</li>
            <li onClick={() => { setOpen(false); handleMentorLogout(); }}>Logout</li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
