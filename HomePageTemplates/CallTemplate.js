const webdriver = require('selenium-webdriver');
const {describe,it,afterEach,beforeEach} = require('mocha');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');
const OPTIONS = {
    site: '',
    screen:{
        width: 1280,
        height: 720
    }
};

describe('Home page functionality',function() {
    let driver;
    this.timeout(50000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
    });
    afterEach(function () {
        driver.close();
    });
    it('Can see form on template 6', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secCall h3'))))
            .then(()=> driver.findElement(By.css('#secCall .left fieldset label')).getAttribute('input'))
            .catch(()=> assert.ok(false, 'form is not found'))
    });

});