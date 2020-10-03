/**
 * @summary Creates a new HTTP server listening for requests to its API.
 * @desc Creates and starts a new HTTP server to handle all requests to the exposed public endpoints of the API. On each
 *       request, the req/res objects are directly sent to the router which handles all the subsequent logic.
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */
const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 8025;

const server = http.createServer(router).listen(PORT);

console.log(`Server running on port ${PORT}`);