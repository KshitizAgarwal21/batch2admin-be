const jwt = require("jsonwebtoken");

const RouteGuard = (req, res, next) => {
  try {
    const isValid = jwt.verify(req.headers.authorization, "mysecretkey");
    if (isValid) {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({ msg: "unauthorised" });
  }
};

module.exports = RouteGuard;
