import React, {Component} from 'react';

/**
 * Renders a text input with the given label in material design style.
 * @component
 */
export default class TextInput extends Component {

    render() {
        return(
            <div className="text-input">
                <input type="text" required/>
                <span className="bar"/>
                <label>{this.props.label}</label>
            </div>
        )
    }
}