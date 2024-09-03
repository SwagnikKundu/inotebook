const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/noteRush";

const connectToMongoDb = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connectToMongoDb;
