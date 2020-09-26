const webdriver = require("selenium-webdriver"), By = webdriver.By, until = webdriver.until;
const logger = require("./logger");

// Create a new driver
const driver = new webdriver.Builder()
    .forBrowser("firefox")
    .build();

// Load the homepage
driver.get("https://admin.partnermarketing.com/login").then(function () {
    logger.login(driver);
});