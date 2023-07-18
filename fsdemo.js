const { json } = require("express");
var express = require("express");
var app = express();
var fs = require("fs");
var PORT = process.env.PORT;
const { user } = require("./database");
const { userData } = require("./database");
function updateData() {
  console.log(user);

  user.username = "test";
  console.log(JSON.stringify(user));
  const finalString =
    "user = " +
    JSON.stringify(user) +
    ";" +
    " " +
    "userData = " +
    JSON.stringify(userData) +
    ";" +
    " " +
    "module.exports = { user, userData };";

  console.log(finalString);

  fs.writeFile("./database.js", finalString, (err) => {
    if (err) console.log(err);
    else console.log("updated");
  });
}
