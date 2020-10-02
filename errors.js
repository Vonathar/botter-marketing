/**
 * @summary Defines new custom Errors and add them to the global scope
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

/**
 *  @desc Throws a ElementNotFoundError whenever Selenium fails to locate an element in the DOM
 *  @extends Error
 */
class ElementNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ElementNotFoundError";
    }
}

/**
 *  @desc Throws a ProjectNotFoundError whenever a project cannot be found locally or remotely
 *  @extends Error
 */
class ProjectNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ProjectNotFoundError";
    }
}

/**
 *  @desc Throws a CampaignInfoParseError whenever parsing a "Campaign Info" ticket fails
 *  @extends Error
 */
class CampaignInfoParseError extends Error {
    constructor(message) {
        super(message);
        this.name = "CampaignInfoParseError";
    }
}

global.ProjectNotFoundError = ProjectNotFoundError;
global.CampaignInfoParseError = CampaignInfoParseError;