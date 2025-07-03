const express = require("express");
const router = express.Router();

const {
    sendMessage,
    listMessage,
    getLastMessage
} = require("../controller/chat.controllers");

router.post("/sendmsg", sendMessage);
router.post("/messages", listMessage);
router.post("/last-message", getLastMessage);

module.exports = router;