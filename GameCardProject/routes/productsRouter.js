const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product.model");
router.get("/", isLoggedIn, (req, res) => {
  res.send(req.user);
});

router.post("/create", upload.single("image"), async (req, res) => {
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  const image = req.file.buffer;

  const product = await productModel.create({
    image,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });

  res.redirect("/owners/admin");
});
module.exports = router;
