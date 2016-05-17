import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import debounce from 'debounce'

import MessageList from './MessageList'
import Input from './Input'

class Console extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
    this._addMessage = this._addMessage.bind(this)
    this._clearMessages = this._clearMessages.bind(this)

    this._buffer = []
    this._updateData = debounce(this._updateData, 100)
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
    this._buffer.push({ type, message })
    this._updateData()
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

  _updateData() {
    if (this._buffer.length > 0) {
      const data = [
        ...this.state.data,
        ...this._buffer
      ]
      this.setState({ data })
      this._buffer = []
    }
  }

  render() {
    return (
      <div>
        <MessageList data={this.state.data} />
        <Input
          ref="input"
          addMessage={this._addMessage}
          clearMessages={this._clearMessages} />
      </div>
    )
  }
}

export default Console
