const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const { Server } = require('socket.io'); // Added Socket.io
const app = require('./Src/app'); 
const DatabaseConnection = require('./SRC/Database/DB');

DatabaseConnection();

const port = process.env.PORT || 8000;

const server = http.createServer(app);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Real-time signaling logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Jab Mentor login karega, wo is room ko join karega apni ID se
  socket.on("join_room", (userId) => {
    socket.join(userId);
    console.log(`User/Mentor joined room: ${userId}`);
  });

  // User se call data aayega aur Mentor ko forward hoga
  socket.on("send_call_notification", (data) => {
    // data contains: mentorId, roomId, userName, callType
    io.to(data.mentorId).emit("incoming_call", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});