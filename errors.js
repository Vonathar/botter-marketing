/**
 * @summary Defines new custom Errors and add them to the global scope
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

/**
 *  @desc Throws a ProjectNotFoundError whenever a project cannot be found locally or remotely
 *  @extends Error
 */
class ProjectNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProjectNotFoundError';
    }
}

global.ProjectNotFoundError = ProjectNotFoundError;