import React, { Component } from "react";
import Card from "./common/Card";
import PropTypes from "prop-types";

/**
 * Graphically renders the Result of the API calls.
 * @component
 * @example
 * ```jsx
 * <Result
 *    isActive={myBool}
 *    queryResponse={foo: "bar", ..}
 * />
 * ```
 */
export default class Result extends Component {
  static propTypes = {
    /** Indicates whether the component should render. */
    isActive: PropTypes.bool.isRequired,
    /** The title of the option that is currently selected. */
    queryResponse: PropTypes.object,
  };

  /**
   * Builds and returns an array of Card components to visualise each entry in queryResponse.
   * @return {Array || JSX.Element} an array of Card components, or a JSX element if the array is empty.
   */
  buildResultItem = () => {
    const queryResponse = this.props.queryResponse;
    let resultItems = [];

    for (let objKey in queryResponse) {
      resultItems.push(
        <Card title={objKey} key={objKey} url={queryResponse[objKey]} />
      );
    }

    if (resultItems.length < 1) {
      return <h3>No results found.</h3>;
    } else {
      return resultItems;
    }
  };

  render() {
    if (this.props.isActive) {
      return <React.Fragment>{this.buildResultItem()}</React.Fragment>;
    } else {
      return null;
    }
  }
}
