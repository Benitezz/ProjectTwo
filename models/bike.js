const { fileLoader } = require('ejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bikeSchema = new Schema({
    name: String,
    model: String,
    price: Number,
    color: String,
    img: String,
    googleId: String

})

module.exports = mongoose.model('Bike', bikeSchema)
const Bike = mongoose.model("Bike", bikeSchema)
