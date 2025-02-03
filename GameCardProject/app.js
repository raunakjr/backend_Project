const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");

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
