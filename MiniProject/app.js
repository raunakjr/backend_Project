const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const upload = require("./config/multerconfig");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  const { username, name, age, password, email } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.redirect("/login?error=User already exist");
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const Newuser = await userModel.create({
        username,
        name,
        age,
        password: hash,
        email,
      });
      const token = jwt.sign({ email: email, userid: Newuser._id }, "shshsh");
      res.cookie("token", token);
    });
  });
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user)
    return res.redirect("/?error=User not found! Please register first.");
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: user.email, userid: user._id }, "shshsh");
      res.cookie("token", token);
      res.render("profile", { user });
    } else {
      res.redirect("/login?error=Incorrect Password! Please try again.");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");

  res.render("profile", { user });
});

app.post("/post", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  const post = await postModel.create({
    content: req.body.content,
    user: user._id,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("profile");
});

app.get("/delete/:id", async (req, res) => {
  await postModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/profile");
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.post("/update/:id", async (req, res) => {
  await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );

  res.redirect("/profile");
});

app.get("/profile/upload", (req, res) => {
  res.render("profileupload");
});

app.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  user.profilepic = req.file.filename;
  await user.save();
  res.redirect("/profile");
});

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) res.redirect("/login");
  else {
    let data = jwt.verify(token, "shshsh");
    req.user = data;
    next();
  }
}

app.listen(4000);
