import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default socket;
// Note: Make sure the URL matches the mentor service URL in your gateway configuration.
