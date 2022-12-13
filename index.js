const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const productHandler = require('./routeHandler/productHandler')
const customerHandler = require('./routeHandler/customerHandler')
const orderHandler = require('./routeHandler/orderHandler')

const port = process.env.PORT || 5000
require('dotenv').config()

// express app initialization
const app = express()


// use middleware
app.use(express.json())
app.use(cors())




// database connection through mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wohsqtl.mongodb.net/?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true
})
    .then(() => console.log("Connection successful"))
    .catch(err => console.log(err))



// application routes declare
app.use('/product', productHandler)
app.use('/customer', customerHandler)
app.use('/order', orderHandler)





// error handler
function errorHandler(err, req, res, next) {
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({error: err})
}

//running
app.get('/', (req, res) => {
    res.send('Hey, Welcome to Cosmetics Ecommerce Server API')
  })


//listening port 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})