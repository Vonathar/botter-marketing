import React, { Component } from "react";

/**
 * Renders a basic loader with an infinite animation.
 * @component
 */
export default class Loader extends Component {
  render() {
    if (this.props.isActive) {
      return (
        <React.Fragment>
          {
            <div className={"loader"}>
              <div className={"loader__animation"} />
              <div className={"loader__message"}>{this.props.message}</div>
            </div>
          }
        </React.Fragment>
      );
    } else {
      return null
    }
  }
}
