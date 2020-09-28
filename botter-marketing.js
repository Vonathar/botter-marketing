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

// Load the homepage
let main = async () => {
    await driver.get("https://admin.partnermarketing.com/login");
    await pm.login(Partners.LENOVO);
};

main();