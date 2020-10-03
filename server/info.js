/**
 * @summary Provides actions to respond to requests received on the endpoint /info
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

const utils = require("./utils");
const url = require("url");
const botterMarketing = require("./botter-marketing");

/**
 *  @param req - the request object
 *  @param res - the response object
 *  @return Promise - resolved once the campaign information has been successfully extracted by botterMarketing
 *  @desc parses the value of "projectName" from the query string in the URL, then uses it to get the campaign info
 *        from botterMarketing. An example: /info?projectName=pmsa175-024
 */
let handleGet = async (req, res) => {
    const projectName = url.parse(req.url, true).query.projectName;
    const campaignInfo = await botterMarketing.getCampaignInfo(projectName);
    utils.respond(res, campaignInfo);
};

const actions = {
    "GET": handleGet
};

exports.requestHandler = utils.actionDispatcher(actions);