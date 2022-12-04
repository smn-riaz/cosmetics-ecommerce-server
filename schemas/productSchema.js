const mongoose = requie("mongoose")

const productSchema = mongoose.Schema({
    productId: {
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
    discountPrice:{
        type: Number
    },

    instock:{
        type: Number,
        required: true
    },
  
})


module.exports = productSchema