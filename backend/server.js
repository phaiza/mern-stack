const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const usersRouter = require("./routes/users");
const exerciseRouter = require("./routes/exercises");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.use("/users", usersRouter);
app.use("/exercises", exerciseRouter);

app.get("/", function(req, res) {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established.");
  });
});
