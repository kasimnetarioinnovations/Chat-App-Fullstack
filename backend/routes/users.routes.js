const express = require("express");
const router = express.Router();
const { listUser, registerUser,uploadImage, profile } = require("../controller/user.controllers");
const multer = require("multer");
const path = require("path");


// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

router.get("/list", listUser);
router.post("/register", registerUser); //  new route
router.post("/upload/:id", upload.single("image"), uploadImage);
router.post("/profile", profile);


module.exports = router;
