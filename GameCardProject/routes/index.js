const express = require("express");
const productModel = require("../models/product.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const userModel = require("../models/user.model");
router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, user: true });
});

router.get("/shop", async (req, res) => {
  const products = await productModel.find();
  res.render("listofproducts", { products });
});

router.get("/wishlist/:id", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  res.render("cart", { user });
});

router.post("/cart/remove/:id", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  const productIndex = user.cart.findIndex(
    (product) => product._id.toString() === req.params.id
  );
  user.cart.splice(productIndex, 1);
  await user.save();

  res.redirect("/cart");
});

router.get("/myaccount", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  res.render("myaccount", { user });
});
module.exports = router;
