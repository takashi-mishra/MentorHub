/*const Connection = require("../Models/CallSession");
const Message = require("../Models/message.model"); // ✅ ADD THIS

const onlineUsers = new Map(); // userId / mentorId -> socketId

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    ===============================
       USER / MENTOR ONLINE
       =============================== 
    socket.on("user-online", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.userId = userId; // store for disconnect
      console.log("Online users:", [...onlineUsers.keys()]);
    });

    ===============================
       CHAT MESSAGE
       =============================== 
    socket.on("send-message", async ({ to, from, message, senderRole }) => {
      // 🔹 Save message in DB (history)
      const savedMessage = await Message.create({
        senderId: from,
        receiverId: to,
        senderRole,
        message
      });

      // 🔹 Send message in real-time
      const receiverSocket = onlineUsers.get(to);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", savedMessage);
      }

      // 🔹 Optional: send back to sender for UI sync
      socket.emit("message-sent", savedMessage);
    });

     ===============================
       CALL REQUEST (AUDIO / VIDEO)
       =============================== 
    socket.on("call-user", async ({ to, from, type }) => {
      try {
        const connection = await Connection.create({
          userId: from,
          mentorId: to,
          type,
          status: "initiated"
        });

        const receiverSocket = onlineUsers.get(to);

        if (receiverSocket) {
          io.to(receiverSocket).emit("incoming-call", {
            from,
            type,
            connectionId: connection._id
          });
        } else {
          await Connection.findByIdAndUpdate(connection._id, {
            status: "missed"
          });
        }
      } catch (err) {
        console.error("Call-user error:", err.message);
      }
    });

    /* ===============================
       ACCEPT CALL
       =============================== 
    socket.on("accept-call", async ({ to, connectionId }) => {
      await Connection.findByIdAndUpdate(connectionId, {
        status: "accepted"
      });

      io.to(to).emit("call-accepted", { connectionId });
    });

    /* ===============================
       REJECT CALL
       =============================== 
    socket.on("reject-call", async ({ to, connectionId }) => {
      await Connection.findByIdAndUpdate(connectionId, {
        status: "rejected",
        endedAt: new Date()
      });

      io.to(to).emit("call-rejected");
    });

    /* ===============================
       END CALL
       =============================== 
    socket.on("end-call", async ({ connectionId }) => {
      await Connection.findByIdAndUpdate(connectionId, {
        status: "ended",
        endedAt: new Date()
      });
    });

    /* ===============================
       DISCONNECT
       =============================== 
    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
      }
      console.log("User disconnected:", socket.id);
    });
  });
};
*/