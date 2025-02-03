const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

app.use(flash());
app.use(
  session({
    secret: "abcdef", // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Optional: Set session expiry time
  })
);
app.use((req, res, next) => {
  res.locals.messages = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
});

const db = require("./config/mongoose-connection");
app.set("view engine", "ejs");

const homeRouter = require("./routes/index");
const ownerRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/", homeRouter);
app.use("/owners", ownerRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
