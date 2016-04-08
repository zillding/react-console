import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import './Console.css'
import MessageList from './MessageList'

import { PromptIcon } from './Icons'

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

const iconStyle = {
  float: 'left',
  height: 12,
  marginTop: 6,
  marginRight: 5
}

class Console extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      data: [],
      history: [],
      index: 0
    }
    this._handleChange = this._handleChange.bind(this)
  }

  componentDidMount() {
    this._editor = this.refs.editor.getCodeMirror()
    this._editor.on('keydown', (editor, e) => {
      if (e.keyCode === 38 || e.keyCode === 40) {
        // up or down is pressed, go to prev or next message
        const index = e.keyCode === 38 ? this._getPrevIndex() : this._getNextIndex()
        this.setState({
          index,
          value: this.state.history[index] || ''
        })
      }

      if (e.keyCode === 13) {
        // enter is pressed, evaluate expression
        this._eval()
        e.preventDefault()
        this.setState({ value: '' })
      }
    })
    // override console methods
    this._setUp()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data.length === prevState.data.length) {
      return
    }

    // scroll to bottom
    this.refs.input.scrollIntoView()
  }

  _addHistory(message) {
    this.setState({
      index: this.state.index + 1,
      history: [
        ...this.state.history,
        message
      ]
    })
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

  _eval() {
    const { value } = this.state
    if (!value) return

    this._addHistory(value)

    if (value.trim() === 'clear') {
      return this._clearMessages()
    }

    try {
      this._addMessage('self', value)
      this._addMessage('eval', eval(value))
    } catch(err) {
      this._addMessage('error', err)
    }
  }

  _getNextIndex() {
    const { index, history } = this.state
    return index < history.length ? index + 1 : index
  }

  _getPrevIndex() {
    const { index } = this.state
    return index === 0 ? 0 : index - 1
  }

  _handleChange(value) {
    this.setState({ value })
  }

  _setUp() {
    const types = ['log', 'info', 'error', 'warn', 'debug']

    types.forEach(type => {
      const proxyKey = `oooo-${type}`
      console[proxyKey] = console[type]
      console[type] = (...args) => {
        this._addMessage(type, args)
        console[proxyKey](...args)
      }
    })
  }

  render() {
    const options = {
      mode: 'javascript'
    }
    const { data } = this.state

    return (
      <div style={containerStyle}>
        <div>
          <MessageList data={data} />
          <div ref="input">
            <PromptIcon style={iconStyle} />
            <CodeMirror
              ref="editor"
              value={this.state.value}
              onChange={this._handleChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default Console
