"use strict";

const React = require("react"),
    ReactDOM = require("react-dom"),
    Button = require("./lib/component-styled.jsx");

var i = 0;

const handleCLick = () => {
    var t = "Button was pressed "+(++i);
    ReactDOM.render(
        <div>{t}</div>,
        document.getElementById("text-container")
    );
};

const btn = ReactDOM.render(
    <Button buttonHTML="Pr<b>ess</b> me" onClick={handleCLick} />,
    document.getElementById("component-container")
);

btn.focus();
