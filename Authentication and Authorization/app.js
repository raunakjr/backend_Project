const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "rkm12@gmail.com" }, "secret");
  res.cookie("token", token);
  res.send("Hii my name is Raunak");
});

app.get("/read", (req, res) => {
  const data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
  res.send("read page");
});
app.get("/user/:id", (req, res) => {
  res.send(req.params.id);
});

app.listen(3000);
