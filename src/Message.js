import React, { Component, PropTypes } from 'react'
import ObjectInspector from 'react-object-inspector'
import Highlight from 'react-highlight'

import Icon from './Icon'

class Message extends Component {
  _getContent() {
    const { type, message } = this.props.data

    if (type === 'self') {
      return (
        <span>
          <Icon type="self"/>
          <Highlight className="javascript">
            {message}
          </Highlight>
        </span>
      )
    }

    if (type === 'error') {
      return (
        <span>
          <Icon type="error"/>
          <ObjectInspector data={message.stack || message} />
        </span>
      )
    }

    if (type === 'eval') {
      return (
        <span>
          <Icon type="eval"/>
          <ObjectInspector data={message} />
        </span>
      )
    }

    const content = message.map((s, index) => (
      <span key={index}>{parseConent(s)}</span>
    ))

    if (type === 'info') {
      return (
        <span>
          <Icon type="info"/>
          {content}
        </span>
      )
    }

    if (type === 'warn') {
      return (
        <span>
          <Icon type="warn"/>
          {content}
        </span>
      )
    }

    if (type === 'debug') {
      return <span style={{color: 'blue'}}>{content}</span>
    }

    return (
      <span>{content}</span>
    )
  }

  _getStyle() {
    const { type } = this.props.data
    switch (type) {
      case 'warn':
        return {
          backgroundColor: '#FFFAE2',
          color: '#A9782C'
        }
      case 'error':
        return {
          backgroundColor: '#FFDFDF',
          color: 'red'
        }
      case 'eval':
        return { paddingTop: 2 }
      default:
        return {}
    }
  }

  render() {
    return (
      <div className="line" style={this._getStyle()}>
        {this._getContent()}
      </div>
    )
  }
}

Message.propTypes = {
  data: PropTypes.object.isRequired
}

export default Message

function parseConent(content) {
  if (typeof content === 'string') {
    return content
  }

  return <ObjectInspector data={content} />
}
