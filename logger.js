const webdriver = require("selenium-webdriver"), By = webdriver.By, until = webdriver.until;
require('dotenv').config()

const pmEmail = process.env.PM_EMAIL;
const pmPassword = process.env.PM_PASSWORD;

const selectors = {
    emailField: "//*[@id=\"loginEmail\"]",
    passwordField: "//*[@id=\"loginPlainPassword\"]",
    loginButton: "/html/body/div/div[2]/div/div/div/form/button",
    manageSites: "/html/body/div/div[2]/div/div/div/div[1]/div/div/div[1]/div/a",
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
    partnerAccept: "/html/body/div/div[1]/div/div[1]/div/div[2]/a[2]",
};

/**
 *  @param driver - the driver used to render the browser
 *  @param partnerName - a lowercase string representation of the name of the partner which has to be logged in
 *  @return undefined
 *  @desc Logs the user into the Partnermarketing.com platform. Uses the Xpath as a selector.
 */
let pmLogin = async (driver, partnerName) => {

    /**
     *  @param selector - name of the Xpath selector for the element in the DOM
     *  @return undefined
     *  @desc Asynchronously wait for the element to appear in the DOM, then click it
     */
    let waitAndClick = async (selector) => {
        let element = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
        await element.click();
    };

    /**
     *  @param selector - name of the Xpath selector for the element in the DOM
     *  @param textContent - text to write in the DOM element
     *  @return undefined
     *  @desc Find the element in the DOM, then fill it
     */
    let waitAndFill = (selector, textContent) => {
        driver.findElement(webdriver.By.xpath(selector))
            .sendKeys(textContent);
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
        case "sage":
            await waitAndClick(selectors.pageOne.sageLogin);
            break;
        case "demo":
            await waitAndClick(selectors.pageOne.demoLogin);
            break;
        case "lenovo":
            await waitAndClick(selectors.pageOne.pageTwoButton);
            await waitAndClick(selectors.pageTwo.lenovoLogin);
            break;
    }
    // Confirm login
    await driver.sleep(2000);
    await waitAndClick(selectors.partnerAccept).catch(e => {
        console.log(e);
    });
    await driver.sleep(2500)
    driver.close();
};

module.exports = {
    pmLogin: pmLogin
};