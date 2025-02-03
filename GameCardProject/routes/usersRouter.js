const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const upload = require("../config/multer-config");
router.get("/", (req, res) => {
  res.send("hey");
});

router.post("/register", upload.single("picture"), async (req, res) => {
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
      req.flash("error", "You already have an account, please login.");
      return res.redirect("/");
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          req.flash("error", "Something went wrong!");
          return res.redirect("/");
        }

        const newUser = await userModel.create({
          contact,
          fullname,
          email,
          password: hash,
          picture: req.file.buffer,
        });

        req.flash("success", "Registration successful! Please log in.");
        res.redirect("/");
      });
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    req.flash("error", "User doesn't exist. Sign up to login.");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: user.email }, "abcdef");
      res.cookie("token", token);

      req.flash("success", "Login successful!");
      return res.redirect("/");
    } else {
      req.flash("error", "Wrong password or email.");
      return res.redirect("/");
    }
  });
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = router;
