const mongoose = require("mongoose");

//Schema -> A schema is similar to the columns that we should have in a table
// In mongodb we can say what properties our object should have

const schema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

//model -> When we need to do some orperations with the collection in our db, we
//need to reference it using mongoose, mongoose requires a model to work on it.

//create a model from the schema on which mongoose can operate
const Users = mongoose.model("User", schema);

//Users is an object of type schema
//Users = {
// "Username":value,
//"Password":value
//}
module.exports = Users;
