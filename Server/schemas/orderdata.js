const mongoose = require('mongoose')
const orders = new mongoose.Schema({
    product_id:Number,
    quantity:Number,
    Address:String,
    pincode:Number,
    payment:String
});
module.exports = orders