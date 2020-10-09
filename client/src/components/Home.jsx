import React, {Component} from "react";
import MenuOption from "./MenuOption";
import MenuSettings from "./MenuSettings";
import MenuProgress from "./MenuProgress";
import axios from "axios";

/**
 * Renders the homepage, which includes the menu options and the progress updates.
 * @component
 */
export default class Home extends Component {
  state = {
    selectedOptionTitle: "",
    projectName: "pmsa175-023",
    campaignInfo: [],
  };

  /**
   * Updates the state to store the selected option.
   * @param optionTitle - A String that represents the title of the option
   */
  setOptionSelected = (optionTitle) => {
    this.setState({ selectedOptionTitle: optionTitle });
  };

  /**
   * Updates the state to store the project name.
   * @param projectName - A String that represents the name of the project
   */
  setProjectName = (projectName) => {
    this.setState({ projectName });
  };

  /**
   * Updates the state to store the the array of campaign information.
   * @param campaignInfo - A String that represents the name of the project
   */
  updateCampaignInfo = async () => {
    const campaignInfo = await this.get(
      `http://127.0.0.1:8025/info?projectName=${this.state.projectName}`
    );
    this.setState({ campaignInfo });
  };

  /**
   * Sends a GET request to the given UR using Axios.
   * @param url - A String that represents the URL to use for the request
   * @return JSON - the data in the response received from the API
   */
  get = async (url) => {
    return await axios.get(url).then((response) => {
      return response.data;
    });
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
              setProjectName={this.setProjectName}
              updateCampaignInfo={this.updateCampaignInfo}
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
