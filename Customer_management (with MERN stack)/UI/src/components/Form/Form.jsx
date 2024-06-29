import React, { useEffect, useState } from 'react'
import "./Form.css"

const Form = ({title, subTitle, customerData, closeAction, submitAction, buttonLabel}) => {

    // state to store form data
    const [data, setData] = useState({
        name: "",
        email: "",
        number: "",
        date: "",
        address: "",
    })
    // state to show message
    const [message, setMessage] = useState("")

    // function to handle the form submission
    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(!data.name || !data.email || !data.number || !data.date || !data.address){
            setMessage("Please provide all the data!")
            return
        }

        submitAction(data)
    }

    // function to handle the input changes
    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    // useEffect to set data
    useEffect(()=>{
        if(customerData){
            setData(customerData)
        }
    }, [])

  return (
    <div className='form_page' >

        {/* form container */}
        <div className="form_container" onSubmit={handleSubmit} >
            {/* form title */}
            <span className='form_title' >
                <span>
                    <h1>{title}</h1>
                    <p>{subTitle}</p>
                </span>

                <span className='close_button' onClick={closeAction} >
                    &times;
                </span>
            </span>

            {message && <span className='message' >
                    <span>
                        {message}
                    </span>

                    <span 
                    className='msg_close_btn'
                    onClick={()=>setMessage("")}
                    >&times;</span>
                </span>}

            {/* form input fields */}
            <form className='form' >
                
                {/* name field */}
                <span>
                    <label htmlFor="name">Name</label>
                    <input 
                    onChange={handleChange} 
                    value={data.name}
                    type="text" name='name' id='name' />
                </span>

                {/* email field */}
                <span>
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={handleChange} 
                    value={data.email}
                    type="email" name='email' id='email' />
                </span>

                {/* phone field */}
                <span>
                    <label htmlFor="number">Phone</label>
                    <input 
                    onChange={handleChange} 
                    value={data.number}
                    type="text" name='number' id='number' />
                </span>

                {/* date field */}
                <span>
                    <label htmlFor="date">Date of Birth</label>
                    <input 
                    onChange={handleChange} 
                    value={data.date}
                    type="date" name='date' id='date' />
                </span>

                {/* address field */}
                <span>
                    <label htmlFor="address">Address</label>
                    <input 
                    onChange={handleChange} 
                    value={data.address}
                    type="text" name='address' id='address' />
                </span>

                {/* buttons section */}
                <span>
                    <button type='submit' >
                        {buttonLabel}
                    </button>

                    <button onClick={closeAction} >
                        Cancel
                    </button>
                </span>
            </form>
        </div>
    </div>
  )
}

export default Form