import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Renders a button with a custom click handler.
 * @component
 * @example
 * ```jsx
 * <Button
 *    handleClick={myFunc}
 *    text="foo"
 * />
 * ```
 */
export default class Button extends Component {
  static propTypes = {
    /** The event handler for click events on the button. */
    handleClick: PropTypes.func.isRequired,
    /** The visible text on the button. */
    text: PropTypes.string.isRequired,
    /** Whether the button should be clickable. */
    isActive: PropTypes.bool,
  };

  static defaultProps = {
    isActive: true,
  };

  /**
   * Dynamically builds the className for the button, always returning the base
   * class and optionally adding the 'disabled' state modifier.
   * @return {String} the className for the Button.
   */
  getClassName = () => {
    let className = "button";
    return this.props.isActive ? className : className + " button--disabled";
  };

  /**
   * Dynamically enables the onclick handler based on the value of props.isActive.
   * @return {function | null} the onclick handler for the Button.
   */
  setHandleClickActive = () => {
    return this.props.isActive ? this.props.handleClick : null;
  };

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={this.setHandleClickActive()}
      >
        {this.props.text}
      </div>
    );
  }
}
