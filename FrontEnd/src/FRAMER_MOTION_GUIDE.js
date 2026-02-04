/* ============================================================================
   FRAMER MOTION ANIMATION EXAMPLES - INTEGRATION GUIDE
   ============================================================================
   
   This file provides Framer Motion examples for all major components
   to make them animated, interactive, and premium-looking.
   
   Installation: npm install framer-motion
   
   ============================================================================ */

// ============================================================================
// 1. HERO COMPONENT WITH ANIMATIONS
// ============================================================================

/*
import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.7 + index * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Hero = () => {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className={styles.title}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Find Your Perfect <span>Mentor</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          variants={itemVariants}
        >
          Connect with industry experts and accelerate your career growth
        </motion.p>

        <motion.div
          className={styles.searchBox}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="text"
            placeholder="Search your Niche"
            className={styles.searchInput}
          />
        </motion.div>

        <motion.button
          className={styles.ctaBtn}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          Explore Mentors →
        </motion.button>

        <motion.div
          className={styles.stats}
          initial="hidden"
          animate="visible"
        >
          {[
            { number: "500+", label: "Expert Mentors" },
            { number: "10K+", label: "Success Stories" },
            { number: "50+", label: "Industries" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={statsVariants}
              whileHover={{ y: -10 }}
            >
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
*/

// ============================================================================
// 2. NAVBAR WITH ANIMATIONS
// ============================================================================

/*
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const logoVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.1,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },
};

const menuItemVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: (index) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2 + index * 0.05,
    },
  }),
  hover: {
    color: "#667eea",
    transition: {
      duration: 0.2,
    },
  },
};

const mobileMenuVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    x: -300,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const mobileMenuItemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: (index) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.1 + index * 0.05,
      duration: 0.3,
    },
  }),
};

const avatarMenuVariants = {
  hidden: { scale: 0.8, opacity: 0, y: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { user, token, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      className={styles.navbar}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.container}>
        <motion.div
          className={styles.logo}
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          Mentor<span>Hub</span>
        </motion.div>

        {/* Desktop Menu */}
        <motion.ul
          className={styles.menu}
          initial="hidden"
          animate="visible"
        >
          {["Home", "Chat", "Courses"].map((item, index) => (
            <motion.li
              key={item}
              custom={index}
              variants={menuItemVariants}
              whileHover="hover"
            >
              <Link to={item === "Home" ? "/" : "#"} className={styles.link}>
                {item}
              </Link>
            </motion.li>
          ))}

          {!token ? (
            <motion.li
              custom={3}
              variants={menuItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/userSignUp"
                className={`${styles.link} ${styles.signupButton}`}
              >
                Sign Up
              </Link>
            </motion.li>
          ) : (
            <motion.li
              className={styles.avatarWrap}
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.3, duration: 0.6 },
                },
                hidden: {
                  opacity: 0,
                  x: 30,
                },
              }}
            >
              {loading ? (
                <div className={styles.avatarPlaceholder}>...</div>
              ) : (
                <>
                  <motion.img
                    src={user?.profileImage || "/default-avatar.png"}
                    alt={user?.FullName || "User"}
                    className={styles.avatar}
                    onClick={() => setAvatarOpen((s) => !s)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <AnimatePresence>
                    {avatarOpen && (
                      <motion.div
                        className={styles.avatarMenu}
                        variants={avatarMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseLeave={() => setAvatarOpen(false)}
                      >
                        <motion.button
                          className={styles.menuItem}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setAvatarOpen(false);
                            navigate("/profile");
                          }}
                        >
                          Profile
                        </motion.button>
                        <motion.button
                          className={styles.menuItem}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setAvatarOpen(false);
                            handleLogout();
                          }}
                        >
                          Logout
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.li>
          )}
        </motion.ul>

        {/* Hamburger Menu */}
        <motion.div
          className={`${styles.hamburger} ${open ? styles.active : ""}`}
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.95 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.ul
              className={`${styles.mobileMenu} ${open ? styles.show : ""}`}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {["Home", "Chat", "Courses"].map((item, index) => (
                <motion.li
                  key={item}
                  custom={index}
                  variants={mobileMenuItemVariants}
                  onClick={() => setOpen(false)}
                >
                  <Link to={item === "Home" ? "/" : "#"} className={styles.link}>
                    {item}
                  </Link>
                </motion.li>
              ))}

              {!token ? (
                <motion.li
                  custom={3}
                  variants={mobileMenuItemVariants}
                  onClick={() => setOpen(false)}
                >
                  <Link
                    to="/userSignUp"
                    className={`${styles.link} ${styles.signupButton}`}
                  >
                    Sign Up
                  </Link>
                </motion.li>
              ) : null}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
*/

// ============================================================================
// 3. FORM INPUTS WITH FLOATING LABELS & ANIMATIONS
// ============================================================================

/*
import { motion } from "framer-motion";
import { useState } from "react";

const FloatingLabelInput = ({ name, type = "text", placeholder, value, onChange, error }) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="floating-label-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`form-input ${error ? "error" : ""}`}
        animate={{
          borderColor: error ? "#dc3545" : focused ? "#667eea" : "#e0e0e0",
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.label
        animate={{
          top: focused || value ? "-12px" : "16px",
          fontSize: focused || value ? "12px" : "16px",
          color: error ? "#dc3545" : focused ? "#667eea" : "#999",
        }}
        transition={{ duration: 0.2 }}
      >
        {placeholder}
      </motion.label>
      {error && (
        <motion.span
          className="form-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </motion.span>
      )}
    </motion.div>
  );
};

export default FloatingLabelInput;
*/

// ============================================================================
// 4. BUTTON ANIMATIONS
// ============================================================================

/*
import { motion } from "framer-motion";

const AnimatedButton = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 12px 30px rgba(102, 126, 234, 0.4)",
    },
    tap: {
      scale: 0.95,
    },
    disabled: {
      opacity: 0.6,
    },
  };

  return (
    <motion.button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      animate={disabled ? "disabled" : "initial"}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
*/

// ============================================================================
// 5. PAGE TRANSITION WRAPPER
// ============================================================================

/*
import { motion } from "framer-motion";

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
*/

// ============================================================================
// 6. SCROLL ANIMATION WRAPPER (useInView)
// ============================================================================

/*
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ScrollRevealSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;
*/

// ============================================================================
// 7. MODAL WITH ANIMATIONS
// ============================================================================

/*
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const AnimatedModal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{title}</h2>
              <button
                onClick={onClose}
                className="close-btn"
                as={motion.button}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
*/

// ============================================================================
// INSTALLATION & SETUP
// ============================================================================

/*
1. Install Framer Motion:
   npm install framer-motion

2. Import in your component:
   import { motion, AnimatePresence, useInView } from "framer-motion";

3. Key Concepts:
   - motion: Creates animated elements
   - AnimatePresence: Animates components entering/leaving
   - useInView: Detects when element is in viewport
   - variants: Reusable animation definitions
   - transition: Controls animation timing

4. Common Properties:
   - initial: Starting state
   - animate: Target state
   - whileHover: State while hovering
   - whileTap: State while clicking
   - exit: Exit animation (with AnimatePresence)

5. Transition Types:
   - "spring": Bouncy animation
   - "tween": Linear interpolation
   - "inertia": Physics-based (for dragging)

Example Transition:
transition={{
  type: "spring",
  stiffness: 400,
  damping: 10,
  duration: 0.3,
}}
*/
