const Customer = require("../model/customerModel");

// get the data of customers
const getCustomers = async (req, res) => {
    try {
        // get the data from database
        const customers = await Customer.find({})

        // if no data present
        if (!customers.length) {
            return res.status(200).json({ message: "No data present" })
        }

        // return the data in response
        res.status(200).json({ success: true, data: customers })

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Failed to get customers data" })
    }
}

// create the customer
const createCustomer = async (req, res) => {
    try {
        // get the data from request body
        const { name, email, number, date, address } = req.body

        // find the customer
        const customer = await Customer.findOne({ email: email })

        // if not present
        if (customer) {
            return res.status(400).json({ message: "Customer already exist with that email" })
        }

        // create new Customer
        const newCustomer = new Customer({
            name: name,
            email: email,
            number: number,
            date: date,
            address: address,
        })

        // save the data 
        await newCustomer.save()

        // response
        res.status(200).json({ success: true, message: "Customer created successfully!" })

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Failed to update the data of customer" })
    }
}

// update the customer data
const updateCustomer = async (req, res) => {
    try {
        // get the data from request body
        const id = req.body._id
        const { name, email, number, date, address } = req.body

        // find the customer
        const customer = await Customer.findOne({ _id: id })

        // if not present
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        // update the data
        customer.name = name
        customer.email = email
        customer.number = number
        customer.date = date
        customer.address = address

        // save the data 
        await customer.save()

        // response
        res.status(200).json({ success: true, message: "Customer data updated successfully!" })

    } catch (err) {
        res.status(400).json({ message: "Failed to update the data of customer" })
    }
}

const deleteCustomer = async (req, res) => {
    try {
        // get the id from request body
        const id = req.params.id
        console.log(id)

        // find and delete the customer
        await Customer.findByIdAndDelete({ _id: id })

        // response
        res.status(200).json({ success: true, message: "Customer deleted successfully!" })

    } catch (err) {
        res.status(400).json({ message: "Failed to delete the customer" })
    }
}

module.exports = { getCustomers, createCustomer, updateCustomer, deleteCustomer }