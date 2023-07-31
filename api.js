const express = require("express");
const router = express.Router();

const login = require("./Routes/Login");
const products = require("./Routes/Products");
const user = require("./Routes/User");
router.use("/login", login);
router.use("/products", products);
router.use("/user", user);
module.exports = router;
