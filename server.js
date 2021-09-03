const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const { MONGO_URL } = require("./keys");
const organizerRoute = require("./routes/EventOrganizer/organizerRoutes.js");

app.use(cors());
app.use(express.json());

app.use("/api/organizer", organizerRoute);

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

//user routes
app.use("/api", require("./routes/User/userRoutes"));

//user enquiry routes
app.use("/api", require("./routes/User/userEnquiryRoutes"));

//user property owaner routes
app.use("/api/propertyOwner", require("./routes/Owner/ownerRoutes"));

//admin routes
app.use("/api/admin", require("./routes/Admin/adminRoutes"));

app.listen(PORT, () => {
  console.log("Server is running on port : " + PORT);
});
