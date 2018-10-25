const webdriver = require('selenium-webdriver');
const {describe,it,afterEach,beforeEach} = require('mocha');
const assert = require('assert')
const By = webdriver.By;
const until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');
const OPTIONS = {
    site: 'http://franmer.breakdownfx.com/',
    screen:{
        width: 1280,
        height: 720
    }
};

describe('Main navigation check',function(){
    let driver;
    this.timeout(30000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
    });
    afterEach(function () {
        driver.quit();
    });

    it('Can see top menu',async function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('.main-nav li'))), 2000)
            .catch(()=> assert.ok(false, 'Can not find: .main-nav li'))
    });

    it('Can enter model series', function () {
        let sectionTitle = 'Модельный ряд';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.l-m-item'))))
            .then(() => driver.findElement(By.css('.section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'section title is not defined')
            })
    });
    it('Can enter gallery', function () {
        let sectionTitle = 'Галерея';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.img'))))
            .then(() => driver.findElement(By.css('.section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'section title is not defined')
            })
    });
    it('Can enter aboutUs', function () {
        let sectionTitle = 'О нас';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list'))))
            .then(() => driver.findElement(By.css('main .section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'section title is not defined')
            })
    });
    it('Can enter questions', function () {
        let sectionTitle = 'Вопросы и ответы';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(5) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.column'))))
            .then(() => driver.findElement(By.css('.section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'title is not defined')
            })
    });
    it('Can enter contacts', function () {
        let sectionTitle = 'Наши салоны продаж';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list'))))
            .then(() => driver.findElement(By.css('.section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'title is not defined')
            })
    });
    it('Can return on MainPage', function () {
        let sectionTitle = 'до его установки и после...';
        return driver.get(OPTIONS.site+ 'kontakty')
            .then(async() => (await getElementByCss('.main-nav li:nth-child(1) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.screen span'))))
            .then(() => driver.findElement(By.css('.screen span')).getText())
            .then(title=>{
               assert.equal(title, sectionTitle, 'title is not defined')
            })
    });


    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path)))
            .then(()=> driver.findElement(By.css(path)));
    }
});

describe('Main page functionality',function() {
    let driver;
    this.timeout(50000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
    });
    afterEach(function () {
        driver.quit();
    });

    it('Header button on first template is working properly', function () {
        let firstFooterStepName = 'ТЕХНОЛОГИИ';
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('header .button'))))
            .then(() => driver.findElement(By.css('header .button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.steps'))))
            .then(() => driver.findElement(By.css('.steps li:nth-child(1) a')).getText())
            .then(stepName => assert.equal(stepName, firstFooterStepName, 'Button is not providing to the right page'));
    });
    //TODO:: telephone number in top right corner is differ from clicked number.

    it('Footer svg-button on first template move to next template', function () {
        let secondSlideTitle = 'Карта выполненных проектов';
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('footer svg'))))
            .then(() => driver.findElement(By.css('footer svg')).click())
            .then(() => driver.wait(until.elementLocated(By.css('h2'))))
            .then(() => driver.findElement(By.css('h2')).getText())
            .then(title => assert.equal(title, secondSlideTitle, 'Button on first template is not providing to the next template'))
    });
    // TODO:: How the svg-button is working?
    // TODO:: should I test if map is working properly?

    it('Can see map on second template', function(){
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('h2'))))
            .then(()=> driver.wait(until.elementLocated(By.css('#map'))))
            .catch(()=> assert.ok(false, 'Can not find:#map'))
    });
    it('Can see video on template 3', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#trailerPlayer'))),2000)
            .catch(()=> assert.ok(false, 'Can not find element: #trailerPlayer'))
            .then(()=> driver.findElement(By.css('.feedfeed')), 2000)
            .catch(()=> assert.ok(false, 'Can not find element: .feedfeed'))
    });
    it('Smaller button on template 3 is working properly', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secFeedback h2'))))
            .then(()=> driver.findElement(By.css('#secFeedback header a')).getAttribute('href'))
            .catch(()=> assert.ok(false, 'link is not found'))
    });

    it('Button on template 4 is working properly', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secShowrooms h1'))))
            .then(()=> driver.findElement(By.css('#secShowrooms header a')).getAttribute('href'))
            .catch(()=> assert.ok(false, 'link is not found'))
    });
    it('Can swipe to another picture from template 4', function(){
        let initialSlide = 0;
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secShowrooms'))))
            .then(()=> driver.findElement(By.css('#secShowrooms .glider ul')).getAttribute('style'))
            .then(tempData => initialSlide = tempData)
            .then(()=> driver.findElement(By.css('#secShowrooms .glider .right')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('#secShowrooms .glider ul')).getAttribute('style'))
            .then(newSlider => assert.notEqual(newSlider,initialSlide, 'Slide is not working properly'))
    });

    it('Can see image on template 5', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secTeam h2'))))
            .then(()=> driver.findElement(By.css('#secTeam #teamWrap #teamPhoto')).getAttribute('src'))
            .catch(()=> assert.ok(false, 'image is not found'))
    });
    it('Can select a worker on template 5', function(){
        let initialHuman = 0;
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secTeam #teamWrap ul li'))))
            .then(()=> driver.findElement(By.css('#secTeam #teamWrap ul li')).getAttribute('data-n'))
            .then(tempData => initialHuman = tempData)
            .then(()=> driver.findElement(By.css('#secTeam #teamWrap ul li:nth-child(2)')).getAttribute('data-n'))
            .then(newHuman => assert.notEqual(newHuman,initialHuman, 'Human can not be found'))
    });

    it('Can see form on template 6', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secCall h3'))))
            .then(()=> driver.findElement(By.css('#secCall .left fieldset label')).getAttribute('input'))
            .catch(()=> assert.ok(false, 'form is not found'))
    });

});


describe('Main navigation templates',function(){
    let driver;
    this.timeout(30000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
    });
    afterEach(function () {
        driver.close();
    });
    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path)))
            .then(()=> driver.sleep(1500))
            .then(()=> driver.findElement(By.css(path)));
    }
    it('Can see filter of models', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(2)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(2)')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });
    it('Can see models on model series', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-child(2)'))))
            .then(()=> driver.findElement(By.css('.list-models')))
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });

    it('Can enter details', function () {
        let initialTitle;
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(2000))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) h4 a')).getAttribute('title'))
            .then(tempTitle => {
                    initialTitle = tempTitle;
            })
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#ppb h1'))))
            .then(()=> driver.sleep(2000))
            .then(()=> driver.findElement(By.css('h1')).getText())
            .then(modelTitle=> assert.equal(modelTitle, initialTitle, 'Can not find title on page'))
    });

    it('Can swipe pictures', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('picture'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('.arrow')).click())
            .catch(()=> assert.ok(false, 'Can not find slider on page'))
    });
    it('Can see available colors of selected model', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#ppb #colors div figure picture img'))))
            .then(()=> driver.findElement(By.css('#ppb #colors div figure picture img')).click())
            .then(()=> driver.sleep(2000))
            .then(()=> driver.findElement(By.css('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find available colors on page'))
    });
    it('Can see thesis', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(1500))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#ppb #thesis div ul li h6'))))
            .then(()=> driver.findElement(By.css('#ppb #thesis div ul li')).click())
            .catch(()=> assert.ok(false, 'Can not find thesis on page'))
    });
    it('Can ask project cost', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#action2 button'))))
            .catch(()=> assert.ok(false, 'Can not find button to ask project cost on page'))
    });
//TODO:: Button to ask for project cost is not standardised



    it('Can see picture in Gallery', function(){
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.slider-line .list-img-gal img'))))
            .then(()=> driver.findElement(By.css('.slider-line .list-img-gal img')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.psh-closer'))))
            .then(()=> driver.findElement(By.css('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find picture to open on full screen in Gallery'))
    });
    it('Can see all pictures in Gallery', function(){
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.one-line-gal .slider-line .btn-open'))))
            .then(()=> driver.findElement(By.css('.one-line-gal .slider-line .btn-open')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.header-line span'))))
            .catch(()=> assert.ok(false, 'Can not open full list of pictures in Gallery'))
    });

    it('Can see filter of information about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(2)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(2)')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });
    it('Can see text in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .holder p'))))
            .then(()=> driver.findElement(By.css('.section-content .holder p')))
            .catch(()=> assert.ok(false, 'Can not find text on page'))
    });
    it('Can see picture in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.thumbnails-slider .thumb-holder #article-gallery li picture img'))))
            .then(()=> driver.findElement(By.css('.thumbnails-slider .thumb-holder #article-gallery li picture img')).click())
            .then(()=> driver.sleep(2000))
            .then(()=> driver.wait(until.elementLocated(By.css('.psh-closer'))))
            .then(()=> driver.findElement(By.css('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find pictures on page'))
    });
    it('Can see text template in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(2)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(2)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .holder ul li'))))
            .then(()=> driver.findElement(By.css('.section-content .holder ul li')))
            .catch(()=> assert.ok(false, 'Can not find text on page'))
    });
    it('Can see text template with picture in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(3)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(3)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .holder p'))))
            .then(()=> driver.findElement(By.css('.section-content .holder p')))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.thumb-holder ul li picture img'))))
            .then(()=> driver.findElement(By.css('.thumb-holder ul li picture img')).click())
            .then(()=> driver.sleep(2000))
            .then(()=> driver.findElement(By.css('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find text with picture on page'))
    });
    it('Can see map in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(4)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(4)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#map .gm-style button'))))
            .catch(()=> assert.ok(false, 'Can not find map on page'))
    });

    it('Can see answers on questions', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(5) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .column ul li:nth-of-type(4)'))))
            .then(()=> driver.findElement(By.css('.section-content .column ul li:nth-of-type(4)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .column ul .active .hidden-txt p'))))
            .catch(()=> assert.ok(false, 'Can not find answer on selected question'))
    });

    it('Can see filter of places in contacts', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(3) a'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(3) a')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });
    it('Can see selected showroom in contacts', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(3) a'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(3) a')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.close-showroom'))))
            .then(()=> driver.findElement(By.css('.close-showroom')).click())
            .catch(()=> assert.ok(false, 'Can not close showroom'))
    });
    it('Can see slider of selected showroom in contacts', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(3) a'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(3) a')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.mark-slider .cont-thumbnails-btn svg '))))
            .catch(()=> assert.ok(false, 'Can not find slider on page'))
    });
    it('Can see map of showrooms in contacts', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.main-holder .map-image #office2 a'))))
            .then(()=> driver.findElement(By.css('.main-holder .map-image #office2 a')).click())
            .then(()=> driver.sleep(1000))
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });
//TODO:: Should I somehow wright tests for phone numbers on contact page?

});