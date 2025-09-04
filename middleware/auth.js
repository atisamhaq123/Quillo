const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // same secret

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
