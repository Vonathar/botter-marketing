/**
 * @summary Provides utility functions to query the BotterMarketing API.
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */
import axios from "axios";
import {QueryType} from "./enums";

/**
 * @summary Calls the API with a dynamic endpoint based on the given query.
 * @desc Asynchronously calls the BotterMarketing API. For the duration of the asynchronous call
 *       sets isWaitingAsync=true in the state of the App component, triggering the rendering of the Loader component.
 *       Once the call to the API terminates, updates the state of the App component to store the response.
 * @param queryType {QueryType} an enum of type QueryType, representing one of the available queries
 */
export async function get(queryType) {

  /**
   * @summary Signals that execution is waiting for an async call.
   * @desc Dynamically sends a signal to the App component while waiting for the end of an asynchronous action.
   *       In the context of this program, 'sending a signal' means updating isWaitingAsync in the state
   *       of the App component, which triggers the rendering of the Loader component with the given message.
   * @param isWaiting {boolean} indicated whether the execution should be paused, or resumed.
   * @param message {String} the message that should be shown in the Loader component.
   */
  const setIsWaitingAsync = (isWaiting, message = "") => {
    if (isWaiting) {
      this.setState({
        isWaitingAsync: true,
        loadingMessage: message,
        queryType: queryType,
      });
    } else {
      this.setState({isWaitingAsync: false});
    }
  };

  /**
   * @summary Queries the BotterMarketing API.
   * @desc Calls the API of BotterMarketing using the dynamic URL defined in the local scope, then
   *       returns the response data. Renders the Loader component for the duration of the call.
   * @return {Object} the data received in the response from the API.
   */
  const queryApi = async () => {
    setIsWaitingAsync(true, "Querying API...");
    return axios.get(url).then((response) => {
      setIsWaitingAsync(false);
      return response.data;
    });
  };

  /**
   * Builds the URL for requests, dynamically switching between dev/prod
   * Local -> http://127.0.0.1:5000/
   * Prod  -> https://botter-marketing.herokuapp.com/
   * */
  let url = process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000/" : "https://botter-marketing.herokuapp.com/";
  switch (queryType) {
    case QueryType.CAMPAIGN_INFO: {
      url += `info?projectName=${this.state.projectName}`;
      break;
    }
  }

  // Updates the state
  this.setState({
    queryResponse: await queryApi(),
    shouldResultRender: true
  });
}
