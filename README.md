[![Build Status](https://travis-ci.org/ItsAsbreuk/itsa-react-button.svg?branch=master)](https://travis-ci.org/ItsAsbreuk/itsa-react-button)

Interactive button, like a normal button, but with extended behaviour.

Lightweight, focussable, responses to keypresses and will act quicker than the HTMLButtonElement.
Meaning, that the onClick-event gets fired on a mouseDown or keyDown event (native HTMLButtonElement emits on mouseUp).

Also, a keyDown event simulates the button as being pressed for at least 300ms, giving the user a better user-experience.

## How to use:

```js
const ReactDOM = require("react-dom"),
      Button = require("itsa-react-button");

const handleClick = () => {
    // ...
};

const button = ReactDOM.render(
    <Button buttonText="Press me" onClick={handleClick} />,
    document.getElementById("container")
);

button.focus();

// button.press() will press the button
```

## About the css

You need the right css in order to make use of `itsa-react-button`. There are 2 options:

1. You can use the css-files inside the `css`-folder.
2. You can use: `Component = require("itsa-react-button/lib/component-styled.jsx");` and build your project with `webpack`. This is needed, because you need the right plugin to handle a requirement of the `scss`-file.


[View live example](http://projects.itsasbreuk.nl/react-components/itsa-button/component.html)

[API](http://projects.itsasbreuk.nl/react-components/itsa-button/api/)