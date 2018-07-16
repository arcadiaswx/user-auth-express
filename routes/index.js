var express = require("express");
var router = express.Router();
var User = require("../models/user");

// Get /login
router.get("/login", function(req, res, next) {
  return res.render("login", { title: "Log In" });
});

// Post /login
router.post("/login", function(req, res, next) {
  if (req.body.email && req.body.password) {
  } else {
    var err = new Error("Email and password are required.");
    err.status = 401;
    return next(err);
  }
});

// Get /register
router.get("/register", function(req, res, next) {
  return res.render("register", { title: "Sign Up" });
});

// Post /register
router.post("/register", function(req, res, next) {
  if (
    req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword
  ) {
    // Confirm that the user typed the same password twice.
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error("Passwords do not match.");
      err.status = 400;
      return next(err);
    }

    // Create object with from input
    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password
    };

    // Use Schema's `create` method to insert document into Mongo
    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        res.redirect("/profile");
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

// GET /
router.get("/", function(req, res, next) {
  return res.render("index", { title: "Home" });
});

// GET /about
router.get("/about", function(req, res, next) {
  return res.render("about", { title: "About" });
});

// GET /contact
router.get("/contact", function(req, res, next) {
  return res.render("contact", { title: "Contact" });
});

module.exports = router;
