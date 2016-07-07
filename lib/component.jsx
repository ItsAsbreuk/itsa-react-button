"use strict";

/**
 * React-Component: refined Button.
 *
 *
 *
 * <i>Copyright (c) 2016 ItsAsbreuk - http://itsasbreuk.nl</i><br>
 * New BSD License - http://choosealicense.com/licenses/bsd-3-clause/
 *
 *
 * @module itsa-react-button
 * @class Button
 * @since 0.0.1
*/

const React = require("react"),
    PropTypes = React.PropTypes,
    ReactDom = require("react-dom"),
    utils = require("itsa-utils"),
    later = utils.later,
    async = utils.async,
    MAIN_CLASS = "itsa-button",
    FORM_ELEMENT_CLASS_SPACES = " itsa-formelement",
    MAIN_CLASS_PREFIX = MAIN_CLASS+"-",
    WHITE_SPACE = "&#160;", // white-space
    BOOLEAN = "boolean",
    DEF_BUTTON_PRESS_TIME = 300;

const Button = React.createClass({

    propTypes: {
        /**
         * Array with the keys that can press the button when focussed.
         * Default: [13, 32]
         *
         * @property activatedBy
         * @type Array
         * @since 0.0.1
        */
        activatedBy: PropTypes.array,

        /**
         * The aria-label. When not set, it will equal the buttonText
         *
         * @property aria-label
         * @type String
         * @since 0.0.1
        */
        "aria-label": PropTypes.string,

        /**
         * Whether to autofocus the Component.
         *
         * @property autoFocus
         * @type Boolean
         * @since 0.0.1
        */
        autoFocus: PropTypes.bool,

        /**
         * The Button-text. Will be escaped. If you need HTML, then use `buttonHTML` instead.
         *
         * @property buttonText
         * @type String
         * @since 0.0.1
        */
        buttonText: PropTypes.string,

        /**
         * The Button-text, retaining html-code. If you don't need HTML,
         * then `buttonText` is preferred.
         *
         * @property buttonHTML
         * @type String
         * @since 0.0.1
        */
        buttonHTML: PropTypes.string,

        /**
         * The time that the button retains in its `pressed-state` when activated by a key-press.
         *
         * Default: 300ms
         *
         * @property buttonPressTime
         * @type Number
         * @since 0.0.1
        */
        buttonPressTime: PropTypes.number,

        /**
         * The class that should be set on the element
         *
         * @property className
         * @type String
         * @since 0.0.1
        */
        className: PropTypes.string,

        /**
         * Whether the button resonses rapidly (keydown and mousedown).
         * Note: native HTMLButtonElements don't resonse rapidly --> the onClick event happens on mouseUp.
         *
         * Default: true
         *
         * @property directResponse
         * @type Boolean
         * @since 0.0.1
        */
        directResponse: PropTypes.bool,

        /**
         * Whether the button is disabled
         *
         * @property disabled
         * @type Boolean
         * @since 0.0.1
        */
        disabled: PropTypes.bool,

        /**
         * The name-attribute of the button
         *
         * @property name
         * @type String
         * @since 0.0.1
        */
        name: PropTypes.string,

        /**
         * Callback whenever the button gets clicked by the left mousebutton.
         *
         * @property onClick
         * @type Function
         * @since 0.0.1
        */
        onClick: PropTypes.func,

        /**
         * Callback wheneveer the button gets clicked by the middle mousebuttin.
         *
         * @property onMiddleClick
         * @type Function
         * @since 0.0.1
        */
        onMiddleClick: PropTypes.func,


        /**
         * Callback wheneveer the button gets clicked by the right mouse-button.
         *
         * @property onRightClick
         * @type Function
         * @since 0.0.1
        */
        onRightClick: PropTypes.func,

        /**
         * Whether the checkbox is readonly
         *
         * @property readOnly
         * @type Boolean
         * @default false
         * @since 15.2.0
        */
        readOnly: PropTypes.bool,

        /**
         * Whether keypress should show active status. (should be set `false` for file-uploadbuttons)
         * Default: true
         *
         * @property showActivated
         * @type Boolean
         * @since 0.0.5
        */
        showActivated: PropTypes.bool,

        /**
         * Inline style
         *
         * @property style
         * @type object
         * @since 0.0.1
        */
        style: PropTypes.object,

        /**
         * The tabIndex
         * Default: 1
         *
         * @property tabIndex
         * @type Number
         * @since 0.0.1
        */
        tabIndex: PropTypes.number,

        /**
         * Whether the button is in a toggle-state.
         * You don;t need to use this directly: use the module ToggleButton instead.
         *
         * @property toggled
         * @type Boolean
         * @since 0.0.1
        */
        toggled: PropTypes.bool,

        /**
         * The type of the button
         * Default: "button"
         *
         * @property children
         * @type String
         * @since 0.0.1
        */
        type: PropTypes.string
    },

    /**
     * componentDidMount does some initialization.
     *
     * @method componentDidMount
     * @since 0.0.1
     */
    componentDidMount() {
        const instance = this;
        instance._buttonNode = ReactDom.findDOMNode(instance);
        instance._mounted = true;
        instance._knownMobile = (("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
        if (instance.props.autoFocus) {
            instance._focusLater = later(() => instance.focus(), 50);
        }
    },

    /**
     * componentWilUnmount does some cleanup.
     *
     * @method componentWillUnmount
     * @since 0.0.1
     */
    componentWillUnmount() {
        this._mounted = false;
        this._focusLater && this._focusLater.cancel();
    },

    /**
     * Sets the focus on the Component.
     *
     * @method focus
     * @param [transitionTime] {Number} transition-time to focus the element into the view
     * @chainable
     * @since 0.0.1
     */
    focus(transitionTime) {
        this._buttonNode.itsa_focus(null, null, transitionTime);
        return this;
    },

    /**
     * Returns the default props.
     *
     * @method getDefaultProps
     * @return object
     * @since 0.0.1
     */
    getDefaultProps() {
        return {
            activatedBy: [13, 32],
            autoFocus: false,
            buttonPressTime: DEF_BUTTON_PRESS_TIME,
            directResponse: true,
            disabled: false,
            readOnly: false,
            showActivated: true,
            type: "button"
        };
    },

    /**
     * Returns the initial state.
     *
     * @method getInitialState
     * @return object
     * @since 0.0.1
     */
    getInitialState() {
        return {
            active: false,
            mouseDown: false
        };
    },

    /**
     * Callback-fn for the onClick-event.
     * Will invoke `this.props.onChange`
     *
     * @method handleClick
     * @since 0.0.1
     */
    handleClick(e) {
        let button, leftClick, middleClick, rightClick;
        const instance = this,
              props = instance.props,
              onMiddleClick = props.onMiddleClick,
              onRightClick = props.onRightClick,
              onClick = props.onClick;
        if (!props.disabled && !props.readOnly && !instance._keyDown && !this.state.mouseDown) { // don't double execute
            instance.focus();
            if (onClick || onMiddleClick || onRightClick) {
                button = e.nativeEvent.button || 1;
                leftClick = (button<=1);
                middleClick = (button===2);
                rightClick = (button===3);
                if ((onClick && leftClick) || (onMiddleClick && middleClick) || (onRightClick && rightClick)) {
                    e.preventDefault();
                }
                if (onClick && leftClick) {
                    onClick();
                }
                if (middleClick && onMiddleClick) {
                    onMiddleClick();
                }
                if (rightClick && onRightClick) {
                    onRightClick();
                }
            }
        }
    },

    /**
     * Callback-fn for the onKeyDown-event.
     *
     * @method handleKeyDown
     * @since 0.0.1
     */
    handleKeyDown(e, directResponse, force) {
        const instance = this,
              props = instance.props,
              onClick = props.onClick,
              activatedBy = props.activatedBy,
              forced = (force===true), // IMPORTANT --> on a keyEvent this is an object in which we are not interested
              pressTimer = instance.pressTimer,
              keyCode = e.keyCode,
              isDirectResponse = (typeof directResponse===BOOLEAN) ? directResponse : props.directResponse;

        if (!props.disabled && !props.readOnly && instance._mounted) {
            if (keyCode===27) {
                // escape keyDown in case it was set
                instance._keyDown = false;
                pressTimer && pressTimer.cancel();
                if (instance.state.active) {
                    instance.setState({
                        active: false
                    });
                }
            }
            else {
                if (forced || (activatedBy.indexOf(keyCode)!==-1)) {
                    instance._keyDown = true;
                    if (typeof props.toggled===BOOLEAN) {
                        onClick && onClick();
                    }
                    else {
                        if (!instance.state.active) {
                            instance.setState({
                                active: true
                            });
                            pressTimer && pressTimer.cancel();
                            instance.pressTimer = later(instance._processKeyUp.bind(instance, null, isDirectResponse, forced), props.buttonPressTime);
                            if (isDirectResponse && onClick) {
                                later(() => {
                                    onClick();
                                }, 100); // we MUST delay, because an `onClick` that rerenders, would prevent `onKeyUp` from happening!
                            }
                        }
                    }
                }
            }
        }
    },

    /**
     * Callback-fn for the onKeyUp-event.
     *
     * @method handleKeyUp
     * @since 0.0.1
     */
    handleKeyUp() {
        // we must go async --> instance._keyDown cannot be set 'false' right away,
        // because the handleClick method needs to be processed first
        // if we don;t do this, props.onClick() would be executed twice when the spacebutton is pressed
        async(() => {
            const instance = this;
            instance._keyDown = false;
            if ((typeof instance.props.toggled!==BOOLEAN) && instance.state.active) {
                instance._processKeyUp(true);
            }
        });
    },

    /**
     * Callback-fn for the onMouseDown-event.
     *
     * @method handleMouseDown
     * @since 0.0.1
     */
    handleMouseDown(e) {
        const instance = this,
            props = instance.props;
        if (!props.disabled && !props.readOnly && instance._mounted) {
            instance.handleClick(e);
            async(() => {
                // check if still mounted
                if (instance._mounted) {
                    instance._mouseDown = true;
                    instance.setState({
                        active: true,
                        mouseDown: true
                    });
                    if (instance._knownMobile) {
                        async(() => instance.handleMouseUp());
                    }
                    else {
                        // for those mobile devices that were not feature-detected, we need a fallback to simulate mouseUp,
                        // to prevent the button from being blocked:
                        instance._mouseUpEvt = later(instance.handleMouseUp, 2000);

                    }
                }
            });
        }
    },

    handleMouseOut() {
        this.handleMouseUp();
    },

    /**
     * Callback-fn for the onMouseUp-event.
     *
     * @method handleMouseUp
     * @since 0.0.1
     */
    handleMouseUp() {
        const instance = this;
        // only if `_mouseDown` still is false --> it could be set `true` by `onMouseOut`
        if (instance._mouseDown && instance._mounted) {
            instance._mouseDown = false;
            instance._mouseUpEvt && instance._mouseUpEvt.cancel();
            instance.setState({
                active: false,
                mouseDown: false
            });
        }
    },

    /**
     * Callback-fn for the onClick-event.
     * Will invoke `this.props.onChange`
     *
     * @method press
     * @param boolean [directResponse] whether directly call onClick, or wait until the button raises up.
     * @since 0.0.1
     */
    press(directResponse) {
        this.handleKeyDown({}, directResponse, true);
    },

    /**
     * React render-method --> renderes the Component.
     *
     * @method render
     * @return ReactComponent
     * @since 0.0.1
     */
    render() {
        let classname = MAIN_CLASS+FORM_ELEMENT_CLASS_SPACES,
            buttonHTML = this.props.buttonHTML,
            dangerouslySetInnerHTML, buttonText, handleClick,
            handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp;

        const instance = this,
              props = instance.props,
              state = instance.state,
              disabled = props.disabled,
              directResponse = props.directResponse,
              saveButtonText = instance._saveHTML(props.buttonText),
              isToggleButton = (typeof props.toggled===BOOLEAN),
              ariaLabel = props["aria-label"] || saveButtonText || instance._saveHTML(buttonHTML);

        if (state.active || props.toggled) {
            if (props.showActivated || state.mouseDown) {
                classname += " "+MAIN_CLASS_PREFIX+"active";
            }
            props.toggled && (classname+=" "+MAIN_CLASS_PREFIX+"toggled");
        }
        isToggleButton && (classname+=" "+MAIN_CLASS_PREFIX+"togglebtn");
        props.className && (classname+=" "+props.className);
        props.readOnly && (classname+=" readonly");

        if (!buttonHTML && !props.buttonText) {
            buttonHTML = WHITE_SPACE;
        }
        if (buttonHTML) {
            dangerouslySetInnerHTML = {__html: buttonHTML};
        }
        else {
            buttonText = saveButtonText;
        }

        if (!disabled) {
            if (directResponse || isToggleButton) {
                handleMouseDown = instance.handleMouseDown;
                handleMouseUp = instance.handleMouseUp;
            }
            else {
                handleClick = instance.handleClick;
            }
            handleKeyDown = instance.handleKeyDown;
            handleKeyUp = instance.handleKeyUp;
        }

        return (
            <button {...instance._getDataAttrs()}
                accessKey={props.accessKey}
                aria-label={ariaLabel}
                aria-pressed={props.toggled}
                className={classname}
                dangerouslySetInnerHTML={dangerouslySetInnerHTML}
                disabled={disabled}
                name={props.name}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onMouseDown={handleMouseDown}
                onMouseOut={instance.handleMouseOut}
                onMouseUp={handleMouseUp}
                role="button"
                style={props.style}
                tabIndex={props.tabIndex}
                type={props.type} >
                {buttonText}
            </button>
        );
    },

    /**
     * Extracts the `data-*` attributes from props.
     *
     * @method _getDataAttrs
     * @private
     * @return object all the data-* attributes
     * @since 0.0.3
     */
    _getDataAttrs() {
        let dataAttrs = {};
        const props = this.props,
             keys = Object.keys(props);

        keys.forEach(function(key) {
            (key.substr(0,5).toLowerCase()==="data-") && (dataAttrs[key]=props[key]);
        });
        return dataAttrs;
    },

    /**
     * React render-method --> renderes the Component.
     *
     * @method _processKeyUp
     * @param Boolean manual whether this routine gets called manually (keypress), or from a click-event
     * @param Boolean directResponse Whether to direct response or wait for the button to raise up
     * @param Boolean force whether to force (initiated by the method `press`)
     * @private
     * @since 0.0.1
     */
    _processKeyUp(manual, directResponse, force) {
        const instance = this,
              props = instance.props,
              onClick = props.onClick,
              pressTimer = instance.pressTimer,
              manualDeactivation = manual && !pressTimer,
              timerDeactivation = !manual && pressTimer;
        if (this._mounted) { // we don't want unMounted Buttons to trigger the state and onClick-prop
            if (timerDeactivation) {
                pressTimer.cancel();
                delete instance.pressTimer;
            }
            force && (instance._keyDown=false); // because we didn;t came from `handleKeyUp`
            if ((!instance._keyDown || force) && (manualDeactivation || timerDeactivation)) {
                if (instance.state.active) {
                    instance.setState({
                        active: false
                    });
                    if ((typeof directResponse===BOOLEAN) ? !directResponse : !props.directResponse) {
                        onClick && onClick();
                    }
                }
            }
        }
    },

    /**
     * Returns a save string
     *
     * @method _saveHTML
     * @private
     * @param String html the text that should be removed from any html-entities
     * @return String
     * @since 0.0.1
     */
    _saveHTML(html) {
        return html && html.replace(/<[^>]*>/g, "");
    }

});

module.exports = Button;
