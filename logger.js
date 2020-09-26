const webdriver = require("selenium-webdriver"), By = webdriver.By, until = webdriver.until;

const pmEmail = "OMITTED";
const pmPassword = "OMITTED";

const selectors = {
    emailField: "//*[@id=\"loginEmail\"]",
    passwordField: "//*[@id=\"loginPlainPassword\"]",
    loginButton: "/html/body/div/div[2]/div/div/div/form/button",
    manageSites: "/html/body/div/div[2]/div/div/div/div[1]/div/div/div[1]/div/a",
    openDropdown: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[1]/td[2]/div[1]/a",
    assetProducerOption: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[1]/td[2]/div[1]/ul/li[4]/a",
    demoLogin: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[5]/td[2]/a",
    sageLogin: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[6]/td[2]/a",
    partnerAccept: "/html/body/div/div[1]/div/div[1]/div/div[2]/a[2]",
};

/**
 *  @param driver - the driver used to render the browser
 *  @return undefined
 *  @desc Logs the user into the Partnermarketing.com platform. Uses the Xpath as a selector.
 */
let login = async (driver) => {

    /**
     *  @param selectorName - name of the Xpath selector for the element in the DOM
     *  @return undefined
     *  @desc Asynchronously wait for the element to appear in the DOM, then click it
     */
    let waitAndClick = async (selectorName) => {
        let element = await driver.wait(until.elementLocated(By.xpath(selectors[selectorName])), 10000);
        await element.click();
    };

    /**
     *  @param selectorName - name of the Xpath selector for the element in the DOM
     *  @param textContent - text to write in the DOM element
     *  @return undefined
     *  @desc Find the element in the DOM, then fill it
     */
    let waitAndFill = (selectorName, textContent) => {
        driver.findElement(webdriver.By.xpath(selectors[selectorName]))
            .sendKeys(textContent);
    };

    // First login
    waitAndFill("emailField", pmEmail);
    waitAndFill("passwordField", pmPassword);
    waitAndClick("loginButton")
        // Partner selection
        .then(() => waitAndClick("manageSites"))
        .then(() => {
            // Select role
            waitAndClick("openDropdown").then(() => {
                waitAndClick("assetProducerOption").then(() => {
                    // Partner login
                    waitAndClick("sageLogin").then(() => {
                        driver.sleep(2000).then(() => {
                            waitAndClick("partnerAccept").catch(e => {
                                console.log(e);
                            });
                        });
                    });
                });
            });
        });
};

module.exports = {
    login
};