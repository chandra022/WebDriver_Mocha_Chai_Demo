const {By, Key, Builder, until} = require("selenium-webdriver");
var assert = require( 'assert' );
const elementLoaded = require( 'selenium-webdriver/lib/until' );
require("chromedriver");
const addContext = require( 'mochawesome/addContext' );

const chrome = require( 'selenium-webdriver/chrome' );
chromeOptions = new chrome.Options();
chromeOptions.excludeSwitches( 'enable-automation' );
chromeOptions.addArguments( '--start-maximized' );


describe( 'e-commerce test suite', ()=>{
    let driver;
    beforeEach( async() =>{
        driver = await new Builder().forBrowser( 'chrome' ).setChromeOptions( chromeOptions ).build();
        await driver.get( 'https://www.saucedemo.com/' );
    });

    it( 'validate order checkout', async() => {
            await driver.findElement( By.id( 'user-name' ) ).sendKeys( 'standard_user' );
            await driver.findElement( By.css( 'input[data-test="password"]' )).sendKeys( 'secret_sauce' );
            await driver.findElement( By.xpath( "//input[@value='Login']" ) ).click();
            // try{
            //     await driver.wait( until.alertIsPresent(), 2000 );    
            //     let alert = await driver.switchTo().alert();
            //     await alert.dismiss();
            // }catch(e){
            //     console.log('No alert appeared within the given time.');
            // }
            

            await driver.wait( 
                until.elementLocated( By.xpath( "//*[@id='header_container']//span[@class='title']" )), 
                10000 );
            let itemPrice = getItemPrice( 'Sauce Labs Bike Light' );
            addContext( this, {
                title: 'Item Details',
                value: {
                    'name': 'Sauce Labs Bike Light',
                    'price': itemPrice,
                },
            });
            addItemToCart( 'Sauce Labs Bike Light' );

    //  Navigate to cart page
            await driver.findElement( By.css( 'div#shopping_cart_container>a' ) ).click();
            await driver.wait( 
                elementLoaded.elementIsEnabled( By.css( "div[data-test='secondary-header']>span.title" )), 
                5000 );
            let itemNameInCart = await driver.findElement( By.css( 'div.inventory_item_name' ) ).getText();
            let itemPriceInCart = await driver.findElement( By.css( 'div.inventory_item_price' ) ).getText();
            assert.strictEqual( itemNameInCart, 'Sauce Labs Bike Light' );
            assert.strictEqual( itemPriceInCart, itemPrice );

    // perform item checkout
            await driver.findElement( By.css( 'button#checkout' ) ).click();
            await driver.findElement( By.id( 'first-name' ) ).sendKeys( 'standard user' );
            await driver.findElement( By.id( 'last-name' ) ).sendKeys( 'sauce labs' );
            await driver.findElement( By.id( 'postal-code' ) ).sendKeys( '200300' );
            await driver.findElement( By.css( 'input#continue' ) ).click();

    //  validate price in finish view
            let priceAtFinish = await driver.findElement( By.css( `div[data-test='subtotal-label']` ) ).getText().replace( 'Item total: ', '' );
            assert.strictEqual( priceAtFinish, itemPrice );
            await driver.findElement( By.id( 'finish' ) ).click();

    } );

    afterEach( async() => {
        driver.quit();
    });

    async function getItemPrice( product ){
        return await driver.findElement( 
                        By.xpath( `//div[@data-test='inventory-item']//div[contains( text(), '${product}')]
                                    //ancestor::div[@class='inventory_item_description']
                                    //child::div[@data-test='inventory-item-price']` ) )
                        .getText().replace( '$', '');
    }
    async function addItemToCart( product ){
            await driver.findElement( 
                        By.xpath( `//div[@data-test='inventory-item']//div[contains( text(), '${product}')]
                            //ancestor::div[@class='inventory_item_description']
                            //child::button`) ).click();
    }
});


