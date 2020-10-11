import React, { Component } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

/**
 * Renders a card with an optional button.
 * @component
 * @example
 * <Card
 *    title="foo"
 *    handleClick={myFunc}
 *    buttonText="bar"
 * />
 */
export default class Card extends Component {
  static propTypes = {
    /** The title at the top of the card. */
    title: PropTypes.string.isRequired,
    /** The event handler for click events on the button. */
    handleClick: PropTypes.func,
    /** The visible text on the button. The default text says "GO" */
    buttonText: PropTypes.string,
  };

  static defaultProps = {
    buttonText: "GO",
  };

  render() {
    return (
      <div className={"card"}>
        <h1 className={"card__title"}>{this.props.title}</h1>
        <Button
          handleClick={this.props.handleClick}
          text={this.props.buttonText}
        />
      </div>
    );
  }
}
