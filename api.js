const express = require("express");
const router = express.Router();

const login = require("./Routes/Login");
const products = require("./Routes/Products");
router.use("/login", login);
router.use("/products", products);
module.exports = router;
