const mongoose = require("mongoose");

const server = "localhost:27017";
const database = "MovieRating";

mongoose
  .connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

module.exports = { mongoose };
