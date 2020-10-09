import React, {Component} from "react";
import Button from "./Button";
import TextInput from "./TextInput";

/**
 * Renders the available menu settings for the currently seelcted option.
 * @component
 */
export default class MenuSettings extends Component {

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
                return
        }
    }

    /**
     * Renders the settings menu for the "Campaign info" option.
     * @return JSX that represents the available settings for "Campaign info".
     * */
    getCampaignInfoSettings = () => {
        return (
            <div className="menu-settings">
                <TextInput label={"Project name"} />
                <Button text={"START"} />
            </div>);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderSettings()}
            </React.Fragment>
        )
    }
}