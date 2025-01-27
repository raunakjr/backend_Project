const express = require("express");
const app = express();
const fs = require("fs");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, myfiles) {
    res.render("index", { Files: myfiles });
  });
});

app.post("/create", (req, res) => {
  //   console.log(req.body);
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, file_data) {
      res.render("show", {
        Filename: req.params.filename,
        content: file_data,
      });
    }
  );
});

app.post("/edit", (req, res) => {
  console.log(req.body);
  fs.rename(
    `files/${req.body.Previous_FileName}`,
    `./files/${req.body.New_FileName}`,
    function (err) {
      res.redirect("/");
    }
  );
});

app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});
app.listen(3000);
