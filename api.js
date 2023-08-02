const express = require("express");
const router = express.Router();

const login = require("./Routes/Login");
const products = require("./Routes/Products");
const user = require("./Routes/User");
const sales = require("./Routes/Sales");
router.use("/login", login);
router.use("/products", products);
router.use("/user", user);
router.use("/sales", sales);
module.exports = router;
