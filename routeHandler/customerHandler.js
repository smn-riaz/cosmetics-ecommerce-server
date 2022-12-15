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
 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newCustomer = new Customer({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      cart: req.body.cart,
      order: req.body.order,
      role: req.body.role,
      phone: req.body.phone,
    });

    await newCustomer.save();
    res.status(200).json({
      message: true,
    });

    res.status(500).json({
      message: false,
    });

});



//DELETE CUSTOMER
router.post("/deleteCustomer", (req, res) => {
  Customer.deleteOne({_id:req.body.id}, ((err) => {
if(err){
    res.status(500).json({
        error:"There is a server side error!"
    })
} else{
    res.status(200).json({
        data: "Successfully Deleted"
    })
}
}))
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
        res.status(500).json({
            "error": "Authentication failed!"
        })
    }
  } else {
    res.status(500).json({
        "error": "Authentication failed!"
    })
  }
})


//ADD CART DATA
router.post("/addCart", (req, res) => {
  Customer.updateOne({email:req.body.email}, {
          cart: req.body.cartItems
  }, ((err) => {
      if(err){
          res.status(500).json({
              error:"There is a server side error!"
          })
      } else{
          res.status(200).json({
              data: "Successfully Carted"
          })
      }
  }))
})


// PLACE ORDER & CART BLANK
router.post("/addOrder", (req, res) => {
  Customer.updateOne({email: req.body.email}, {
     cart: [],
      $push: {
          order: req.body.order
      }
  }, ((err) => {
      if(err){
          res.status(500).json({
              error:"There is a server side error!"
          })
      } else{
          res.status(200).json({
              message:"Successfully Order Placed"
          })
      }
  }))
})


//GET ALL CUSTOMER
router.get("/allCustomer", (req,res)=> {
    
  Customer.find({},((err, data) =>{
      if(err){
          res.status(500).json({
              error: err
          })
      } else{
          res.status(200).json({
           data
          })
      }
  }))
})


module.exports = router;
