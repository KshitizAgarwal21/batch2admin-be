const express = require("express");
const router = express.Router();
const data = require("../database");
const jwt = require("jsonwebtoken");
const { CategorySales, ProductSold } = require("../Schema/CategoryWiseSales");

router.get("/chart1Data", async (req, res) => {
  const decodeToken = jwt.verify(req.headers.authorization, "mysecretkey");

  const data = await CategorySales.find({ userid: decodeToken.uid });

  if (data) {
    res.status(200).send(data);
  }
});

router.post("/chart2Data", async (req, res) => {
  const decodeToken = jwt.verify(req.headers.authorization, "mysecretkey");

  const data = await ProductSold.find({
    userid: decodeToken.uid,
    category: req.body.category,
  });

  if (data) {
    res.status(200).send(data);
  }
});

module.exports = router;
