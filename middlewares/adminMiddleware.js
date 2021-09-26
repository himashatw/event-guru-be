const jtw = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jtw.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const { _id } = payload;
    req.user.id = _id;
    next();
  });
};
