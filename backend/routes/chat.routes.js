const express = require("express");
const router = express.Router();

const {
    sendMessage,
    listMessage
} = require("../controller/chat.controllers");

router.post("/sendmsg", sendMessage);
router.post("/messages", listMessage);

module.exports = router;