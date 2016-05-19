import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import Console from '../index'

storiesOf('React Console', module)
  .add('default view', () => (
    <Console/>
  ))
  .add('not load fontawesome', () => (
    <Console noFontawesome={true} />
  ))
  .add('custom styles', () => {
    const style = {
      backgroundColor: 'yellow',
      width: 500,
      height: 300,
    }
    return (
      <Console style={style} />
    )
  })
