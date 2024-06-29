import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form/Form'
import newRequest from './utils/newRequest'
import Message from './components/Message/Message'

function App() {

  // state to store customers data
  const [customersData, setCustomersData] = useState([])

  // state to store customers or customer data to edit
  const [customers, setCustomers] = useState([])
  const [editData, setEditData] = useState({})

  // states to make add form and edit form visible or invisble
  const [add, setAdd] = useState(false)
  const [form, setForm] = useState(false)
  const [message, setMessage] = useState("")

  // function to show filtered customers
  const filterCustomers = (e)=>{
    // get the query
    var query = e.target.value

    // check if the query is present or not
    if(!query){
      return setCustomers(customersData)
    }

    // lowercase the query
    query = query.toLowerCase()

    // filter out the customers which contain the query either in their name or email
    var cust = customersData.filter(customer => customer.name.toLowerCase().includes(query) || customer.email.toLowerCase().includes(query))

    // set the customers to filtered data
    setCustomers(cust)
  }

  // function to close and open, the add or edit form
  const toggleAdd = ()=>setAdd(!add)
  const toggleEdit = ()=>setForm(!form)
  const closeMessage = ()=>setMessage("")

  // function to add or edit the customers
  const addCustomer = async (data)=>{
    
    try {
      // make a request to the server to add a new customer
      const resp = await newRequest.post("api/", data)
      
      // show message
      setMessage(resp.data.message)

      // fetch the data again to make it up to date
      getCustomersData()

    } catch (err) {
      console.log(err)
    }
    
    // close the form
    toggleAdd()
  }
  const editSubmit = async (data)=>{
      try {
        // make a request to server to update the data 
        const resp = await newRequest.put("api/", data)

        // show message
        setMessage(resp.data.message)

        // update the state data 
        getCustomersData()
      } catch (err) {
        console.log(err)
      }
      toggleEdit()
  }
  const deleteCustomer = async (id)=>{
    try {
      // make a request to the server to delete the customer
      const resp = await newRequest.delete(`api/${id}`)

      // show message
      setMessage(resp.data.message)

      // update the state data
      getCustomersData()
    } catch (err) {
      console.log(err)
    }
  }

  // function to get the customers data
  const getCustomersData = async ()=>{
    try {
      const result = await newRequest.get("api/")
      
      if(result.data.data){
        setCustomersData(result.data.data)
        setCustomers(result.data.data)
      }

    } catch (err) {
      console.log(err)
    }
  }
  // function to get the customer data to edit
  const loadEditData = async (id)=>{
      // variable to store customer data to edit
      var customerData = customersData.find(customer=> customer._id === id)

      // return if no customer with id found
      if(!customerData){
          return
      }

      // set the edit data
      setEditData(customerData)
      // open the edit form
      toggleEdit()
  }

  // useEffect to run some function on loading
  useEffect(()=>{
    // load the customers data first
    getCustomersData()
  }, [])

  return (
    <main className='container' >

      {/* nav section */}
      <nav className='navbar' >

        <div className='logo' >
          Customer Management
        </div>

        <div className='navList' >
          {/* search input */}
          <input 
          type="text" 
          name='query'
          id='query'
          onChange={filterCustomers}
          placeholder='Search customers...'
          />

          {/* add customer button */}
          <button onClick={toggleAdd} >
            Add Customer
          </button>

          {/* show the add form if "add" state is true */}
          {add && <Form 
          title={"Add Customer"}
          subTitle={"Enter the details for the new customer"}
          closeAction={toggleAdd} 
          submitAction={addCustomer}
          buttonLabel={"Add"}
          />}
        </div>

      </nav>

      {/* message section */}
      {message && <Message 
        message={message}
        closeAction={closeMessage}
      />}

      {/* data section */}
      <section>

        {/* table section */}

        <div className="table_section">

        {/* edit form */}
        {form && <Form
            title={"Edit Customer"}
            subTitle={"Update the customer details"}
            customerData={editData}
            closeAction={toggleEdit}
            submitAction={editSubmit}
            buttonLabel={"Save"}
        />}

          <div className='table_container' >
              <table className='table' >

                  <thead className='table_head' >

                      <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Date of Birth</th>
                          <th>Address</th>
                          <th>Actions</th>
                      </tr>

                  </thead>

                  <tbody className='table_body' >
                      
                      {(customers.length > 0) && customers.map((row)=>(
                          <tr key={`row${row._id}`} >    
                              <td>{row.name}</td>
                              <td>{row.email}</td>
                              <td>{row.number}</td>
                              <td>{row.date}</td>
                              <td>{row.address}</td>

                              <td className='actions' >

                                  <button onClick={()=>{
                                      loadEditData(row._id)
                                  }} >
                                      <img src="/icons/edit.svg" alt="edit" />
                                  </button>

                                  <button onClick={()=>{
                                    deleteCustomer(row._id)
                                  }} >
                                      <img src="/icons/delete.svg" alt="delete" />
                                  </button>

                              </td>
                          </tr>
                      ))}

                  </tbody>

              </table>
          </div>
        </div>

      </section>
      
    </main>
  )
}

export default App
