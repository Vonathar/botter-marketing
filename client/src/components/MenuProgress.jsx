import React, { Component } from "react";
import Loader from "./Loader";

/**
 * Renders a representation of the progress and outcome of the processing of information.
 * @component
 */
export default class MenuProgress extends Component {
  render() {
    return (
      <div className={"menuProgress"}>
        <Loader
          isActive={this.props.isExecutionBlocked}
          message={this.props.loadingMessage}
        />
      </div>
    );
  }
}
