const express = require("express");
const router = express.Router();
const data = require("../database");
const jwt = require("jsonwebtoken");
const UserDetails = require("../Schema/UserDetailSchema");

router.get("/getaccountholderinfo", async (req, res) => {
  const decodeToken = jwt.verify(req.headers.authorization, "mysecretkey");
  console.log(decodeToken.uid);
  if (decodeToken) {
    const userData = await UserDetails.findOne({ userid: decodeToken.uid });
    console.log(userData);
    if (userData) {
      res.status(200).send(userData);
    }
  }
});

module.exports = router;
