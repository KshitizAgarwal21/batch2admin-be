var express = require("express");
var app = express();
var fs = require("fs");
var PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server  started successfully at port " + PORT);
});

fs.readFile("./hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else console.log(data.toString().length);
});

fs.appendFile("./hello.txt", " new data to be added", (err) => {
  if (err) console.log(err);
  console.log("data added successfully");
});
fs.writeFile("./hello.txt", "new data", (err) => {
  console.log("data added successfully");
});
