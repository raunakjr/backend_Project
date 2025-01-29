const express = require("express");
const app = express();
const userModel = require("./usermodel");
const path = require("path");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", async (req, res) => {
  let Createduser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
  });
  res.redirect("/read");
});

app.get("/read", async (req, res) => {
  let allusers = await userModel.find();
  res.render("read", { allusers });
});
app.get("/clear", async (req, res) => {
  await userModel.deleteMany({}); // Deletes all users
  res.send("All users have been deleted.");
});

app.get("/delete/:id", async (req, res) => {
  const deletedUser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
  const { name, image, email } = req.body;
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, image, email }
  );

  res.redirect("/read");
});

app.listen(3000);
