const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const customerSchema = require("../schemas/customerSchema");



// create a model using customerSchema
const Customer = new mongoose.model("Customer", customerSchema);



// GET A CUSTOMER
router.post("/aCustomer", async (req, res) => {
  // console.log(req.body)
  try {
    const data = await Customer.find({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({
      data: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There is a server side error!",
    });
  }
});





// ADD A CUSTOMER + REGISTER
router.post("/addCustomer", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newCustomer = new Customer({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      cart: req.body.cart,
      order: req.body.order,
      role: req.body.role,
      city: req.body.city,
      houseNum: req.body.houseNum,
      zip: req.body.zip,
      phone: req.body.phone,
    });

    await newCustomer.save();
    res.status(200).json({
      message: true,
    });
  } catch {
    res.status(500).json({
      message: false,
    });
  }
});




// USER EMAIL AVAILABILITY
router.post("/isEmailAvailable", async (req, res) => {
  try {
    const data = await Customer.find({ email: req.body.email });
    res.status(200).json({
      result: data.length,
    });
  } catch (err) {
    res.status(500).json({
      error: "There is a server side error!",
    });
  }
});

module.exports = router;
