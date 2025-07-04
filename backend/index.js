// const express = require("express");
// const app = express();
// require('dotenv/config');
// const cors = require('cors');
// const mongoose = require("mongoose");
// const UserRouter = require('./routes/users.routes');
// const ChatRoutes = require('./routes/chat.routes');
// const path = require('path');


// app.use(express.json());
// app.use(cors());

// const corsOption = {
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// };
// app.use(cors(corsOption));

// mongoose.connect(process.env.MONGOOSE_URL)
// .then( () => { console.log("MongoDB connected")})
// .catch( (error) => { console.log(error)});

// app.listen(process.env.PORT, () => { console.log(`server is running at - http://localhost:${process.env.PORT}`)});

// app.use("/user", UserRouter);
// app.use("/chat", ChatRoutes);
// // Static folder to serve images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));         

// //Socket.io online-offiline methood
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// let onlineUsers = new Set();

// io.on("connection", (socket) => {
//   socket.on("user-connected", (userId) => {
//     onlineUsers.add(userId);
//     io.emit("update-user-status", [...onlineUsers]);
//   });

//   socket.on("disconnect", () => {
//     onlineUsers.forEach((id) => {
//       if (socket.id === id) {
//         onlineUsers.delete(id);
//       }
//     });
//     io.emit("update-user-status", [...onlineUsers]);
//   });

//   socket.on("user-disconnected", (userId) => {
//     onlineUsers.delete(userId);
//     io.emit("update-user-status", [...onlineUsers]);
//   });
// });

// const express = require("express");
// const app = express();
// require('dotenv/config');
// const cors = require('cors');
// const mongoose = require("mongoose");
// const UserRouter = require('./routes/users.routes');
// const ChatRoutes = require('./routes/chat.routes');
// const path = require('path');
// const http = require("http"); // ✅ Required for socket.io
// const server = http.createServer(app); // ✅ create HTTP server



// const corsOption = {
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// };
// app.use(cors(corsOption));
// app.use(express.json());

// // DB Connection
// mongoose.connect(process.env.MONGOOSE_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.log(error));

// // Routes
// app.use("/user", UserRouter);
// app.use("/chat", ChatRoutes);

// // Static folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ✅ Socket.io setup
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// let onlineUsers = new Set();

// io.on("connection", (socket) => {
//      socket.on("send-message", ({ sender, receiver, content }) => {
//     io.to(receiver).emit("receive-message", { sender, content, timestamp: new Date() });
//   });
//   socket.on("user-connected", (userId) => {
//     socket.userId = userId;
//     onlineUsers.add(userId);
//     io.emit("update-user-status", [...onlineUsers]);
//   });

//   socket.on("disconnect", () => {
//     if (socket.userId) {
//       onlineUsers.delete(socket.userId);
//     }
//     io.emit("update-user-status", [...onlineUsers]);
//   });

//   socket.on("user-disconnected", (userId) => {
//     onlineUsers.delete(userId);
//     io.emit("update-user-status", [...onlineUsers]);
//   });
// });

// // ✅ Start server with `server.listen` (not app.listen)
// server.listen(process.env.PORT, () => {
//   console.log(`Server is running at http://localhost:${process.env.PORT}`);
// });


 

//   // Join room based on user ID
//   socket.on("join", (userId) => {
//     socket.join(userId);
//   });



const express = require("express");
const app = express();
require('dotenv/config');
const cors = require('cors');
const mongoose = require("mongoose");
const UserRouter = require('./routes/users.routes');
const ChatRoutes = require('./routes/chat.routes');
const path = require('path');
const http = require("http");
const server = http.createServer(app); // create server
const Message = require('./models/Message'); // Add at top

// Setup CORS
const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsOption));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGOOSE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Routes
app.use("/user", UserRouter);
app.use("/chat", ChatRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Socket.io setup
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // or use process.env.FRONTEND_URL
  },
});

let onlineUsers = new Set();

io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  // ✅ Join room
  socket.on("join", (userId) => {
    if (!userId) return;
    socket.join(userId);
    socket.userId = userId;
    onlineUsers.add(userId);
    io.emit("update-user-status", [...onlineUsers]);
  });

  // ✅ Handle message
//   socket.on("send-message", ({ sender, receiver, content }) => {
//     io.to(receiver).emit("receive-message", {
//       sender,
//       content,
//       timestamp: new Date(),
//     });
//   });
socket.on("send-message", async ({ sender, receiver, content }) => {
  try {
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();

    io.to(receiver).emit("receive-message", {
      sender,
      content,
      timestamp: newMessage.timestamp,
    });

    // Optionally notify sender that message was sent
    socket.emit("message-sent", newMessage._id);

  } catch (error) {
    console.error("Message send error:", error);
    socket.emit("error-message", "Failed to send message.");
  }
});

  // ✅ Disconnect
  socket.on("disconnect", () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
    }
    io.emit("update-user-status", [...onlineUsers]);
  });

  socket.on("user-disconnected", (userId) => {
    onlineUsers.delete(userId);
    io.emit("update-user-status", [...onlineUsers]);
  });
});

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
