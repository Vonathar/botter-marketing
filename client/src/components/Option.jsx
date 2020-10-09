import React, { Component } from "react";

/**
 * Renders a single clickable menu option.
 * @component
 */
export default class Option extends Component {
  /**
   * Fetches the icon from the /public directory based on the value of prop.icon
   * @return A string that can be directly assigned as a path to an image's src
   */
  getIcon = () => {
    return process.env.PUBLIC_URL + `/images/${this.props.icon}.svg`;
  };

  /**
   * Dynamically builds the className for menu options, always returning the base class and
   * optionally returning the selected state modifier.
   * @return A String that can be directly assigned to className
   */
  getClassName = () => {
    let classNames = "home__menu__options__option";
    return this.props.selectedOptionTitle === this.props.title
      ? classNames + " home__menu__options__option--selected"
      : classNames;
  };

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={() => {
          this.props.setOptionSelected(this.props.title);
        }}
      >
        <img
          className={"home__menu__options__option__icon"}
          src={this.getIcon()}
          alt={this.props.icon}
        />
        <h1 className={"home__menu__options__option__title"}>{this.props.title}</h1>
        <p className={"home__menu__options__option__description"}>{this.props.description}</p>
      </div>
    );
  }
}
