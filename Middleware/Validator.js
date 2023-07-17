const Validator = (req, res, next) => {
  const { username, password } = req.body;

  if (username == null || password == null) {
    console.log("empty");
    res.status(400).send({ msg: "empty data" });
  } else {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //username@domain.com
    if (username.match(mailformat)) {
      next();
    } else {
      console.log("inavlid username format");
      res.status(400).send({ msg: "username is invalid format" });
    }
  }
};

module.exports = Validator;
