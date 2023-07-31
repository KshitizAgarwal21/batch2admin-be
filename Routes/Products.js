const express = require("express");
const router = express.Router();
const multer = require("multer");
const maxSize = 1048576; //maximum 10mb file is supported
const ProductDetail = require("../Schema/Productschema");
const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];

    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "jpeg" ||
    file.mimetype.split("/")[1] === "pdf"
  ) {
    cb(null, true);
  } else {
    cb(new multer.MulterError(-1), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).single("myFile");

router.post("/getproductlist", async function (req, res) {
  const decodeToken = jwt.verify(req.headers.authorization, "mysecretkey");
  console.log(req.body);

  const products = await ProductDetail.find({ userid: decodeToken.uid });

  if (products) {
    res.status(200).send(products);
  } else {
    res.status(200).send({ msg: "No data found" });
  }
});

router.post("/addproductmedia", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.errno) {
        if (err.errno == -2) {
          console.log("invalid folder path");
        }
      } else {
        if (err.code == -1) {
          console.log("Invalid file type");
        }
      }
    } else {
      console.log("file uploaded successfully");
      console.log(req.file);
      res
        .status(200)
        .send({ msg: "upload successfull", path: req.file.path.substring(9) });
    }
  });
});

router.post("/addproductdata", async (req, res) => {
  const decodeToken = jwt.verify(req.headers.authorization, "mysecretkey");
  console.log("hello " + decodeToken.uid);
  const {
    name,
    weight,
    size,
    category,
    description,
    price,
    tags,
    sku,
    imageUrl,
  } = req.body;

  // const id = Math.random() * 100;
  const product = {
    userid: decodeToken.uid,
    id: Math.ceil(Math.random() * 1000),
    Name: name,
    Price: price,
    Description: description,
    Category: category,
    Tags: tags,
    SKU: sku,
    Properties: {
      Weight: weight,
      Sizes: size,
    },
    image: imageUrl,
  };

  const newProduct = new ProductDetail(product);

  const productAdded = await newProduct.save();

  if (productAdded) {
    console.log("new product added successfully");
    res.status(200).send({ msg: "Product added successfully" });
  }
});

router.put("/editproductdata", async (req, res) => {
  const { id, Category, Description, Name, Price, SKU, Sizes, Tags, Weight } =
    req.body;

  const findAndUpdateItem = await ProductDetail.findOneAndUpdate(
    { id: id },
    {
      Category: Category,
      Description: Description,
      Name: Name,
      Price: Price,
      "Properties.Sizes": Sizes,
      "Properties.Weight": Weight,
      Tags: Tags,
    }
  );

  if (findAndUpdateItem) {
    console.log(findAndUpdateItem);
    console.log("updated data");
  }
});

router.delete("/deleteproductdata", async (req, res) => {
  const decodeToken = jwt.verify(req.headers.authorization, "mysecretkey");

  const uid = decodeToken.uid;

  const { id, Category, Description, Name, Price, SKU, Sizes, Tags, Weight } =
    req.body;
  console.log(req.body);
  const isDeleted = await ProductDetail.deleteOne({ userid: uid, id: id });

  if (isDeleted.deletedCount) {
    console.log(isDeleted);
    res.status(200).send({ msg: "data deleted " });
  } else {
    res.status(401).send({ msg: "issue occured" });
  }
});

module.exports = router;
