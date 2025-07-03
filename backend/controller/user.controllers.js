const UserModule = require('../models/user.models');

const listUser = async (req, res) => {
  try {
    const UserList = await UserModule.find();
    res.status(200).json({ user: UserList });
  } catch (error) {
    res.status(500).json({ message: "Failed to list users", error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const { id } = req.body;
    const UserProfile = await UserModule.findOne({ _id: id });
    res.status(200).json({ user: UserProfile });
  } catch (error) {
    res.status(500).json({ message: "Failed to list users", error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await UserModule.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new UserModule({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// ✅ New image upload controller
const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const fileName = req.file.filename;

    const updatedUser = await UserModule.findByIdAndUpdate(
      id,
      { image: fileName },
      { new: true }
    );

    res.status(200).json({ message: "Image uploaded", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

module.exports = {
  listUser,
  registerUser,
   uploadImage,
   profile
};
