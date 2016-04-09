/*global describe, it, before, after */

"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");

const chai = require("chai");
const expect = chai.expect;
const equalJSX = require("chai-equal-jsx");
const renderer = TestUtils.createRenderer();

chai.use(equalJSX);

const Button = require("../lib/component.jsx");

describe("Button tests", function () {
    before(function () {
        this.jsdom = require("jsdom-global")();
    });

    after(function () {
        this.jsdom();
    });

    describe("Rendering Button", function () {

        it("Empty", function () {
            renderer.render(<Button />);
            const actual = renderer.getRenderOutput();
            const expected = (
                <button
                  accessKey={undefined}
                  aria-label={undefined}
                  aria-pressed={undefined}
                  className="itsa-button"
                  dangerouslySetInnerHTML={{__html: "&#160;"}}
                  disabled={false}
                  name={undefined}
                  onClick={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  onMouseDown={function noRefCheck() {}}
                  onMouseUp={function noRefCheck() {}}
                  role="button"
                  tabIndex={1}
                  type="button"
                />
            );
            expect(actual).to.equalJSX(expected);
        });

        it("Different props", function () {
            renderer.render(
                <Button
                accessKey={[20]}
                buttonText="Press me"
                name="my-button"
                tabIndex={2}
                type="submit"
                disabled={true} />
            );
            const actual = renderer.getRenderOutput();
            const expected = (
                <button
                  accessKey={[20]}
                  aria-label="Press me"
                  aria-pressed={undefined}
                  className="itsa-button"
                  dangerouslySetInnerHTML={undefined}
                  disabled={true}
                  name="my-button"
                  onClick={undefined}
                  onKeyDown={undefined}
                  onKeyUp={undefined}
                  onMouseDown={undefined}
                  onMouseUp={undefined}
                  role="button"
                  tabIndex={2}
                  type="submit"
                >Press me</button>
            );
            expect(actual).to.equalJSX(expected);
        });

        it("buttonHTML", function () {
            renderer.render(<Button buttonHTML="Press <b>me</b>" />);
            const actual = renderer.getRenderOutput();
            const expected = (
               <button
                  accessKey={undefined}
                  aria-label="Press me"
                  aria-pressed={undefined}
                  className="itsa-button"
                  dangerouslySetInnerHTML={{__html: 'Press <b>me</b>'}}
                  disabled={false}
                  name={undefined}
                  onClick={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  onMouseDown={function noRefCheck() {}}
                  onMouseUp={function noRefCheck() {}}
                  role="button"
                  tabIndex={1}
                  type="button"
                />
            );
            expect(actual).to.equalJSX(expected);
        });

        it("buttonText", function () {
            renderer.render(<Button buttonText="Press <b>me</b>" />);
            const actual = renderer.getRenderOutput();
            const expected = (
                <button
                  accessKey={undefined}
                  aria-label="Press me"
                  aria-pressed={undefined}
                  className="itsa-button"
                  dangerouslySetInnerHTML={undefined}
                  disabled={false}
                  name={undefined}
                  onClick={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  onMouseDown={function noRefCheck() {}}
                  onMouseUp={function noRefCheck() {}}
                  role="button"
                  tabIndex={1}
                  type="button"
                >
                  Press me
                </button>
            );
            expect(actual).to.equalJSX(expected);
        });

        it("buttonText and buttonHTML", function () {
            renderer.render(<Button buttonText="Press <b>me</b>" buttonHTML="Press <b>me</b>" />);
            const actual = renderer.getRenderOutput();
            const expected = (
               <button
                  accessKey={undefined}
                  aria-label="Press me"
                  aria-pressed={undefined}
                  className="itsa-button"
                  dangerouslySetInnerHTML={{__html: 'Press <b>me</b>'}}
                  disabled={false}
                  name={undefined}
                  onClick={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  onMouseDown={function noRefCheck() {}}
                  onMouseUp={function noRefCheck() {}}
                  role="button"
                  tabIndex={1}
                  type="button"
                />
            );
            expect(actual).to.equalJSX(expected);
        });

        it("Toggled true", function () {
            renderer.render(<Button toggled={true} buttonText="Press <b>me</b>" />);
            const actual = renderer.getRenderOutput();
            const expected = (
                <button
                  accessKey={undefined}
                  aria-label="Press me"
                  aria-pressed={true}
                  className="itsa-button itsa-button-active itsa-button-toggled itsa-button-togglebtn"
                  dangerouslySetInnerHTML={undefined}
                  disabled={false}
                  name={undefined}
                  onClick={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  onMouseDown={function noRefCheck() {}}
                  onMouseUp={function noRefCheck() {}}
                  role="button"
                  tabIndex={1}
                  type="button"
                >
                  Press me
                </button>
            );
            expect(actual).to.equalJSX(expected);
        });

        it("Toggled false", function () {
            renderer.render(<Button toggled={false} buttonText="Press <b>me</b>" />);
            const actual = renderer.getRenderOutput();
            const expected = (
                <button
                  accessKey={undefined}
                  aria-label="Press me"
                  aria-pressed={false}
                  className="itsa-button itsa-button-togglebtn"
                  dangerouslySetInnerHTML={undefined}
                  disabled={false}
                  name={undefined}
                  onClick={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  onMouseDown={function noRefCheck() {}}
                  onMouseUp={function noRefCheck() {}}
                  role="button"
                  tabIndex={1}
                  type="button"
                >
                  Press me
                </button>
            );
            expect(actual).to.equalJSX(expected);
        });

    });

    describe("Events Button", function () {

        it("onClick-event", function () {
            let clicked = false;
            const handleClick = () => {
                clicked = true;
            };
            const button = TestUtils.renderIntoDocument(<Button onClick={handleClick} />);
            const buttonNode = ReactDOM.findDOMNode(button);
            expect(clicked).to.be.false;
            TestUtils.Simulate.click(buttonNode);
            expect(clicked).to.be.true;
        });

        it("onKeyDown-event different key", function () {
            let clicked = false;
            const handleClick = () => {
                clicked = true;
            };
            const button = TestUtils.renderIntoDocument(<Button onClick={handleClick} />);
            const buttonNode = ReactDOM.findDOMNode(button);
            expect(clicked).to.be.false;
            TestUtils.Simulate.keyDown(buttonNode, {keyCode : 65});
            expect(clicked).to.be.false;
        });

        it("onKeyDown-event enter-key", function (done) {
            let clicked = false;
            const handleClick = () => {
                clicked = true;
            };
            const button = TestUtils.renderIntoDocument(<Button onClick={handleClick} />);
            const buttonNode = ReactDOM.findDOMNode(button);
            expect(clicked).to.be.false;
            TestUtils.Simulate.keyDown(buttonNode, {keyCode : 13});
            TestUtils.Simulate.keyUp(buttonNode);
            setTimeout(function() {
              expect(clicked).to.be.true;
              done();
            }, 150);
        });

        it("onKeyDown-event enter-key without directResponse", function (done) {
            let clicked = false;
            const handleClick = () => {
                clicked = true;
            };
            const button = TestUtils.renderIntoDocument(<Button onClick={handleClick} directResponse={false} />);
            const buttonNode = ReactDOM.findDOMNode(button);
            expect(clicked, "Click value before keyDown event").to.be.false;
            TestUtils.Simulate.keyDown(buttonNode, {keyCode : 13});
            TestUtils.Simulate.keyUp(buttonNode);
            expect(clicked, "Click value immediate after keyDown event").to.be.false;
            setTimeout(() => {
                expect(clicked, "Click value 0.5sec after keyDown event").to.be.true;
                done();
            }, 500);
        });

        it("onKeyDown-event enter-key without directResponse and different buttonPressTime", function (done) {
            let clicked = false;
            const handleClick = () => {
                clicked = true;
            };
            const button = TestUtils.renderIntoDocument(<Button onClick={handleClick} directResponse={false} buttonPressTime={1000} />);
            const buttonNode = ReactDOM.findDOMNode(button);
            expect(clicked, "Click value before keyDown event").to.be.false;
            TestUtils.Simulate.keyDown(buttonNode, {keyCode : 13});
            TestUtils.Simulate.keyUp(buttonNode);
            expect(clicked, "Click value immediate after keyDown event").to.be.false;
            setTimeout(() => {
                expect(clicked, "Click value 0.5sec after keyDown event").to.be.false;
                setTimeout(() => {
                    expect(clicked, "Click value 1.5sec after keyDown event").to.be.true;
                    done();
                }, 1000);
            }, 500);
        });

    });

});
