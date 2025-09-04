function checkLoginMiddleware(req, res, next) {
  const token = req.cookies.token; // 👈 read from cookie

  if (token) {
    return res.redirect("/blogs"); // stop execution after redirect
  }

  next(); // continue to login/register routes if no token
}

module.exports = checkLoginMiddleware;
