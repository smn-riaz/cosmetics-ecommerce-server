const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const orderSchema = require("../schemas/orderSchema")

const Order = new mongoose.model("Order", orderSchema);


// ADD A ORDER
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


//DELETE A ORDER
router.post("/deleteOrder", (req, res) => {
  Order.deleteOne({_id:req.body.id}, ((err) => {
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