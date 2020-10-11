import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Renders a basic loader with an infinite animation.
 * @component
 */
export default class Loader extends Component {
  static propTypes = {
    /** Indicates whether the component should be rendered. */
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
