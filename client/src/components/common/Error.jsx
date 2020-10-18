import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Renders an error card.
 * @component
 * @example
 * ```jsx
 * <Error
 *    message="foo"
 * />
 * ```
 */
export default class Error extends Component {
  static propTypes = {
    /** The error message. */
    message: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={"error"}>
        <img
          className={"error__icon"}
          src={process.env.PUBLIC_URL + `/images/information.svg`}
        />
        <p className={"error__message"}>{this.props.message}</p>
      </div>
    );
  }
}
