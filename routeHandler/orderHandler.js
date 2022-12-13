const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const orderSchema = require("../schemas/orderSchema")

const Order = new mongoose.model("Order", orderSchema);



router.post("/addOrder", async(req,res) => {
    // console.log(req.body);
    try {
        const newOrder = new Order(req.body);

        await newOrder.save();
        res.status(200).json({
          message: true,
        })
      } catch {
        res.status(500).json({
          message: false,
        });
      }
})


// GET ALL ORDER
router.get("/allOrder", (req,res)=> {
    
  Order.find({},((err, data) =>{
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

module.exports = router