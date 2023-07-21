const express = require("express");

const app = express();
const multer = require("multer");
const maxSize = 1048576; //maximum 10mb file is supported
app.listen(8081, (err) => {
  if (err) console.log(err);

  console.log("Server started successfully at port 8081");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
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
}).fields([{ name: "myFile1" }, { name: "myFile2" }]);
app.post("/upload", (req, res) => {
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
    } else console.log("file uploaded successfully");
  });
});
