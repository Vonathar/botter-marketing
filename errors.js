class ProjectNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProjectNotFoundError';
    }
}

global.ProjectNotFoundError = ProjectNotFoundError;