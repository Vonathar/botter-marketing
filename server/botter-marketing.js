/**
 * @summary Handles the driver and all main function calls
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

require("dotenv").config();
const firefox = require('selenium-webdriver/firefox');
const webdriver = require("selenium-webdriver");
const pm = require("./pm");
const {getCampaignInfo} = require("./gitlab");

/**
 *  @return Promise - resolved after the driver starts
 *  @desc Creates a new Firefox driver and adds it to the global scope.
 */
let createDriver = () => {
  let options = new firefox.Options();
  options.addArguments("-headless");
  global.driver = new webdriver.Builder()
    .forBrowser("firefox")
    //.setFirefoxOptions(options)
    .build();
};

module.exports = {getCampaignInfo};