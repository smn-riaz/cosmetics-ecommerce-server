const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    orderId:{
        type: String,
        required: true
    },
    date:{
        type: String,
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
    shippingAddress:{
        type: String,
        required: true
    },
    orderProducts:{
        type:Array,
        required: true
    },
    deliveryStatus:{
        type:String,
        enum: ["Pending", "Done"],
        required: true
    },
    totalPayment:{
        type: Number,
        required: true
    }

    
})