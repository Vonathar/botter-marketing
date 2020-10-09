import React, { Component } from "react";
import MenuOption from "./MenuOption";
import MenuSettings from "./MenuSettings";
import MenuProgress from "./MenuProgress";

/**
 * Renders the homepage, which includes the menu options and the progress updates.
 * @component
 */
export default class Home extends Component {
  state = {
    selectedOptionTitle: "",
  };

  /**
   * Updates the state to store the new selected option.
   * @param optionTitle - A String that represents the title of the option
   */
  setOptionSelected = (optionTitle) => {
    this.setState({ selectedOptionTitle: optionTitle });
  };

  render() {
    return (
      <div className={"home"}>
        <div className={"home__menu"}>
          <div className={"home__menu__options"}>
            <div className={"home__menu__option"}>
              <MenuOption
                icon={"build"}
                title={"Test campaign"}
                description={"This feature is not yet available!"}
                setOptionSelected={this.setOptionSelected}
                selectedOptionTitle={this.state.selectedOptionTitle}
              />
            </div>
            <div className={"home__menu__option"}>
              <MenuOption
                icon={"edit"}
                title={"Edit campaign"}
                description={"This feature is not yet available!"}
                setOptionSelected={this.setOptionSelected}
                selectedOptionTitle={this.state.selectedOptionTitle}
              />
            </div>
            <div className={"home__menu__option"}>
              <MenuOption
                icon={"information"}
                title={"Campaign info"}
                description={
                  "Get all campaign URLs, such as asset upload page, template testing, Zeplin, and InVision."
                }
                setOptionSelected={this.setOptionSelected}
                selectedOptionTitle={this.state.selectedOptionTitle}
              />
            </div>
          </div>
          <div className={"home__menu__settings"}>
            <MenuSettings
              selectedOptionTitle={this.state.selectedOptionTitle}
            />
          </div>
          <div className={"home__menu__result"}>
            <MenuProgress />
          </div>
        </div>
        <p className={"home__footer"}>Copyright © 2020 Gianmarco Caputo</p>
      </div>
    );
  }
}
