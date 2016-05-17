import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import { PromptIcon } from './Icons'

const iconStyle = {
  float: 'left',
  height: 9,
  marginTop: 5,
  marginLeft: 7,
  marginRight: 1,
}

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      history: [],
      index: 0,
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
        e.preventDefault()
        this._eval()
      }
    })
  }

  _addHistory(message) {
    this.setState({
      index: this.state.history.length + 1,
      history: [
        ...this.state.history,
        message
      ]
    })
  }

  _eval() {
    const { addMessage, clearMessages } = this.props
    const { value } = this.state
    const text = value.trim()
    if (!text) return

    this._addHistory(text)
    this.setState({ value: '' })

    if (text === 'clear') {
      return clearMessages()
    }

    try {
      addMessage('self', text)
      addMessage('eval', eval.call(window, text))
    } catch(err) {
      addMessage('error', err)
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

  render() {
    return (
      <div>
        <PromptIcon style={iconStyle} />
        <CodeMirror
          ref="editor"
          value={this.state.value}
          onChange={this._handleChange} />
      </div>
    )
  }
}

Input.propTypes = {
  addMessage: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
}
