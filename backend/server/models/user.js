const { mongoose } = require("../mongoose");

const user = mongoose.model(
  "user",
  new mongoose.Schema({
    username: String,
    pw: String,
  })
);

module.exports = user;
