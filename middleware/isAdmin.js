const User = require('../models/user');
const isAdminMiddleware = function isAdminMiddleware(req, res, next) {
    const userId = req.cookies.id;
    User.findById(userId).then((user)=>{
     if (user.role !== "admin") {
        return res.status(403).send("Not Admin"); // proper status code
      }
    else {
        next();
    }
});
}

module.exports = isAdminMiddleware;

