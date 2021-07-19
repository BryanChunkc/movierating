const fetch = require("node-fetch");
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");

const rating = require("./models/rating");
const user = require("./models/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    methods: ["GET", "PUT", "POST"],
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "*"],
  })
);

app.use(
  session({
    secret: "log into movie rating system",
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/MovieRating",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600 * 1000,
      secure: false,
      httpOnly: false,
      sameSite: "lax",
    },
  })
);

app.get("/signout", async (req, res) => {
  console.log("said out");
  delete req.session.loggedin;
  delete req.session.user;
  res.send("leave");
});

app.get("/test", async (req, res) => {
  if (req.session.loggedin == true) {
    res.send({ loggedin: "true" });
  }
});

app.get("/movie", async (req, res) => {
  if (req.session.loggedin == true) {
    const url =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=113c7f5dffed89574dffaa2a18ff9ce0&page=1";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    let userrated = await rating.find({
      user: req.session.user,
    });
    let array = [];
    for (let i = 0; i < data.results.length; i++) {
      for (let j = 0; j < userrated.length; j++) {
        if (data.results[i].title == userrated[j].title) {
          data.results[i].rating = userrated[j].rating;
          array.push(data.results[i]);
        } else {
          array.push(data.results[i]);
        }
      }
    }
    let user = req.session.user;
    res.send({ data, user });
    //console.log(data);
  } else {
    res.send({ loggedin: "false" });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body.username, req.body.pw);
  let reged = await user.findOne({
    username: req.body.username,
    pw: req.body.pw,
  });
  if (reged) {
    req.session.user = req.body.username;
    req.session.loggedin = true;
    res.send({ ver: "true" });
  } else {
    res.send({ ver: "false" });
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body.username);
  let reged = await user.findOne({
    username: req.body.username,
  });
  if (reged || req.body.username == "") {
    res.send({ allow: "false" });
  } else {
    const result = new user(req.body);
    await result.save();
    res.send({ allow: "true" });
  }
});

app.post("/rate", async (req, res) => {
  console.log(req.body.title, req.body.rating);
  console.log(req.session.loggedin);
  if (req.session.loggedin == true) {
    let rated = await rating.findOne({
      title: req.body.title,
      user: req.session.user,
    });
    if (rated) {
      let gotrating = req.body.rating;
      const resultupdate = await rating.updateOne(
        { title: req.body.title, user: req.session.user },
        { rating: req.body.rating }
      );
      res.send({ rating: gotrating });
    } else {
      const result = new rating({
        title: req.body.title,
        rating: req.body.rating,
        user: req.session.user,
      });
      await result.save();
    }
  } else {
    res.send({ loggedin: "false" });
  }
});

app.listen(3001, () => {
  console.log("listening 3001");
});
