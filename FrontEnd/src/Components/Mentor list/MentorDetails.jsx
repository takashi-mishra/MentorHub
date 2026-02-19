import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import ReviewSection from "./ReviewSection";

import { motion } from "framer-motion";

import { Video, Phone, MessageCircle, MapPin, Briefcase, GraduationCap } from "lucide-react";

import { io } from "socket.io-client"; // 1. Socket.io Import



import styles from "./MentorDetails.module.css";



// 2. Socket connect (With CORS fix settings)

const socket = io("http://localhost:5000", {

  withCredentials: true,

  transports: ["websocket", "polling"]

});



const MentorDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchMentor = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(

          `http://localhost:3000/mentors/mentorRegister/specificmentor/${id}`,

          { headers: { Authorization: `Bearer ${token}` } }

        );

        if (res.data.success) setMentor(res.data.mentor);

      } catch (err) {

        console.error("Fetch error:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchMentor();

  }, [id]);



 const initiateCall = async (callType) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:3000/users/userRegister/sendCallData/${id}`,
      { callType, userId: "697dfb365fd04175c4df6faa", userName: "Yogesh Mishra" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const serverInfo = res.data.data?.data || res.data.data;

    if (res.data.success && serverInfo.roomId) {
      const formattedCallData = {
        roomId: serverInfo.roomId,
        userId: serverInfo.userId,
        userName: serverInfo.userName,
        callType: serverInfo.callType, // "video", "voice", ya "chat"
        mentorName: mentor?.name || "Mentor",
        mentorId: id 
      };

      // Real-time notification for mentor
      socket.emit("send_call_notification", formattedCallData);

      // Sabko /chat par bhejo, Chat.jsx callType ke hisab se UI change kar dega
      navigate("/chat", {
        state: { callData: formattedCallData, role: "user" }
      });
    }
  } catch (err) {
    console.error("Call initiation error:", err);
  }
};


  if (loading) return <div className={styles.wrapper}><h2>Loading Profile...</h2></div>;



  return (

    <div className={styles.wrapper}>

      {/* Baaki ka UI code same rahega... */}

      <motion.div

        initial={{ opacity: 0, scale: 0.95 }}

        animate={{ opacity: 1, scale: 1 }}

        className={styles.glassCard}

      >

        <div className={styles.profileHeader}>

          <div className={styles.avatarWrapper}>

            <img

              src={mentor?.profileThumbnail?.url || mentor?.profileThumbnail || "https://via.placeholder.com/180"}

              alt={mentor?.name}

              className={styles.profileImg}

            />

            {mentor?.isVerified && <div className={styles.badge}>VERIFIED MENTOR</div>}

          </div>



          <div className={styles.introText}>

            <h1>{mentor?.name}</h1>

            <p className={styles.tagline}>{mentor?.domain} Expert</p>

            <div className={styles.location}>

              <MapPin size={18} /> {mentor?.address || "Location not specified"}

            </div>

          </div>

        </div>



        <div className={styles.actionGrid}>

          <button onClick={() => initiateCall("video")} className={`${styles.actionBtn} ${styles.videoBtn}`}>

            <Video size={20} /> Video Call

          </button>

          <button onClick={() => initiateCall("voice")} className={`${styles.actionBtn} ${styles.voiceBtn}`}>

            <Phone size={20} /> Voice Call

          </button>

          <button onClick={() => initiateCall("chat")} className={`${styles.actionBtn} ${styles.chatBtn}`}>
            <MessageCircle size={20} /> Chat
          </button>

        </div>



        <div className={styles.contentGrid}>

          <div className={styles.mainBio}>

            <h3>About Myself</h3>

            <p>{mentor?.aboutYourself || "Professional mentor dedicated to helping students grow."}</p>

          </div>

          <div className={styles.sideInfo}>

            <div style={{marginBottom: '30px'}}>

               <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>

                 <Briefcase size={20}/> Experience

               </h3>

               <p style={{color: '#4a5568', fontWeight: '600'}}>{mentor?.yearOfExperience} Years</p>

            </div>

            <h3>Core Skills</h3>

            <div className={styles.skillCloud}>

              {mentor?.skills?.map((skill, index) => {

                const cleanSkill = String(skill).replace(/[\[\]"']/g, "");

                return <span key={index} className={styles.skillPill}>{cleanSkill}</span>

              })}

            </div>

          </div>

        </div>



        <div style={{marginTop: '50px', borderTop: '1px solid #edf2f7', paddingTop: '30px'}}>

          <ReviewSection mentorId={id} existingReviews={mentor?.review || []} />

        </div>

      </motion.div>

    </div>

  );

};



export default MentorDetails;