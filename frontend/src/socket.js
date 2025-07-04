// src/socket.js
import { io } from "socket.io-client";

const backendurl = import.meta.env.VITE_BACKEND_URL;

// 🚫 Yeh automatically connect na kare
const socket = io(backendurl, {
  autoConnect: false, // ✅ Isse manually control milega
});

export default socket;
