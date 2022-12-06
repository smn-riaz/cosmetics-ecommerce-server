const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    instock:{
        type: Number,
        required: true
    },
    tags:{
        type: Array,
        required: true
    },
    producttype:{
        type: String,
        required: true
    },
    description:{
        type: Array
    },
    category:{
        type: String,
        required: true
    }
  
})


module.exports = productSchema