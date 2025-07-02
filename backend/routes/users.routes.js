const express = require("express");
const router = express.Router();

const {
    listUser
} = require("../controller/user.controllers");

router.get("/list", listUser);

module.exports = router;