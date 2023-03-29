const http = require("http");
const app = require("./routes/user");
const connectToDB = require("./db-connection/mongoDb");
const PORT = process.env.PORT || 9110;

http.createServer(app).listen(PORT, () => {
  new connectToDB();

  console.log(`Server is running on port no ${PORT}`);
});
