/**
 * @summary Provides functions to login & access content in Partnermarketing.com
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */
const webdriver = require("selenium-webdriver"), By = webdriver.By, until = webdriver.until;
const pmEmail = process.env.PM_EMAIL;
const pmPassword = process.env.PM_PASSWORD;

const selectors = {
    emailField: "//*[@id=\"loginEmail\"]",
    passwordField: "//*[@id=\"loginPlainPassword\"]",
    loginButton: "/html/body/div/div[2]/div/div/div/form/button",
    manageSites: "/html/body/div/div[2]/div/div/div/div[1]/div/div/div[1]/div/a",
    partnerAccept: "/html/body/div/div[1]/div/div[1]/div/div[2]/a[2]",
    pageOne: {
        openDropdown: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[1]/td[2]/div[1]/a",
        assetProducerOption: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[1]/td[2]/div[1]/ul/li[4]/a",
        demoLogin: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[5]/td[2]/a",
        sageLogin: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[6]/td[2]/a",
        pageTwoButton: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/div/div/ul/li[4]/a",
    },
    pageTwo: {
        lenovoLogin: "/html/body/div/div[2]/div/div[2]/div/div[2]/div/table/tbody/tr[3]/td[2]/a",
    },
};

/**
 *  @param partnerName - a lowercase string representation of the name of the partner which has to be logged in
 *  @return Promise - resolved when the user successfully logs into the partner site, after it fully loads
 *  @desc Logs the user into the Partnermarketing.com platform. Uses the Xpath as a selector.
 */
let login = async (partnerName) => {

    /**
     *  @param selector - name of the Xpath selector for the element in the DOM, uses the selectors object
     *  @throws ElementNotFoundError - thrown if the clickable element cannot be found in the DOM
     *  @return Promise - resolved after successfully clicking the DOM element
     *  @desc Asynchronously wait for the element to appear in the DOM, then click it
     */
    let waitAndClick = async (selector) => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
            await element.click();
        } catch (e) {
            throw new ElementNotFoundError("Clickable element not found in the DOM: " + selector);
        }
    };

    /**
     *  @param selector - name of the Xpath selector for the element in the DOM
     *  @param textContent - text to write in the DOM element
     *  @throws ElementNotFoundError - thrown if the text input cannot be found in the DOM
     *  @return Promise - resolved after successfully submitting the given text
     *  @desc Find the text input node in the DOM, then fill it
     */
    let waitAndFill = (selector, textContent) => {
        try {
            driver.findElement(webdriver.By.xpath(selector))
                .sendKeys(textContent);
        } catch (e) {
            throw new ElementNotFoundError("Text input not found in the DOM: " + selector);
        }
    };

    // First login
    await waitAndFill(selectors.emailField, pmEmail);
    await waitAndFill(selectors.passwordField, pmPassword);
    await waitAndClick(selectors.loginButton);
    // Partner selection
    await waitAndClick(selectors.manageSites);
    // Select role
    await waitAndClick(selectors.pageOne.openDropdown);
    await waitAndClick(selectors.pageOne.assetProducerOption);
    // Partner login
    switch (partnerName) {
        case Partners.SAGE:
            await waitAndClick(selectors.pageOne.sageLogin);
            break;
        case Partners.DEMO:
            await waitAndClick(selectors.pageOne.demoLogin);
            break;
        case Partners.LENOVO:
            await waitAndClick(selectors.pageOne.pageTwoButton);
            await waitAndClick(selectors.pageTwo.lenovoLogin);
            break;
    }
    // Confirm login
    await driver.sleep(2000);
    await waitAndClick(selectors.partnerAccept).catch(e => {
        throw e;
    });
    await driver.sleep(5000);

};

module.exports = {
    login: login
};
