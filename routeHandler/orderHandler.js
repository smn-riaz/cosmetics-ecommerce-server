const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const orderSchema = require("../schemas/orderSchema")


router.post("/addOrder", (req,res) => {
    console.log(req.body)
    const newOrder = new Order(req.body)
    newOrder.save((err) => {
        if(err){
            res.status(500).json({
                error:"There is a server side error!"
            })
        } else{
            res.status(200).json({
                message: "Order Added Successfully"
            })
        }
    })
})

module.exports = router