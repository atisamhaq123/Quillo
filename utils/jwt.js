const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "15m"; // token valid for 15 min , fallback

// Generate token
function generateToken(user) {
  return jwt.sign(
    { id: user._id}, // payload
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

// Verify token
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
