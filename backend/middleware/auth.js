const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Get token from headers
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({
      msg: "No token, authorization denied"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).send({ msg: "Token is not valid" });
  }
};

module.exports = auth;
