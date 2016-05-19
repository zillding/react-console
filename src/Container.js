import React from 'react'

import Styles from './Styles'
import Console from './Console'

const style = {
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

const Container = ({ noFontawesome }) => (
  <div className="react-console" style={style}>
    <Styles noFontawesome={noFontawesome} />
    <Console/>
  </div>
)

export default Container
