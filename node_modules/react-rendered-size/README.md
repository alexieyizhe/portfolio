# react-rendered-size

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg"/>
<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>

Get the rendered size of a React element without needing to render it

## Table of contents
* [What it is](#what-it-is)
* [What it isn't](#what-it-isnt)
* [Usage](#usage)
* [API](#api)
  * [getRenderedSize](#getrenderedsizereactelement-containerwidth-containeroptions)
  * [getRenderedHeight](#getrenderedsizereactelement-containerwidth-containeroptions)
  * [getRenderedWidth](#getrenderedsizereactelement-containerwidth-containeroptions)
* [Browser support](#browser-support)
* [Development](#development)

## What it is

This will render a `ReactElement` inside a dummy container outside of the window so that the rendered `height` and `width` (based on the `width` passed) can be calculated. This most common use case for this is for virtually rendered elements (such as items in [react-virtualized](https://github.com/bvaughn/react-virtualized)) that have dynamic size due to content but also need to have their size calculated prior to being rendered on-screen.

## What it isn't

Magical. This will not give you a DOM when there isn't one, nor will it calculate the height of items that are `display: none;`. It also doesn't make the DOM magically faster, so use sparingly to avoid performance implications.

## Usage

```javascript
import React, {
  Component
} from 'react';
import getRenderedSize from 'react-rendered-size';

class App extends Component {
  state = {
    size: {
      height: 0,
      width: 0
    }
  };

  componentWillMount() {
    const size = getRenderedSize(
      <div>
        I am a random element that I want to get the size of for some reason!
      </div>
    );

    this.setState({
      size
    });
  }

  render() {
    const {
      size
    } = this.state;

    return (
      <div>
        The react element in componentWillMount is {size.height} pixels tall and {size.width} pixels wide.
      </div>
    );
  }
}
```

## API

All methods below are available as named exports, and the default export is `getRenderedSize`.

#### getRenderedSize(reactElement[, containerWidth[, containerOptions]])

Function to retrieve the size of the `reactElement` passed. You can also optionally pass a `containerWidth` (defaults to the document's width), and pass additional options specific to the container. The `containerOptions` shape:

```javascript
{
  /*
    document to use for element creation / manipulation, which is useful for test environments
    where no DOM exists (easy mocking). defaults to browser document.
  */
  doc: Object,
  /*
    the type of container that will house the element when rendered off-screen. defaults to 'div'.
  */
  type: string
}
```

Returns an object which contains the calculated size values for the given `reactElement`. The shape of the returned object:

```javascript
{
  height: number,
  width: number
}
```

#### getRenderedHeight(reactElement[, containerWidth[, containerOptions]])

Convenience function that will only retreive the `height` that is returned from `getRenderedSize`. All parameters are the same as `getRenderedSize`.

#### getRenderedWidth(reactElement[, containerWidth[, containerOptions]])

Convenience function that will only retreive the `width` that is returned from `getRenderedSize`. All parameters are the same as `getRenderedSize`.

## Browser support

* Chrome (all versions)
* Firefox (all versions)
* Opera 15+
* Edge (all versions)
* IE 9+
* Safari 6+

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:
* `dev` => run webpack dev server to run example app (playground!)
* `dist` => run webpack to build development `dist` file with NODE_ENV=development
* `dist:minifed` => run webpack to build production `dist` file with NODE_ENV=production
* `lint` => run ESLint against all files in the `src` folder
* `lint:fix` => run ESLint against all files in the `src` folder, running a `fix` operation if applicable
* `prepublish` => runs `compile-for-publish`
* `prepublish:compile` => run `lint`, `test`, `transpile`, `dist`
* `test` => run test functions with `NODE_ENV=test`
* `test:coverage` => run `test` but with `nyc` for coverage checker
* `test:watch` => run `test`, but with persistent watcher
* `transpile` => run babel against all files in `src` to create files in `lib`
