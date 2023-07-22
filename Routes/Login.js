const express = require("express");
const router = express.Router();
const data = require("../database");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
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

const smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "myemail ",
    pass: "mypass",
  },
});
router.post("/forgotpassword", async (req, res) => {
  const info = await transporter.sendMail({
    from: "kshitizagarwal27@gmail.com", // sender address
    to: "kshitizagarwal27@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
});
module.exports = router;
