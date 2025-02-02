const express = require("express");
const app = express();

const userModel = require("./model/user");
const postModel = require("./model/post");

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    username: "Raunak",
    age: 25,
    email: "raunakmishra1234@gmail.com",
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  const post = await postModel.create({
    postdata: "Hii this is my Post",
    user: "679bc1669c43476a0f41651d",
  });
  const user = await userModel.findOne({ _id: "679bc1669c43476a0f41651d" });
  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen(4000);
