const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    name:{
        type: Array,
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
    },
    role:{
        type:String,
        enum:['customer', 'admin']
    },

    phone: {
        type: String,
        required: true
    }

})


module.exports = customerSchema