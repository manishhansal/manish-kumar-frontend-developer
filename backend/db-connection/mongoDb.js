require("dotenv").config();
const mongoose = require("mongoose");

class Mongo {
  constructor() {
    this.createMongoConnection();
  }

  createMongoConnection() {
    mongoose.connect(
      //`mongodb://10.0.5.193:27017/funduSocial`
      // `mongodb+srv://funduSocial:SpxDaz3xgvxlCnhE@fundusocial.bfqmivh.mongodb.net/funduSocial`
      `mongodb+srv://fundu_data:0bVU92cXNcoX0DIk@fundusocial.bfqmivh.mongodb.net/funduSocial`
      // "mongodb://localhost:27017/funduprod"
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