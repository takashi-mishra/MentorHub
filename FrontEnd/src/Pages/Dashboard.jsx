import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css'; 
import { Video, Phone, Users, DollarSign, MessageSquare, Bell } from 'lucide-react';
import { io } from "socket.io-client"; // Socket import

// Socket connection initialization
const socket = io("http://localhost:5000");

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    // LocalStorage se mentorId uthao (Ensure karo login ke waqt ye save ho rahi ho)
    const mentorId = localStorage.getItem("mentorId"); 

    if (mentorId) {
      // 1. Mentor ko uske personal room mein join karwao
      socket.emit("join_room", mentorId);
      console.log("Joined socket room as mentor:", mentorId);

      // 2. Real-time Incoming Call Listener
      socket.on("incoming_call", (data) => {
        console.log("Socket signal received:", data);
        setIncomingCall(data);
        toast.info(`Incoming ${data.callType} call from ${data.userName}!`, {
            position: "top-right",
            autoClose: false, // Jab tak accept na kare alert rahe
        });
      });
    }

    return () => {
      socket.off("incoming_call");
    };
  }, []);

  const handleAccept = () => {
    // 3. Mentor ko chat page par bhejo same roomId ke saath
    navigate("/chat", {
      state: { callData: incomingCall, role: "mentor" }
    });
    setIncomingCall(null);
  };

  const handleDecline = () => {
    setIncomingCall(null);
    toast.dismiss();
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      {/* --- Real-time Incoming Call Popup --- */}
      <AnimatePresence>
        {incomingCall && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className={styles.callModal}
            style={{
                position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999,
                background: 'white', padding: '25px', borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '2px solid #6366f1',
                minWidth: '300px'
            }}
          >
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ background: '#eef2ff', padding: '12px', borderRadius: '50%', animation: 'pulse 2s infinite' }}>
                {incomingCall.callType === 'video' ? <Video color="#6366f1" /> : <Phone color="#6366f1" />}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#1a202c' }}>{incomingCall.userName}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#718096' }}>Wants to {incomingCall.callType} call...</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleAccept} 
                style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                Accept
              </button>
              <button 
                onClick={handleDecline} 
                style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                Decline
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={styles.header}>
        <div>
          <h1>Welcome back, Mentor! 👋</h1>
          <p>Real-time calls are now active.</p>
        </div>
        <div className={styles.notificationBell}>
          <Bell />
          <span className={styles.bellDot}></span>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <StatCard icon={<Users />} label="Total Students" value="24" type="blue" />
        <StatCard icon={<MessageSquare />} label="Active Chats" value="12" type="purple" />
        <StatCard icon={<DollarSign />} label="Earnings" value="$1,250" type="green" />
      </div>

      <div className={styles.mainGrid}>
        {/* Baaki ka aapka UI yahan as it is rahega */}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, type }) => (
  <div className={styles.card}>
    <div className={`${styles.iconBox} ${styles[type]}`}>{icon}</div>
    <div>
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  </div>
);

export default MentorDashboard;