const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const productSchema = require("../schemas/productSchema")


const Product = new mongoose.model("Product", productSchema)


// ADD NEW PRODUCTS
router.post("/addProducts", async(req, res) => {

   await Product.insertMany(req.body, (err) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error"
            })
        } else{
            res.status(200).json({
                message: "Successfully inserted"
            })
        }
    })
})


// GET ALL PRODUCTS
router.get("/allProduct", (req,res)=> {
    
    Product.find({},((err, data) =>{
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


// GET A PRODUCT
router.get("/:productId", async (req, res) => {
  
    try {
      const data = await Product.find({ 
        id: req.params.productId });
      res.status(200).json({
        res: data[0]
      });
    } catch (err) {
      res.status(500).json({
        error: "There is a server side error!",
      });
    }
  });


// ADD NEW PRODUCT
router.post("/addProduct", (req, res) => {
    const newProduct = new Product(req.body)
    newProduct.save((err)=> {
        if(err){
            res.status(500).json({
                error: err
            })
        } else{
            res.status(200).json({
                message:"Successfully Product Added"
            })
        }
    })
})



// UPDATE A PRODUCT DETAILS
router.post("/updateProduct",(req,res) =>{
    Product.updateOne({_id:req.body.productId},
        {$set:req.body},((err, data) => {
            if(err){
                res.status(500).json({
                    error: err
                })
            } else{
                res.status(200).json({
                    message: "Updated Successfully"
                })
            }
        }))
})



// DELETE A PRODUCT
router.delete("/deleteProduct", (req, res) =>{
    Product.deleteOne({_id: req.body._id},((err) => {
        if(err){
            res.status(500).json({
                error: err
            })
        } else{
            res.status(200).json({
                message:"Deleted Successfully"
            })
        }
    }))
})

module.exports = router