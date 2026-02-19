import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';

const ChatPage = () => {
  const { state } = useLocation();
  const { callData } = state || {};

  useEffect(() => {
    const init = async () => {
      const zimKit = new ZIMKitManager();
      // AppID and Secret (Inhe badal lena)
      await zimKit.init(12345678); 
      await zimKit.connectUser({
          id: callData.userId,
          name: callData.userName
      }, 'YOUR_SERVER_SECRET');
    };
    if(callData) init();
  }, [callData]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '10px', background: '#000', color: '#fff' }}>
            Chatting with: {callData?.mentorName}
        </header>
        <div style={{ flex: 1 }}>
            {/* Direct 1-on-1 conversation load karega */}
            <Common conversationID={callData?.mentorId} type={0} />
        </div>
    </div>
  );
};

export default ChatPage;