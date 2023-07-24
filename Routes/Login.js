const express = require("express");
const router = express.Router();
const data = require("../database");
const jwt = require("jsonwebtoken");
const Users = require("../Schema/UserSchema");
const nodemailer = require("nodemailer");
//Create operation to create a new user with first name, last name, age and course
router.post("/signup", async (req, res) => {
  const newUser = {
    Username: req.body.Username,
    Password: req.body.Password,
  };

  const user = new Users(newUser);

  const userAdded = await user.save();

  if (userAdded) {
    console.log(userAdded);
    console.log("New user added successfully");
  }
});
//Read operation
router.post("/getusers", async (req, res) => {
  const users = await Users.find({});

  if (users) {
    console.log(users);
  }

  const user = await Users.findOne({ Username: req.body.username });

  if (user) {
    console.log("single user " + user);
  }
});

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

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "kshitizagarwal27@gmail.com ",
    pass: "",
  },
});

const mailHtml =
  "<h1>Welcome to Letsupgrade</h1><ul><li>full stack</li><li>Data science</li></ul><img src='https://w7.pngwing.com/pngs/452/24/png-transparent-js-logo-node-logos-and-brands-icon.png' />";

router.post("/forgotpassword", async (req, res) => {
  const info = await transporter.sendMail({
    from: "kshitizagarwal27@gmail.com", // sender address
    to: "kshitizagarwal27@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: mailHtml, // html body
  });
});
module.exports = router;
