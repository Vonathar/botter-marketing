import React, { Component } from "react";
import Option from "./components/Option";
import Settings from "./components/Settings";
import { get } from "./utils/network";
import Loader from "./components/common/Loader";
import Result from "./components/Result";

/**
 * Renders a top-level container for all components.
 * @component
 */
class App extends Component {
  state = {
    selectedOptionTitle: "",
    projectName: "pmsa175-023",
    queryType: "",
    queryResponse: {},
    isWaitingAsync: false,
    shouldResultRender: false,
    loadingMessage: "",
  };

  /**
   * Binds `this` to the get function from network.js.
   */
  constructor(props) {
    super(props);
    this.get = get.bind(this);
  }

  /**
   * Updates the state to store the selected option.
   * @param optionTitle {String} - A String that represents the title of the option
   */
  handleOptionClick = (optionTitle) => {
    if (this.state.selectedOptionTitle !== optionTitle) {
      this.setState({
        selectedOptionTitle: optionTitle,
        shouldResultRender: false,
      });
    }
  };

  /**
   * Updates the state to store the project name.
   * @param event {Event} - The event fired by a text input that holds the string value
   */
  setProjectName = (event) => {
    this.setState({ projectName: event.target.value });
  };

  render() {
    return (
      <div className={"app"}>
        <div className={"app__options"}>
          <Option
            icon={"build"}
            title={"Test campaign"}
            description={"This feature is not yet available!"}
            handleOptionClick={this.handleOptionClick}
            selectedOptionTitle={this.state.selectedOptionTitle}
          />{" "}
          <Option
            icon={"edit"}
            title={"Edit campaign"}
            description={"This feature is not yet available!"}
            handleOptionClick={this.handleOptionClick}
            selectedOptionTitle={this.state.selectedOptionTitle}
          />
          <Option
            icon={"information"}
            title={"Campaign info"}
            description={
              "Get all campaign URLs, such as asset upload page, template testing, Zeplin, and InVision."
            }
            handleOptionClick={this.handleOptionClick}
            selectedOptionTitle={this.state.selectedOptionTitle}
          />
        </div>
        <Settings
          selectedOptionTitle={this.state.selectedOptionTitle}
          setProjectName={this.setProjectName}
          get={this.get}
        />
        <div className={"app__progress"}>
          <Loader
            isActive={this.state.isWaitingAsync}
            message={this.state.loadingMessage}
          />
          <Result
            isActive={
              !this.state.isWaitingAsync && this.state.shouldResultRender
            }
            queryResponse={this.state.queryResponse}
          />
        </div>
        <p className={"app__footer"}>Copyright © 2020 Gianmarco Caputo</p>
      </div>
    );
  }
}

export default App;
