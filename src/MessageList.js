import React, { Component, PropTypes } from 'react'

import Message from './Message'

class MessageList extends Component {
  render() {
    const { data } = this.props

    return (
      <div>
        {
          data.map((message, index) => (
            <Message
              key={index}
              data={message} />
          ))
        }
      </div>
    )
  }
}

MessageList.propTypes = {
  data: PropTypes.array.isRequired
}

export default MessageList
