const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./db");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes"));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
