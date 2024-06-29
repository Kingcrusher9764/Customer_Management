import React from 'react'
import"./Message.css"

const Message = ({message, closeAction}) => {
  return (
    <div className='message_container' >
        <div className="message_box">
            <span className='message_info' >
                {message}
            </span>

            <span
            className='close_button'
            onClick={closeAction}
            >&times;</span>
        </div>
    </div>
  )
}

export default Message