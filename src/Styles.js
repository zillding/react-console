import React from 'react'
import Helmet from 'react-helmet'

const Styles = ({ noFontawesome }) => {
  const links = [{
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/styles/default.min.css'
  }]
  if (!noFontawesome) {
    links.push({
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css'
    })
  }

  return (
    <Helmet
      link={links}
      style={[{
        cssText: `
          .react-console .CodeMirror {
            height: auto;
          }

          .react-console .CodeMirror-lines {
            padding: 2px 0;
          }

          .react-console pre {
            margin: 0;
          }

          .react-console code.hljs {
            background: none;
            padding: 0;
          }

          .react-console .line {
            border-bottom: 1px solid rgba(34,36,38,.06);
            min-height: 14px;
            padding: 1.5px 0 1.5px 20px;
            position: relative;
          }

          .react-console .line .fa {
            position: absolute;
            font-size: 0.8em;
            font-weight: bold;
            top: 3.5px;
            left: 2px;
          }

          .react-console input {
            font-family: monospace;
            border: none;
            width: 100%;
          }

          .react-console input:focus {
            outline: none;
          }
        `
      }]} />
  )
}

export default Styles
