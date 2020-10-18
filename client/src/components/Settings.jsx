import React, { Component } from "react";
import Button from "./common/Button";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

/**
 * Renders the available settings for the currently selected option.
 * @component
 */
export default class Settings extends Component {
  static propTypes = {
    /** The title of the currently selected option. */
    selectedOptionTitle: PropTypes.string.isRequired,
    /** A function to update the projectName using the value of an Event object. */
    setProjectName: PropTypes.func.isRequired,
    /** A function to fetch resources from the BotterMarketing API. */
    get: PropTypes.func.isRequired,
  };

  /**
   * Returns the appropriate settings menu for each available option.
   * @return JSX that represents the settings in the DOM, or undefined if
   *         there are no settings available for the given selectedOptionTitle.
   */
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
   * Renders the settings menu for the "Campaign info" option.
   * @return JSX that represents the available settings for "Campaign info".
   */
  getCampaignInfoSettings = () => {
    return (
      <div className="app__settings">
        <TextInput
          label={"Project name"}
          handleTextChange={this.props.setProjectName}
          stateKey={"projectName"}
        />
        <Button
          text={"START"}
          handleClick={() => {
            this.props.get("campaignInfo");
          }}
          isActive={this.props.projectName !== null}
        />
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.renderSettings()}</React.Fragment>;
  }
}
