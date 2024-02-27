const errorHandler = require("./error");
const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unathorized"));

  jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, user) => {
    if (err) next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};

module.exports = {
  verifytoken,
};
