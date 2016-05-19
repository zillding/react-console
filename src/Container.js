import React from 'react'

import Styles from './Styles'
import Console from './Console'

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

const Container = ({ noFontawesome, style }) => (
  <div
    className="react-console"
    style={Object.assign({}, containerStyle, style)}>
    <Styles noFontawesome={noFontawesome} />
    <Console/>
  </div>
)

export default Container
