/**
 * @summary Handles the driver and all main function calls
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

const webdriver = require("selenium-webdriver"), By = webdriver.By, until = webdriver.until;
const pm = require("./pm");

// Enum-like for available partners
const Partners = Object.freeze({
    LENOVO: Symbol("lenovo"), SAGE: Symbol("sage"), DEMO: Symbol("demo")
});

// Add Partners to the global scope
global.Partners = Partners;

// Create a new driver
const driver = new webdriver.Builder()
    .forBrowser("firefox")
    .build();

// Add the driver to the global scope
global.driver = driver;

/**
 *  @return Promise - resolved after the driver closes
 *  @desc Implements the main logic for the bot. Calls all the functions from other files before closing the driver.
 */
let main = async () => {
    await driver.get("https://admin.partnermarketing.com/login");
    await pm.login(Partners.LENOVO);
    await driver.sleep(5000);
    driver.quit();
};

main();