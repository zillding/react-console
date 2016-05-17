import React from 'react'
import Helmet from 'react-helmet'

const Styles = () => (
  <Helmet
    link={[
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/styles/default.min.css' }
    ]}
    style={[{
      cssText: `
        .CodeMirror {
          height: auto;
        }

        .CodeMirror-lines {
          padding: 2px 0;
        }

        pre {
          margin: 0;
        }

        code.hljs {
          background: none;
          padding: 0;
        }
      `
    }]} />
)

export default Styles
