/**
 * @summary Provides actions to respond to requests received on the endpoint /info
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

const utils = require("./utils");
const url = require("url");
const botterMarketing = require("./botter-marketing");
const {ProjectNotFoundError} = require("./errors");

/**
 *  @param req - the request object
 *  @param res - the response object
 *  @return {Promise} - resolved once the campaign information has been successfully extracted by botterMarketing
 *  @desc parses the value of "projectName" from the query string in the URL, then uses it to get the campaign info
 *        from botterMarketing. Responds with a 404 with information about the error if the project doesn't exist.
 *
 *        Sample query: /info?projectName=pmsa175-024
 */
let handleGet = async (req, res) => {
  const projectName = url.parse(req.url, true).query.projectName.toLowerCase().trim();
  let campaignInfo;

  try {
    campaignInfo = await botterMarketing.getCampaignInfo(projectName);
    utils.respond(res, campaignInfo);
  } catch (err) {
    utils.respond(res, {
      error: err.name,
      message: err.message
    }, 400);
  }

};

const actions = {
  "GET": handleGet
};

exports.requestHandler = utils.actionDispatcher(actions);