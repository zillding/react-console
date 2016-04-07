import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import './Console.css'
import MessageList from './MessageList'

const containerStyle = {
  fontFamily: 'monospace'
}

const iconStyle = {
  color: '#659CFF',
  float: 'left',
  fontSize: 'small',
  fontWeight: 'bold',
  marginTop: 5,
  marginRight: 5
}

class Console extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      history: []
    }
    this._handleChange = this._handleChange.bind(this)
  }

  componentDidMount() {
    this._editor = this.refs.editor.getCodeMirror()
    this._editor.on('keydown', (editor, e) => {
      if (e.keyCode === 13) {
        // enter is pressed, evaluate expression
        this._eval()
        e.preventDefault()
        this.setState({ value: '' })
      }
    })
    this._setUp()
  }

  _addMessage(type, message) {
    this.setState({
      history: [
        ...this.state.history,
        { type, message }
      ]
    })
  }

  _clearMessages() {
    this.setState({ history: [] })
  }

  _eval() {
    const { value } = this.state
    if (value.trim() === 'clear') {
      return this._clearMessages()
    }

    try {
      this._addMessage('self', value)
      eval(value)
    } catch(err) {
      this._addMessage('error', err)
    }
  }

  _handleChange(value) {
    this.setState({ value })
  }

  _setUp() {
    const types = ['log', 'info', 'error', 'warn']

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
    const { history } = this.state

    return (
      <div style={containerStyle}>
        <MessageList data={history} />
        <div>
          <i className="fa fa-terminal" style={iconStyle}></i>
          <CodeMirror
            ref="editor"
            value={this.state.value}
            onChange={this._handleChange} />
        </div>
      </div>
    )
  }
}

export default Console
