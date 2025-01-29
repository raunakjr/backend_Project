const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hii this is my server");
});

const userModel = require("./usermodel");
app.get("/create", async (req, res) => {
  let Createduser = await userModel.create({
    name: "Raunak",
    email: "raunak12@gmail.com",
    username: "raunakjr",
  });
  res.send(Createduser);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "raunakjr" },
    { name: "Raunak Mishra" },
    { new: true }
  );
  res.send(updatedUser);
});
// find return array while findOne return obj , gives first found
app.get("/read", async (req, res) => {
  let Users = await userModel.find();

  res.send(Users);
});

//findOneAndDelete({ username: "raunakjr" })
app.get("/delete", async (req, res) => {
  let Users = await userModel.deleteMany({ username: "raunakjr" });

  res.send(Users);
});

app.listen(3000);
