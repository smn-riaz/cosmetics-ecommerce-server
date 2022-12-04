const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")


const port = process.env.PORT || 4000
require('dotenv').config()


// express app initialization
const app = express()



// use middleware
app.use(express.json())
app.use(cors())



// error handler
function errorHandler(err, req, res, next){
    if(res.headerSend){
        return next(err)
    }
    res.status(500).json({error: err})
}



// listening port
app.listen(port,()=> {
    console.log(`Listening on Port ${port}`);
})
