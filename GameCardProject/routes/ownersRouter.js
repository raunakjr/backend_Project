const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const { fullname, email, password } = req.body;
    console.log(req.body);
    let owners = await ownerModel.find();
    if (owners.length > 0)
      return res
        .status(504)
        .send("you don't have permission to create a new owner");

    let admin = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(admin);
  });
}

router.get("/", (req, res) => {
  res.send("hey owners");
});

router.get("/admin", (req, res) => {
  res.render("createproducts", { user: true });
});
module.exports = router;
