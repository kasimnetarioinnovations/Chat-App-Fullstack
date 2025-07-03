const express = require("express");
const app = express();
require('dotenv/config');
const cors = require('cors');
const mongoose = require("mongoose");
const UserRouter = require('./routes/users.routes');
const ChatRoutes = require('./routes/chat.routes');
const path = require('path');

app.use(express.json());
app.use(cors());

const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsOption));

mongoose.connect(process.env.MONGOOSE_URL)
.then( () => { console.log("MongoDB connected")})
.catch( (error) => { console.log(error)});

app.listen(process.env.PORT, () => { console.log(`server is running at - http://localhost:${process.env.PORT}`)});

app.use("/user", UserRouter);
app.use("/chat", ChatRoutes);
// Static folder to serve images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));