const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,   // cannot be accessed with JS (more secure)
      secure: false, // only over HTTPS in production
      sameSite: "strict", // prevent CSRF
      maxAge: 15 * 60 * 1000 // 15 min in ms
    });

    res.cookie("id", user._id, {
      httpOnly: true,   // cannot be accessed with JS (more secure)
      secure: false, // only over HTTPS in production
      sameSite: "strict", // prevent CSRF
      maxAge: 15 * 60 * 1000 // 15 min in ms
    });

    res.json({ message: "User registered", token, user: user.username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const loginUser=async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,   // cannot be accessed with JS (more secure)
      secure: false, // only over HTTPS in production
      sameSite: "strict", // prevent CSRF
      maxAge: 15 * 60 * 1000 // 15 min in ms
    });
    res.cookie("id", user._id, {
      httpOnly: true,   // cannot be accessed with JS (more secure)
      secure: false, // only over HTTPS in production
      sameSite: "strict", // prevent CSRF
      maxAge: 15 * 60 * 1000 // 15 min in ms
    });
    res.json({ message: "Login successful", token, user: user.username, id: user._id});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.clearCookie("id", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};

module.exports = {loginUser, registerUser, logoutUser}