import React, { Component, PropTypes } from 'react'

import { SelfIcon, ErrorIcon, InfoIcon, WarnIcon } from './Icons'

const messageStyle = {
  borderBottom: '1px solid rgba(34,36,38,.15)',
  padding: '1px 20px',
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
          {message.stack || message}
        </span>
      )
    }

    const content = message.map((s, index) => (
      <span key={index}>{s}</span>
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
