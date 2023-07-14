exports.getDate = function () {
  var date = new Date();
  return date.toLocaleDateString().substring(0, 10);
};

exports.myMultiply = function (a, b) {
  return a * b;
};
