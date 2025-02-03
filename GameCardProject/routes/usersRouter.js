const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("hey");
});

router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        const user = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        const token = jwt.sign({ email, id: user._id }, "abcdef", {
          expiresIn: "1h",
        });
        res.cookie("token", token);
        res.send(user);
      });
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
