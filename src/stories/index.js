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
