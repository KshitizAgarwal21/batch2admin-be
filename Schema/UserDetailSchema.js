const mongoose = require("mongoose");

//Schema -> A schema is similar to the columns that we should have in a table
// In mongodb we can say what properties our object should have

const schema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

const UserDetails = mongoose.model("UserDetail", schema);

module.exports = UserDetails;
