const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const customerSchema = require("../schemas/customerSchema");
const jwt = require("jsonwebtoken")



// create a model using customerSchema
const Customer = new mongoose.model("Customer", customerSchema);


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




// USER SIGN IN
router.post("/signin", async(req, res) => {
  const user = await Customer.find({email: req.body.email})
  if(user && user.length > 0 ){
    const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)
    if(isValidPassword){
        res.status(200).json({
            result: user[0]
          });
    } else {
        req.status(401).json({
            "error": "Authentication failed!"
        })
    }
  } else {
    req.status(401).json({
        "error": "Authentication failed!"
    })
  }
})



module.exports = router;
