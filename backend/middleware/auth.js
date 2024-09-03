const jwt = require("jsonwebtoken");
const JWT_SECRET_TOKEN = "fh?P26#sU:NP5s4";

const authUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    res
      .status(401)
      .json({ error: "Please enter a token", msg: "Access denied" });
  try {
    const data = jwt.verify(token, JWT_SECRET_TOKEN);
    req.user = data.user;

    next();
  } catch (error) {
    res
      .status(401)
      .json({
        error: "Please authenticate using valid token",
        msg: "Access denied",
      });
  }
};

module.exports = authUser;
