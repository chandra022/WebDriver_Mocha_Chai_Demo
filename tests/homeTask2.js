const {By, Builder, until} = require("selenium-webdriver");
const assert = require('assert');  // Import assertion module
require("chromedriver");

async function homeTask2() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://the-internet.herokuapp.com/');
        
        // Assert the correct page is opened
        let pageTitle = await driver.getTitle();
        assert.strictEqual(pageTitle, "The Internet", "Incorrect page title before login");

        // Navigate to Login Page
        await driver.findElement(By.xpath('//li/a[@href="/login"]')).click();

        // Perform Login 
        await driver.findElement(By.xpath('//input[@id="username"]')).sendKeys('tomsmith');
        await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys('SuperSecretPassword!');
        await driver.findElement(By.xpath('//button[@type="submit"]/i[contains(text(),"Login")]')).click();

        // Assert we are on the Secure Area page by checking the URL
        await driver.wait(until.urlContains('/secure'), 10000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://the-internet.herokuapp.com/secure', 'User unable to Login');

        // Wait until the Logout button is located and visible
        let logoutButton = await driver.wait(until.elementLocated(By.xpath('//a[@href="/logout"]')), 10000);
        await driver.wait(until.elementIsVisible(logoutButton), 10000);
        let isLogoutButtonDisplayed = await logoutButton.isDisplayed();
        assert.strictEqual(isLogoutButtonDisplayed, true, 'User unable to get Logout button');

        // Click Logout button
        await logoutButton.click();

        // Navigate back to Login Page
        let loginPageHeader = await driver.wait(
                until.elementLocated(By.xpath('//h2[contains(text(),"Login Page")]')), 10000
            );
        let isLoginPageHeaderDisplayed = await loginPageHeader.isDisplayed();
        assert.strictEqual(isLoginPageHeaderDisplayed, true, 'User unable to navigate back to Login page');
        
    } finally {
        // Close the browser
        await driver.quit();
    }
}

homeTask2();
