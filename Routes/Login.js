const express = require("express");
const router = express.Router();
const data = require("../database");
const jwt = require("jsonwebtoken");
router.post("/loginapi", (req, res) => {
  //   console.log(req.body);

  // const username = req.body.username;
  // const password = req.body.password;
  const { username, password } = req.body;
  if (username == data.user.username) {
    if (password == data.user.password) {
      const userDetails = data.userData;
      const token = jwt.sign(userDetails, "mysecretkey");
      console.log(token);
      res.status(200).send({ token: token });
    } else {
      res.status(403).send({ msg: "Username or password is incorrect" });
    }
  } else {
    res.status(401).send({ msg: "User is not registered" });
  }
});
// //200 OK
// //401 Unauthorised
// //403 Forbidden
// //500 Internal server error

router.post("/forgotpassword", (req, res) => {});
module.exports = router;
