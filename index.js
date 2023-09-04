const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://pavanprasanth48850:Testnithin1$@cluster0.a0q7kmg.mongodb.net/gateDB",
  {
    useNewUrlParser: true,
  }
);

const credSchema = new mongoose.Schema({
  user: String,
  pass: String,
});

const User = mongoose.model("user", credSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/main.html");
});

app.get("/sectionone", function (req, res) {
  res.sendFile(__dirname + "/sectionone.html");
});

app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/main.html");
});

app.get("/sign-up", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.post("/login-data", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({
    user: username,
    pass: password,
  });

  const response = await User.findOne({
    user: username,
  });
  if (response?.user === username && response?.pass === password) {
    res.redirect("/home");
  } else {
    res.redirect("/sign-up");
  }
});

app.post("/signup-data", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({
    user: username,
    pass: password,
  });
  const updated = await User.create({
    user: username,
    pass: password,
  });
  const response = await User.findOne({
    user: username,
  });
  if (response?.user === username && response?.pass === password) {
    res.redirect("/");
  } else {
    res.redirect("/sign-up");
  }
});

app.listen(3000, function () {
  console.log("the server is running on port 3000");
});
