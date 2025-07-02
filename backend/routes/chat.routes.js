const express = require("express");
const router = express.Router();

const {
    listMessage
} = require("../controller/chat.controllers");

router.get("/message", listMessage);

module.exports = router;