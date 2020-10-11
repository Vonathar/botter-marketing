import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Renders a text input with a label in material style.
 * @component
 * @example
 * <TextInput
 *    handleTextChange={myFunc}
 *    label="bar"
 * />
 */
export default class TextInput extends Component {
  static propTypes = {
    /** The event handler for onchange events. */
    handleTextChange: PropTypes.func.isRequired,
    /** The label of the input. */
    label: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="text-input">
        <input
          onChange={this.props.handleTextChange}
          type="text"
          required
        />
        <span className="bar" />
        <label>{this.props.label}</label>
      </div>
    );
  }
}
