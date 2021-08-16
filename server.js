const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const { MONGO_URL } = require("./keys");

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () =>
  console.log("Connected to MongoCluster")
);
mongoose.connection.on("error", () =>
  console.log("MongoDB Connection Unsuccessfull")
);

app.listen(PORT, () => {
  console.log("Server is running on port : " + PORT);
});