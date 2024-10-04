const express = require("express");
const { registerRender, homePage } = require("../controllers/indexController");
const router = express.Router();
const LocalStrategy = require("passport-local");
const passport = require("passport");
const userModel = require("../models/userModel");
const { isLoggedIn } = require("../middlewares/authMiddleware");
passport.use(new LocalStrategy(userModel.authenticate()));

// POST /login route
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

// GET /logout route
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

// POST /register route
router.post("/register", (req, res, next) => {
  const userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
  });

  userModel.register(userdata, req.body.password, function (err, user) {
    console.log(err);
    passport.authenticate("local")(req, res, function () {
      res.redirect("/home");
    });
  });
});

/* GET / register */
router.get("/", (req, res, next) => {
  res.render("index", { title: "hellllo" });
});

/* GET /home */
router.get("/home", isLoggedIn, (req, res, next) => {
  res.render("home");
});

/* GET /login */
router.get("/login", (req, res, next) => {
  res.render("login");
});

module.exports = router;
