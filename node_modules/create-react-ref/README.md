# create-react-ref

## What is this?

React version 16.3 introduces 2 new APIs, `React.createRef` ([React RFC #17](https://github.com/reactjs/rfcs/blob/master/text/0017-new-create-ref.md)) and `React.forwardRef` ([React RFC #30](https://github.com/reactjs/rfcs/blob/master/text/0030-ref-forwarding.md)).

This lib was created to allow using the new ref APIs without an immediate upgrade. Once upgraded to React 16.3, you should be able to remove this lib from your imports and just import React's version. However, this lib also checks for React's version and, if it is installed, it will use it instead of the polyfilled version. This way, you can remove the polyfill when you're ready and not at the same time that you upgrade.

## How to install

NPM:

```
npm install create-react-ref
```

YARN:

```
yarn add create-react-ref
```

You'll need to also have `react` installed

## API and examples

### createRef()

The `createRef` API returns an object which attaches the ref to a `current` property. The polyfill works by returning a function which when invoked internall by React with the ref, will attach it to a `current` property or the function.

```javascript
import createRef from 'create-react-ref/lib/createRef';

class MyComponent extends React.Component {
  // Once input ref is mounted, it is accessed
  // under the `current` proprty
  inputRef = createRef();

  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
      </div>
    );
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

### forwardRef(render)

The `forwardRef` API allows forwarding refs to a child (inner) component when a ref is attached to the parent (outer) component.
Arguments

* [`render(props, ref)`: `ReactElement`]: Render should be a function that when called returns a ReactElement to render. It gets passed the current `props` and the `ref` to foward. Attach the `ref` to the inner child component's ref prop that you want a user to receive when attaching a ref to the outer component.

```javascript
import forwardRef from 'create-react-ref/lib/forwardRef';
import createRef from 'create-react-ref/lib/createRef';

const ThemeContext = React.createContext('light');

// Example HOC
function withTheme(ThemedComponent) {
  function ThemeContextInjector(props) {
    return (
      <ThemeContext.Consumer>
        {value => (
          <ThemedComponent {...props} ref={props.forwardedRef} theme={value} />
        )}
      </ThemeContext.Consumer>
    );
  }

  // Forward refs through to the inner, "themed" component:
  return forwardRef((props, ref) => (
    <ThemeContextInjector {...props} forwardedRef={ref} />
  ));
}

const ThemedButton = withTheme(Button);
// For the polyfilled forwardRef, you must use `createRef`.
const buttonRef = createRef();

// buttonRef.current will point to ThemedButton, rather than ThemeContextInjector
<ThemedButton ref={buttonRef} />;
```

### Caveats

The polyfilled `forwardRef` is only compatible with refs created from `createRef` and not compatible with `ref` callbacks/functions. If you attach a ref callback to a component returned from the polyfilled `forwardRef`, you will get a RefForwarder component instance. This is one instance of how this library differs from React's implementation. React actually built an internal type to handle this, which cannot be polyfilled, and returns the actual forwared child. However, this polyfill provides a `getRef` function you can use to make sure the correct ref is always returned (polyfilled or not).

## Extra APIs not in React

### getRef(ref)

Arguments

* [`ref`: `Node | Instance | null`]: Use this function to get the actual ref from a ref object created by `createRef` or `React.createRef`.

Example:

Using with `createRef`

```javascript
class {
    divRef = createRef();

    componentDidMount() {
      // When using React.createRef or polyfilled createRef,
      // to get the actual div dom node, you have to access
      // it on the `current` property.
      // For example, this.divRef.current === getRef(this.divRef);
      const node = getRef(this.divRef); // returns div node
    }
    render() {
        return <div ref={divRef}>text</div>
    }
}
```

Using in a ref callback

```javascript
const ForwardingRefComponent = forwardRef((props, ref) => {
  return <div ref={ref}>{props.children}</div>
});

class {
    handleRef = (node) => {
      // If using the polyfilled `forwardRef`:
      // node instanceof RefForwarder === true
      const actualForwardedNode = getRef(node);
      // If using React.forwardRef
      // node instanceof HTMLDivElement === true
      const actualForwardedNode = node; // || getRef(node);
    }

    render() {
        return <ForwardingRefComponent ref={this.handleRef}>text</ForwardingRefComponent>
    }
}
```
