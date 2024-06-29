const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/customerDB")
        .then(() => console.log("connected to DB"))
        .catch((err) => console.log("DB connection error: ", err))
}

module.exports = connectDB