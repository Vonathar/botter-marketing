/**
 * @summary Provides utility functions for the router and route handlers.
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

const headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10, // Seconds.
    "Content-Type": "application/json"
};

/**
/**
 *  @param res - the response object
 *  @param data - the data to be stringified and attached to the body of the response
 *  @param statusCode - (optional) the status code to write in the response. Default: 200
 *  @desc Builds the headers, status code and body of the response. Ends the response sending back the stringified data.
 */
let respond = (res, data, statusCode) => {
    statusCode = statusCode || 200;
    res.writeHead(statusCode, headers);
    res.end(JSON.stringify(data));
};

/**
 *  @param actionsHash - an object that links HTTP request methods to actions (functions)
 *  @desc Builds the headers, status code and body of the response. Ends the response sending back the stringified data.
 */
let actionDispatcher = (actionsHash) => {
    return (req, res) => {
        const action = actionsHash[req.method];
        if (action) {
            action(req, res);
        } else {
            exports.respond(res, "", 404);
        }
    };
};

module.exports = {
    respond, actionDispatcher
};