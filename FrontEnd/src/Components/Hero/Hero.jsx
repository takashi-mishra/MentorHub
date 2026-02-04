import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      // User ko search page par bhej rahe hain query ke saath
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Find Your Perfect <span>Mentor</span>
        </h1>
        <p className={styles.subtitle}>
          Connect with industry experts and accelerate your career growth
        </p>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search your Niche (e.g. JavaScript, Python)"
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <button className={styles.ctaBtn} onClick={handleSearch}>
          Explore Mentors →
        </button>

        {/* Stats Section remains same */}
      </div>
    </section>
  );
};

export default Hero;