const jwt = require("jsonwebtoken");

const JWT_SECRET = "84d9f7c2a94c4f0a87e621f2bdc6c91e8c4d59e3f79e2d1b38e91a0f3f46b2a1"; // ⚠️ move to process.env in production
const JWT_EXPIRES = "15m"; // token valid for 15 minutes

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
