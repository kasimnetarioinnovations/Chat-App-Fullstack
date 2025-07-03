const express = require("express");
const router = express.Router();
const { listUser, registerUser } = require("../controller/user.controllers");

router.get("/list", listUser);
router.post("/register", registerUser); // ✅ new route

module.exports = router;
