require("dotenv").config();
const mongoose = require("mongoose");

class Mongo {
  constructor() {
    this.createMongoConnection();
  }

  createMongoConnection() {
    mongoose.connect(
      process.env.MONGO_URL,
    );

    mongoose.connection.once("open", () => {
      console.log("MongoDB is connected");
    });
    mongoose.connection.on("error", () => {
      console.log("Error occurred in mongoDB connection");
    });
  }
}

module.exports = Mongo;