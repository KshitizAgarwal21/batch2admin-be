const http = require("http");
const url = require("url");
const os = require("os");
const fs = require("fs");
const cors = require("cors"); //Cross origin resource sharing
// console.log(os.platform());
// console.log(os.arch());
// console.log(os.hostname());
// console.log(os.type());
// console.log(os.userInfo());
//http module

//custom module
const myModule = require("./myModule");

console.log(myModule.getDate());
console.log(myModule.myMultiply(2, 3));
http
  .createServer((req, res) => {
    // console.log(req.url);

    var path = "http://localhost:8081";
    var api = path + req.url; // http://localhost:8080  + /login
    var q = url.parse(api, true);
    // console.log(q);
    // console.log(q.query.username);
    // console.log(q.search);

    if (req.url == "/login") {
      res.write("Login successfull");
    } else if (req.url == "/getproductlist") {
      res.write("Data");
    }
    // res.write(
    //   "Hello welcome to the tutorial on Node js http module by Letsupgrade"
    // );
    res.end();
  })
  .listen(8081);

//fs module

fs.readFile("./hello.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});

fs.appendFile("./hello.txt", "data appeneded successfully", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("data appended succesfully");
});

fs.open("./hello.txt", "w", (err, file) => {
  if (err) {
    console.log(err);
  }
  console.log("saved");
});
fs.writeFile("./hello.txt", "new content", (err) => {
  if (err) console.log(err);
});
