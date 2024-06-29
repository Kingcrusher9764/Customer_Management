const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const connectDB = require("./utils/db")

dotenv.config()
connectDB()

const customerRoute = require("./route/customerRoute")

// server variable setup
const app = express()
const PORT = process.env.PORT || 7000

// server setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "*", credentials: true }))

// status route 
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "It is a api to fetch data from database" })
})

// route
app.use("/api", customerRoute)

// server listener
app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})
