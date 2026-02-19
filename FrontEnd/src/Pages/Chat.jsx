import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import styles from "./Chat.module.css"; 

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meetingRef = useRef(null);
  const hasJoinedRef = useRef(false);
  const zpRef = useRef(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { callData, role = "user" } = location.state || {};

  useEffect(() => {
    if (!callData) {
      console.error("Error: callData is missing!");
      navigate("/");
      return;
    }

    if (!meetingRef.current || hasJoinedRef.current) return;
    hasJoinedRef.current = true;

    const myMeeting = async () => {
      try {
        const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
        const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

        const zegoUserId = `${role}_${callData.userId || "user_" + Math.floor(Math.random() * 1000)}`;
        const zegoUserName = role === "mentor" ? (callData.mentorName || "Mentor") : (callData.userName || "User");

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          String(callData.roomId),
          zegoUserId,
          zegoUserName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;

        // Check if it's a pure chat session
        const isPureChat = callData.callType === "chat";

        zp.joinRoom({
          container: meetingRef.current,
          roomID: callData.roomId,
          scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
          
          // Audio-Video logic based on callType
          turnOnCameraWhenJoining: callData.callType === "video",
          turnOnMicrophoneWhenJoining: !isPureChat, // Chat mein mic off
          
          // UI Buttons Control
          showMyCameraToggleButton: !isPureChat,    // Chat mein cam button hide
          showMyMicrophoneToggleButton: !isPureChat, // Chat mein mic button hide
          showAudioVideoSettingsButton: !isPureChat, // Settings hide
          showScreenSharingButton: !isPureChat,      // Screen share hide
          showTextChat: true,                         // Chat hamesha dikhegi
          showUserList: false,
          
          // Layout optimization
          layout: isPureChat ? "Sidebar" : "Auto", 
          
          showPreJoinView: false,
          onJoinRoom: () => {
            setIsConnecting(false);
          },
          onLeaveRoom: () => {
            navigate("/");
          }
        });
      } catch (err) {
        console.error("Zego Error:", err);
        setIsConnecting(false);
      }
    };

    myMeeting();

    return () => {
      if (zpRef.current) zpRef.current.destroy();
      hasJoinedRef.current = false;
    };
  }, [callData, navigate, role]);

  return (
    <div className={styles.callWrapper}>
      {isConnecting && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Connecting to {callData?.callType === "chat" ? "Chat" : "Call"}...</p>
        </div>
      )}
      <div ref={meetingRef} className={styles.videoContainer} />
    </div>
  );
};

export default Chat;