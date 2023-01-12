const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
}
let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try { this.puppeteer.close(); } catch (e) { }
    done();
});

describe("Travel Page", () => {
    it("`index.html` should contain appropriate meta tags", async () => {
        try {
            const metaTags = await page.$$('meta');
            expect(metaTags.length).toBeGreaterThan(1);
        } catch (err) {
            throw err;
        }
    });
    it("`index.html` should contain a title tag that is not empty", async () => {
        try {
            const title = await page.$eval('title', el => el.innerHTML);
            expect(title).toBeTruthy()
        } catch (err) {
            throw err;
        }
    });
    it("Page should contain two sections", async () => {
        try {
            const sections = await page.$$('section');
            expect(sections.length).toBeGreaterThanOrEqual(2)
            expect(sections).toBeTruthy();
        } catch (err) {
            throw err;
        }
    });
    it("One section Should contain a text", async () => {
        try {
            const sectionsTexts = await page.$$eval('section', els => els.map(el => el.innerHTML));
            expect(sectionsTexts.join('')).not.toBe('');
        } catch (err) {
            throw err;
        }
    })
    it("Page should contain a Navigation Bar", async () => {
        try {
            const navBar = await page.$('nav');
            expect(navBar).toBeTruthy()
        } catch (err) {
            throw err;
        }
    });
    it("Page should contain at least one Background Image", async () => {
        try {
            let backgroundProperty = await page.$$eval('*', el => Array.from(el).filter(e => getComputedStyle(e).getPropertyValue('background-image') !== 'none'));
            console.log('bg', backgroundProperty)
            expect(backgroundProperty.length).toBeGreaterThan(0);
            expect(backgroundProperty).toBeTruthy();
        } catch (err) {
            throw err;
        }
    });
    it("Page should contain copyrights/Author's rights", async () => {
        try {
            const copyright = await page.$$eval('*', els => els.filter(el => el.innerHTML.includes('©')));
            console.log('cp', copyright)
            expect(copyright.length).toBeGreaterThanOrEqual(1)
        } catch (err) {
            throw err;
        }
    });
});