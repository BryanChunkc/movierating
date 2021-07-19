const { mongoose } = require("../mongoose");

const rating = mongoose.model(
  "rating",
  new mongoose.Schema({
    title: String,
    rating: Number,
    user: String,
  })
);

module.exports = rating;
