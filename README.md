# React Console

A react component that hijacks the developer console

It can be placed anywhere in the page. The position of the compoennt is 'absolute'.

So it needs a parent dom node to determine its position and size.

## Installation

```bash
git clone https://github.com/zillding/react-console.git
cd react-console
npm install
npm start
open http://localhost:3000
```

Transforms are enabled for files inside `src` (except `index.js`).

## Supported console API

+ log
+ debug
+ error
+ warn
+ info

## Features

+ Show console messages
+ Eval js code
+ Typed code history
+ Clear console
