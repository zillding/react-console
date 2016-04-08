import React, { Component, PropTypes } from 'react'
import ObjectInspector from 'react-object-inspector'

import { SelfIcon, EvalIcon, ErrorIcon, InfoIcon, WarnIcon } from './Icons'

const messageStyle = {
  borderBottom: '1px solid rgba(34,36,38,.06)',
  minHeight: 14,
  padding: '1.5px 20px',
  position: 'relative'
}

class Message extends Component {
  _getContent() {
    const { type, message } = this.props.data

    if (type === 'self') {
      return (
        <span>
          <Icon type="self"/>
          {message}
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

    if (type === 'warn') {
      return Object.assign({
        backgroundColor: '#FFFAE2',
        color: '#A9782C'
      }, messageStyle)
    }

    if (type === 'error') {
      return Object.assign({
        backgroundColor: '#FFDFDF',
        color: 'red'
      }, messageStyle)
    }

    if (type === 'self') {
      return Object.assign({}, messageStyle, {
        borderBottom: 'none'
      })
    }

    if (type === 'eval') {
      return Object.assign({}, messageStyle, {
        paddingTop: 2
      })
    }

    return messageStyle
  }

  render() {
    return (
      <div style={this._getStyle()}>
        {this._getContent()}
      </div>
    )
  }
}

Message.propTypes = {
  data: PropTypes.object.isRequired
}

export default Message

const iconStyle = {
  height: 11,
  position: 'absolute',
  left: 2,
  top: 4
}

const Icon = ({ type }) => {
  if (type === 'self') {
    const selfStyle = Object.assign({}, iconStyle, {
      height: 9,
      top: 5
    })
    return <SelfIcon style={selfStyle} />
  }

  if (type === 'eval') {
    const evalStyle = Object.assign({}, iconStyle, {
      height: 9,
      top: 4,
      left: 0
    })
    return <EvalIcon style={evalStyle} />
  }

  if (type === 'error') {
    return <ErrorIcon style={iconStyle} />
  }

  if (type === 'info') {
    return <InfoIcon style={iconStyle} />
  }

  if (type === 'warn') {
    return <WarnIcon style={iconStyle} />
  }

  return <span/>
}

function parseConent(content) {
  if (typeof content === 'string') {
    return content
  }

  return <ObjectInspector data={content} />
}
