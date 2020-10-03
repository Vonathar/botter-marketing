/**
 * @summary Routes each request to the correct endpoint handler.
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */
const url = require("url");

const routes = {};

/**
 *  @param req - the request object
 *  @param res - the response object
 *  @desc Checks the URL of the request against the routes hash, then routes it to the correct handler.
 *        If the route doesn't exist, it responds with a 404.
 */
let route = (req, res) => {

    const endpoint = url.parse(req.url).pathname;
    const routeHandler = routes[endpoint];

    if (routeHandler) {
        routeHandler.requestHandler(req, res);
    } else {
        // TODO: Send a 404
    }
};

module.exports = route;