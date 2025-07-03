// src/socket.js
import { io } from "socket.io-client";

const backendurl = import.meta.env.VITE_BACKEND_URL;
const socket = io(backendurl);

export default socket;
