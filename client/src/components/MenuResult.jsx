import React, { Component } from "react";
import Loader from "./Loader";

/**
 * Renders a representation of the progress and outcome of the processing of information.
 * @component
 */
export default class MenuResult extends Component {
  render() {
    return (
      <div className={"menuResult"}>
        <Loader message={"Placeholder message..."} />{" "}
        {/* TODO: Add conditional rendering for Loader.jsx, hiding it when results are shown. */}
      </div>
    );
  }
}
