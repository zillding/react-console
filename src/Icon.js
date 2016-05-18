import React from 'react'
import FontAwesome from 'react-fontawesome'

const Icon = ({ type }) => {
  switch (type) {
    case 'prompt':
      return (
        <FontAwesome
          name="terminal"
          fixedWidth={true}
          style={{top: 6, color: '#1565CC'}} />
      )
    case 'self':
      return (
        <FontAwesome
          name="angle-right"
          fixedWidth={true}
          style={{color: 'grey'}} />
      )
    case 'eval':
      return (
        <FontAwesome
          name="angle-double-left"
          fixedWidth={true}
          style={{color: 'grey'}} />
      )
    case 'error':
      return (
        <FontAwesome
          name="times-circle"
          fixedWidth={true}
          style={{color: 'red'}} />
      )
    case 'info':
      return (
        <FontAwesome
          name="info-circle"
          fixedWidth={true}
          style={{color: 'blue'}} />
      )
    case 'warn':
      return (
        <FontAwesome
          name="exclamation-triangle"
          fixedWidth={true}
          style={{color: '#EAC500'}} />
      )
    default:
      return <span/>
  }
}

export default Icon
