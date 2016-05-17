import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

import Styles from './Styles'
import MessageList from './MessageList'
import Input from './Input'

const containerStyle = {
  fontFamily: 'monospace',
  fontSize: 'small',
  overflow: 'auto',
  padding: 2,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

class Console extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
    this._addMessage = this._addMessage.bind(this)
    this._clearMessages = this._clearMessages.bind(this)
  }

  componentDidMount() {
    this._setUp()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data.length === prevState.data.length) {
      return
    }

    // scroll to bottom
    findDOMNode(this.refs.input).scrollIntoView()
  }

  _addMessage(type, message) {
    this.setState({
      data: [
        ...this.state.data,
        { type, message }
      ]
    })
  }

  _clearMessages() {
    this.setState({ data: [] })
  }

  _generateNewMethod(method) {
    return (...args) => {
      // Call the old method
      this._oldConsole[method].apply(console, args)

      // Supported methods
      if (['log', 'info', 'error', 'warn', 'debug'].indexOf(method) === -1) {
        return
      }

      this._addMessage(method, args)
    }
  }

  _overrideMethod(method) {
    this._oldConsole[method] = console[method]
    console[method] = this._generateNewMethod(method)
  }

  _setUp() {
    this._oldConsole = {}
    for (let method in console) {
      this._overrideMethod(method)
    }
  }

  render() {
    return (
      <div style={containerStyle}>
        <Styles/>
        <div>
          <MessageList data={this.state.data} />
          <Input
            ref="input"
            addMessage={this._addMessage}
            clearMessages={this._clearMessages} />
        </div>
      </div>
    )
  }
}

export default Console
