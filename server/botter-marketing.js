/**
 * @summary Handles the driver and all main function calls
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

const webdriver = require("selenium-webdriver"), By = webdriver.By, until = webdriver.until;
const pm = require("./pm");
const errors = require("./errors");
const enums = require("./enums");
const {getCampaignInfo} = require("./gitlab");
require("dotenv").config();

/**
 *  @return Promise - resolved after the driver starts
 *  @desc Creates a new Firefox driver and adds it to the global scope.
 */
let createDriver = () => {
    global.driver = new webdriver.Builder()
        .forBrowser("firefox")
        .build();
};

module.exports = {getCampaignInfo};