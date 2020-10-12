import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Renders a basic loader with an infinite animation.
 * @component
 * @example
 * ```jsx
 * <Loader
 *    isActive={myBool}
 *    message="Loading foo.."
 * />
 * ```
 */
export default class Loader extends Component {
  static propTypes = {
    /** Indicates whether the loader should render. */
    isActive: PropTypes.bool.isRequired,
    /** The message below the loader. */
    message: PropTypes.string.isRequired,
  };

  render() {
    if (this.props.isActive) {
      return (
        <div className={"loader"}>
          <div className={"loader__animation"} />
          <div className={"loader__message"}>{this.props.message}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}
