import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Renders a single clickable menu option.
 * @component
 * @example
 * <Option
 *    icon="lens"
 *    title="foo"
 *    description="bar"
 *    handleClick={myFunc}
 *    selectedOptionTitle="Campaign Info"
 * />
 */
export default class Option extends Component {
  static propTypes = {
    /** The filename of the icon to use from the /public directory. */
    icon: PropTypes.string.isRequired,
    /** A short title for the option. */
    title: PropTypes.string.isRequired,
    /** A brief description of the purpose of the option. */
    description: PropTypes.string.isRequired,
    /** The event handler for click events on the entire component. */
    handleOptionClick: PropTypes.func.isRequired,
    /** The title of the option that is currently selected. */
    selectedOptionTitle: PropTypes.string,
  };

  /**
   * Fetches the icon from the /public directory based on the value of prop.icon
   * @return {String} the path to use as the icon's src
   */
  getIcon = () => {
    return process.env.PUBLIC_URL + `/images/${this.props.icon}.svg`;
  };

  /**
   * Dynamically builds the className for menu options, always returning the base class and
   * optionally adding the selected state modifier.
   * @return A String that can be directly assigned to className
   */
  getClassName = () => {
    let classNames = "app__options__option";
    return this.props.selectedOptionTitle === this.props.title
      ? classNames + " app__options__option--selected"
      : classNames;
  };

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={() => {
          this.props.handleOptionClick(this.props.title);
        }}
      >
        <img
          className={"app__options__option__icon"}
          src={this.getIcon()}
          alt={this.props.icon}
        />
        <h1 className={"app__options__option__title"}>{this.props.title}</h1>
        <p className={"app__options__option__description"}>
          {this.props.description}
        </p>
      </div>
    );
  }
}
