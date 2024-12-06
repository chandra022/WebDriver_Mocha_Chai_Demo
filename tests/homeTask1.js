const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function homeTask1(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get( "https://www.google.com/");
    // using id
    await driver.findElement( By.id('APjFqb') ).sendKeys( 'WebDriver using JS', Key.ENTER );
    // using cssSelector
    // await driver.findElement( By.css('#APjFqb') ).sendKeys( 'WebDriver using JS', Key.ENTER );
    // await driver.findElement( By.css('#APjFqb[title="Search"]') ).sendKeys( 'WebDriver using JS', Key.ENTER );
    // using XPath
    // await driver.findElement( By.xpath('//*[@id="APjFqb"]') ).sendKeys( 'WebDriver using JS', Key.ENTER );
    // using name
    // await driver.findElement( By.name('q') ).sendKeys( 'WebDriver using JS', Key.ENTER );

    await driver.wait( until.titleContains('WebDriver using JS', 1000 ) );
    let pageTitle = await driver.getTitle();
    console.log( '\n-----------------\nPage title is:' + pageTitle +'\n' );
    await driver.quit();
    
}
homeTask1();
