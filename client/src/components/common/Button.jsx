import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Renders a button with a custom click handler.
 * @component
 */
export default class Button extends Component {
  static propTypes = {
    /** The event handler for click events on the button. */
    handleClick: PropTypes.func.isRequired,
    /** The visible text on the button. */
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={"button"} onClick={this.props.handleClick}>
        {this.props.text}
      </div>
    );
  }
}
