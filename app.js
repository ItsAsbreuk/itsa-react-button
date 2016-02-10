"use strict";

const React = require("react"),
    ReactDOM = require("react-dom"),
    Button = require("./lib/component-styled.jsx");

const handleCLick = () => {
    ReactDOM.render(
        <div>Button was pressed</div>,
        document.getElementById("text-container")
    );
};

const btn = ReactDOM.render(
    <Button buttonText="Press me" onClick={handleCLick} />,
    document.getElementById("component-container")
);

btn.focus();