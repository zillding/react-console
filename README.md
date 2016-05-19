[![Stories in Ready](https://badge.waffle.io/zillding/react-console.png?label=ready&title=Ready)](https://waffle.io/zillding/react-console)
# React Console

A react component that hijacks the developer console

It can be placed anywhere in the page. The position of the compoennt is 'absolute'.

So it needs a parent dom node to determine its position and size.

## Dependencies

+ react

This need to be installed in the containing project

## Get Started

```bash
npm install --save @zillding/react-console
```

```js
import Console from '@zillding/react-console'

// Drop the component anywhere
<Console/>
```

## Properties

+ **noFontawesome**: boolean

  This component load css from [cdnjs](https://cdnjs.com/) dynamically. If containing app already
loads [fontawesome](http://fontawesome.io/get-started/), then pass `true` to this property to prevent
it from loading.

## Development

```bash
git clone https://github.com/zillding/react-console.git
cd react-console
npm install
npm start
```

Storybook is started on port 9010.

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
