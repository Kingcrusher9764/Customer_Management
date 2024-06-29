const express = require("express")
const { getCustomers, updateCustomer, deleteCustomer, createCustomer } = require("../controller/customerController")

const router = express.Router()

router.get("/", getCustomers)
router.post("/", createCustomer)
router.put("/", updateCustomer)
router.delete("/:id", deleteCustomer)

module.exports = router