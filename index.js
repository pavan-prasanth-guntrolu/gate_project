const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    secret: "our little secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://pavanprasanth48850:Testnithin1$@cluster0.a0q7kmg.mongodb.net/?retryWrites=true&w=majority/gateDB",
  {
    useNewUrlParser: true,
  }
);

const credSchema = new mongoose.Schema({
  user: String,
  pass: String,
});

credSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", credSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, function () {
  console.log("the server is running on port 3000");
});

//cookies and sessions

//the first package we want to configure is express-sessions

// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
//passport-local we can leave without importing because it will be dependecies packages of passport-local-mongoose

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

//use the above code after all app.use and above the mongodb.connect

//that code is simply the configuration of sessions

//about secret,uninitialized,resave options below
//https://chat.openai.com/share/101a3e57-1af8-40be-94b1-0973d590746f

//now after sessions we need to use passport js

//now to use passport the first thing we want to do is to we should initialize it

//app.use(passport.initialize())

//this line initialize passport to use it

//now we should tell our passport to also setup session

//app.use(passport.session())

//now we should add passport-local-mongoose as plugin to our schema

//after creating schema just add

// credSchema.plugin(passportLocalMongoose);

//now we want to create local strategy to authenticate with username and password

//next we want to serialize and deserialize them which means serialize will stuff all the information and send to server and then deserialize which means it breaks and validate user info things now we are use passport-local-mongoose these three steps can be done by passport-local-mongoose package these three lines should be written after creating model

//passport.use(Model.createStrategy())

//passport.serializeUser(Model.serializeUser())

//passport.deserializeUser(Model.deserializeUser())

//now if you get any deprecation warning then write mongoose.set("useCreateIndex",true) after mongoose connection

//now we need to setup register and login post routes

//we are going to use passport local package for this.

app.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + "/main.html");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.get("/mycourse", function (req, res) {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + "/course.html");
  } else {
    res.redirect("/login");
  }
});

app.get("/course-name", async function (req, res) {
  const course_name = await User.findOne({ _id: "64fc6c904f024f17f30952fb" });
  res.send(course_name);
});

app.get("/video-page", function (req, res) {
  res.sendFile(__dirname + "/video-page.html");
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/signup", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/signup");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
});

// app.get("/sign-up", function (req, res) {
//   res.sendFile(__dirname + "/sign-up.html");
// });

// app.post("/login-data", async function (req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = new User({
//     user: username,
//     pass: password,
//   });

//   const response = await User.findOne({
//     user: username,
//   });
//   if (response?.user === username && response?.pass === password) {
//     res.redirect("/home");
//   } else {
//     res.redirect("/sign-up");
//   }
// });

// app.post("/signup-data", async function (req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = new User({
//     user: username,
//     pass: password,
//   });
//   const updated = await User.create({
//     user: username,
//     pass: password,
//   });
//   const response = await User.findOne({
//     user: username,
//   });
//   if (response?.user === username && response?.pass === password) {
//     res.redirect("/");
//   } else {
//     res.redirect("/sign-up");
//   }
// });
