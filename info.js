/**
 * @summary Provides actions to respond to requests received on the endpoint /info
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

const utils = require("./utils");
const url = require("url");

let handleGet = (req, res) => {

    const queries = url.parse(req.url, true).query;
    console.log(queries);

    utils.respond(res, "TODO");
};

const actions = {
    "GET": handleGet
};

exports.requestHandler = utils.actionDispatcher(actions);