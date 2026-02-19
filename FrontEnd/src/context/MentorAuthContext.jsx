import React, { createContext, useEffect, useState } from "react";

const MentorAuthContext = createContext();

export const MentorAuthProvider = ({ children }) => {
  // Mentor ke liye alag token key use kar rahe hain: 'mentorToken'
  const [mentorToken, setMentorToken] = useState(() => localStorage.getItem("mentorToken"));
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(Boolean(mentorToken));
  const [error, setError] = useState(null);

  const mentorLogout = () => {
    localStorage.removeItem("mentorToken");
    setMentorToken(null);
    setMentor(null);
    setError(null);
  };

  const fetchMentorProfile = async (tok = mentorToken) => {
    if (!tok) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/mentors/mentorRegister/mentorProfile", {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          mentorLogout();
        }
        throw new Error("Failed to fetch mentor profile");
      }

      const data = await res.json();
      // Mentor data structure handle kar rahe hain
      const mentorPayload = data?.mentor || data?.data || data;
      setMentor(mentorPayload);
    } catch (err) {
      console.error("Mentor Auth fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const mentorLogin = async (newToken) => {
    if (!newToken) return;
    localStorage.setItem("mentorToken", newToken);
   
    setMentorToken(newToken);
    await fetchMentorProfile(newToken);
  };

  useEffect(() => {
    if (mentorToken) {
      fetchMentorProfile();
    }
  }, []);

  return (
    <MentorAuthContext.Provider 
      value={{ mentor, mentorToken, mentorLogin, mentorLogout, loading, error }}
    >
      {children}
    </MentorAuthContext.Provider>
  );
};

export default MentorAuthContext;