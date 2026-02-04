/* ============================================================================
   COPY-PASTE CODE SNIPPETS - READY TO USE
   ============================================================================
   
   This file contains ready-to-use code snippets you can copy directly
   into your components for enhanced styling and animations.
   
   ============================================================================ */

/* ============================================================================
   1. ANIMATED HERO COMPONENT WITH FRAMER MOTION
   ============================================================================ */

/*
Copy this into: src/Components/Hero/Hero.jsx

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
    transition: { duration: 0.8, ease: "easeOut" },
  },
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
          variants={itemVariants}
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
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Mentors →
        </motion.button>

        <motion.div className={styles.stats} variants={containerVariants}>
          {[
            { number: "500+", label: "Expert Mentors" },
            { number: "10K+", label: "Success Stories" },
            { number: "50+", label: "Industries" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
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

/* ============================================================================
   2. ANIMATED NAVBAR WITH FRAMER MOTION
   ============================================================================ */

/*
Copy this into: src/Components/Navbar/Navbar.jsx

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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const logoVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
  },
  hover: { scale: 1.05 },
};

const mobileMenuVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    x: -300,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { user, token, logout, loading } = useAuth();
  const navigate = useNavigate();

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

        <ul className={styles.menu}>
          <li><Link to="/" className={styles.link}>Home</Link></li>
          <li><Link to="#" className={styles.link}>Chat</Link></li>
          <li><Link to="#" className={styles.link}>Courses</Link></li>
          {!token ? (
            <li>
              <Link to="/userSignUp" className={`${styles.link} ${styles.signupButton}`}>
                Sign Up
              </Link>
            </li>
          ) : (
            <li className={styles.avatarWrap}>
              <motion.img
                src={user?.profileImage || "/default-avatar.png"}
                alt={user?.FullName}
                className={styles.avatar}
                onClick={() => setAvatarOpen(!avatarOpen)}
                whileHover={{ scale: 1.1 }}
              />
              <AnimatePresence>
                {avatarOpen && (
                  <motion.div
                    className={styles.avatarMenu}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <button
                      className={styles.menuItem}
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </button>
                    <button
                      className={styles.menuItem}
                      onClick={() => logout()}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )}
        </ul>

        <motion.div
          className={`${styles.hamburger} ${open ? styles.active : ""}`}
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.95 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.ul
              className={`${styles.mobileMenu} ${open ? styles.show : ""}`}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <li><Link to="/" className={styles.link}>Home</Link></li>
              <li><Link to="#" className={styles.link}>Chat</Link></li>
              <li><Link to="#" className={styles.link}>Courses</Link></li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
*/

/* ============================================================================
   3. ANIMATED FORM INPUT COMPONENT
   ============================================================================ */

/*
Copy this into: src/Components/Forms/AnimatedInput.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";

const inputVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const labelVariants = {
  initial: { top: "16px", fontSize: "16px", color: "#999" },
  floating: { top: "-12px", fontSize: "12px", color: "#667eea" },
};

const AnimatedInput = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  delay = 0,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="floating-label-wrapper"
      initial="initial"
      animate="animate"
      variants={inputVariants}
      transition={{ ...inputVariants.transition, delay }}
    >
      <motion.input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`form-input ${error ? "error" : ""}`}
        placeholder=" "
        animate={{
          borderColor: error ? "#dc3545" : focused ? "#667eea" : "#e0e0e0",
          boxShadow: focused 
            ? "0 0 0 3px rgba(102, 126, 234, 0.1)"
            : "0 0 0 0px rgba(102, 126, 234, 0)",
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.label
        variants={labelVariants}
        animate={focused || value ? "floating" : "initial"}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      {error && (
        <motion.span
          className="form-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.span>
      )}
    </motion.div>
  );
};

export default AnimatedInput;
*/

/* ============================================================================
   4. ANIMATED BUTTON COMPONENT
   ============================================================================ */

/*
Copy this into: src/Components/Forms/AnimatedButton.jsx

import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  isLoading = false,
  className = "",
}) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 12px 30px rgba(102, 126, 234, 0.4)",
    },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.6 },
  };

  return (
    <motion.button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      animate={disabled ? "disabled" : "initial"}
    >
      {isLoading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ⚙️
        </motion.span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default AnimatedButton;
*/

/* ============================================================================
   5. PAGE TRANSITION WRAPPER
   ============================================================================ */

/*
Copy this into: src/Components/Layout/PageWrapper.jsx

import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const PageWrapper = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
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

/* ============================================================================
   6. SCROLL REVEAL COMPONENT
   ============================================================================ */

/*
Copy this into: src/Components/Layout/ScrollReveal.jsx

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ScrollReveal = ({ children, className = "", delay = 0 }) => {
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
        delay,
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

export default ScrollReveal;
*/

/* ============================================================================
   7. ANIMATED MODAL COMPONENT
   ============================================================================ */

/*
Copy this into: src/Components/Layout/AnimatedModal.jsx

import React from "react";
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
    transition: { duration: 0.2 },
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
              <motion.button
                onClick={onClose}
                className="close-btn"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
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

/* ============================================================================
   8. TOAST NOTIFICATION COMPONENT
   ============================================================================ */

/*
Copy this into: src/Components/UI/Toast.jsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const toastVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const Toast = ({ message, type = "info", onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className={`toast toast-${type}`}
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <p>{message}</p>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>
    </motion.div>
  );
};

export default Toast;
*/

/* ============================================================================
   9. CSS FOR TOAST NOTIFICATIONS
   ============================================================================ */

/*
Add this to src/App.css:

.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.toast {
  background: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-left: 4px solid;
  animation: slideInRight 0.3s ease-out;
}

.toast-success {
  border-left-color: #28a745;
  background: rgba(40, 167, 69, 0.05);
}

.toast-error {
  border-left-color: #dc3545;
  background: rgba(220, 53, 69, 0.05);
}

.toast-warning {
  border-left-color: #ffc107;
  background: rgba(255, 193, 7, 0.05);
}

.toast-info {
  border-left-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

@media (max-width: 480px) {
  .toast-container {
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
*/

/* ============================================================================
   10. USAGE EXAMPLE IN FORM
   ============================================================================ */

/*
import React, { useState } from "react";
import AnimatedInput from "../Components/Forms/AnimatedInput";
import AnimatedButton from "../Components/Forms/AnimatedButton";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Your API call here
      console.log("Form submitted:", formData);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      
      <AnimatedInput
        name="email"
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        delay={0.1}
      />

      <AnimatedInput
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        delay={0.2}
      />

      <AnimatedButton
        type="submit"
        variant="primary"
        disabled={!formData.email || !formData.password}
        isLoading={isLoading}
        className="btn-block mt-lg"
      >
        {isLoading ? "Logging in..." : "Login"}
      </AnimatedButton>
    </form>
  );
};

export default LoginForm;
*/

/* ============================================================================
   END OF SNIPPETS
   ============================================================================ */
