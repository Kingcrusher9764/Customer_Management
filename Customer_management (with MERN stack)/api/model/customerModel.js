const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    number: {
        type: String,
    },
    date: {
        type: String,
    },
    address: {
        type: String,
    }
})

const Customer = mongoose.model("customers", customerSchema)

module.exports = Customer