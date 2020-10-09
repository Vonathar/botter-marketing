import React, { Component } from "react";

/**
 * Renders a button which uses the value of props.text as the visible copy.
 * @component
 */
export default class Button extends Component {
  render() {
    return <div className={"button"} onClick={this.props.clickHandler}>{this.props.text}</div>;
  }
}
