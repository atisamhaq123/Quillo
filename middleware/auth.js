const jwt = require("jsonwebtoken");
const JWT_SECRET = "84d9f7c2a94c4f0a87e621f2bdc6c91e8c4d59e3f79e2d1b38e91a0f3f46b2a1"; // same secret

function authMiddleware(req, res, next) {
  const token = req.cookies.token; // 👈 read from cookie
  if (!token) {
     res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
     res.redirect("/login");
  }
}

module.exports = authMiddleware;
