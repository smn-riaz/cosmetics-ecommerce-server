const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    customerId:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cart:{
        type: Array,
    },
    order:{
        type:Array
    }

})


module.exports = customerSchema