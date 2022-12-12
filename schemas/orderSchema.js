const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    orderId:{
        type: Number,
        required: true
    },
    orderDate:{
        type: Object,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    shippingAddress: {
        type:Object,
        required: true
    },
    orderProducts:{
        type: Array,
        required: true
    },
    deliveryStatus:{
        type: String,
        required: true
    },
    totalPayment:{
        type: Number,
        required: true
    },
    shippingPhone: {
        type: String
    }

    
})


module.exports = orderSchema