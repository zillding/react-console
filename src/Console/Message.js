import React, { Component, PropTypes } from 'react'

const messageStyle = {
  borderBottom: '1px solid rgba(34,36,38,.15)',
  padding: '1px 18px',
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
          {message.stack}
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
  fontSize: 'small',
  position: 'absolute',
  left: 3,
  top: 2
}

const Icon = ({ type }) => {
  let style = null

  if (type === 'self') {
    style = Object.assign({
      color: 'grey'
    }, iconStyle)
    return <i className="fa fa-angle-right" style={style}></i>
  }

  if (type === 'error') {
    style = Object.assign({
      color: 'red'
    }, iconStyle)
    return <i className="fa fa-times-circle" style={style}></i>
  }

  if (type === 'info') {
    style = Object.assign({
      color: 'blue'
    }, iconStyle)
    return <i className="fa fa-info-circle" style={style}></i>
  }

  if (type === 'warn') {
    style = Object.assign({
      color: '#FFBE00'
    }, iconStyle)
    return <i className="fa fa-exclamation-triangle" style={style}></i>
  }

  return <span/>
}
