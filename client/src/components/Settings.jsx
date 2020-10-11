import React, { Component } from "react";
import Button from "./common/Button";
import TextInput from "./common/TextInput";

/**
 * Renders the available menu settings for the currently selected option.
 * @component
 */
export default class Settings extends Component {
  /**
   * Returns the appropriate settings menu for each available option.
   * @return JSX that represents the settings in the DOM, or undefined if
   *         there are no settings available for the given selectedOptionTitle.
   * */
  renderSettings = () => {
    switch (this.props.selectedOptionTitle) {
      case "Campaign info": {
        return this.getCampaignInfoSettings();
      }
      default:
        return;
    }
  };

  /**
   * Gets the text content of the input, then updates the state in the App component.
   * */
  textChangeHandler = (event, stateKey) => {
    const value = event.target.value;
    switch (stateKey) {
      case "projectName":
        this.props.setProjectName(value);
    }
  };

  /**
   * Renders the settings menu for the "Campaign info" option.
   * @return JSX that represents the available settings for "Campaign info".
   * */
  getCampaignInfoSettings = () => {
    return (
      <div className="app__settings">
        <TextInput
          label={"Project name"}
          textChangeHandler={this.textChangeHandler}
          stateKey={"projectName"}
        />
        <Button text={"START"} handleClick={() => {this.props.get("campaignInfo")}} />
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.renderSettings()}</React.Fragment>;
  }
}
