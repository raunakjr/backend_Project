const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await userModel.create({
        password: hash,
        username,
        email,
        age,
      });
      const token = jwt.sign({ email }, "shshshhshhsh");
      res.cookie("token", token);
      res.send(user);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("Something went wrong");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: user.email }, "shshshhshhsh");
      res.cookie("token", token);
      res.send(user);
    }
  });
});
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});
app.listen(3000);
